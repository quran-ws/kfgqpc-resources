
(function(){
  var TEXT = ['txt','csv','json','xml','sql','brl','brf','me','md','htm','html','sfk'];
  var MAXTEXT = 400000;           // preview a slice, not a 3 MB file
  var libs = {};

  function ext(n){ var m = /\.([A-Za-z0-9]+)$/.exec(n||''); return m ? m[1].toLowerCase() : ''; }

  function kind(name){
    var e = ext(name);
    if (e === 'mp3' || e === 'wav' || e === 'ogg' || e === 'm4a') return 'audio';
    if (e === 'jpg' || e === 'jpeg' || e === 'png' || e === 'gif' || e === 'webp' || e === 'svg') return 'image';
    if (e === 'pdf' || e === 'ai') return 'pdf';
    if (e === 'xlsx' || e === 'xls') return 'sheet';
    if (e === 'docx') return 'doc';
    if (TEXT.indexOf(e) > -1) return 'text';
    return null;                   // fonts, installers, archives: download only
  }

  function load(src){
    if (libs[src]) return libs[src];
    libs[src] = new Promise(function(res, rej){
      var s = document.createElement('script');
      s.src = src; s.onload = res; s.onerror = function(){ rej(new Error('load failed')); };
      document.head.appendChild(s);
    });
    return libs[src];
  }

  var ov, box, ttl, body, dl;
  function build(){
    ov = document.createElement('div'); ov.className = 'ov'; ov.hidden = true;
    ov.innerHTML =
      '<div class="ov-box" role="dialog" aria-modal="true">' +
        '<header class="ov-h">' +
          '<span class="ov-t" dir="ltr"></span>' +
          '<a class="ov-dl" href="#"><span class="t-ar">تحميل</span><span class="t-en">Download</span></a>' +
          '<button class="ov-x" type="button" aria-label="Close">\u00d7</button>' +
        '</header>' +
        '<div class="ov-b"></div>' +
      '</div>';
    document.body.appendChild(ov);
    box = ov.querySelector('.ov-box'); ttl = ov.querySelector('.ov-t');
    body = ov.querySelector('.ov-b'); dl = ov.querySelector('.ov-dl');
    ov.addEventListener('click', function(e){ if (e.target === ov) close(); });
    ov.querySelector('.ov-x').addEventListener('click', close);
    document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && !ov.hidden) close(); });
  }
  function close(){ body.innerHTML = ''; ov.hidden = true; document.body.style.overflow = ''; }

  function msg(t){ var p = document.createElement('p'); p.className = 'ov-msg'; p.textContent = t; return p; }

  function esc(t){ var d = document.createElement('div'); d.textContent = t; return d.innerHTML; }

  function showText(txt, truncated){
    var pre = document.createElement('pre'); pre.className = 'ov-pre'; pre.textContent = txt;
    body.appendChild(pre);
    if (truncated) body.appendChild(msg('… preview truncated — download the file for the rest'));
  }

  function table(rows){
    var t = document.createElement('table'); t.className = 'ov-tbl';
    rows.slice(0, 200).forEach(function(r, i){
      var tr = document.createElement('tr');
      r.forEach(function(c){
        var td = document.createElement(i ? 'td' : 'th'); td.textContent = c == null ? '' : c;
        tr.appendChild(td);
      });
      t.appendChild(tr);
    });
    var w = document.createElement('div'); w.className = 'ov-scroll'; w.appendChild(t);
    body.appendChild(w);
    if (rows.length > 200) body.appendChild(msg('showing the first 200 of ' + rows.length + ' rows'));
  }

  function parseCSV(txt){
    return txt.split(/\r?\n/).filter(function(l){ return l.length; })
              .map(function(l){ return l.split(','); });
  }

  function open(url, name, size){
    if (!ov) build();
    ttl.textContent = name; dl.href = url;
    body.innerHTML = ''; ov.hidden = false; document.body.style.overflow = 'hidden';
    var k = kind(name);

    if (k === 'audio'){
      var a = document.createElement('audio');
      a.controls = true; a.preload = 'metadata'; a.src = url; a.className = 'ov-audio';
      body.appendChild(a); a.play().catch(function(){});
      return;
    }
    if (k === 'image'){
      var im = document.createElement('img'); im.src = url; im.alt = name; im.className = 'ov-img';
      body.appendChild(im); return;
    }
    if (k === 'pdf'){
      var f = document.createElement('iframe');
      f.src = url; f.className = 'ov-frame'; f.title = name;
      body.appendChild(f);
      if (ext(name) === 'ai') body.appendChild(msg('Illustrator file — shown via its embedded PDF; download to edit.'));
      return;
    }

    body.appendChild(msg('Loading preview…'));
    var headers = {};
    if (k === 'text' && size && size > MAXTEXT) headers.Range = 'bytes=0-' + (MAXTEXT - 1);

    fetch(url, {headers: headers}).then(function(r){
      if (!r.ok && r.status !== 206) throw new Error('HTTP ' + r.status);
      if (k === 'sheet' || k === 'doc') return r.arrayBuffer();
      return r.text();
    }).then(function(data){
      body.innerHTML = '';
      if (k === 'text'){
        var e = ext(name);
        if (e === 'csv') return table(parseCSV(data));
        if (e === 'json'){
          try { return showText(JSON.stringify(JSON.parse(data), null, 2), false); }
          catch (_) { return showText(data, size > MAXTEXT); }
        }
        return showText(data, size > MAXTEXT);
      }
      if (k === 'sheet'){
        return load('https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js').then(function(){
          var wb = XLSX.read(data, {type: 'array'});
          var sh = wb.Sheets[wb.SheetNames[0]];
          body.innerHTML = '';
          table(XLSX.utils.sheet_to_json(sh, {header: 1}));
          if (wb.SheetNames.length > 1) body.appendChild(msg('sheet 1 of ' + wb.SheetNames.length + ': ' + wb.SheetNames[0]));
        });
      }
      if (k === 'doc'){
        return load('https://cdnjs.cloudflare.com/ajax/libs/mammoth/1.6.0/mammoth.browser.min.js').then(function(){
          return mammoth.convertToHtml({arrayBuffer: data}).then(function(res){
            var d = document.createElement('div'); d.className = 'ov-doc'; d.innerHTML = res.value;
            body.innerHTML = ''; body.appendChild(d);
          });
        });
      }
    }).catch(function(err){
      body.innerHTML = '';
      body.appendChild(msg('Preview unavailable (' + err.message + '). Use Download instead.'));
    });
  }

  document.addEventListener('click', function(e){
    var b = e.target.closest('[data-pv]');
    if (!b) return;
    e.preventDefault();
    open(b.getAttribute('data-pv'), b.getAttribute('data-nm') || '', +b.getAttribute('data-sz') || 0);
  });

  // hide the preview control where we cannot render anything useful
  document.querySelectorAll('[data-pv]').forEach(function(b){
    if (!kind(b.getAttribute('data-nm') || '')) b.remove();
  });
})();
