
(function(){
  var root=document.documentElement;
  function save(k,v){try{localStorage.setItem(k,v);}catch(e){}}
  function load(k){try{return localStorage.getItem(k);}catch(e){return null;}}

  var langBtn=document.getElementById('langBtn');
  function setLang(l){
    root.setAttribute('data-lang',l);
    root.setAttribute('lang',l);
    root.setAttribute('dir', l==='ar' ? 'rtl' : 'ltr');
    if(langBtn) langBtn.textContent = (l==='ar' ? 'English' : 'العربية');
    var s=document.getElementById('q');
    if(s) s.placeholder = (l==='ar' ? 'ابحث في الملفات…' : 'Search files…');
    save('kf-lang',l);
  }
  setLang(load('kf-lang') || 'ar');
  if(langBtn) langBtn.addEventListener('click',function(){
    setLang(root.getAttribute('data-lang')==='ar' ? 'en' : 'ar');
  });

  var themeBtn=document.getElementById('themeBtn');
  var stored=load('kf-theme');
  if(stored) root.setAttribute('data-theme',stored);
  if(themeBtn) themeBtn.addEventListener('click',function(){
    var cur=root.getAttribute('data-theme');
    if(!cur) cur = matchMedia('(prefers-color-scheme:dark)').matches ? 'dark' : 'light';
    var next = cur==='dark' ? 'light' : 'dark';
    root.setAttribute('data-theme',next); save('kf-theme',next);
  });

  var q=document.getElementById('q'), sel=document.getElementById('grp'),
      cnt=document.getElementById('cnt'), empty=document.getElementById('empty'),
      groups=[].slice.call(document.querySelectorAll('.grp'));
  function apply(){
    var term=(q&&q.value||'').trim().toLowerCase(), g=(sel&&sel.value)||'', shown=0;
    groups.forEach(function(sec){
      var okG = !g || sec.dataset.group===g, any=false;
      [].forEach.call(sec.querySelectorAll('.res'),function(r){
        var hit = okG && (!term || r.dataset.hay.indexOf(term)>-1);
        r.hidden = !hit; if(hit){any=true; shown++;}
      });
      sec.hidden = !any;
    });
    if(cnt) cnt.textContent = shown + (root.getAttribute('data-lang')==='ar'
      ? ' نتيجة' : (shown===1?' result':' results'));
    if(empty) empty.style.display = shown ? 'none' : 'block';
  }
  var nav=[].slice.call(document.querySelectorAll('.gnav a'));
  nav.forEach(function(a){
    a.addEventListener('click',function(){
      nav.forEach(function(x){x.classList.remove('on');});
      a.classList.add('on');
    });
  });
  if(q) q.addEventListener('input',apply);
  if(sel) sel.addEventListener('change',apply);
  if(langBtn) langBtn.addEventListener('click',apply);
  apply();
})();
