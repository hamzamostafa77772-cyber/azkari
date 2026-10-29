(function () {
  'use strict';

  /* ------------------------------------------------------------------ helpers */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var nf = new Intl.NumberFormat('ar-EG');
  function N(n) { return nf.format(n); }
  function pad(n) { return (n < 10 ? '0' : '') + n; }
  function dkey(d) { d = d || new Date(); return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function addDays(k, n) { var p = k.split('-'); return dkey(new Date(+p[0], +p[1] - 1, +p[2] + n, 12)); }

  try { document.documentElement.setAttribute('dir', 'rtl'); document.documentElement.setAttribute('lang', 'ar'); } catch (e) { }

  function azkarCount(n) {
    if (n === 1) return 'ذكر واحد';
    if (n === 2) return 'ذكران';
    if (n <= 10) return N(n) + ' أذكار';
    return N(n) + ' ذكراً';
  }
  function daysText(n) {
    if (n === 1) return 'يوم واحد';
    if (n === 2) return 'يومان';
    if (n <= 10) return N(n) + ' أيام';
    return N(n) + ' يوماً';
  }
  function streakLabel(n) {
    if (n === 1) return 'يوم متتالٍ';
    if (n === 2) return 'يومان متتاليان';
    if (n >= 3 && n <= 10) return 'أيام متتالية';
    if (n > 10) return 'يوماً متتالياً';
    return 'أيام متتالية';
  }
  function timesText(n) {
    if (n === 1) return 'مرة واحدة';
    if (n === 2) return 'مرتين';
    if (n <= 10) return N(n) + ' مرات';
    return N(n) + ' مرة';
  }

  var ICONS = {
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    sunrise: '<path d="M3 19h18M6.5 19a5.5 5.5 0 0 1 11 0M12 3v6M9.5 5.5L12 3l2.5 2.5"/>',
    sunset: '<path d="M3 19h18M6.5 19a5.5 5.5 0 0 1 11 0M12 3v6M9.5 6.5L12 9l2.5-2.5"/>',
    dome: '<path d="M4 20v-6a8 8 0 0 1 16 0v6M2 20h20M12 2v3M10 20v-3.5a2 2 0 0 1 4 0V20"/>',
    night: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/><path d="M17 3v4M15 5h4"/>',
    home: '<path d="M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6"/>',
    flame: '<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 .3 1.4 1 2 2 2 0-3-.5-5 1-8z"/>',
    back: '<path d="M9 5l7 7-7 7"/>',
    prev: '<path d="M9 5l7 7-7 7"/>',
    next: '<path d="M15 5l-7 7 7 7"/>',
    undo: '<path d="M9 14L4 9l5-5"/><path d="M4 9h10a6 6 0 0 1 0 12h-3"/>',
    tick: '<path d="M5 13l4 4L19 7"/>'
  };
  function ico(n, cls) { return '<svg class="icon ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true">' + ICONS[n] + '</svg>'; }

  /* ------------------------------------------------------------------ content */
  var T = {
    kursi: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ ۚ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ ۚ لَهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الْأَرْضِ ۗ مَنْ ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلَّا بِإِذْنِهِ ۚ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ ۖ وَلَا يُحِيطُونَ بِشَيْءٍ مِنْ عِلْمِهِ إِلَّا بِمَا شَاءَ ۚ وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالْأَرْضَ ۖ وَلَا يَئُودُهُ حِفْظُهُمَا ۚ وَهُوَ الْعَلِيُّ الْعَظِيمُ',
    ikhlas: 'قُلْ هُوَ اللَّهُ أَحَدٌ ۝ اللَّهُ الصَّمَدُ ۝ لَمْ يَلِدْ وَلَمْ يُولَدْ ۝ وَلَمْ يَكُنْ لَهُ كُفُوًا أَحَدٌ',
    falaq: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ ۝ مِنْ شَرِّ مَا خَلَقَ ۝ وَمِنْ شَرِّ غَاسِقٍ إِذَا وَقَبَ ۝ وَمِنْ شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ ۝ وَمِنْ شَرِّ حَاسِدٍ إِذَا حَسَدَ',
    nas: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ ۝ مَلِكِ النَّاسِ ۝ إِلَٰهِ النَّاسِ ۝ مِنْ شَرِّ الْوَسْوَاسِ الْخَنَّاسِ ۝ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ ۝ مِنَ الْجِنَّةِ وَالنَّاسِ',
    baqara: 'آمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِنْ رُسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ ۝ لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا ۚ لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ ۗ رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَسِينَا أَوْ أَخْطَأْنَا ۚ رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا ۚ رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ ۖ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا ۚ أَنْتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ',
    sayyid: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ',
    tahlil: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ'
  };

  function morningEvening(morning) {
    return [
      { t: T.kursi, n: 1, src: 'سورة البقرة، آية ٢٥٥' },
      { t: T.ikhlas, n: 3, src: 'سورة الإخلاص. تُقال ثلاث مرات. رواه أبو داود والترمذي' },
      { t: T.falaq, n: 3, src: 'سورة الفلق. تُقال ثلاث مرات' },
      { t: T.nas, n: 3, src: 'سورة الناس. تُقال ثلاث مرات' },
      { t: morning
          ? 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ'
          : 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ',
        n: 1, src: 'رواه مسلم' },
      { t: T.sayyid, n: 1, src: 'سيد الاستغفار. رواه البخاري' },
      { t: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ', n: 3, src: 'رواه أبو داود والترمذي' },
      { t: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا', n: 3, src: 'رواه أبو داود' },
      { t: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', n: 100, src: 'رواه مسلم', fadl: 'تُمحى الخطايا وإن كانت مثل زبد البحر. هذا الفضل لمن قالها مئة مرة في اليوم.' },
      { t: T.tahlil, n: 10 },
      { t: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ', n: 100, src: 'رواه مسلم. كان النبي يستغفر في اليوم مئة مرة' }
    ];
  }

  var CATS = [
    { id: 'waking', name: 'أذكار الاستيقاظ', sub: 'أول ما تفتح عينيك', icon: 'sunrise', items: [
      { t: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ', n: 1, src: 'رواه البخاري' },
      { t: 'الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي، وَرَدَّ عَلَيَّ رُوحِي، وَأَذِنَ لِي بِذِكْرِهِ', n: 1, src: 'رواه الترمذي' }
    ] },
    { id: 'morning', name: 'أذكار الصباح', sub: 'من الفجر إلى الضحى', icon: 'sun', items: morningEvening(true) },
    { id: 'evening', name: 'أذكار المساء', sub: 'من العصر إلى الليل', icon: 'sunset', items: morningEvening(false) },
    { id: 'after', name: 'أذكار بعد الصلاة', sub: 'بعد كل صلاة مكتوبة', icon: 'dome', repeat: true, items: [
      { t: 'أَسْتَغْفِرُ اللَّهَ', n: 3, src: 'رواه مسلم' },
      { t: 'اللَّهُمَّ أَنْتَ السَّلَامُ وَمِنْكَ السَّلَامُ، تَبَارَكْتَ يَا ذَا الْجَلَالِ وَالْإِكْرَامِ', n: 1, src: 'رواه مسلم' },
      { t: T.kursi, n: 1, src: 'رواه النسائي في الكبرى', fadl: 'من قرأها بعد كل صلاة مكتوبة لم يمنعه من دخول الجنة إلا أن يموت.' },
      { t: 'سُبْحَانَ اللَّهِ', n: 33, src: 'رواه مسلم' },
      { t: 'الْحَمْدُ لِلَّهِ', n: 33, src: 'رواه مسلم' },
      { t: 'اللَّهُ أَكْبَرُ', n: 33, src: 'رواه مسلم' },
      { t: T.tahlil, n: 1, src: 'تمام المئة. رواه مسلم' }
    ] },
    { id: 'sleep', name: 'أذكار النوم', sub: 'قبل أن تنام', icon: 'night', items: [
      { t: T.kursi, n: 1, src: 'سورة البقرة، آية ٢٥٥' },
      { t: T.ikhlas, n: 3, src: 'رواه البخاري', note: 'اجمع كفيك وانفث فيهما، ثم اقرأ، ثم امسح بهما وجهك وما استطعت من جسدك. كرر ذلك ثلاث مرات مع الإخلاص والفلق والناس.' },
      { t: T.falaq, n: 3, src: 'سورة الفلق' },
      { t: T.nas, n: 3, src: 'سورة الناس' },
      { t: T.baqara, n: 1, src: 'آخر آيتين من سورة البقرة. رواه البخاري ومسلم' },
      { t: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا', n: 1, src: 'رواه البخاري' },
      { t: 'سُبْحَانَ اللَّهِ', n: 33, src: 'رواه البخاري ومسلم' },
      { t: 'الْحَمْدُ لِلَّهِ', n: 33, src: 'رواه البخاري ومسلم' },
      { t: 'اللَّهُ أَكْبَرُ', n: 34, src: 'رواه البخاري ومسلم' },
      { t: 'اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ', n: 3, src: 'رواه أبو داود والترمذي' }
    ] },
    { id: 'daily', name: 'أذكار يومية', sub: 'الطعام والبيت والمسجد والسفر', icon: 'home', repeat: true, items: [
      { t: 'بِسْمِ اللَّهِ', n: 1, src: 'قبل الطعام. رواه أبو داود والترمذي' },
      { t: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ', n: 1, src: 'بعد الطعام. رواه أبو داود والترمذي' },
      { t: 'بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', n: 1, src: 'عند الخروج من البيت. رواه أبو داود والترمذي' },
      { t: 'بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا', n: 1, src: 'عند دخول البيت. رواه أبو داود', note: 'بعدها سلّم على أهل بيتك.' },
      { t: 'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ', n: 1, src: 'عند دخول المسجد. رواه مسلم' },
      { t: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ', n: 1, src: 'عند الخروج من المسجد. رواه مسلم' },
      { t: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنْقَلِبُونَ', n: 1, src: 'عند الركوب. سورة الزخرف، الآيتان ١٣ و١٤' }
    ] }
  ];
  function catById(id) { for (var i = 0; i < CATS.length; i++) if (CATS[i].id === id) return CATS[i]; return null; }

  var FREE = [
    'سُبْحَانَ اللَّهِ',
    'الْحَمْدُ لِلَّهِ',
    'اللَّهُ أَكْبَرُ',
    'لَا إِلَٰهَ إِلَّا اللَّهُ',
    'أَسْتَغْفِرُ اللَّهَ',
    'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ',
    'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    'اللَّهُمَّ صَلِّ وَسَلِّمْ عَلَى نَبِيِّنَا مُحَمَّدٍ'
  ];
  var SIZES = [22, 26, 31, 38];
  var SIZE_LABELS = ['صغير', 'متوسط', 'كبير', 'كبير جداً'];
  var WD = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];

  /* ------------------------------------------------------------------ state */
  var KEY = 'azkari.v1';
  var S;
  function load() {
    var raw = null;
    try { raw = JSON.parse(localStorage.getItem(KEY)); } catch (e) { raw = null; }
    S = (raw && typeof raw === 'object') ? raw : {};
    S.settings = Object.assign({ theme: 'auto', size: 1, vibrate: true }, S.settings || {});
    S.days = S.days || {};
    S.free = Object.assign({ phrase: 0, target: 33, counts: {}, life: {} }, S.free || {});
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { } }
  function dayRec(k) { return S.days[k || dkey()] || null; }
  function today() {
    var k = dkey();
    if (!S.days[k]) S.days[k] = { c: {}, r: {}, taps: 0, free: 0, items: 0 };
    return S.days[k];
  }
  function cnt(catId, i, d) { return (((d && d.c) || {})[catId] || [])[i] || 0; }
  function itemsDone(cat, d) {
    var n = 0;
    for (var i = 0; i < cat.items.length; i++) if (cnt(cat.id, i, d) >= cat.items[i].n) n++;
    return n;
  }
  function runs(cat, d) { return (d && d.r && d.r[cat.id]) || 0; }

  function vib(p) { if (S.settings.vibrate && navigator.vibrate) { try { navigator.vibrate(p); } catch (e) { } } }

  var armed = {};
  function arm(key, ms) {
    if (armed[key]) { clearTimeout(armed[key]); delete armed[key]; return true; }
    armed[key] = setTimeout(function () { delete armed[key]; rerender(); }, ms || 3200);
    return false;
  }

  /* ------------------------------------------------------------------ appearance */
  function applyAppearance() {
    var el = document.documentElement;
    if (S.settings.theme === 'auto') el.removeAttribute('data-theme'); else el.setAttribute('data-theme', S.settings.theme);
    el.style.setProperty('--dhikr-size', SIZES[S.settings.size] + 'px');
    var m = $('meta[name="theme-color"]');
    if (m) { try { m.setAttribute('content', getComputedStyle(document.body).backgroundColor); } catch (e) { } }
  }

  /* ------------------------------------------------------------------ smart suggestion */
  function suggestId(h) {
    if (h >= 4 && h < 6) return 'waking';
    if (h >= 6 && h < 12) return 'morning';
    if (h >= 12 && h < 15) return 'after';
    if (h >= 15 && h < 19) return 'evening';
    if (h >= 19 && h < 21) return 'after';
    return 'sleep';
  }

  /* ------------------------------------------------------------------ streaks */
  function activeDay(k) {
    var d = S.days[k]; if (!d || !d.r) return false;
    for (var id in d.r) if (d.r[id] > 0) return true;
    return false;
  }
  function streak() {
    var k = dkey(); if (!activeDay(k)) k = addDays(k, -1);
    var n = 0; while (activeDay(k)) { n++; k = addDays(k, -1); }
    return n;
  }
  function bestStreak() {
    var keys = Object.keys(S.days).filter(activeDay).sort();
    var best = 0, run = 0, prev = null;
    keys.forEach(function (k) { run = (prev && addDays(prev, 1) === k) ? run + 1 : 1; if (run > best) best = run; prev = k; });
    return best;
  }

  /* ------------------------------------------------------------------ views */
  var view = 'home', lastTab = 'home', R = null;
  var VIEWS = ['home', 'free', 'stats', 'settings', 'reader'];

  function show(v) {
    view = v;
    VIEWS.forEach(function (n) { $('#v-' + n).hidden = (n !== v); });
    $('#tabs').hidden = (v === 'reader');
    if (v !== 'reader') {
      lastTab = v;
      $$('.tab').forEach(function (b) { if (b.dataset.tab === v) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); });
    }
    rerender();
  }
  function rerender() {
    if (view === 'home') renderHome();
    else if (view === 'free') renderFree();
    else if (view === 'stats') renderStats();
    else if (view === 'settings') renderSettings();
    else if (view === 'reader') renderReader();
  }

  function dateLine() {
    var d = new Date(), h = '', g = '';
    try { h = new Intl.DateTimeFormat('ar-EG-u-ca-islamic-umalqura', { day: 'numeric', month: 'long', year: 'numeric' }).format(d); } catch (e) { }
    try { g = new Intl.DateTimeFormat('ar-EG', { weekday: 'long', day: 'numeric', month: 'long' }).format(d); } catch (e) { }
    return (g && h) ? g + '، ' + h : (g || h);
  }

  function miniRing(p, done) {
    var C = 100.53;
    return '<svg class="mini-ring" viewBox="0 0 40 40" aria-hidden="true"><circle class="trk" cx="20" cy="20" r="16" fill="none" stroke-width="4"/>' +
      (done
        ? '<circle class="ok" cx="20" cy="20" r="16" fill="none" stroke-width="4"/><path d="M13 20.5l5 5 9-10" fill="none" stroke="var(--green)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>'
        : '<circle class="bar" cx="20" cy="20" r="16" fill="none" stroke-width="4" stroke-linecap="round" transform="rotate(-90 20 20)" stroke-dasharray="' + C + '" stroke-dashoffset="' + (C * (1 - p)).toFixed(2) + '"/>') +
      '</svg>';
  }

  function renderHome() {
    var d = dayRec();
    var sid = suggestId(new Date().getHours());
    var sc = catById(sid);
    var sr = runs(sc, d), sd = itemsDone(sc, d), st = sc.items.length;
    var sk = streak();

    var heroTitle, heroSub, heroBtn, heroAct, bar = '';
    if (!sc.repeat && sr > 0) {
      heroTitle = 'أتممت ' + sc.name;
      heroSub = 'تقبّل الله منك. يمكنك المتابعة بالتسبيح الحر.';
      heroBtn = 'سبّح الآن'; heroAct = 'data-tab="free"';
    } else {
      heroTitle = sc.name;
      if (sc.repeat) heroSub = sr > 0 ? 'قرأتها اليوم ' + timesText(sr) : sc.sub;
      else heroSub = sd > 0 ? 'أنجزت ' + N(sd) + ' من ' + azkarCount(st) : azkarCount(st);
      heroBtn = (sd > 0 && sd < st) ? 'أكمل القراءة' : 'ابدأ القراءة';
      heroAct = 'data-cat="' + sc.id + '"';
      if (sd > 0 && sd < st) bar = '<div class="mini" aria-hidden="true"><i style="width:' + Math.round(sd / st * 100) + '%"></i></div>';
    }

    var rows = CATS.map(function (c) {
      var r = runs(c, d), n = itemsDone(c, d), t = c.items.length;
      var full = r > 0;
      var p = full ? 1 : n / t;
      var badge = r > 0 ? '<span class="badge">تمّت' + (r > 1 ? ' ×' + N(r) : '') + '</span>' : '';
      var meta = (!full && n > 0) ? 'أنجزت ' + N(n) + ' من ' + N(t) + '، ' + c.sub : c.sub;
      return '<button class="row" data-cat="' + c.id + '" aria-label="' + c.name + '، ' + azkarCount(t) + '">' +
        '<span class="bubble">' + ico(c.icon) + '</span>' +
        '<span class="txt"><span class="name">' + c.name + badge + '</span><br><span class="meta">' + meta + '</span></span>' +
        miniRing(p, full) + '</button>';
    }).join('');

    $('#v-home').innerHTML =
      '<div class="home-head"><h1>السلام عليكم</h1>' +
      '<span class="streak">' + ico('flame') + (sk === 0 ? 'ابدأ سلسلتك اليوم' : sk === 1 ? 'يوم واحد' : sk === 2 ? 'يومان متتاليان' : N(sk) + ' ' + streakLabel(sk)) + '</span></div>' +
      '<p class="date">' + dateLine() + '</p>' +
      '<div class="hero"><p class="kicker">الأنسب الآن</p><h2>' + heroTitle + '</h2><p class="sub">' + heroSub + '</p>' + bar +
      '<button class="btn light" ' + heroAct + '>' + heroBtn + '</button></div>' +
      '<h2 class="section-title">كل الأذكار</h2><div class="list">' + rows + '</div>';
  }

  /* ------------------------------------------------------------------ reader */
  var RING_C = 565.49;

  function openCat(id) {
    var cat = catById(id), d = today();
    if (cat.repeat && itemsDone(cat, d) === cat.items.length) d.c[cat.id] = [];
    var i = 0;
    for (var k = 0; k < cat.items.length; k++) if (cnt(cat.id, k, d) < cat.items[k].n) { i = k; break; }
    R = { cat: cat, i: i, lock: false };
    save();
    try { location.hash = 'azkar'; } catch (e) { }
    show('reader');
  }
  function closeReader() {
    var viaHash = false;
    try { viaHash = location.hash === '#azkar'; } catch (e) { }
    if (viaHash) { try { history.back(); return; } catch (e) { } }
    leaveReader();
  }
  function leaveReader() { if (view !== 'reader') return; R = null; show(lastTab || 'home'); }
  window.addEventListener('hashchange', function () { if (location.hash !== '#azkar' && view === 'reader') leaveReader(); });

  function renderReader() {
    if (!R) { show('home'); return; }
    var cat = R.cat, it = cat.items[R.i], d = today();
    var segs = cat.items.map(function (x, k) {
      var c = cnt(cat.id, k, d), p = Math.min(1, c / x.n);
      return '<div class="seg' + (k === R.i ? ' cur' : '') + '"><i style="--p:' + Math.round(p * 100) + '%"></i></div>';
    }).join('');
    var last = R.i === cat.items.length - 1;
    $('#v-reader').innerHTML =
      '<div class="r-head pad"><button class="icon-btn" data-act="close" aria-label="رجوع">' + ico('back') + '</button>' +
      '<h2>' + cat.name + '</h2><span class="pos" aria-label="الذكر ' + N(R.i + 1) + ' من ' + N(cat.items.length) + '">' + N(R.i + 1) + '/' + N(cat.items.length) + '</span></div>' +
      '<div class="segs pad" aria-hidden="true">' + segs + '</div>' +
      '<div class="r-text pad" id="r-text"><div class="inner"><p class="dhikr">' + it.t + '</p>' +
      (it.src ? '<p class="src">' + it.src + '</p>' : '') +
      (it.fadl ? '<p class="note">' + it.fadl + '</p>' : '') +
      (it.note ? '<p class="note">' + it.note + '</p>' : '') + '</div></div>' +
      '<div class="r-tap pad" id="r-tap" role="button" tabindex="0" aria-label="اضغط للعدّ"><div class="ring-btn">' +
      '<svg class="ring" viewBox="0 0 200 200" aria-hidden="true"><circle class="trk" cx="100" cy="100" r="90"/><circle class="bar" id="r-bar" cx="100" cy="100" r="90" stroke-dasharray="' + RING_C + '" stroke-dashoffset="' + RING_C + '"/></svg>' +
      '<div class="center" id="r-center"></div></div><p class="hint">اضغط في أي مكان في هذه المنطقة للعدّ</p></div>' +
      '<div class="r-ctrl pad"><button class="ctl" data-act="prev"' + (R.i === 0 ? ' disabled' : '') + '>' + ico('prev') + 'السابق</button>' +
      '<button class="ctl" data-act="undo">' + ico('undo') + 'تراجع</button>' +
      '<button class="ctl" data-act="next"' + (last ? ' disabled' : '') + '>التالي' + ico('next') + '</button></div>';
    updateRing(false);
  }

  function updateRing(animate) {
    if (!R) return;
    var cat = R.cat, it = cat.items[R.i], c = cnt(cat.id, R.i, today());
    var done = c >= it.n;
    var bar = $('#r-bar'); if (!bar) return;
    bar.style.strokeDashoffset = (RING_C * (1 - Math.min(1, c / it.n))).toFixed(2);
    $('#r-center').innerHTML = done
      ? '<svg class="icon tick" viewBox="0 0 24 24" aria-hidden="true">' + ICONS.tick + '</svg><div class="of">تم</div>'
      : '<div class="num">' + N(c) + '</div><div class="of">' + (it.n === 1 ? 'اضغط للعدّ' : 'من ' + N(it.n)) + '</div>';
    var seg = $$('.seg i')[R.i]; if (seg) seg.style.setProperty('--p', Math.round(Math.min(1, c / it.n) * 100) + '%');
  }

  function nextUnfinished(from) {
    var cat = R.cat, d = today(), n = cat.items.length;
    for (var s = 1; s <= n; s++) {
      var k = (from + s) % n;
      if (cnt(cat.id, k, d) < cat.items[k].n) return k;
    }
    return -1;
  }

  function onTap() {
    if (!R || R.lock || view !== 'reader') return;
    var cat = R.cat, it = cat.items[R.i], d = today();
    var arr = d.c[cat.id] || (d.c[cat.id] = []);
    var c = arr[R.i] || 0;
    if (c >= it.n) { goNext(); return; }
    c++; arr[R.i] = c; d.taps++;
    if (c >= it.n) {
      d.items++;
      var nxt = nextUnfinished(R.i);
      if (nxt === -1) {
        d.r[cat.id] = (d.r[cat.id] || 0) + 1;
        vib([60, 50, 60, 50, 140]);
        save(); updateRing(true);
        R.lock = true;
        setTimeout(function () { showFin(); }, 450);
        return;
      }
      vib([30, 40, 50]);
      save(); updateRing(true);
      R.lock = true;
      setTimeout(function () { if (R) { R.i = nxt; R.lock = false; renderReader(); var t = $('#r-text'); if (t) t.scrollTop = 0; } }, 420);
      return;
    }
    vib(12);
    save(); updateRing(true);
  }
  function goNext() { if (R && R.i < R.cat.items.length - 1) { R.i++; renderReader(); } }
  function goPrev() { if (R && R.i > 0) { R.i--; renderReader(); } }
  function undo() {
    if (!R) return;
    var cat = R.cat, d = today(), arr = d.c[cat.id] || (d.c[cat.id] = []);
    var c = arr[R.i] || 0;
    if (c > 0) { arr[R.i] = c - 1; if (d.taps > 0) d.taps--; vib(8); save(); updateRing(false); }
  }

  function showFin() {
    if (!R) return;
    var cat = R.cat;
    var el = document.createElement('div');
    el.className = 'fin pad'; el.id = 'fin';
    el.innerHTML = '<div class="check"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 13l4 4L19 7"/></svg></div>' +
      '<h2>تقبّل الله منك</h2><p>أتممت ' + cat.name + '. ثبّتك الله على الخير.</p>' +
      '<div class="btns"><button class="btn" data-act="fin-home">العودة للرئيسية</button>' +
      '<button class="btn line" data-act="fin-free">سبّح تسبيحاً حراً</button>' +
      '<button class="btn line" data-act="fin-again">أعد قراءتها</button></div>';
    $('#v-reader').appendChild(el);
  }

  /* ------------------------------------------------------------------ free tasbeeh */
  function freeStats() {
    var F = S.free, c = F.counts[F.phrase] || 0, t = F.target;
    return { c: c, t: t, rounds: t ? Math.floor(c / t) : 0, shown: t ? ((c > 0 && c % t === 0) ? t : c % t) : c, p: t ? ((c > 0 && c % t === 0) ? 1 : (c % t) / t) : 0 };
  }
  function renderFree() {
    var F = S.free, fs = freeStats(), d = dayRec();
    var chips = FREE.map(function (p, i) {
      return '<button class="chip" data-phrase="' + i + '" aria-pressed="' + (i === F.phrase) + '">' + p + '</button>';
    }).join('');
    var targets = [33, 100, 1000, 0].map(function (t) {
      return '<button class="chip" data-target="' + t + '" aria-pressed="' + (F.target === t) + '">' + (t ? N(t) : 'مفتوح') + '</button>';
    }).join('');
    $('#v-free').innerHTML =
      '<h1 class="page">التسبيح الحر</h1>' +
      '<div class="chips" role="group" aria-label="اختر الذكر">' + chips + '</div>' +
      '<p class="free-phrase">' + FREE[F.phrase] + '</p>' +
      '<div class="free-zone" id="f-zone" role="button" tabindex="0" aria-label="اضغط للتسبيح"><div class="ring-btn">' +
      '<svg class="ring" viewBox="0 0 200 200" aria-hidden="true"><circle class="trk" cx="100" cy="100" r="90"/><circle class="bar" id="f-bar" cx="100" cy="100" r="90" stroke-dasharray="' + RING_C + '" stroke-dashoffset="' + (RING_C * (1 - fs.p)).toFixed(2) + '"/></svg>' +
      '<div class="center"><div class="num" id="f-num">' + N(fs.shown) + '</div><div class="of">' + (F.target ? 'من ' + N(F.target) : 'عدّ مفتوح') + '</div></div></div>' +
      '<p class="hint">اضغط في أي مكان في هذه المنطقة</p></div>' +
      '<div class="targets" role="group" aria-label="الهدف">' + targets + '</div>' +
      '<div class="free-meta"><div><b id="f-rounds">' + N(fs.rounds) + '</b><span>دورات مكتملة</span></div>' +
      '<div><b id="f-today">' + N((d && d.free) || 0) + '</b><span>تسبيحات اليوم</span></div>' +
      '<div><b id="f-life">' + N(F.life[F.phrase] || 0) + '</b><span>إجمالي العبارة</span></div></div>' +
      '<div style="height:18px"></div><button class="btn line block" data-act="f-reset">' + (armed['f-reset'] ? 'اضغط مرة أخرى للتأكيد' : 'تصفير العدّاد') + '</button>';
  }
  function onFreeTap() {
    if (view !== 'free') return;
    var F = S.free, d = today();
    var c = (F.counts[F.phrase] || 0) + 1;
    F.counts[F.phrase] = c; F.life[F.phrase] = (F.life[F.phrase] || 0) + 1;
    d.taps++; d.free++;
    var fs = freeStats();
    vib(F.target && c % F.target === 0 ? [50, 40, 50, 40, 120] : 10);
    save();
    var bar = $('#f-bar'); if (!bar) return;
    bar.style.strokeDashoffset = (RING_C * (1 - fs.p)).toFixed(2);
    $('#f-num').textContent = N(fs.shown);
    $('#f-rounds').textContent = N(fs.rounds);
    $('#f-today').textContent = N(d.free);
    $('#f-life').textContent = N(F.life[F.phrase]);
  }

  /* ------------------------------------------------------------------ stats */
  function niceMax(v) {
    var steps = [4, 10, 20, 40, 80, 160, 320, 640];
    for (var i = 0; i < steps.length; i++) if (v <= steps[i]) return steps[i];
    return Math.ceil(v / 200) * 200;
  }
  function chartSvg(vals, labels) {
    var max = niceMax(Math.max.apply(null, vals.concat([1])));
    var top = 16, base = 128, h = base - top, slot = 40, right = 288;
    var out = '<svg viewBox="0 0 320 150" role="img" aria-label="الأذكار المكتملة في آخر سبعة أيام">';
    [0, max / 2, max].forEach(function (g) {
      var y = base - (g / max) * h;
      out += '<line class="grid" x1="4" x2="288" y1="' + y + '" y2="' + y + '"/><text class="axis" x="316" y="' + (y + 3.5) + '" text-anchor="end">' + N(g) + '</text>';
    });
    // vals[0] is the oldest day and is drawn at the right, so time runs right to left like the text
    vals.forEach(function (v, i) {
      var cx = right - slot * i - slot / 2;
      var bh = v > 0 ? Math.max(4, (v / max) * h) : 0;
      var isToday = i === vals.length - 1;
      if (bh > 0) out += '<rect class="' + (isToday ? 'bar-t' : 'bar-o') + '" x="' + (cx - 11) + '" y="' + (base - bh) + '" width="22" height="' + bh + '" rx="6"/>';
      if (v > 0) out += '<text class="val" x="' + cx + '" y="' + (base - bh - 5) + '" text-anchor="middle">' + N(v) + '</text>';
      out += '<text class="axis" x="' + cx + '" y="' + (base + 16) + '" text-anchor="middle"' + (isToday ? ' style="font-weight:700"' : '') + '>' + labels[i] + '</text>';
    });
    return out + '</svg>';
  }
  function renderStats() {
    var vals = [], labels = [], k = dkey(), week = 0, tapsWeek = 0, total = 0, items = 0;
    for (var i = 6; i >= 0; i--) {
      var key = addDays(k, -i), rec = S.days[key];
      vals.push(rec ? rec.items || 0 : 0);
      var p = key.split('-'); labels.push(WD[new Date(+p[0], +p[1] - 1, +p[2], 12).getDay()]);
      week += rec ? rec.items || 0 : 0; tapsWeek += rec ? rec.taps || 0 : 0;
    }
    Object.keys(S.days).forEach(function (kk) { total += S.days[kk].taps || 0; items += S.days[kk].items || 0; });
    var sk = streak(), best = bestStreak(), td = dayRec();
    $('#v-stats').innerHTML =
      '<h1 class="page">إحصائياتي</h1>' +
      '<div class="big-line"><b>' + N(sk) + '</b><span>' + streakLabel(sk) + '</span></div>' +
      '<p class="date">يُحتسب اليوم إذا أتممت فيه مجموعة أذكار كاملة.</p>' +
      '<h2 class="section-title">الأذكار المكتملة في آخر ٧ أيام</h2><div class="chart">' + chartSvg(vals, labels) + '</div>' +
      '<h2 class="section-title">الأرقام</h2><div class="list">' +
      '<div class="kv"><span>تسبيحات اليوم</span><b>' + N((td && td.taps) || 0) + '</b></div>' +
      '<div class="kv"><span>تسبيحات آخر ٧ أيام</span><b>' + N(tapsWeek) + '</b></div>' +
      '<div class="kv"><span>أذكار مكتملة هذا الأسبوع</span><b>' + N(week) + '</b></div>' +
      '<div class="kv"><span>أطول سلسلة أيام</span><b>' + daysText(best) + '</b></div>' +
      '<div class="kv"><span>إجمالي التسبيحات</span><b>' + N(total) + '</b></div></div>';
  }

  /* ------------------------------------------------------------------ settings */
  function seg(name, opts, cur) {
    return '<div class="seg-ctl" role="group">' + opts.map(function (o) {
      return '<button data-set="' + name + '" data-val="' + o[0] + '" aria-pressed="' + (String(cur) === String(o[0])) + '">' + o[1] + '</button>';
    }).join('') + '</div>';
  }
  function renderSettings() {
    var st = S.settings;
    $('#v-settings').innerHTML =
      '<h1 class="page">الإعدادات</h1><div class="list" style="margin-top:14px">' +
      '<div class="set"><div><div class="lbl">المظهر</div></div>' + seg('theme', [['auto', 'تلقائي'], ['light', 'فاتح'], ['dark', 'داكن']], st.theme) + '</div>' +
      '<div class="set" style="flex-wrap:wrap"><div><div class="lbl">حجم الخط</div><div class="desc">يؤثر على نص الذكر</div></div>' +
      seg('size', SIZE_LABELS.map(function (l, i) { return [i, l]; }), st.size) + '</div>' +
      '<div class="preview" style="font-size:var(--dhikr-size)">سُبْحَانَ اللَّهِ وَبِحَمْدِهِ</div>' +
      '<div class="set"><div><div class="lbl">الاهتزاز</div><div class="desc">اهتزاز خفيف مع كل ضغطة، وأقوى عند إتمام الذكر</div></div>' +
      '<button class="switch" role="switch" aria-checked="' + st.vibrate + '" aria-label="الاهتزاز" data-act="vibrate"></button></div></div>' +
      '<h2 class="section-title">البيانات</h2><div class="list">' +
      '<div class="set"><div><div class="lbl">مسح تقدم اليوم</div><div class="desc">يعيد عدّاد اليوم إلى الصفر</div></div><button class="btn line" data-act="clear-today">' + (armed['clear-today'] ? 'تأكيد' : 'مسح') + '</button></div>' +
      '<div class="set"><div><div class="lbl danger">مسح كل البيانات</div><div class="desc">الإحصائيات والسلسلة والإعدادات</div></div><button class="btn line danger" data-act="clear-all">' + (armed['clear-all'] ? 'تأكيد' : 'مسح') + '</button></div></div>' +
      '<p class="about">أذكاري، الإصدار ١٫٠<br>بياناتك محفوظة على جهازك فقط.<br>مصدر كل ذكر مكتوب تحته.<br>الاقتراح في الرئيسية يعتمد على ساعة جهازك وليس على مواقيت الصلاة.</p>';
  }

  /* ------------------------------------------------------------------ events */
  document.addEventListener('pointerdown', function (e) {
    if (e.button > 0) return;
    if (e.target.closest('#r-tap')) { e.preventDefault(); onTap(); }
    else if (e.target.closest('#f-zone')) { e.preventDefault(); onFreeTap(); }
  });
  document.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    if (e.target.closest && e.target.closest('#r-tap')) { e.preventDefault(); onTap(); }
    else if (e.target.closest && e.target.closest('#f-zone')) { e.preventDefault(); onFreeTap(); }
  });

  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-tab],[data-cat],[data-act],[data-phrase],[data-target],[data-set]');
    if (!t) return;
    if (t.dataset.tab) { show(t.dataset.tab); return; }
    if (t.dataset.cat) { openCat(t.dataset.cat); return; }
    if (t.dataset.phrase !== undefined) { S.free.phrase = +t.dataset.phrase; save(); renderFree(); return; }
    if (t.dataset.target !== undefined) { S.free.target = +t.dataset.target; save(); renderFree(); return; }
    if (t.dataset.set) {
      var v = t.dataset.val;
      S.settings[t.dataset.set] = t.dataset.set === 'size' ? +v : v;
      save(); applyAppearance(); renderSettings(); return;
    }
    switch (t.dataset.act) {
      case 'close': closeReader(); break;
      case 'prev': goPrev(); break;
      case 'next': goNext(); break;
      case 'undo': undo(); break;
      case 'fin-home': lastTab = 'home'; closeReader(); break;
      case 'fin-free': lastTab = 'free'; closeReader(); break;
      case 'fin-again': (function () { var f = $('#fin'); if (f) f.remove(); var d = today(); d.c[R.cat.id] = []; R.i = 0; R.lock = false; save(); renderReader(); })(); break;
      case 'vibrate': S.settings.vibrate = !S.settings.vibrate; save(); renderSettings(); if (S.settings.vibrate) vib(40); break;
      case 'f-reset': if (arm('f-reset')) { S.free.counts[S.free.phrase] = 0; save(); } renderFree(); break;
      case 'clear-today': if (arm('clear-today')) { delete S.days[dkey()]; save(); } renderSettings(); break;
      case 'clear-all': if (arm('clear-all')) { try { localStorage.removeItem(KEY); } catch (er) { } load(); applyAppearance(); } renderSettings(); break;
    }
  });

  document.addEventListener('visibilitychange', function () { if (!document.hidden && view === 'home') renderHome(); });

  /* ------------------------------------------------------------------ boot */
  load();
  applyAppearance();
  show('home');

  if (window.__PWA && 'serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () { }); });
  }
})();
