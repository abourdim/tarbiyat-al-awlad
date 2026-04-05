/* ═══════════════════════════════════════════════════════════
   تربية الأولاد في الإسلام — v3 Ultimate
   DNA: Workshop-DIY framework + Hajj-Guide polish
   All educational content + splash, themes, sound, tabs
   ═══════════════════════════════════════════════════════════ */

/* ═══ SPLASH ═══ */
let splashTimer;
function initSplash(){
  let c=3;
  const el=document.getElementById('splash-count');
  splashTimer=setInterval(()=>{c--;el.textContent=c;if(c<=0)dismissSplash()},1000);
}
function dismissSplash(){
  clearInterval(splashTimer);
  const s=document.getElementById('splash');
  s.classList.add('hide');
  setTimeout(()=>s.style.display='none',700);
  playSound('success');
  glowBismillah();
}

/* ═══ SOUND (Web Audio API) ═══ */
let audioCtx;
function getAudio(){if(!audioCtx)audioCtx=new(window.AudioContext||window.webkitAudioContext)();return audioCtx}
function playSound(type){
  try{
    const ctx=getAudio(),o=ctx.createOscillator(),g=ctx.createGain();
    o.connect(g);g.connect(ctx.destination);g.gain.value=0.08;
    if(type==='click'){o.frequency.value=800;o.type='sine';g.gain.value=0.05;o.start();o.stop(ctx.currentTime+0.06)}
    else if(type==='success'){o.frequency.value=523;o.type='sine';o.start();o.stop(ctx.currentTime+0.12);
      setTimeout(()=>{const o2=ctx.createOscillator(),g2=ctx.createGain();o2.connect(g2);g2.connect(ctx.destination);g2.gain.value=0.06;o2.frequency.value=659;o2.type='sine';o2.start();o2.stop(ctx.currentTime+0.15)},100)}
    else if(type==='theme'){o.frequency.value=330;o.type='triangle';o.start();setTimeout(()=>o.frequency.value=415,100);setTimeout(()=>o.frequency.value=523,200);o.stop(ctx.currentTime+0.35)}
  }catch(e){}
}

/* ═══ TOAST ═══ */
function showToast(msg,ms=2500){
  const t=document.getElementById('toast');
  t.textContent=msg;t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),ms);
}

/* ═══ BISMILLAH GLOW ═══ */
function glowBismillah(){
  const b=document.getElementById('bismillah');
  b.classList.add('glow');setTimeout(()=>b.classList.remove('glow'),2000);
}

/* ═══ THEME ═══ */
const themes=['default','light','zellige'];
let themeIdx=0;
function cycleTheme(){
  themeIdx=(themeIdx+1)%themes.length;
  const t=themes[themeIdx];
  document.documentElement.setAttribute('data-theme',t==='default'?'':t);
  const icons={'default':'🌙','light':'☀️','zellige':'✦'};
  { const _e=document.getElementById('theme-toggle'); if(_e) _e.textContent=icons[t]||'🌙'; }
  localStorage.setItem('tarbiya-theme',t);
  playSound('theme');
  showToast(t==='default'?'Mosque Gold':t==='light'?'Light':'Zellige');
}
function loadTheme(){
  const t=localStorage.getItem('tarbiya-theme')||'default';
  themeIdx=themes.indexOf(t);if(themeIdx<0)themeIdx=0;
  if(t!=='default')document.documentElement.setAttribute('data-theme',t);
  const icons={'default':'🌙','light':'☀️','zellige':'✦'};
  { const _e=document.getElementById('theme-toggle'); if(_e) _e.textContent=icons[t]||'🌙'; }
}

/* ═══ SCROLL BEHAVIORS ═══ */
function initScroll(){
  const fab=document.getElementById('fab-top');
  window.addEventListener('scroll',()=>{
    fab.classList.toggle('show',window.scrollY>300);
  },{passive:true});
}

/* ═══ HIJRI DATE ═══ */
function getHijri(){
  try{
    const d=new Date();
    const f=new Intl.DateTimeFormat('ar-SA-u-ca-islamic',{day:'numeric',month:'long',year:'numeric'});
    return f.format(d);
  }catch(e){return ''}
}

/* ═══ DUA MODAL ═══ */
const DUAS=[
  {ar:'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا',src:'الفرقان: ٧٤'},
  {ar:'رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ وَمِن ذُرِّيَّتِي رَبَّنَا وَتَقَبَّلْ دُعَاءِ',src:'إبراهيم: ٤٠'},
  {ar:'رَبِّ أَوْزِعْنِي أَنْ أَشْكُرَ نِعْمَتَكَ الَّتِي أَنْعَمْتَ عَلَيَّ وَعَلَى وَالِدَيَّ وَأَنْ أَعْمَلَ صَالِحًا تَرْضَاهُ وَأَصْلِحْ لِي فِي ذُرِّيَّتِي',src:'الأحقاف: ١٥'},
  {ar:'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',src:'البقرة: ٢٠١'},
  {ar:'رَبِّ هَبْ لِي مِن لَّدُنكَ ذُرِّيَّةً طَيِّبَةً إِنَّكَ سَمِيعُ الدُّعَاءِ',src:'آل عمران: ٣٨'}
];
function openDuaModal(){
  document.getElementById('dua-modal').classList.add('show');
  const body=document.getElementById('dua-modal-body');
  body.innerHTML=DUAS.map(d=>`<div style="margin-bottom:1rem;padding:1rem;background:var(--bg2);border-radius:var(--r-s);border-right:3px solid var(--gold)">
    <p style="font-family:var(--font-cal);font-size:1.05rem;color:var(--gold-l);line-height:2;margin-bottom:.3rem">${d.ar}</p>
    <p style="font-size:.72rem;color:var(--text3)">${d.src}</p></div>`).join('');
}
function closeDuaModal(){document.getElementById('dua-modal').classList.remove('show')}

/* ═══ HELP PANEL ═══ */
function toggleHelp(){
  const o=document.getElementById('help-overlay');
  const show=!o.classList.contains('show');
  o.classList.toggle('show');
  if(show)renderHelp();
}
function renderHelp(){
  const t=L[lang];
  const h=t.help||HELP_DATA[lang]||HELP_DATA.en;
  { const _e=document.getElementById('help-title'); if(_e) _e.textContent=h.title; }
  (document.getElementById('help-body')||{}).innerHTML=h.sections.map(s=>
    `<div class="help-section"><h4>${s.icon} ${s.title}</h4>${s.html}</div>`
  ).join('')+`<div class="help-dua">${h.dua}</div>`;
}

const HELP_DATA={
ar:{
  title:'❓ حول التطبيق',
  dua:'اللهم أصلح لنا ذرياتنا واجعلهم قرة أعين لنا 🤲',
  sections:[
    {icon:'⚠️',title:'تنبيه مهم',html:'<p><strong>أنا لست عالماً ولا شيخاً ولا طالب علم شرعي.</strong> هذا مجرد جهد بسيط من أب مسلم بحث في الإنترنت عن محتوى تربوي إسلامي تفاعلي يناسبه ولم يجد ما يرضيه، فقرر أن يصنعه بنفسه.</p><p>المحتوى مستخلص من كتاب الشيخ عبد الله ناصح علوان ومن مصادر إسلامية موثوقة، لكنه <strong>ليس فتوى ولا مرجعاً شرعياً</strong>. أرجو مراجعة أهل العلم في أي مسألة فقهية.</p>'},
    {icon:'📚',title:'المصادر والمراجع',html:'<ul><li><strong>كتاب «تربية الأولاد في الإسلام»</strong> — عبد الله ناصح علوان (مجلدان، ١٠٢٤ صفحة)</li><li>القرآن الكريم — صحيح البخاري — صحيح مسلم</li><li><a href="https://www.islamweb.net" target="_blank">إسلام ويب</a> — فتاوى ومقالات التربية</li><li><a href="https://binbaz.org.sa" target="_blank">موقع الشيخ ابن باز</a></li><li><a href="https://nabulsi.com" target="_blank">موسوعة النابلسي</a></li><li><a href="https://ar.islamway.net" target="_blank">طريق الإسلام</a></li><li><a href="https://shamela.ws" target="_blank">المكتبة الشاملة</a></li></ul>'},
    {icon:'✨',title:'ميزات التطبيق',html:'<ul><li>📖 المسؤوليات السبع مشروحة بالتفصيل</li><li>🛠️ وسائل التربية الخمس</li><li>🤔 سيناريوهات أخلاقية تفاعلية</li><li>📊 تقييم ذاتي يومي محفوظ</li><li>👶 المنهج حسب العمر (٠–١٤)</li><li>💡 حلول لمشاكل تربوية شائعة</li><li>🌙 ثلاثة أنماط — ثلاث لغات</li></ul>'},
    {icon:'🤝',title:'المشاركة والمساهمة',html:'<p>هذا مشروع مفتوح وأرحب بأي مساهمة:</p><ul><li>🐛 <a href="https://github.com/abourdim/dalil-almurabi/issues" target="_blank">الإبلاغ عن مشكلة على GitHub</a></li><li>📧 <a href="mailto:abdelhak.bourdim@gmail.com">abdelhak.bourdim@gmail.com</a></li><li>🔀 <a href="https://github.com/abourdim/dalil-almurabi" target="_blank">Fork & Pull Request على GitHub</a></li></ul><p>أي ملاحظة — خطأ تقني، خطأ شرعي، اقتراح — أرسلها ولا تتردد.</p>'},
    {icon:'🤖',title:'إعادة البناء بالذكاء الاصطناعي',html:'<p>هذا التطبيق بُني بالكامل باستخدام الذكاء الاصطناعي. إذا أردت إعادة بنائه أو تخصيصه:</p><ul><li>ابحث عن ملخص تفصيلي لكتاب «تربية الأولاد في الإسلام»</li><li>استخرج: ٣ أقسام، ٧ مسؤوليات، ٥ وسائل، مراحل العمر</li><li>اطلب: HTML + CSS + JS نقي، ثلاث لغات، بدون إطار عمل</li><li>التفاصيل الكاملة في <a href="https://github.com/abourdim/dalil-almurabi#-لمن-يريد-إعادة-بناء-التطبيق-بالذكاء-الاصطناعي--rebuild-with-ai" target="_blank">README.md على GitHub</a></li></ul>'}
  ]
},
en:{
  title:'❓ About this App',
  dua:'O Allah, make our children righteous and a comfort to our eyes 🤲',
  sections:[
    {icon:'⚠️',title:'Important Disclaimer',html:'<p><strong>I am not a scholar, not a sheikh, not even a student of Islamic sciences.</strong> This is simply a humble effort from a Muslim parent who searched the internet for interactive Islamic parenting content and couldn\'t find what he was looking for — so he decided to build it himself.</p><p>The content is derived from Sheikh Abdullah Nasih Ulwan\'s book and from trusted Islamic sources, but it is <strong>not a fatwa and not a religious authority</strong>. Please consult qualified scholars for any fiqh-related questions.</p>'},
    {icon:'📚',title:'Sources & References',html:'<ul><li><strong>"Raising Children in Islam"</strong> — Abdullah Nasih Ulwan (2 volumes, 1,024 pages)</li><li>Holy Quran — Sahih Bukhari — Sahih Muslim</li><li><a href="https://www.islamweb.net" target="_blank">IslamWeb</a> — Fatwas & articles</li><li><a href="https://binbaz.org.sa" target="_blank">Sheikh Ibn Baz</a></li><li><a href="https://nabulsi.com" target="_blank">Nabulsi Encyclopedia</a></li><li><a href="https://ar.islamway.net" target="_blank">Islamway</a></li><li><a href="https://shamela.ws" target="_blank">Shamela Library</a></li></ul>'},
    {icon:'✨',title:'Features',html:'<ul><li>📖 7 Responsibilities explained in detail</li><li>🛠️ 5 Educational Methods</li><li>🤔 Interactive moral scenario quizzes</li><li>📊 Daily self-assessment with local save</li><li>👶 Age-based curriculum (0–14)</li><li>💡 Solutions for common parenting challenges</li><li>🌙 3 themes — 3 languages</li></ul>'},
    {icon:'🤝',title:'Contributing',html:'<p>This is an open project and I welcome any contribution:</p><ul><li>🐛 <a href="https://github.com/abourdim/dalil-almurabi/issues" target="_blank">Report an issue on GitHub</a></li><li>📧 <a href="mailto:abdelhak.bourdim@gmail.com">abdelhak.bourdim@gmail.com</a></li><li>🔀 <a href="https://github.com/abourdim/dalil-almurabi" target="_blank">Fork & Pull Request on GitHub</a></li></ul><p>Any feedback — technical bug, religious correction, suggestion — don\'t hesitate.</p>'},
    {icon:'🤖',title:'Rebuild with AI',html:'<p>This app was built entirely using الذكاء الاصطناعي. If you want to rebuild or customize it:</p><ul><li>Search for a detailed summary of "Raising Children in Islam"</li><li>Extract: 3 sections, 7 responsibilities, 5 methods, age stages</li><li>Request: pure HTML + CSS + JS, trilingual, no framework</li><li>Full details in <a href="https://github.com/abourdim/dalil-almurabi#-لمن-يريد-إعادة-بناء-التطبيق-بالذكاء-الاصطناعي--rebuild-with-ai" target="_blank">README.md on GitHub</a></li></ul>'}
  ]
},
fr:{
  title:'❓ À propos',
  dua:'Ô Allah, accorde-nous une descendance pieuse, prunelle de nos yeux 🤲',
  sections:[
    {icon:'⚠️',title:'Avertissement important',html:'<p><strong>Je ne suis ni savant, ni cheikh, ni étudiant en sciences islamiques.</strong> C\'est simplement un modeste effort d\'un père musulman qui a cherché sur internet du contenu éducatif islamique interactif et n\'a pas trouvé ce qui lui convenait — alors il a décidé de le créer lui-même.</p><p>Le contenu est tiré du livre du Cheikh Abdullah Nasih Ulwan et de sources islamiques fiables, mais <strong>ce n\'est ni une fatwa ni une référence religieuse</strong>. Veuillez consulter les savants compétents pour toute question de fiqh.</p>'},
    {icon:'📚',title:'Sources et références',html:'<ul><li><strong>« Éduquer les enfants en Islam »</strong> — Abdullah Nasih Ulwan (2 tomes, 1024 pages)</li><li>Saint Coran — Sahih Bukhari — Sahih Muslim</li><li><a href="https://www.islamweb.net" target="_blank">IslamWeb</a> — Fatwas et articles</li><li><a href="https://binbaz.org.sa" target="_blank">Cheikh Ibn Baz</a></li><li><a href="https://nabulsi.com" target="_blank">Encyclopédie Nabulsi</a></li><li><a href="https://ar.islamway.net" target="_blank">Islamway</a></li><li><a href="https://shamela.ws" target="_blank">Bibliothèque Shamela</a></li></ul>'},
    {icon:'✨',title:'Fonctionnalités',html:'<ul><li>📖 7 Responsabilités expliquées en détail</li><li>🛠️ 5 Méthodes éducatives</li><li>🤔 Quiz de scénarios moraux interactifs</li><li>📊 Auto-évaluation quotidienne sauvegardée</li><li>👶 Programme par âge (0–14)</li><li>💡 Solutions aux défis éducatifs courants</li><li>🌙 3 thèmes — 3 langues</li></ul>'},
    {icon:'🤝',title:'Contribuer',html:'<p>Ce projet est ouvert et j\'accueille toute contribution :</p><ul><li>🐛 <a href="https://github.com/abourdim/dalil-almurabi/issues" target="_blank">Signaler un problème sur GitHub</a></li><li>📧 <a href="mailto:abdelhak.bourdim@gmail.com">abdelhak.bourdim@gmail.com</a></li><li>🔀 <a href="https://github.com/abourdim/dalil-almurabi" target="_blank">Fork & Pull Request sur GitHub</a></li></ul><p>Tout retour — bug technique, correction religieuse, suggestion — n\'hésitez pas.</p>'},
    {icon:'🤖',title:'Reconstruire avec l\'IA',html:'<p>Cette application a été entièrement construite avec الذكاء الاصطناعي. Pour la reconstruire :</p><ul><li>Cherchez un résumé détaillé du livre « Éduquer les enfants en Islam »</li><li>Extraire : 3 sections, 7 responsabilités, 5 méthodes, tranches d\'âge</li><li>Demander : HTML + CSS + JS pur, trilingue, sans framework</li><li>Détails complets dans le <a href="https://github.com/abourdim/dalil-almurabi#-لمن-يريد-إعادة-بناء-التطبيق-بالذكاء-الاصطناعي--rebuild-with-ai" target="_blank">README.md sur GitHub</a></li></ul>'}
  ]
}
};

