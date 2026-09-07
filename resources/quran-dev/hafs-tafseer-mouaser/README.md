# التفسير الميسر للقرآن الكريم

**Tafseer Muyassar**

مصدر / Source: <https://qurancomplex.gov.sa/quran-dev/>

| | |
|---|---|
| الملف / File | [`hafs_tafseerMouaser_v3.zip`](./hafs_tafseerMouaser_v3.zip) |
| الحجم / Size | 7.52 MB (7,885,418 bytes) |
| رابط التنزيل / Download URL | <https://download.qurancomplex.gov.sa/resources_dev/hafs_tafseerMouaser_v3.zip> |
| آخر تعديل على الخادم / Server last-modified | Tue, 26 Nov 2024 11:04:34 GMT |
| الإصدار / Version | 3.0 |
| تاريخ الإنشاء / Created | 15-12-2020 |
| تاريخ آخر تعديل / Last updated | 01-08-2023 |
| عدد التحميلات وقت الأرشفة / Downloads at capture | 563 |
| أنواع الملفات / File types | excel, word, database, HTML 5, JSON/XML, PDF |
| تاريخ الأرشفة / Archived | 2026-09-07T14:02:59Z |

## تحقق الوثوقية / Integrity

| | المنشور / Published | المحسوب / Computed |
|---|---|---|
| MD5 | `5601682965e32f4dd6992c7600fdccc3` | `b38703983d438a5cd22269b746eaac0c` |
| SHA-1 | `5f533113c2f54f32eded734bb49e6a5837965722` | `a8f054411c6cd14a258d5ba7bc4e30c9ea79b336` |
| SHA-256 | — | `443a6927dbbf9df0fb63792dc83b83511f7d308f3ec322c9230fbebfe3c69c86` |

⚠️ **غير مطابق / Mismatch** — Published MD5/SHA-1 on the source page do not match the file currently served. The download was repeated and is byte-identical each time, and the file is structurally valid, so the served file appears to have been replaced after the page checksums were written.

## تعريف / Definition

التفسير الميسر للقرآن الكريم  
هي خدمة يقدمها مجمع الملك فهد لطباعة المصحف الشريف للمطورين والباحثين ودور النشر لاستخدامها في محتوى تطبيقاتهم (المكتبية والجوالات والمتصفحات) وبحوثهم، وهذا المحتوى موثوق ومعتمد من المجمع، ويحتوي على بيانات المصحف الشريف برواية حفص عن عاصم مع نص التفسير الميسر المقابل لكل آية، كما تم إضافة وسم () مع خاصية (aya) للتحكم في نوع الخط للآية القرآنية وتمييزها عن نص التفسير.

## دليل الاستخدام / Usage guide

The database contains the following fields:  
1- id (int): Auto_increment Number  
2- jozz (int): Jozz Number  
3- page (int): Page Number  
4- sura_no (int): Sura Number  
5- sura_name_en (varchar): Sura Name in English  
6- sura_name_ar (varchar): Sura Name in Arabic (kfgqpc_hafs_uthmanic_script ttf font file)  
7- line_start (int): Start Line of Aya  
8- line_end (int): End Line of Aya  
9- aya_no (int): Aya Number  
10- aya_text (text): Text of the Aya in kfgqpc_hafs_uthmanic_script ttf font file (Adding Aya mark as Symbol to all files in UthmanicHafs_v2-0 data folder except Excel file to display Aya mark properly)  
11- aya_text_emlaey (text): Emlaey Text of the Aya used for search purpose  
12- aya_tafseer (text): Tafseer Text of the Aya (The Tafseer text in Uthman Taha Naskh font and the Aya in Uthmanic Hafs font) A tag () has been added with the aya attribute to control the font type of the Quranic Aya and distinguish it from the text of the interpretation (Tafseer).  
It includes two folders:  
1- It contains Tafseer Mouaser fonts (Uthmanic Hafs font and Uthman Taha Naskh font).  
2- It contains files for developers (Excel, CSV, HTML5, SQL, XML, JSON and PDF).

## معلومات / Information

التفسير الميسر للقرآن الكريم  
تاريخ الإنشاء: 15-12-2020  
تاريخ آخر تعديل: 01-08-2023  
معلومات حول التحديث الجديد ملف: read.me  
تحديث: 3.0

## محتويات الأرشيف / Archive contents (10 files)

| المسار / Path | الحجم / Size | CRC32 | التعديل / Modified |
|---|---:|---|---|
| `hafs_tafseerMouaser_v3_data/read.me` | 1,558 | `5a19c5e3` | 2023-01-08 11:41:26 |
| `hafs_tafseerMouaser_v3_data/tafseerMouaser_v03.csv` | 4,408,127 | `758b613b` | 2023-01-08 11:36:40 |
| `hafs_tafseerMouaser_v3_data/tafseerMouaser_v03.html` | 7,202,603 | `b32150be` | 2023-01-08 11:36:24 |
| `hafs_tafseerMouaser_v3_data/tafseerMouaser_v03.sql` | 5,431,012 | `9594579a` | 2023-01-08 11:36:14 |
| `hafs_tafseerMouaser_v3_data/tafseerMouaser_v03.txt` | 4,358,351 | `c8e2d4b4` | 2023-01-08 11:37:04 |
| `hafs_tafseerMouaser_v3_data/tafseerMouaser_v03.xlsx` | 1,797,975 | `9daddc85` | 2023-01-08 09:05:12 |
| `hafs_tafseerMouaser_v3_data/tafseerMouaser_v03.xml` | 6,216,583 | `7ed055e7` | 2023-01-08 11:36:54 |
| `hafs_tafseerMouaser_v3_fonts/uthmanic_hafs_v20.ttf` | 795,444 | `537a6f88` | 2022-08-21 12:03:48 |
| `hafs_tafseerMouaser_v3_fonts/uthman_tn1b_ver20.ttf` | 132,052 | `22f68304` | 2023-01-08 08:07:28 |
| `hafs_tafseerMouaser_v3_fonts/uthman_tn1_ver20.ttf` | 139,384 | `5311e51a` | 2023-01-08 08:07:02 |

---

جميع الحقوق محفوظة لمجمع الملك فهد لطباعة المصحف الشريف — انظر [NOTICE.md](../../../NOTICE.md).  
Rights belong to the King Fahd Glorious Qur'an Printing Complex — see [NOTICE.md](../../../NOTICE.md).