/* ═══ SHARE ═══ */
function shareApp(){
  const t=L[lang];
  if(navigator.share){
    navigator.share({title:t.title,text:t.heroS,url:location.href}).catch(()=>{});
  }else{
    navigator.clipboard.writeText(location.href).then(()=>showToast('📋 Link copied!')).catch(()=>{});
  }
}

/* ═══ TRANSLATIONS — FULL CONTENT ═══ */
const L={
ar:{
  dir:'rtl',title:'تربية الأولاد',
  bis:'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
  heroT:'تربية الأولاد',heroS:'منصة تعليمية شاملة مستلهمة من كتاب الشيخ عبد الله ناصح علوان',
  heroA:'تأليف: الشيخ عبد الله ناصح علوان رحمه الله (١٩٢٨–١٩٨٧)',
  splashVerse:'﴿ وَالَّذِينَ يَقُولُونَ رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ ﴾',
  sacredVerse:'﴿ وَالَّذِينَ يَقُولُونَ رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا ﴾',
  tabs:['🏠','📖','🛠️','🤔','📊','👶','💡','📿','🌟','🎯','💬','🏅','📚'],
  tabL:['الرئيسية','الدروس','الوسائل','سيناريوهات','تقييم','مراحل','حلول','أحاديث','حقوق','أهداف','أقوال','روتين','الكتاب'],
  tabK:['home','lessons','methods','scenarios','assess','roadmap','solver','hadiths','rights','goals','quotes','routine','about'],
  duaTitle:'🤲 أدعية للأولاد',
  aboutAT:'📖 المؤلف',aboutA:'الشيخ عبد الله ناصح علوان (١٩٢٨–١٩٨٧) عالم ومربٍّ سوري من حلب. درس في الأزهر وحصل على الدكتوراه. رائد التأليف المنهجي في تربية الأولاد في الإسلام. ألّف أكثر من ٥٠ كتاباً.',
  aboutBT:'📚 الكتاب',aboutB:'موسوعة تربوية في مجلدين (١٠٢٤ صفحة) تعالج تربية الأولاد من الولادة حتى الزواج وفق الكتاب والسنة.',
  aboutST:'📋 هيكل الكتاب',aboutS:'<strong>القسم الأول:</strong> الزواج المثالي — أحكام المولود — أسباب الانحراف.<br><strong>القسم الثاني:</strong> المسؤوليات السبع: الإيمانية، الخلقية، الجسمية، العقلية، النفسية، الاجتماعية، الجنسية.<br><strong>القسم الثالث:</strong> وسائل التربية — القواعد الأساسية.',
  vols:'مجلدين',pgs:'صفحة',eds:'طبعة',
  lessonsT:'الدروس — المسؤوليات السبع',lessonsD:'كل مسؤولية مشروحة بالتفصيل',
  lessons:[
    {n:'١',t:'التربية الإيمانية',sub:'ربط الطفل بالله',p:'ربط الطفل بأصول الإيمان وأركان الإسلام منذ صغره.',d:'تلقين «لا إله إلا الله» — تعليم أركان الإيمان — تعويد على الصلاة في سن ٧ — تحبيب القرآن — ربط بالمسجد — تعريف بسيرة النبي ﷺ والصحابة.'},
    {n:'٢',t:'التربية الخُلقية',sub:'غرس الفضائل',p:'غرس الصدق والأمانة والإيثار وصيانة الطفل من الرذائل.',d:'القيم: الصدق — الأمانة — الوفاء — العفة — الرحمة — الشجاعة — الصبر.<br>الحماية من: الكذب — الغش — السرقة — السب. القدوة العملية هي الأساس.'},
    {n:'٣',t:'التربية الجسمية',sub:'بناء الجسم السليم',p:'العناية بالصحة والتغذية والرياضة. المؤمن القوي خير من الضعيف.',d:'التغذية السليمة — النظافة — النوم الكافي — الرياضة. قال عمر: «علموا أولادكم السباحة والرماية وركوب الخيل».'},
    {n:'٤',t:'التربية العقلية',sub:'تنمية الفكر',p:'تكوين فكر الطفل بالعلوم النافعة والثقافة والتأمل.',d:'تعليم العلوم الشرعية — تشجيع القراءة — تنمية الوعي الفكري — التحذير من المحتوى الهدام.'},
    {n:'٥',t:'التربية النفسية',sub:'الشخصية المتوازنة',p:'بناء الشجاعة والثقة ومعالجة الخجل والخوف والحسد.',d:'علاج: الخجل — الخوف — النقص — الحسد — الغضب.<br>المنهج: إشعاره بأهميته — العدل بين الأولاد — إشباع الحب والأمان.'},
    {n:'٦',t:'التربية الاجتماعية',sub:'الاندماج الصالح',p:'تعليم آداب التعامل وحقوق الآخرين والمجتمع.',d:'الاستئذان — السلام — آداب الطعام — احترام الكبير — حق الجار — صلة الرحم — التعاون — التسامح.'},
    {n:'٧',t:'التربية الجنسية',sub:'توعية مناسبة للعمر',p:'توعية شرعية تناسب عمر الطفل حول الحشمة والآداب.',d:'٧–١٠: التفريق في المضاجع — الاستئذان — غض البصر.<br>١٠–١٤: الحلال والحرام — تغيرات الجسم.<br>البلوغ: أحكام الطهارة — التوجيه للزواج.'}
  ],
  methT:'وسائل التربية الخمس',methD:'من الأنفع إلى آخر الحلول',
  meths:[
    {t:'التربية بالقدوة',ar:'القدوة الحسنة',p:'أن يكون المربي نموذجاً عملياً. الطفل يقلد ما يراه. «لقد كان لكم في رسول الله أسوة حسنة».'},
    {t:'التربية بالعادة',ar:'التعويد والتلقين',p:'التعويد بالتكرار حتى يصبح طبيعة. «مروا أولادكم بالصلاة وهم أبناء سبع». التعليم في الصغر كالنقش في الحجر.'},
    {t:'التربية بالموعظة',ar:'النصح والتوجيه',p:'النصح بالقصة والمثل والحوار. مع الاقتصاد لئلا يملّ الطفل. نموذج لقمان: «يا بُنَيَّ أَقِمِ الصَّلَاةَ».'},
    {t:'التربية بالملاحظة',ar:'المتابعة الإيجابية',p:'مراقبة إيجابية في جميع الجوانب. ليست تجسساً بل رعاية. «كلكم راعٍ وكلكم مسؤول عن رعيته».'},
    {t:'التربية بالعقوبة',ar:'آخر العلاج',p:'آخر الوسائل. تتدرج: توجيه ← ملاطفة ← إشارة ← توبيخ ← هجر ← ضرب غير مبرّح. «معاملة الولد باللين هي الأصل».'}
  ],
  scenT:'ماذا تفعل لو...؟',scenD:'مواقف واقعية — اختر الأصح وتعلّم',
  scens:[
    {q:'صديقك يغش في الامتحان. ماذا تفعل؟',opts:['أغش مثله','أنصحه بلطف أن الغش حرام','أبلّغ أمام الجميع','لا أفعل شيئاً'],c:1,fb:'النصيحة بلطف هي المنهج. «الدين النصيحة». بالسر لا بالتشهير.'},
    {q:'أمك تطلب ترتيب غرفتك وأنت تريد اللعب.',opts:['أقول «بعدين»','أطيع فوراً ثم ألعب','أغضب وأصرخ','أتظاهر بأنني لم أسمع'],c:1,fb:'طاعة الوالدين واجبة. «وَوَصَّيْنَا الْإِنسَانَ بِوَالِدَيْهِ حُسْنًا».'},
    {q:'سقط زميلك وتأذّى.',opts:['أضحك','أساعده وأطمئن عليه','أمشي','أنادي ليشاهدوا'],c:1,fb:'«من لا يرحم لا يُرحم». المساعدة والرحمة من أعظم الأخلاق.'},
    {q:'وجدت نقوداً في الشارع.',opts:['آخذها','أعطيها لأبي ونبحث عن صاحبها','أتركها','أشتري حلويات'],c:1,fb:'الأمانة من أعظم القيم. «أدِّ الأمانة إلى من ائتمنك».'},
    {q:'صديقك يسبّ الآخرين.',opts:['أسبّ معه','أنصحه وإن لم يستمع أبتعد','لا أفعل شيئاً','أبلّغ فوراً'],c:1,fb:'النصيحة أولاً ثم الابتعاد. «ليس المؤمن بالطعّان ولا اللعّان».'},
    {q:'أخوك الصغير يبكي ويريد لعبتك.',opts:['أصرخ عليه','أشاركه اللعبة بلطف','آخذها وأختبئ','أكسرها حتى لا يأخذها'],c:1,fb:'المشاركة والرحمة مع الصغير. «ارحموا من في الأرض يرحمكم من في السماء».'},
    {q:'رأيت تنمّراً على زميلك في المدرسة.',opts:['أشاهد فقط','أدافع عنه وأطلب المساعدة','أشارك في التنمر','أهرب'],c:1,fb:'نصرة المظلوم واجب. «انصر أخاك ظالماً أو مظلوماً».'},
    {q:'والدك يطلب منك إغلاق الهاتف والنوم.',opts:['أتجاهله','أطيع فوراً','أختبئ تحت الغطاء','أغضب'],c:1,fb:'طاعة الوالدين في المعروف واجبة. النوم المبكر صحة ونشاط.'},
    {q:'وجدت صديقك حزيناً في المدرسة.',opts:['أتجاهله','أسأله وأحاول مساعدته','أضحك عليه','أخبر الجميع'],c:1,fb:'السؤال والمواساة من أخلاق المسلم. «المؤمن للمؤمن كالبنيان يشد بعضه بعضاً».'},
    {q:'معلمك أخطأ في معلومة.',opts:['أصرخ: أنت غلطان!','أنبهه بأدب بعد الدرس','أسخر منه','لا أفعل شيئاً'],c:1,fb:'تنبيه المعلم بأدب واحترام. «ليس منا من لم يوقر كبيرنا».'}
  ],
  assessT:'تقييم ذاتي يومي',assessD:'راجع سلوكك بصدق',
  assessItems:[
    {em:'🕌',t:'صليت في وقتها',s:'الصلاة عمود الدين'},{em:'📖',t:'قرأت القرآن',s:'خيركم من تعلم القرآن وعلمه'},
    {em:'😇',t:'صدقت ولم أكذب',s:'الصدق يهدي إلى البر'},{em:'👨‍👩‍👧',t:'أطعت والديّ',s:'رضا الله في رضا الوالدين'},
    {em:'🤝',t:'ساعدت محتاجاً',s:'والله في عون العبد ما كان في عون أخيه'},{em:'📚',t:'تعلمت شيئاً جديداً',s:'اطلبوا العلم'},
    {em:'🗣️',t:'تكلمت بالخير فقط',s:'فليقل خيراً أو ليصمت'},{em:'💪',t:'مارست الرياضة',s:'المؤمن القوي خير'},
    {em:'😊',t:'تبسمت وكنت إيجابياً',s:'تبسمك صدقة'},{em:'🌙',t:'نمت مبكراً للفجر',s:'بُورك لأمتي في بكورها'},
    {em:'🤲',t:'دعوت لوالديّ',s:'رب ارحمهما كما ربياني صغيراً'},
    {em:'🧹',t:'ساعدت في ترتيب البيت',s:'المؤمن القوي خير'},
    {em:'📵',t:'قللت وقت الشاشة',s:'وقتك حياتك'},
    {em:'🌳',t:'خرجت للطبيعة',s:'تفكروا في خلق الله'},
    {em:'🫂',t:'عانقت أحد والديّ',s:'برّ الوالدين من أعظم الأعمال'}
  ],today:'اليوم',total:'المجموع',
  roadT:'المنهج حسب العمر',roadD:'ماذا تعلّم طفلك في كل مرحلة',
  road:[
    {age:'٠–٣',lbl:'سنوات',title:'مرحلة الأساس',items:['الأذان في أذنه عند الولادة','تلقين «لا إله إلا الله»','إشباع الحب والأمان','الرضاعة والتغذية','التعويد على النظافة']},
    {age:'٣–٧',lbl:'سنوات',title:'التأسيس',items:['آداب: السلام — البسملة — الأكل باليمين','قصص الأنبياء والصحابة','الحلال والحرام البسيط','تعويد الصدق','اللعب الهادف والرياضة','تهيئة للصلاة']},
    {age:'٧–١٠',lbl:'سنوات',title:'التكليف بالصلاة',items:['أمره بالصلاة عملياً','التفريق في المضاجع','تحفيظ القرآن','آداب الاستئذان','القيم بالممارسة','القراءة والعلم','الرياضة المنتظمة']},
    {age:'١٠–١٤',lbl:'سنة',title:'ما قبل البلوغ',items:['المحافظة على الصلاة بحزم','التوعية بتغيرات البلوغ','أحكام الطهارة','اختيار الأصدقاء','المسؤولية والاستقلالية','مراقبة المحتوى','الحوار المفتوح']}
  ],
  solveT:'حلول تربوية',solveD:'مشكلات شائعة مع حلول من الكتاب',
  solves:[
    {ic:'🤥',t:'طفلي يكذب',p:'مشكلة شائعة',sol:'<strong>الأسباب:</strong> الخوف من العقاب — تقليد الكبار — الخيال.<br><strong>العلاج:</strong> لا تعاقبه على الصدق — كن قدوة — كافئ الحقيقة — فرّق بين الكذب والخيال.'},
    {ic:'😤',t:'طفلي عنيد',p:'يرفض كل شيء',sol:'<strong>الأسباب:</strong> إثبات الذات — كثرة الأوامر — القسوة.<br><strong>العلاج:</strong> قلّل الأوامر — أعطه خيارات — لا صراع قوة — امدح الطاعة.'},
    {ic:'🕌',t:'لا يصلي',p:'يتهرب من الصلاة',sol:'التحبيب لا الإجبار — صلِّ أمامه — اصطحبه للمسجد — لا تصرخ بسبب الصلاة — بعد ١٠: حزم متدرج.'},
    {ic:'📱',t:'مدمن شاشات',p:'ساعات على الأجهزة',sol:'قواعد واضحة — بدائل (رياضة، قراءة) — كن قدوة — راقب المحتوى — أوقات أسرة بلا أجهزة.'},
    {ic:'👊',t:'يضرب الآخرين',p:'عدواني',sol:'لا تضربه لتعلمه عدم الضرب! — علّمه التعبير بالكلام — اعدل بين الأبناء — كافئ الهدوء.'},
    {ic:'😰',t:'خجول جداً',p:'يخاف من الناس',sol:'لا تصفه بالخجول أمام الآخرين — تعريض تدريجي — مدح كل محاولة — رياضة جماعية.'},
    {ic:'🍽️',t:'يرفض الأكل',p:'انتقائي جداً',sol:'<strong>لا تجبره:</strong> قدم خيارات — اجعله يشارك في التحضير — لا حلويات قبل الطعام — الصبر والتكرار.'},
    {ic:'😢',t:'يبكي كثيراً',p:'حساس مفرط',sol:'<strong>لا تقل له "لا تبكِ":</strong> اسمع مشاعره — ساعده يعبر بالكلام — الحضن يهدئ — الأمان النفسي أولاً.'},
    {ic:'🤝',t:'لا أصدقاء',p:'منعزل',sol:'ادعُ أطفالاً للبيت — نشاطات جماعية — مسجد وحلقات — مهارات اجتماعية بالتدريب.'},
    {ic:'📝',t:'لا يذاكر',p:'يكره الدراسة',sol:'<strong>الأسباب:</strong> صعوبة — ملل — خوف من الفشل.<br><strong>العلاج:</strong> بيئة مناسبة — جدول محدد — مكافآت — تعلم باللعب.'}
  ],
  hadithsT:'📿 أحاديث في التربية',hadithsD:'أحاديث نبوية شريفة في تربية الأولاد',
  hadithsList:[
    {text:'مروا أولادكم بالصلاة وهم أبناء سبع سنين واضربوهم عليها وهم أبناء عشر',src:'رواه أبو داود',cat:'الصلاة'},
    {text:'أكرموا أولادكم وأحسنوا أدبهم',src:'رواه ابن ماجه',cat:'الإكرام'},
    {text:'ما نحل والد ولداً من نحل أفضل من أدب حسن',src:'رواه الترمذي',cat:'الأدب'},
    {text:'كلكم راع وكلكم مسؤول عن رعيته',src:'متفق عليه',cat:'المسؤولية'},
    {text:'علموا أولادكم السباحة والرماية وركوب الخيل',src:'أثر عن عمر',cat:'الرياضة'},
    {text:'خيركم خيركم لأهله وأنا خيركم لأهلي',src:'رواه الترمذي',cat:'الأسرة'},
    {text:'رفقاً بالقوارير',src:'رواه البخاري',cat:'البنات'},
    {text:'من عال جاريتين حتى تبلغا جاء يوم القيامة أنا وهو كهاتين',src:'رواه مسلم',cat:'البنات'},
    {text:'ليس منا من لم يرحم صغيرنا ويوقر كبيرنا',src:'رواه الترمذي',cat:'الرحمة'},
    {text:'اللهم إني أعوذ بك من ولد يكون عليّ ربّاً',src:'دعاء مأثور',cat:'الدعاء'}
  ],
  rightsT:'🌟 حقوق الطفل في الإسلام',rightsD:'حقوق كفلها الإسلام للطفل قبل أي ميثاق دولي',
  rightsList:[
    {ic:'💍',t:'اختيار الأم الصالحة',d:'من حق الطفل أن يختار له أبوه أماً صالحة ذات دين وخلق.'},
    {ic:'📛',t:'الاسم الحسن',d:'من حق المولود أن يُسمى اسماً حسناً لا يُسبب له حرجاً.'},
    {ic:'🍼',t:'الرضاعة والنفقة',d:'من حق الطفل الرضاعة حولين كاملين والنفقة الكافية.'},
    {ic:'📚',t:'التعليم',d:'من حق الطفل أن يُعلّم القراءة والكتابة والدين والعلوم النافعة.'},
    {ic:'⚖️',t:'العدل بين الأبناء',d:'من حقه العدل في المعاملة بين الإخوة — في الهدايا والاهتمام والحب.'},
    {ic:'💪',t:'الصحة والرياضة',d:'من حقه العناية بصحته وتغذيته وتشجيعه على الرياضة.'},
    {ic:'🤗',t:'الحب والأمان',d:'من حقه أن يشعر بالحب والأمان والاستقرار النفسي.'},
    {ic:'🗣️',t:'الاستماع والحوار',d:'من حقه أن يُستمع إليه وأن يشارك في الحوار الأسري.'}
  ],
  goalsT:'🎯 أهداف التربية',goalsD:'الأهداف الكبرى للتربية الإسلامية من الكتاب',
  goalsList:[
    {n:'١',t:'عبد صالح',d:'الهدف الأسمى: تكوين إنسان يعبد الله حق العبادة ويعرف رسالته في الحياة.'},
    {n:'٢',t:'شخصية متوازنة',d:'بناء شخصية متوازنة روحياً وعقلياً وجسدياً ونفسياً واجتماعياً.'},
    {n:'٣',t:'مواطن صالح',d:'تكوين فرد ينفع مجتمعه ويساهم في بنائه ويحمل المسؤولية.'},
    {n:'٤',t:'قائد مؤثر',d:'إعداد جيل يقود لا يُقاد — يأمر بالمعروف وينهى عن المنكر.'},
    {n:'٥',t:'حامل رسالة',d:'تربية أبناء يحملون رسالة الإسلام ويبلغونها للعالمين بالقدوة والكلمة.'}
  ],
  quotesT:'💬 أقوال في التربية',quotesD:'حِكم ومقولات تربوية من علماء الإسلام',
  quotesList:[
    {q:'أدّب ابنك صغيراً يسرّك كبيراً',s:'علي بن أبي طالب'},
    {q:'التعليم في الصغر كالنقش في الحجر',s:'مثل عربي'},
    {q:'لاعب ابنك سبعاً وأدّبه سبعاً وصاحبه سبعاً',s:'حكمة تربوية'},
    {q:'إن أولادكم هبة الله لكم فلا تضيعوهم',s:'عبد الله ناصح علوان'},
    {q:'ما ورّث والد ولده شيئاً أفضل من حسن الأدب',s:'الحديث الشريف'},
    {q:'ازرع في طفلك الإيمان قبل أن يزرع فيه الشيطان الشك',s:'ابن القيم'},
    {q:'الأم مدرسة إذا أعددتها أعددت شعباً طيب الأعراق',s:'حافظ إبراهيم'},
    {q:'العصا لمن عصى والحلوى لمن أطاع — لكن الحلوى أولاً',s:'حكمة تربوية'}
  ],
  routineT:'🏅 الروتين اليومي الإسلامي',routineD:'برنامج يومي مقترح للطفل المسلم',
  routineList:[
    {time:'🌅 الفجر',items:['الاستيقاظ لصلاة الفجر','أذكار الصباح','قراءة ورد قرآني']},
    {time:'☀️ الصباح',items:['الإفطار مع البسملة','الذهاب للمدرسة أو التعلم','المذاكرة والتحصيل']},
    {time:'🕐 الظهر',items:['صلاة الظهر','الغداء مع الأسرة','قيلولة قصيرة']},
    {time:'🌤️ العصر',items:['صلاة العصر','الرياضة واللعب','وقت المواهب والهوايات']},
    {time:'🌆 المغرب',items:['صلاة المغرب','حفظ القرآن','وقت الأسرة والحوار']},
    {time:'🌙 العشاء',items:['صلاة العشاء','المراجعة والقراءة','أذكار النوم والنوم مبكراً']}
  ],
  ftrV:'﴿ رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا ﴾',
  ftrC:'📖 تربية الأولاد في الإسلام — للشيخ عبد الله ناصح علوان',
  clickMore:'اضغط للتفصيل ←',
  homeCards:[
    {ic:'📖',t:'الدروس التعليمية',d:'المسؤوليات السبع مشروحة بالتفصيل.',to:'lessons'},
    {ic:'🛠️',t:'وسائل التربية',d:'القدوة، العادة، الموعظة، الملاحظة، العقوبة.',to:'methods'},
    {ic:'🤔',t:'ماذا تفعل لو...؟',d:'مواقف واقعية تربوية مع المنهج الإسلامي.',to:'scenarios'},
    {ic:'📊',t:'تقييم ذاتي',d:'راجع سلوكك بصدق كل يوم.',to:'assess'},
    {ic:'👶',t:'المنهج حسب العمر',d:'من الولادة حتى البلوغ.',to:'roadmap'},
    {ic:'💡',t:'حلول تربوية',d:'الكذب، العناد، ترك الصلاة... مع حلول.',to:'solver'},
    {ic:'📿',t:'أحاديث التربية',d:'أحاديث نبوية في تربية الأولاد.',to:'hadiths'},
    {ic:'🌟',t:'حقوق الطفل',d:'حقوق كفلها الإسلام للطفل.',to:'rights'},
    {ic:'🎯',t:'أهداف التربية',d:'الأهداف الكبرى للتربية الإسلامية.',to:'goals'},
    {ic:'💬',t:'أقوال تربوية',d:'حِكم ومقولات من علماء الإسلام.',to:'quotes'},
    {ic:'🏅',t:'الروتين اليومي',d:'برنامج يومي مقترح للطفل المسلم.',to:'routine'}
  ]
},
en:{
  dir:'ltr',title:'Tarbiyat al-Awlad',
  bis:'In the Name of Allah, the Most Gracious, the Most Merciful',
  heroT:'Tarbiyat al-Awlad',heroS:'A comprehensive educational platform inspired by Sheikh Abdullah Nasih Ulwan\'s book',
  heroA:'By Sheikh Abdullah Nasih Ulwan (1928–1987)',
  splashVerse:'"Our Lord, grant us from our spouses and offspring comfort to our eyes" (25:74)',
  sacredVerse:'"Our Lord, grant us from our spouses and offspring comfort to our eyes, and make us leaders for the righteous." (25:74)',
  tabs:['🏠','📖','🛠️','🤔','📊','👶','💡','📿','🌟','🎯','💬','🏅','📚'],
  tabL:['Home','Lessons','Methods','Scenarios','Assess','Ages','Solver','Hadiths','Rights','Goals','Quotes','Routine','The Book'],
  tabK:['home','lessons','methods','scenarios','assess','roadmap','solver','hadiths','rights','goals','quotes','routine','about'],
  duaTitle:'🤲 Duas for Children',
  aboutAT:'📖 The Author',aboutA:'Sheikh Abdullah Nasih Ulwan (1928–1987), Syrian scholar from Aleppo. Studied at Al-Azhar, earned doctorate. Pioneer of systematic Islamic child-rearing literature. Over 50 books.',
  aboutBT:'📚 The Book',aboutB:'Educational encyclopedia in 2 volumes (1,024 pages), covering child-rearing from birth to marriage based on Quran and Sunnah.',
  aboutST:'📋 Structure',aboutS:'<strong>Section 1:</strong> Ideal marriage — Newborn rulings — Causes of deviation.<br><strong>Section 2:</strong> 7 responsibilities: Faith, Moral, Physical, Intellectual, Psychological, Social, Sexual.<br><strong>Section 3:</strong> Methods — Fundamental rules.',
  vols:'Volumes',pgs:'Pages',eds:'Editions',
  lessonsT:'Lessons — The 7 Responsibilities',lessonsD:'Each responsibility explained with examples',
  lessons:[
    {n:'1',t:'Faith Education',sub:'Connecting child to Allah',p:'Linking the child to pillars of faith and Islam from early age.',d:'Teaching shahada — pillars of faith — prayer at 7 — love of Quran — mosque connection — Prophet\'s ﷺ biography.'},
    {n:'2',t:'Moral Education',sub:'Instilling virtues',p:'Planting honesty, trustworthiness, selflessness, courage.',d:'Core: Truthfulness — Trust — Promises — Mercy — Courage — Patience.<br>Protect from: Lying — Cheating — Stealing. Role modeling is key.'},
    {n:'3',t:'Physical Education',sub:'Healthy body',p:'Health, nutrition, physical strength. "A strong believer is better."',d:'Nutrition — Hygiene — Sleep — Sports. Umar: "Teach swimming, archery, horse riding."'},
    {n:'4',t:'Intellectual Education',sub:'Developing mind',p:'Shaping thinking with beneficial knowledge and contemplation.',d:'Islamic sciences — Reading — Cultural awareness — Warning against destructive content.'},
    {n:'5',t:'Psychological Education',sub:'Balanced personality',p:'Building courage, confidence, treating shyness, fear, jealousy.',d:'Address: Shyness — Fear — Inferiority — Jealousy — Anger.<br>Method: Value them — Be fair — Never humiliate — Fulfill love needs.'},
    {n:'6',t:'Social Education',sub:'Healthy integration',p:'Teaching social etiquette, rights, and community duties.',d:'Permission — Greeting — Table manners — Respecting elders — Neighbor rights — Cooperation — Forgiveness.'},
    {n:'7',t:'Awareness Education',sub:'Age-appropriate',p:'Islamic etiquette regarding modesty, appropriate for age.',d:'7–10: Separate beds — Permission — Lowering gaze.<br>10–14: Halal/haram — Body changes.<br>Puberty: Purification rules — Marriage guidance.'}
  ],
  methT:'The 5 Educational Methods',methD:'Ranked from most effective to last resort',
  meths:[
    {t:'By Example',ar:'التربية بالقدوة',p:'Be a practical model. Children imitate what they see. "In the Messenger of Allah you have an excellent pattern."'},
    {t:'By Habit',ar:'التربية بالعادة',p:'Training through repetition until second nature. "Teach prayer at age 7." Teaching in youth = carving in stone.'},
    {t:'By Gentle Advice',ar:'التربية بالموعظة',p:'Stories, examples, dialogue. Without excess. Luqman\'s model: "O my son, establish prayer."'},
    {t:'By Observation',ar:'التربية بالملاحظة',p:'Positive monitoring in all aspects. Not spying — caring. "Each of you is a shepherd."'},
    {t:'By Discipline',ar:'التربية بالعقوبة',p:'Last resort. Gradual: guidance → kindness → indication → reprimand. "Gentleness with the child is the default."'}
  ],
  scenT:'What Would You Do?',scenD:'Real moral scenarios — choose right and learn',
  scens:[
    {q:'Your friend is cheating on an exam.',opts:['Cheat too','Advise them gently','Report publicly','Do nothing'],c:1,fb:'Gentle advice is the way. "Religion is sincere advice." Privately, not publicly.'},
    {q:'Mom asks you to clean but you want to play.',opts:['Say "later"','Obey immediately, then play','Get angry','Pretend not to hear'],c:1,fb:'Obeying parents is obligatory. "We have enjoined upon man goodness to his parents."'},
    {q:'Your classmate falls and gets hurt.',opts:['Laugh','Help and check on them','Walk away','Call others to watch'],c:1,fb:'"Whoever shows no mercy will be shown no mercy." Helping is among greatest virtues.'},
    {q:'You find money on the street.',opts:['Take it','Give to parents, search for owner','Leave it','Buy sweets'],c:1,fb:'Trustworthiness is paramount. "Return the trust to who entrusted you."'},
    {q:'Your friend curses others.',opts:['Curse with them','Advise, if refused distance yourself','Nothing','Report immediately'],c:1,fb:'Advise first, then distance. "A believer is not one who taunts or curses."'},
    {q:'Your little sibling is crying and wants your toy.',opts:['Yell at them','Share the toy kindly','Hide with it','Break it so they can\'t have it'],c:1,fb:'Sharing and mercy with the young. "Show mercy to those on earth and the One in heaven will show mercy to you."'},
    {q:'You see someone being bullied at school.',opts:['Just watch','Defend them and get help','Join the bullying','Run away'],c:1,fb:'Supporting the oppressed is a duty. "Help your brother whether oppressor or oppressed."'},
    {q:'Your father tells you to turn off your phone and sleep.',opts:['Ignore him','Obey right away','Hide under the blanket','Get angry'],c:1,fb:'Obeying parents in good is obligatory. Early sleep means health and energy.'},
    {q:'You find your friend sad at school.',opts:['Ignore them','Ask and try to help','Laugh at them','Tell everyone'],c:1,fb:'Asking and consoling is Islamic character. "A believer is to another like a building, each part supports the other."'},
    {q:'Your teacher makes a factual mistake.',opts:['Shout: You are wrong!','Politely mention it after class','Mock them','Do nothing'],c:1,fb:'Correcting the teacher with manners and respect. "Not one of us who does not respect our elders."'}
  ],
  assessT:'Daily Self-Assessment',assessD:'Honestly review your behavior',
  assessItems:[
    {em:'🕌',t:'Prayed on time',s:'Prayer is the pillar'},{em:'📖',t:'Read Quran',s:'Best are those who learn Quran'},
    {em:'😇',t:'Was truthful',s:'Truthfulness leads to righteousness'},{em:'👨‍👩‍👧',t:'Obeyed parents',s:'Allah\'s pleasure in parents\' pleasure'},
    {em:'🤝',t:'Helped someone',s:'Allah helps who helps others'},{em:'📚',t:'Learned something new',s:'Seek knowledge'},
    {em:'🗣️',t:'Spoke only good',s:'Speak good or remain silent'},{em:'💪',t:'Exercised',s:'Strong believer is better'},
    {em:'😊',t:'Smiled & was positive',s:'Your smile is charity'},{em:'🌙',t:'Slept early for Fajr',s:'Blessed in early mornings'},
    {em:'🤲',t:'Made dua for parents',s:'My Lord, have mercy as they raised me'},
    {em:'🧹',t:'Helped tidy the house',s:'A strong believer is better'},
    {em:'📵',t:'Reduced screen time',s:'Your time is your life'},
    {em:'🌳',t:'Went outside to nature',s:'Reflect on Allah\'s creation'},
    {em:'🫂',t:'Hugged a parent',s:'Honoring parents is among the greatest deeds'}
  ],today:'Today',total:'Total',
  roadT:'Age-Based Curriculum',roadD:'What to teach at each stage',
  road:[
    {age:'0–3',lbl:'years',title:'Foundation',items:['Adhan at birth','Teach shahada as first words','Fulfill love & security needs','Breastfeeding & nutrition','Establish cleanliness']},
    {age:'3–7',lbl:'years',title:'Building',items:['Manners: greeting, bismillah, right hand','Prophet stories','Simple halal/haram','Reward truthfulness','Purposeful play & sports','Prepare for prayer']},
    {age:'7–10',lbl:'years',title:'Prayer Stage',items:['Command prayer practically','Separate beds','Quran memorization','Permission etiquette','Values through practice','Reading & learning','Regular sports']},
    {age:'10–14',lbl:'years',title:'Pre-Puberty',items:['Firm prayer follow-up','Puberty awareness','Purification rules','Guide friend choices','Build responsibility','Monitor media','Open dialogue']}
  ],
  solveT:'Problem Solver',solveD:'Common challenges with book solutions',
  solves:[
    {ic:'🤥',t:'Child lies',p:'Common worry',sol:'<strong>Causes:</strong> Fear of punishment — Imitating adults — Imagination.<br><strong>Fix:</strong> Never punish truth — Model honesty — Reward truth — Distinguish lies vs imagination.'},
    {ic:'😤',t:'Very stubborn',p:'Refuses everything',sol:'<strong>Causes:</strong> Self-assertion — Too many orders — Harshness.<br><strong>Fix:</strong> Fewer orders — Give choices — No power struggles — Praise obedience.'},
    {ic:'🕌',t:'Won\'t pray',p:'Avoids prayer',sol:'Encourage, don\'t force — Pray in front of them — Take to mosque — Never yell about prayer — After 10: gradual firmness.'},
    {ic:'📱',t:'Screen addiction',p:'Hours on devices',sol:'Clear rules — Alternatives (sports, reading) — Be a model — Monitor content — Device-free family time.'},
    {ic:'👊',t:'Hits others',p:'Aggressive',sol:'Don\'t hit to teach not hitting! — Teach verbal expression — Be fair — Reward calm behavior.'},
    {ic:'😰',t:'Very shy',p:'Afraid of people',sol:'Don\'t label "shy" publicly — Gradual exposure — Praise attempts — Team sports.'},
    {ic:'🍽️',t:'Picky eater',p:'Refuses food',sol:'<strong>Don\'t force:</strong> Offer choices — Let them help cook — No sweets before meals — Patience and repetition.'},
    {ic:'😢',t:'Cries a lot',p:'Overly sensitive',sol:'<strong>Don\'t say "stop crying":</strong> Listen to feelings — Help express with words — Hugs calm — Emotional safety first.'},
    {ic:'🤝',t:'No friends',p:'Isolated',sol:'Invite kids over — Group activities — Mosque circles — Social skills through practice.'},
    {ic:'📝',t:'Won\'t study',p:'Hates school',sol:'<strong>Causes:</strong> Difficulty — Boredom — Fear of failure.<br><strong>Fix:</strong> Good environment — Set schedule — Rewards — Learn through play.'}
  ],
  hadithsT:'📿 Parenting Hadiths',hadithsD:'Prophetic traditions on raising children',
  hadithsList:[
    {text:'Command your children to pray at seven and discipline them for it at ten',src:'Abu Dawud',cat:'Prayer'},
    {text:'Honor your children and perfect their upbringing',src:'Ibn Majah',cat:'Honor'},
    {text:'The best gift a parent can give their child is good manners',src:'Tirmidhi',cat:'Manners'},
    {text:'Each of you is a shepherd and responsible for their flock',src:'Agreed upon',cat:'Responsibility'},
    {text:'Teach your children swimming, archery, and horse riding',src:'Umar tradition',cat:'Sports'},
    {text:'The best of you are those who are best to their families',src:'Tirmidhi',cat:'Family'},
    {text:'Be gentle with these fragile vessels',src:'Bukhari',cat:'Girls'},
    {text:'Whoever raises two daughters well will come with me on the Day of Judgment like this',src:'Muslim',cat:'Girls'},
    {text:'He is not one of us who does not show mercy to our young',src:'Tirmidhi',cat:'Mercy'},
    {text:'O Allah, I seek refuge in You from a child who becomes a burden',src:'Traditional dua',cat:'Dua'}
  ],
  rightsT:'🌟 Children\'s Rights in Islam',rightsD:'Rights Islam guaranteed children before any international charter',
  rightsList:[
    {ic:'💍',t:'Choosing a righteous mother',d:'A child has the right to a father who chooses a righteous mother of good faith and character.'},
    {ic:'📛',t:'A good name',d:'A newborn has the right to be given a beautiful name that causes no embarrassment.'},
    {ic:'🍼',t:'Nursing and provision',d:'A child has the right to two full years of nursing and adequate provision.'},
    {ic:'📚',t:'Education',d:'A child has the right to learn reading, writing, religion, and beneficial sciences.'},
    {ic:'⚖️',t:'Justice among siblings',d:'A child has the right to fair treatment among siblings — in gifts, attention, and love.'},
    {ic:'💪',t:'Health and sports',d:'A child has the right to health care, nutrition, and encouragement in physical activity.'},
    {ic:'🤗',t:'Love and security',d:'A child has the right to feel love, security, and psychological stability.'},
    {ic:'🗣️',t:'Being heard',d:'A child has the right to be listened to and to participate in family discussions.'}
  ],
  goalsT:'🎯 Goals of Islamic Education',goalsD:'The grand objectives of Islamic child-rearing from the book',
  goalsList:[
    {n:'1',t:'A righteous servant',d:'The supreme goal: forming a person who worships Allah properly and knows their mission in life.'},
    {n:'2',t:'Balanced personality',d:'Building a personality balanced spiritually, intellectually, physically, psychologically, and socially.'},
    {n:'3',t:'Good citizen',d:'Forming an individual who benefits their community, contributes to building it, and carries responsibility.'},
    {n:'4',t:'Influential leader',d:'Preparing a generation that leads, not follows — commanding good and forbidding evil.'},
    {n:'5',t:'Message bearer',d:'Raising children who carry the message of Islam and convey it to the world by example and word.'}
  ],
  quotesT:'💬 Parenting Wisdom',quotesD:'Wise sayings on child-rearing from Islamic scholars',
  quotesList:[
    {q:'Discipline your child when young and they will delight you when grown',s:'Ali ibn Abi Talib'},
    {q:'Teaching in childhood is like engraving in stone',s:'Arabic proverb'},
    {q:'Play with your child for seven, discipline for seven, befriend for seven',s:'Parenting wisdom'},
    {q:'Your children are a gift from Allah — do not waste them',s:'Abdullah Nasih Ulwan'},
    {q:'No parent has left their child anything better than good manners',s:'Prophetic hadith'},
    {q:'Plant faith in your child before Satan plants doubt',s:'Ibn al-Qayyim'},
    {q:'The mother is a school — prepare her well and you prepare a fine nation',s:'Hafiz Ibrahim'},
    {q:'The stick is for the disobedient, sweets for the obedient — but sweets come first',s:'Parenting wisdom'}
  ],
  routineT:'🏅 Daily Islamic Routine',routineD:'A suggested daily program for a Muslim child',
  routineList:[
    {time:'🌅 Fajr',items:['Wake up for Fajr prayer','Morning remembrances','Read Quran portion']},
    {time:'☀️ Morning',items:['Breakfast with Bismillah','School or learning','Study and review']},
    {time:'🕐 Dhuhr',items:['Dhuhr prayer','Lunch with family','Short nap']},
    {time:'🌤️ Asr',items:['Asr prayer','Sports and play','Talents and hobbies time']},
    {time:'🌆 Maghrib',items:['Maghrib prayer','Quran memorization','Family time and dialogue']},
    {time:'🌙 Isha',items:['Isha prayer','Review and reading','Sleep remembrances and early sleep']}
  ],
  ftrV:'"Our Lord, grant us from our spouses and offspring comfort to our eyes and make us leaders for the righteous." (25:74)',
  ftrC:'📖 Tarbiyat al-Awlad — Inspired by "Raising Children in Islam" by Sheikh Abdullah Nasih Ulwan',
  clickMore:'Click for details →',
  homeCards:[
    {ic:'📖',t:'Lessons',d:'The 7 responsibilities explained with Quran & Sunnah examples.',to:'lessons'},
    {ic:'🛠️',t:'Methods',d:'Role modeling, Habit, Advice, Observation, Discipline.',to:'methods'},
    {ic:'🤔',t:'What Would You Do?',d:'Real moral scenarios with Islamic guidance.',to:'scenarios'},
    {ic:'📊',t:'Self-Assessment',d:'Honestly review your daily behavior.',to:'assess'},
    {ic:'👶',t:'Age Curriculum',d:'From birth to puberty — what to teach when.',to:'roadmap'},
    {ic:'💡',t:'Problem Solver',d:'Lying, stubbornness, prayer... with solutions.',to:'solver'},
    {ic:'📿',t:'Parenting Hadiths',d:'Prophetic traditions on raising children.',to:'hadiths'},
    {ic:'🌟',t:'Children\'s Rights',d:'Rights Islam guaranteed to children.',to:'rights'},
    {ic:'🎯',t:'Education Goals',d:'The grand objectives of Islamic child-rearing.',to:'goals'},
    {ic:'💬',t:'Parenting Wisdom',d:'Wise sayings from Islamic scholars.',to:'quotes'},
    {ic:'🏅',t:'Daily Routine',d:'A suggested daily program for Muslim children.',to:'routine'}
  ]
},
fr:{
  dir:'ltr',title:'Tarbiyat al-Awlad',
  bis:'Au nom d\'Allah, le Tout Miséricordieux, le Très Miséricordieux',
  heroT:'Tarbiyat al-Awlad',heroS:'Plateforme éducative inspirée du livre de Cheikh Abdullah Nasih Ulwan',
  heroA:'Par Cheikh Abdullah Nasih Ulwan (1928–1987)',
  splashVerse:'« Seigneur, fais que nos épouses et nos descendants soient la prunelle de nos yeux » (25:74)',
  sacredVerse:'« Seigneur, fais que nos épouses et nos descendants soient la prunelle de nos yeux, et fais de nous un guide pour les pieux. » (25:74)',
  tabs:['🏠','📖','🛠️','🤔','📊','👶','💡','📿','🌟','🎯','💬','🏅','📚'],
  tabL:['Accueil','Lecons','Methodes','Scenarios','Evaluation','Ages','Solutions','Hadiths','Droits','Objectifs','Citations','Routine','Le livre'],
  tabK:['home','lessons','methods','scenarios','assess','roadmap','solver','hadiths','rights','goals','quotes','routine','about'],
  duaTitle:'🤲 Invocations pour les enfants',
  aboutAT:'📖 L\'auteur',aboutA:'Cheikh Abdullah Nasih Ulwan (1928–1987), savant syrien d\'Alep. Diplômé d\'Al-Azhar, docteur. Pionnier de l\'éducation islamique. Plus de 50 ouvrages.',
  aboutBT:'📚 Le livre',aboutB:'Encyclopédie en 2 volumes (1024 pages), de la naissance au mariage selon le Coran et la Sunna.',
  aboutST:'📋 Structure',aboutS:'<strong>Section 1 :</strong> Mariage — Nouveau-né — Causes de déviation.<br><strong>Section 2 :</strong> 7 responsabilités : Foi, Morale, Physique, Intellectuelle, Psychologique, Sociale, Sexuelle.<br><strong>Section 3 :</strong> Méthodes — Règles fondamentales.',
  vols:'Volumes',pgs:'Pages',eds:'Éditions',
  lessonsT:'Leçons — Les 7 responsabilités',lessonsD:'Chaque responsabilité expliquée',
  lessons:[
    {n:'1',t:'Éducation de la foi',sub:'Lier l\'enfant à Allah',p:'Rattacher aux piliers de la foi et de l\'Islam.',d:'Shahada — Piliers de la foi — Prière à 7 ans — Amour du Coran — Mosquée — Biographie du Prophète ﷺ.'},
    {n:'2',t:'Éducation morale',sub:'Inculquer les vertus',p:'Honnêteté, confiance, altruisme, courage.',d:'Valeurs : Vérité — Confiance — Fidélité — Miséricorde — Courage.<br>Protection : Mensonge — Tricherie — Vol. L\'exemple est fondamental.'},
    {n:'3',t:'Éducation physique',sub:'Corps sain',p:'Santé, nutrition, force. « Le croyant fort est meilleur. »',d:'Nutrition — Hygiène — Sommeil — Sport. Umar : « Enseignez natation, tir, équitation. »'},
    {n:'4',t:'Éducation intellectuelle',sub:'Développer l\'esprit',p:'Former la pensée avec des connaissances bénéfiques.',d:'Sciences islamiques — Lecture — Conscience culturelle — Mise en garde : contenu destructeur.'},
    {n:'5',t:'Éducation psychologique',sub:'Personnalité équilibrée',p:'Courage, confiance, traiter timidité et peur.',d:'Traiter : Timidité — Peur — Infériorité — Jalousie.<br>Méthode : Valoriser — Justice entre enfants — Combler le besoin d\'amour.'},
    {n:'6',t:'Éducation sociale',sub:'Intégration saine',p:'Manières sociales, droits d\'autrui, devoirs.',d:'Permission — Salut — Table — Respect aînés — Droits du voisin — Coopération — Pardon.'},
    {n:'7',t:'Éducation à la pudeur',sub:'Sensibilisation adaptée',p:'Pudeur et manières islamiques selon l\'âge.',d:'7–10 : Séparer lits — Permission — Baisser le regard.<br>10–14 : Halal/haram — Changements corporels.<br>Puberté : Purification — Mariage.'}
  ],
  methT:'Les 5 méthodes éducatives',methD:'Classées par efficacité',
  meths:[
    {t:'Par l\'exemple',ar:'التربية بالقدوة',p:'Être un modèle pratique. L\'enfant imite ce qu\'il voit. « Vous avez dans le Messager un excellent modèle. »'},
    {t:'Par l\'habitude',ar:'التربية بالعادة',p:'Répétition jusqu\'à devenir naturel. « Enseignez la prière à 7 ans. » Enseigner dans l\'enfance = graver dans la pierre.'},
    {t:'Par le conseil',ar:'التربية بالموعظة',p:'Histoires, exemples, dialogue. Sans excès. Modèle de Luqman : « Ô mon fils, accomplis la prière. »'},
    {t:'Par l\'observation',ar:'التربية بالملاحظة',p:'Suivi positif dans tous les aspects. Pas d\'espionnage — de l\'attention. « Chacun est berger responsable. »'},
    {t:'Par la discipline',ar:'التربية بالعقوبة',p:'Dernier recours. Progressif : orientation → gentillesse → indication → réprimande. « La douceur est la norme. »'}
  ],
  scenT:'Que ferais-tu si... ?',scenD:'Scénarios moraux — choisissez et apprenez',
  scens:[
    {q:'Ton ami triche à l\'examen.',opts:['Je triche aussi','Je le conseille gentiment','Je dénonce publiquement','Rien'],c:1,fb:'Le conseil gentil est l\'approche. « La religion c\'est le bon conseil. » En privé.'},
    {q:'Ta mère demande de ranger mais tu veux jouer.',opts:['Je dis « plus tard »','J\'obéis puis je joue','Je me fâche','Je fais semblant'],c:1,fb:'Obéir aux parents est obligatoire. « Nous avons recommandé la bienfaisance envers les parents. »'},
    {q:'Ton camarade tombe et se blesse.',opts:['Je ris','Je l\'aide','Je m\'en vais','J\'appelle les autres'],c:1,fb:'« Celui qui ne fait pas miséricorde n\'en recevra pas. »'},
    {q:'Tu trouves de l\'argent sans propriétaire.',opts:['Je le prends','Je le donne à mes parents','Je le laisse','J\'achète des bonbons'],c:1,fb:'L\'honnêteté est fondamentale. « Rends le dépôt à celui qui te l\'a confié. »'},
    {q:'Ton ami insulte les autres.',opts:['J\'insulte avec lui','Je conseille, sinon je m\'eloigne','Rien','Je denonce'],c:1,fb:'Conseiller puis s\'eloigner. « Le croyant n\'est ni diffamateur ni maudisseur. »'},
    {q:'Ton petit frere pleure et veut ton jouet.',opts:['Je crie','Je partage gentiment','Je me cache avec','Je le casse'],c:1,fb:'Partager et etre misericordieux. « Soyez misericordieux envers ceux sur terre. »'},
    {q:'Tu vois quelqu\'un intimider ton camarade.',opts:['Je regarde','Je le defends et demande de l\'aide','Je participe','Je fuis'],c:1,fb:'Soutenir l\'opprime est un devoir. « Aide ton frere oppresseur ou opprime. »'},
    {q:'Ton pere te demande d\'eteindre le telephone et dormir.',opts:['Je l\'ignore','J\'obeis tout de suite','Je me cache sous la couverture','Je me fache'],c:1,fb:'Obeir aux parents dans le bien est obligatoire. Le sommeil precoce est sante et energie.'},
    {q:'Tu trouves ton ami triste a l\'ecole.',opts:['Je l\'ignore','Je demande et essaie d\'aider','Je ris de lui','Je dis a tout le monde'],c:1,fb:'Demander et consoler fait partie du caractere musulman. « Le croyant pour le croyant est comme un edifice. »'},
    {q:'Ton professeur fait une erreur factuelle.',opts:['Je crie : Tu as tort !','Je le signale poliment apres le cours','Je me moque','Rien'],c:1,fb:'Corriger le professeur avec politesse et respect. « N\'est pas des notres celui qui ne respecte pas nos aines. »'}
  ],
  assessT:'Auto-évaluation quotidienne',assessD:'Évaluez honnêtement votre comportement',
  assessItems:[
    {em:'🕌',t:'Prié à l\'heure',s:'La prière est le pilier'},{em:'📖',t:'Lu le Coran',s:'Les meilleurs apprennent le Coran'},
    {em:'😇',t:'Été honnête',s:'La vérité mène à la droiture'},{em:'👨‍👩‍👧',t:'Obéi aux parents',s:'Satisfaction d\'Allah dans celle des parents'},
    {em:'🤝',t:'Aidé quelqu\'un',s:'Allah aide qui aide'},{em:'📚',t:'Appris quelque chose',s:'Cherchez le savoir'},
    {em:'🗣️',t:'Dit du bien uniquement',s:'Dites du bien ou taisez-vous'},{em:'💪',t:'Fait du sport',s:'Le croyant fort est meilleur'},
    {em:'😊',t:'Souri et ete positif',s:'Ton sourire est une charite'},{em:'🌙',t:'Dormi tot pour le Fajr',s:'Benis dans les matinees'},
    {em:'🤲',t:'Invoque pour mes parents',s:'Mon Seigneur, aie pitie comme ils m\'ont eleve'},
    {em:'🧹',t:'Aide a ranger la maison',s:'Le croyant fort est meilleur'},
    {em:'📵',t:'Reduit le temps d\'ecran',s:'Ton temps est ta vie'},
    {em:'🌳',t:'Sorti dans la nature',s:'Reflechissez a la creation d\'Allah'},
    {em:'🫂',t:'Embrasse un parent',s:'Honorer les parents est parmi les plus grands actes'}
  ],today:'Aujourd\'hui',total:'Total',
  roadT:'Programme par âge',roadD:'Que transmettre à chaque étape',
  road:[
    {age:'0–3',lbl:'ans',title:'Fondations',items:['Adhan à la naissance','Shahada comme premiers mots','Amour et sécurité','Allaitement et nutrition','Hygiène']},
    {age:'3–7',lbl:'ans',title:'Construction',items:['Manières : salut, bismillah','Histoires des prophètes','Halal/haram simple','Récompenser l\'honnêteté','Jeux éducatifs','Préparer la prière']},
    {age:'7–10',lbl:'ans',title:'Prière',items:['Ordonner la prière','Séparer les lits','Mémorisation Coran','Permission','Valeurs pratiques','Lecture','Sport régulier']},
    {age:'10–14',lbl:'ans',title:'Pré-puberté',items:['Suivi strict prière','Sensibilisation puberté','Purification','Choix des amis','Responsabilité','Surveiller médias','Dialogue ouvert']}
  ],
  solveT:'Solutions éducatives',solveD:'Défis courants avec solutions du livre',
  solves:[
    {ic:'🤥',t:'Mon enfant ment',p:'Problème courant',sol:'<strong>Causes :</strong> Peur — Imitation — Imagination.<br><strong>Fix :</strong> Ne pas punir la vérité — Modèle — Récompenser — Distinguer mensonge/imagination.'},
    {ic:'😤',t:'Très têtu',p:'Refuse tout',sol:'<strong>Causes :</strong> Affirmation — Trop d\'ordres — Sévérité.<br><strong>Fix :</strong> Moins d\'ordres — Choix — Pas de bras de fer — Louer l\'obéissance.'},
    {ic:'🕌',t:'Ne prie pas',p:'Évite la prière',sol:'Encourager — Prier devant lui — Mosquée — Ne pas crier — Après 10 : fermeté progressive.'},
    {ic:'📱',t:'Addiction écrans',p:'Heures sur appareils',sol:'Règles claires — Alternatives — Modèle — Surveiller — Temps familial sans écrans.'},
    {ic:'👊',t:'Frappe les autres',p:'Agressif',sol:'Ne pas frapper pour enseigner ! — Expression verbale — Justice — Récompenser le calme.'},
    {ic:'😰',t:'Tres timide',p:'Peur des gens',sol:'Ne pas qualifier « timide » — Exposition graduelle — Louer les tentatives — Sports collectifs.'},
    {ic:'🍽️',t:'Difficile a nourrir',p:'Refuse la nourriture',sol:'<strong>Ne forcez pas :</strong> Offrez des choix — Laissez-le aider a cuisiner — Pas de sucreries avant les repas — Patience.'},
    {ic:'😢',t:'Pleure beaucoup',p:'Tres sensible',sol:'<strong>Ne dites pas « arrete de pleurer » :</strong> Ecoutez ses sentiments — Aidez-le a s\'exprimer — Les calins calment — Securite emotionnelle d\'abord.'},
    {ic:'🤝',t:'Pas d\'amis',p:'Isole',sol:'Invitez des enfants — Activites de groupe — Mosquee — Competences sociales par la pratique.'},
    {ic:'📝',t:'Ne veut pas etudier',p:'Deteste l\'ecole',sol:'<strong>Causes :</strong> Difficulte — Ennui — Peur de l\'echec.<br><strong>Fix :</strong> Bon environnement — Horaire fixe — Recompenses — Apprendre en jouant.'}
  ],
  hadithsT:'📿 Hadiths sur l\'education',hadithsD:'Traditions prophetiques sur l\'education des enfants',
  hadithsList:[
    {text:'Ordonnez a vos enfants de prier a sept ans et disciplinez-les a dix',src:'Abu Dawud',cat:'Priere'},
    {text:'Honorez vos enfants et perfectionnez leur education',src:'Ibn Majah',cat:'Honneur'},
    {text:'Le meilleur cadeau d\'un parent est de bonnes manieres',src:'Tirmidhi',cat:'Manieres'},
    {text:'Chacun de vous est un berger responsable de son troupeau',src:'Unanimement reconnu',cat:'Responsabilite'},
    {text:'Enseignez a vos enfants la natation, le tir et l\'equitation',src:'Tradition d\'Umar',cat:'Sport'},
    {text:'Les meilleurs sont les meilleurs envers leurs familles',src:'Tirmidhi',cat:'Famille'},
    {text:'Soyez doux avec ces vases fragiles',src:'Bukhari',cat:'Filles'},
    {text:'Celui qui eleve deux filles viendra le Jour du Jugement comme ceci avec moi',src:'Muslim',cat:'Filles'},
    {text:'N\'est pas des notres celui qui ne montre pas de misericorde aux petits',src:'Tirmidhi',cat:'Misericorde'},
    {text:'O Allah, je me refugie aupres de Toi contre un enfant qui devient un fardeau',src:'Dua traditionnelle',cat:'Dua'}
  ],
  rightsT:'🌟 Droits de l\'enfant en Islam',rightsD:'Droits que l\'Islam a garantis aux enfants',
  rightsList:[
    {ic:'💍',t:'Choisir une mere pieuse',d:'L\'enfant a droit a un pere qui choisit une mere pieuse de bonne foi.'},
    {ic:'📛',t:'Un beau prenom',d:'Le nouveau-ne a droit a un beau prenom qui ne cause pas de gene.'},
    {ic:'🍼',t:'Allaitement et provision',d:'L\'enfant a droit a deux ans d\'allaitement et une provision adequate.'},
    {ic:'📚',t:'Education',d:'L\'enfant a droit a l\'apprentissage de la lecture, l\'ecriture et la religion.'},
    {ic:'⚖️',t:'Justice entre freres',d:'L\'enfant a droit a un traitement equitable entre freres et soeurs.'},
    {ic:'💪',t:'Sante et sport',d:'L\'enfant a droit aux soins de sante et a l\'encouragement sportif.'},
    {ic:'🤗',t:'Amour et securite',d:'L\'enfant a droit a l\'amour, la securite et la stabilite psychologique.'},
    {ic:'🗣️',t:'Etre ecoute',d:'L\'enfant a droit a etre ecoute et a participer aux discussions familiales.'}
  ],
  goalsT:'🎯 Objectifs de l\'education',goalsD:'Les grands objectifs de l\'education islamique',
  goalsList:[
    {n:'1',t:'Un serviteur pieux',d:'L\'objectif supreme : former une personne qui adore Allah correctement.'},
    {n:'2',t:'Personnalite equilibree',d:'Construire une personnalite equilibree spirituellement, intellectuellement et physiquement.'},
    {n:'3',t:'Bon citoyen',d:'Former un individu qui profite a sa communaute et contribue a la construire.'},
    {n:'4',t:'Leader influent',d:'Preparer une generation qui dirige et ordonne le bien et interdit le mal.'},
    {n:'5',t:'Porteur de message',d:'Elever des enfants qui portent le message de l\'Islam par l\'exemple et la parole.'}
  ],
  quotesT:'💬 Sagesse educative',quotesD:'Citations de sagesse des savants de l\'Islam',
  quotesList:[
    {q:'Eduque ton enfant petit et il te rejouira grand',s:'Ali ibn Abi Talib'},
    {q:'L\'enseignement dans l\'enfance est comme la gravure dans la pierre',s:'Proverbe arabe'},
    {q:'Joue avec ton enfant 7 ans, eduque-le 7 ans, sois son ami 7 ans',s:'Sagesse educative'},
    {q:'Vos enfants sont un don d\'Allah — ne les gaspillez pas',s:'Abdullah Nasih Ulwan'},
    {q:'Aucun parent n\'a laisse a son enfant quelque chose de mieux que de bonnes manieres',s:'Hadith prophetique'},
    {q:'Plante la foi dans ton enfant avant que Satan ne plante le doute',s:'Ibn al-Qayyim'},
    {q:'La mere est une ecole — prepare-la bien et tu prepares une nation',s:'Hafiz Ibrahim'},
    {q:'Le baton est pour le desobeissant, les bonbons pour l\'obeissant — mais les bonbons d\'abord',s:'Sagesse educative'}
  ],
  routineT:'🏅 Routine quotidienne islamique',routineD:'Programme quotidien suggere pour l\'enfant musulman',
  routineList:[
    {time:'🌅 Fajr',items:['Se lever pour la priere du Fajr','Invocations du matin','Lire une portion du Coran']},
    {time:'☀️ Matin',items:['Petit dejeuner avec Bismillah','Ecole ou apprentissage','Etude et revision']},
    {time:'🕐 Dhuhr',items:['Priere du Dhuhr','Dejeuner en famille','Courte sieste']},
    {time:'🌤️ Asr',items:['Priere d\'Asr','Sport et jeux','Temps pour les talents et loisirs']},
    {time:'🌆 Maghrib',items:['Priere du Maghrib','Memorisation du Coran','Temps en famille et dialogue']},
    {time:'🌙 Isha',items:['Priere d\'Isha','Revision et lecture','Invocations du sommeil et coucher tot']}
  ],
  ftrV:'« Seigneur, fais que nos epouses et nos descendants soient la prunelle de nos yeux. » (25:74)',
  ftrC:'📖 Tarbiyat al-Awlad — Inspire du livre « Eduquer les enfants en Islam »',
  clickMore:'Cliquez pour details →',
  homeCards:[
    {ic:'📖',t:'Lecons',d:'Les 7 responsabilites avec exemples du Coran et Sunna.',to:'lessons'},
    {ic:'🛠️',t:'Methodes',d:'Exemple, Habitude, Conseil, Observation, Discipline.',to:'methods'},
    {ic:'🤔',t:'Que ferais-tu ?',d:'Scenarios moraux avec guidance islamique.',to:'scenarios'},
    {ic:'📊',t:'Auto-evaluation',d:'Evaluez votre comportement quotidien.',to:'assess'},
    {ic:'👶',t:'Parcours par age',d:'De la naissance a la puberte.',to:'roadmap'},
    {ic:'💡',t:'Solutions',d:'Mensonge, entetement, priere... avec solutions.',to:'solver'},
    {ic:'📿',t:'Hadiths',d:'Traditions prophetiques sur l\'education.',to:'hadiths'},
    {ic:'🌟',t:'Droits de l\'enfant',d:'Droits garantis par l\'Islam aux enfants.',to:'rights'},
    {ic:'🎯',t:'Objectifs',d:'Les grands objectifs de l\'education islamique.',to:'goals'},
    {ic:'💬',t:'Sagesse',d:'Citations de sagesse des savants de l\'Islam.',to:'quotes'},
    {ic:'🏅',t:'Routine quotidienne',d:'Programme quotidien pour l\'enfant musulman.',to:'routine'}
  ]
}
};

/* ═══ STATE ═══ */
let lang='ar',sec='about',scenState={},assessState={};

/* ═══ INIT ═══ */
document.addEventListener('DOMContentLoaded', () => {
  // Load saved state
  loadAssess();
  loadTheme();

  // Set default language and section
  setLang('ar');
  go('about');

  // Initialize interactive features
  initSplash();
  initScroll();

  // Language switcher buttons
  document.querySelectorAll('.lang-opt').forEach(b => {
    b.onclick = () => {
      setLang(b.dataset.l);
      playSound('click');
    };
  });

  // Logo click goes home
  document.getElementById('logo').onclick = () => go('home');

  // Theme toggle
  document.getElementById('theme-toggle').onclick = cycleTheme;

  // Dua modal button
  document.getElementById('fab-dua').onclick = openDuaModal;
});

/* ═══ LANGUAGE ═══ */
function setLang(l){
  lang = l;
  const t = L[l];
  document.body.className = t.dir === 'rtl' ? 'rtl' : '';
  document.documentElement.lang = l;
  document.documentElement.dir = t.dir;
  document.querySelectorAll('.lang-opt').forEach(b => {
    b.classList.toggle('on', b.dataset.l === l);
  });
  { const _e=document.getElementById('logo-text'); if(_e) _e.textContent=t.title; }
  { const _e=document.getElementById('splash-title'); if(_e) _e.textContent=t.title; }
  { const _e=document.getElementById('dua-modal-title'); if(_e) _e.textContent=t.duaTitle; }

  // Build bottom tabs
  (document.getElementById('btabs')||{}).innerHTML= t.tabs.map((ic, i) => `
    <button class="btab${t.tabK[i] === sec ? ' on' : ''}"
      onclick="go('${t.tabK[i]}');playSound('click')">
      <span class="bi">${ic}</span>${t.tabL[i]}
    </button>`
  ).join('');

  // Render all sections
  rHome(t);
  rAbout(t);
  rLessons(t);
  rMethods(t);
  rScenarios(t);
  rAssess(t);
  rRoad(t);
  rSolver(t);
  rHadiths(t);
  rRights(t);
  rGoals(t);
  rQuotes(t);
  rRoutine(t);
  updTabs();
}

/* ═══ NAVIGATION ═══ */
function go(id){
  sec = id;
  document.querySelectorAll('.sec').forEach(s => s.classList.remove('on'));
  const el = document.getElementById('s-' + id);
  if (el) el.classList.add('on');
  updTabs();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updTabs(){
  document.querySelectorAll('.btab').forEach((b, i) => {
    const t = L[lang];
    b.classList.toggle('on', t.tabK[i] === sec);
  });
}

/* ═══ RENDERERS ═══ */

function rHome(t){
  (document.getElementById('s-home')||{}).innerHTML=`
    <div class="g3">
      ${t.homeCards.map(c=>`
        <div class="card" style="cursor:pointer" onclick="go('${c.to}');playSound('click')">
          <div style="font-size:1.8rem;margin-bottom:.5rem">${c.ic}</div>
          <h3>${c.t}</h3>
          <p>${c.d}</p>
        </div>`).join('')}
    </div>`;
}

function rAbout(t){
  (document.getElementById('s-about')||{}).innerHTML=`
    <div class="sh">
      <h2>${t.aboutBT}</h2>
      <div class="divl"></div>
    </div>
    <div class="g2">
      <div class="card">
        <h3>${t.aboutAT}</h3>
        <p>${t.aboutA}</p>
      </div>
      <div class="card">
        <h3>${t.aboutBT}</h3>
        <p>${t.aboutB}</p>
        <div class="stats-row">
          <div class="stat-box"><div class="n">2</div><div class="l">${t.vols}</div></div>
          <div class="stat-box"><div class="n">1024</div><div class="l">${t.pgs}</div></div>
          <div class="stat-box"><div class="n">21+</div><div class="l">${t.eds}</div></div>
        </div>
      </div>
    </div>
    <div class="card" style="margin-top:1rem">
      <h3>${t.aboutST}</h3>
      <p>${t.aboutS}</p>
    </div>`;
}

function rLessons(t){
  (document.getElementById('s-lessons')||{}).innerHTML=`
    <div class="sh">
      <h2>${t.lessonsT}</h2>
      <div class="divl"></div>
      <p>${t.lessonsD}</p>
    </div>
    <div class="g2">
      ${t.lessons.map(l=>`
        <div class="lcard" onclick="this.classList.toggle('open');playSound('click')">
          <div class="lcard-top">
            <div class="lcard-num">${l.n}</div>
            <h3>${l.t}</h3>
            <div class="sub">${l.sub}</div>
          </div>
          <div class="lcard-body">
            <p>${l.p}</p>
            <div class="more">${t.clickMore}</div>
            <div class="detail">${l.d}</div>
          </div>
        </div>`).join('')}
    </div>`;
}

function rMethods(t){
  (document.getElementById('s-methods')||{}).innerHTML=`
    <div class="sh">
      <h2>${t.methT}</h2>
      <div class="divl"></div>
      <p>${t.methD}</p>
    </div>
    <div class="tl">
      ${t.meths.map((m,i)=>`
        <div class="tl-i" data-n="${i+1}">
          <h3>${m.t}</h3>
          <div class="ar">${m.ar}</div>
          <p>${m.p}</p>
        </div>`).join('')}
    </div>`;
}

function rScenarios(t){
  scenState={};
  (document.getElementById('s-scenarios')||{}).innerHTML=`
    <div class="sh">
      <h2>${t.scenT}</h2>
      <div class="divl"></div>
      <p>${t.scenD}</p>
    </div>
    <div id="scen-list">
      ${t.scens.map((s,i)=>scenHTML(s,i,t)).join('')}
    </div>`;
}

function scenHTML(s,i,t){
  const ans=scenState[i];
  const ltrs=['A','B','C','D'];
  let fb='';
  if(ans!==undefined){
    fb=`<div class="scen-fb show ${ans===s.c?'ok':'no'}">${s.fb}</div>`;
  }
  return `<div class="scen">
    <div class="scen-q">${i+1}. ${s.q}</div>
    <div class="scen-opts">
      ${s.opts.map((o,j)=>{
        let c='scen-opt';
        if(ans!==undefined){
          if(j===s.c) c+=' right';
          else if(j===ans) c+=' wrng';
        }
        return `<button class="${c}" onclick="pickScen(${i},${j})" ${ans!==undefined?'style="pointer-events:none"':''}>
          <span class="letter">${ltrs[j]}</span>
          <span>${o}</span>
        </button>`;
      }).join('')}
    </div>
    ${fb}
  </div>`;
}

function pickScen(i,j){
  scenState[i]=j;
  playSound(j===L[lang].scens[i].c?'success':'click');
  glowBismillah();
  (document.getElementById('scen-list')||{}).innerHTML=L[lang].scens.map((s,idx)=>scenHTML(s,idx,L[lang])).join('');
}

function rAssess(t){
  const today=new Date().toISOString().split('T')[0];
  if(!assessState[today]) assessState[today]={};
  const done=Object.values(assessState[today]).filter(Boolean).length;
  let totalAll=0;
  Object.values(assessState).forEach(d=>totalAll+=Object.values(d).filter(Boolean).length);
  const dateStr=new Date().toLocaleDateString(
    lang==='ar'?'ar-SA':lang==='fr'?'fr-FR':'en-US',
    {weekday:'long',year:'numeric',month:'long',day:'numeric'}
  );
  (document.getElementById('s-assess')||{}).innerHTML=`
    <div class="sh">
      <h2>${t.assessT}</h2>
      <div class="divl"></div>
      <p>${t.assessD}</p>
    </div>
    <div style="max-width:650px;margin:0 auto">
      <div style="text-align:center;margin-bottom:1rem">
        <h3 style="color:var(--gold-l);font-size:1rem;font-family:var(--font-cal)">📅 ${dateStr}</h3>
      </div>
      ${t.assessItems.map((a,i)=>{
        const ck=assessState[today][i]||false;
        return `<div class="sa-item ${ck?'done':''}" onclick="toggleA(${i})">
          <div class="sa-chk">${ck?'✓':''}</div>
          <div class="sa-txt">
            <h4>${a.t}</h4>
            <p>${a.s}</p>
          </div>
          <div class="sa-em">${a.em}</div>
        </div>`;
      }).join('')}
      <div class="sa-stats">
        <div style="text-align:center">
          <div class="sa-n">${done}/${t.assessItems.length}</div>
          <div class="sa-l">${t.today}</div>
        </div>
        <div style="text-align:center">
          <div class="sa-n">${totalAll}</div>
          <div class="sa-l">${t.total}</div>
        </div>
      </div>
    </div>`;
}

function toggleA(i){
  const today=new Date().toISOString().split('T')[0];
  if(!assessState[today]) assessState[today]={};
  assessState[today][i]=!assessState[today][i];
  saveAssess();
  playSound(assessState[today][i]?'success':'click');
  if(assessState[today][i]) glowBismillah();
  rAssess(L[lang]);
}

function loadAssess(){
  try{ assessState=JSON.parse(localStorage.getItem('tarbiya-assess'))||{}; }
  catch{ assessState={}; }
}

function saveAssess(){
  try{ localStorage.setItem('tarbiya-assess',JSON.stringify(assessState)); }
  catch{}
}

function rRoad(t){
  (document.getElementById('s-roadmap')||{}).innerHTML=`
    <div class="sh">
      <h2>${t.roadT}</h2>
      <div class="divl"></div>
      <p>${t.roadD}</p>
    </div>
    ${t.road.map(r=>`
      <div class="age-row">
        <div class="age-badge">
          <div class="yr">${r.age}</div>
          <div class="lbl">${r.lbl}</div>
        </div>
        <div class="age-content">
          <h4>${r.title}</h4>
          <ul>${r.items.map(it=>`<li>${it}</li>`).join('')}</ul>
        </div>
      </div>`).join('')}`;
}
function rSolver(t){
  (document.getElementById('s-solver')||{}).innerHTML=`<div class="sh"><h2>${t.solveT}</h2><div class="divl"></div><p>${t.solveD}</p></div>
    <div class="ps-grid">${t.solves.map(s=>`
      <div class="ps-card" onclick="this.classList.toggle('open');playSound('click')"><div class="ic">${s.ic}</div><h4>${s.t}</h4><p>${s.p}</p>
        <div class="more-s">${t.clickMore}</div><div class="sol">${s.sol}</div></div>`).join('')}</div>`;
}

/* ═══ RENDERER: HADITHS ═══ */
function rHadiths(t){
  (document.getElementById('s-hadiths')||{}).innerHTML=`
    <div class="sh">
      <h2>${t.hadithsT}</h2>
      <div class="divl"></div>
      <p>${t.hadithsD}</p>
    </div>
    <div style="max-width:700px;margin:0 auto">
      ${t.hadithsList.map(h=>`
        <div class="card" style="margin-bottom:1rem;border-right:3px solid var(--gold)">
          <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.5rem">
            <span style="background:var(--gold);color:var(--bg1);padding:.2rem .6rem;border-radius:var(--r-s);font-size:.7rem">
              ${h.cat}
            </span>
          </div>
          <p style="font-family:var(--font-cal);font-size:1rem;color:var(--gold-l);line-height:1.9;margin-bottom:.4rem">
            «${h.text}»
          </p>
          <p style="font-size:.75rem;color:var(--text3)">${h.src}</p>
        </div>`).join('')}
    </div>`;
}

/* ═══ RENDERER: RIGHTS ═══ */
function rRights(t){
  (document.getElementById('s-rights')||{}).innerHTML=`
    <div class="sh">
      <h2>${t.rightsT}</h2>
      <div class="divl"></div>
      <p>${t.rightsD}</p>
    </div>
    <div class="g2">
      ${t.rightsList.map(r=>`
        <div class="card">
          <div style="font-size:1.8rem;margin-bottom:.5rem">${r.ic}</div>
          <h3>${r.t}</h3>
          <p>${r.d}</p>
        </div>`).join('')}
    </div>`;
}

/* ═══ RENDERER: GOALS ═══ */
function rGoals(t){
  (document.getElementById('s-goals')||{}).innerHTML=`
    <div class="sh">
      <h2>${t.goalsT}</h2>
      <div class="divl"></div>
      <p>${t.goalsD}</p>
    </div>
    <div class="tl">
      ${t.goalsList.map(g=>`
        <div class="tl-i" data-n="${g.n}">
          <h3>${g.t}</h3>
          <p>${g.d}</p>
        </div>`).join('')}
    </div>`;
}

/* ═══ RENDERER: QUOTES ═══ */
function rQuotes(t){
  (document.getElementById('s-quotes')||{}).innerHTML=`
    <div class="sh">
      <h2>${t.quotesT}</h2>
      <div class="divl"></div>
      <p>${t.quotesD}</p>
    </div>
    <div style="max-width:700px;margin:0 auto">
      ${t.quotesList.map(q=>`
        <div class="card" style="margin-bottom:1rem;text-align:center;padding:1.5rem">
          <p style="font-family:var(--font-cal);font-size:1.1rem;color:var(--gold-l);line-height:1.8;margin-bottom:.5rem">
            «${q.q}»
          </p>
          <p style="font-size:.8rem;color:var(--text3)">— ${q.s}</p>
        </div>`).join('')}
    </div>`;
}

/* ═══ RENDERER: ROUTINE ═══ */
function rRoutine(t){
  (document.getElementById('s-routine')||{}).innerHTML=`
    <div class="sh">
      <h2>${t.routineT}</h2>
      <div class="divl"></div>
      <p>${t.routineD}</p>
    </div>
    ${t.routineList.map(r=>`
      <div class="age-row" style="margin-bottom:1rem">
        <div class="age-badge" style="min-width:90px">
          <div class="yr" style="font-size:1.2rem">${r.time}</div>
        </div>
        <div class="age-content">
          <ul>
            ${r.items.map(it=>`<li>${it}</li>`).join('')}
          </ul>
        </div>
      </div>`).join('')}`;
}
