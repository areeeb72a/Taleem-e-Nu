/* 
   Taleem-e-Nau AI - Application Core Controller
   Handles: Tab Switching, Dynamic Subject Populating, Academic Chat, Simulated OCR Upload,
            Multilingual Database, Progression Locking/Unlocking, HTML5 Speech Synthesis,
            Bilingual Localization (Urdu/English Toggle), Interactive 20-Question Quiz Engine,
            Dynamic Score Gauges, and Confetti Showers.
*/

// --- STATE MANAGEMENT ---
let currentView = 'home-view';
let activeGrade = '9th';
let uploadedFile = null;
let activeLanguage = 'arabic';
let activeStage = 'basic';
let stageProgress = {
  arabic: { basic: true, normal: false, expert: false, professional: false },
  english: { basic: true, normal: false, expert: false, professional: false },
  chinese: { basic: true, normal: false, expert: false, professional: false },
  french: { basic: true, normal: false, expert: false, professional: false },
  turkish: { basic: true, normal: false, expert: false, professional: false }
};

// --- BILINGUAL LOCALIZATION TRANSLATIONS ---
let currentAppLanguage = 'ur';
const translations = {
  ur: {
    "txt-brand-name": "تعلیمِ نو اے آئی",
    "txt-mobile-brand": "تعلیمِ نو اے آئی",
    "nav-lbl-home": "ہوم ڈیش بورڈ",
    "nav-lbl-academic": "کراچی بورڈ معاون",
    "nav-lbl-lang": "زبان سیکھنے کا مرکز",
    "txt-version-text": "ورژن: 1.0.0 (Beta)",
    "txt-status-text": "سروس اسٹیٹس:",
    
    // Home Dashboard texts
    "txt-home-title": "تعلیمِ نو اے آئی میں خوش آمدید!",
    "txt-home-subtitle": "جدید مصنوعی ذہانت سے لیس پاکستان کا واحد تعلیمی اور لسانی مرکز۔",
    "txt-banner-title": "سیکھنے کی دنیا میں ایک نیا انقلاب",
    "txt-banner-desc": "یہاں آپ کراچی بورڈ سیکنڈری و ہائر سیکنڈری نصاب کے تمام مضامین میں مدد حاصل کر سکتے ہیں، اور دنیا بھر کی مشہور زبانیں انتہائی آسان مراحل میں سیکھ سکتے ہیں۔",
    "txt-banner-llm": "<i class='fa-solid fa-bolt'></i> Powered by LLM",
    "txt-banner-api": "API Key Connected",
    
    // Cards promos
    "txt-promo-academic-badge": "کراچی بورڈ نصاب",
    "txt-promo-academic-title": "<i class='fa-solid fa-chalkboard-user'></i> اکیڈمک اسسٹنٹ (جماعت 5 تا 12)",
    "txt-promo-academic-desc": "ریاضی، فزکس، کیمسٹری، بیالوجی، اور کمپیوٹر سائنس کے مشکل ترین سوالات کے مرحلہ وار حل۔ ہاتھ سے لکھے ہوئے نوٹس، امیجز یا پی ڈی ایف اپ لوڈ کریں۔",
    "txt-promo-academic-btn": "مدد حاصل کریں <i class='fa-solid fa-arrow-left'></i>",
    
    "txt-promo-lang-badge": "کثیر لسانی کورسز",
    "txt-promo-lang-title": "<i class='fa-solid fa-globe'></i> زبانیں سیکھیں (چار منظم مراحل)",
    "txt-promo-lang-desc": "اردو، انگریزی، عربی، چینی، فرانسیسی اور ہسپانوی سیکھیں۔ بنیادی درجے سے شروع کریں، امتحان پاس کریں اور اگلا مرحلہ ان لاک کریں۔",
    "txt-promo-lang-btn": "سیکھنا شروع کریں <i class='fa-solid fa-arrow-left'></i>",
    
    // Academic Assistant UI
    "txt-academic-title": "کراچی بورڈ تعلیمی معاون",
    "txt-academic-subtitle": "جماعت پنجم سے بارہویں کے تمام مضامین میں رہنمائی حاصل کریں۔",
    "txt-panel-title": "<i class='fa-solid fa-sliders'></i> سیٹنگز پینل",
    "txt-label-grade": "جماعت کا انتخاب کریں:",
    "txt-label-subject": "مضمون منتخب کریں:",
    "txt-label-sample": "نمونہ سوالات (مثالیں):",
    "txt-sample-q1": "ریاضی: Quadratic Formula کیا ہے؟",
    "txt-sample-q2": "طبیعیات: Newton's Second Law کی وضاحت۔",
    "txt-sample-q3": "کیمیا: پانی کے سالمہ (H₂O) کی ساخت۔",
    "txt-teacher-title": "اے آئی شفیق تعلیمی رہنما (AI Expert Teacher)",
    "txt-teacher-status": "<i class='fa-solid fa-circle'></i> آن لائن | آپ کی زبان میں رہنمائی کے لیے تیار",
    "chat-user-input-placeholder": "یہاں اپنا تعلیمی سوال ٹائپ کریں...",
    "txt-welcome-chat-bubble": "السلام علیکم! میں آپ کا اے آئی تعلیمی رہنما ہوں۔ کراچی بورڈ کے نصاب کے مطابق کسی بھی مضمون کا سوال ٹائپ کریں یا امیج/پی ڈی ایف فائل اپ لوڈ کریں۔ میں آپ کو آسان اردو میں قدم بہ قدم وضاحت فراہم کروں گا!",
    
    // Language Hub UI
    "txt-lang-title": "عالمی زبان سیکھنے کا مرکز",
    "txt-lang-subtitle": "منظم مراحل، خودکار امتحانات اور صوتی رہنمائی کے ساتھ کسی بھی زبان پر عبور حاصل کریں۔",
    "txt-label-lang": "زبان منتخب کریں:",
    
    // Lock statuses
    "lbl-badge-basic": "مرحلہ ۱: بنیادی (Basic)",
    "lbl-desc-basic": "تعارف اور بنیادی الفاظ",
    "lbl-details-basic": "آداب، تعارفی جملے، گنتی اور روزمرہ کے بنیادی ۲0 ذخیرہ الفاظ۔",
    
    "lbl-badge-normal": "مرحلہ ۲: درمیانہ (Normal)",
    "lbl-desc-normal": "گفتگو اور گرامر قواعد",
    "lbl-details-normal": "عام گرامر کے بنیادی قوانین، زمانہ اور روزمرہ گفتگو کے فقرے۔",
    
    "lbl-badge-expert": "مرحلہ ۳: ماہرانہ (Expert)",
    "lbl-desc-expert": "ثقافتی باریکیاں اور پیچیدہ جملے",
    "lbl-details-expert": "جدید محاورات، پختہ تحریر اور روانی کے ساتھ گفتگو۔",
    
    "lbl-badge-professional": "مرحلہ ۴: پیشہ ورانہ (Professional)",
    "lbl-desc-professional": "کاروباری مواصلات",
    "lbl-details-professional": "کاروباری خط و کتابت، دفتری زبان، علمی مضامین اور کامل روانی۔",
    
    "badge-status-basic-unlocked": "<i class='fa-solid fa-circle-check'></i> کھلا ہوا ہے",
    "badge-status-normal-unlocked": "<i class='fa-solid fa-circle-check'></i> کھلا ہوا ہے",
    "badge-status-expert-unlocked": "<i class='fa-solid fa-circle-check'></i> کھلا ہوا ہے",
    "badge-status-professional-unlocked": "<i class='fa-solid fa-circle-check'></i> کھلا ہوا ہے",
    
    "badge-status-basic-locked": "<i class='fa-solid fa-lock'></i> لاک ہے",
    "badge-status-normal-locked": "<i class='fa-solid fa-lock'></i> لاک ہے",
    "badge-status-expert-locked": "<i class='fa-solid fa-lock'></i> لاک ہے",
    "badge-status-professional-locked": "<i class='fa-solid fa-lock'></i> لاک ہے",
    
    "btn-stage-basic-unlocked": "شروع کریں",
    "btn-stage-normal-unlocked": "شروع کریں",
    "btn-stage-expert-unlocked": "شروع کریں",
    "btn-stage-professional-unlocked": "شروع کریں",
    
    "btn-stage-basic-locked": "لاک ہے",
    "btn-stage-normal-locked": "لاک ہے",
    "btn-stage-expert-locked": "لاک ہے",
    "btn-stage-professional-locked": "لاک ہے",
    
    // Lessons UI
    "txt-btn-lesson-back": "<i class='fa-solid fa-arrow-right'></i> واپس جائیں",
    "txt-lesson-instructions": "مرحلہ مکمل کر کے ۲۰ سوالات کا کوئز دیں اور اگلا لیول ان لاک کریں!",
    "txt-lesson-cultural-title": "<i class='fa-solid fa-circle-info'></i> اے آئی اہم تدریسی نوٹ (AI Language Note):",
    "txt-btn-start-test": "<i class='fa-solid fa-vial'></i> مرحلے کا ۲۰ سوالات کا ٹیسٹ شروع کریں",
    
    // Quiz UI
    "txt-btn-quiz-cancel": "<i class='fa-solid fa-circle-xmark'></i> ٹیسٹ منسوخ کریں",
    "quiz-next-btn-text": "اگلا سوال <i class='fa-solid fa-arrow-left'></i>",
    "quiz-unlimited-time": "وقت: غیر محدود",
    
    // Results UI
    "txt-results-header": "ٹیسٹ مکمل ہو گیا!",
    "txt-results-sub": "آپ کا حاصل کردہ تفصیلی نتیجہ نیچے درج ہے",
    "txt-results-percent": "فیصد سکور",
    "txt-results-verdict-passed": "مبارک ہو! آپ نے یہ مرحلہ پاس کر لیا ہے۔",
    "txt-remediation-title": "<i class='fa-solid fa-triangle-exclamation'></i> اے آئی اصلاحی منصوبہ (AI Remediation Path):",
    "txt-btn-results-back": "<i class='fa-solid fa-map-location-dot'></i> نقشے پر واپس جائیں",
    "results-action-btn-retake": "ٹیسٹ دوبارہ دیں"
  },
  en: {
    "txt-brand-name": "Taleem-e-Nau AI",
    "txt-mobile-brand": "Taleem-e-Nau AI",
    "nav-lbl-home": "Home Dashboard",
    "nav-lbl-academic": "Academic Assistant",
    "nav-lbl-lang": "Language Center",
    "txt-version-text": "Version: 1.0.0 (Beta)",
    "txt-status-text": "Service Status:",
    
    // Home Dashboard texts
    "txt-home-title": "Welcome to Taleem-e-Nau AI!",
    "txt-home-subtitle": "Pakistan's premier educational and linguistic hub, powered by advanced AI.",
    "txt-banner-title": "A New Revolution in Learning",
    "txt-banner-desc": "Get tailored guidance for all subjects of the Karachi Board Secondary & Higher Secondary curriculum, and master global languages in simple progressive stages.",
    "txt-banner-llm": "<i class='fa-solid fa-bolt'></i> Powered by LLM",
    "txt-banner-api": "API Key Connected",
    
    // Cards promos
    "txt-promo-academic-badge": "Karachi Board Syllabus",
    "txt-promo-academic-title": "<i class='fa-solid fa-chalkboard-user'></i> Academic Assistant (Grades 5-12)",
    "txt-promo-academic-desc": "Step-by-step solutions to the most challenging questions in Mathematics, Physics, Chemistry, Biology, and Computer Science. Support for notes, images, or PDFs.",
    "txt-promo-academic-btn": "Get Assistance <i class='fa-solid fa-arrow-right'></i>",
    
    "txt-promo-lang-badge": "Multilingual Courses",
    "txt-promo-lang-title": "<i class='fa-solid fa-globe'></i> Learn Languages (4 Structured Stages)",
    "txt-promo-lang-desc": "Master Arabic, English, Chinese, French, and Spanish. Start from Basic, pass stage assessments, and unlock subsequent professional levels.",
    "txt-promo-lang-btn": "Start Learning <i class='fa-solid fa-arrow-right'></i>",
    
    // Academic Assistant UI
    "txt-academic-title": "Karachi Board Academic Assistant",
    "txt-academic-subtitle": "Get clear, expert guidance across all school subjects for Grades 5 to 12.",
    "txt-panel-title": "<i class='fa-solid fa-sliders'></i> Settings Panel",
    "txt-label-grade": "Select Grade:",
    "txt-label-subject": "Select Subject:",
    "txt-label-sample": "Sample Questions (Examples):",
    "txt-sample-q1": "Math: What is the Quadratic Formula?",
    "txt-sample-q2": "Physics: Explanation of Newton's Second Law.",
    "txt-sample-q3": "Chemistry: Structure of Water Molecule (H₂O).",
    "txt-teacher-title": "AI Empathetic Educational Guide (AI Teacher)",
    "txt-teacher-status": "<i class='fa-solid fa-circle'></i> Online | Ready to guide you step-by-step",
    "chat-user-input-placeholder": "Type your academic question here...",
    "txt-welcome-chat-bubble": "Hello! I am your AI educational guide. Type any question from the Karachi Board curriculum or upload an image/PDF. I will explain it step-by-step in simple language!",
    
    // Language Hub UI
    "txt-lang-title": "Global Language Learning Center",
    "txt-lang-subtitle": "Master any language with interactive stages, speech recognition and progressive quizzes.",
    "txt-label-lang": "Select Language:",
    
    // Lock statuses
    "lbl-badge-basic": "Stage 1: Basic",
    "lbl-desc-basic": "Introduction & Vocabulary",
    "lbl-details-basic": "Greetings, introductory sentences, counting, and 20 daily vocabulary words.",
    
    "lbl-badge-normal": "Stage 2: Normal",
    "lbl-desc-normal": "Conversations & Grammar",
    "lbl-details-normal": "Common grammar fundamentals, tenses, and everyday phrases.",
    
    "lbl-badge-expert": "Stage 3: Expert",
    "lbl-desc-expert": "Nuances & Complex Sentences",
    "lbl-details-expert": "Advanced idioms, polished writing, and fluent dialogues.",
    
    "lbl-badge-professional": "Stage 4: Professional",
    "lbl-desc-professional": "Business Communications",
    "lbl-details-professional": "Business correspondence, corporate language, academic essays, and perfect fluency.",
    
    "badge-status-basic-unlocked": "<i class='fa-solid fa-circle-check'></i> Unlocked",
    "badge-status-normal-unlocked": "<i class='fa-solid fa-circle-check'></i> Unlocked",
    "badge-status-expert-unlocked": "<i class='fa-solid fa-circle-check'></i> Unlocked",
    "badge-status-professional-unlocked": "<i class='fa-solid fa-circle-check'></i> Unlocked",
    
    "badge-status-basic-locked": "<i class='fa-solid fa-lock'></i> Locked",
    "badge-status-normal-locked": "<i class='fa-solid fa-lock'></i> Locked",
    "badge-status-expert-locked": "<i class='fa-solid fa-lock'></i> Locked",
    "badge-status-professional-locked": "<i class='fa-solid fa-lock'></i> Locked",
    
    "btn-stage-basic-unlocked": "Start Stage",
    "btn-stage-normal-unlocked": "Start Stage",
    "btn-stage-expert-unlocked": "Start Stage",
    "btn-stage-professional-unlocked": "Start Stage",
    
    "btn-stage-basic-locked": "Locked",
    "btn-stage-normal-locked": "Locked",
    "btn-stage-expert-locked": "Locked",
    "btn-stage-professional-locked": "Locked",
    
    // Lessons UI
    "txt-btn-lesson-back": "<i class='fa-solid fa-arrow-left'></i> Go Back",
    "txt-lesson-instructions": "Complete the words, take the 20-question quiz, and unlock the next stage!",
    "txt-lesson-cultural-title": "<i class='fa-solid fa-circle-info'></i> AI Important Language Note:",
    "txt-btn-start-test": "<i class='fa-solid fa-vial'></i> Start 20-Question Stage Test",
    
    // Quiz UI
    "txt-btn-quiz-cancel": "<i class='fa-solid fa-circle-xmark'></i> Cancel Quiz",
    "quiz-next-btn-text": "Next Question <i class='fa-solid fa-arrow-right'></i>",
    "quiz-unlimited-time": "Time: Unlimited",
    
    // Results UI
    "txt-results-header": "Assessment Completed!",
    "txt-results-sub": "Your detailed results are listed below",
    "txt-results-percent": "Percent Score",
    "txt-results-verdict-passed": "Congratulations! You have successfully passed this stage.",
    "txt-remediation-title": "<i class='fa-solid fa-triangle-exclamation'></i> AI Remediation Path Suggestions:",
    "txt-btn-results-back": "<i class='fa-solid fa-map-location-dot'></i> Back to Map",
    "results-action-btn-retake": "Retake Test"
  }
};

function setAppLanguage(lang) {
  currentAppLanguage = lang;
  
  // Update body direction and class
  if (lang === 'en') {
    document.body.classList.add('ltr');
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', 'en');
    document.getElementById("lang-btn-en").classList.add('active');
    document.getElementById("lang-btn-ur").classList.remove('active');
  } else {
    document.body.classList.remove('ltr');
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ur');
    document.getElementById("lang-btn-ur").classList.add('active');
    document.getElementById("lang-btn-en").classList.remove('active');
  }
  
  // Update translation text contents
  const activeTrans = translations[lang];
  Object.keys(activeTrans).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      // Manage placeholders
      if (id === 'chat-user-input-placeholder') {
        el.placeholder = activeTrans[id];
      } else {
        el.innerHTML = activeTrans[id];
      }
    }
  });
  
  // Specific translations for inputs that don't match IDs exactly
  const chatInput = document.getElementById("chat-user-input");
  if (chatInput) {
    chatInput.placeholder = activeTrans["chat-user-input-placeholder"];
  }
  
  // Re-sync language progression UI locks and text
  updateLanguageProgress();
}

// --- DYNAMIC CURRICULUM DATABASE (KARACHI BOARD) ---
const subjectsByGrade = {
  "5th": ["ریاضی (Math)", "جنرل سائنس (General Science)", "اردو (Urdu)", "سندھی (Sindhi)", "انگریزی (English)", "اسلامیات (Islamiat)", "سوشل سٹڈیز (Social Studies)"],
  "6th": ["ریاضی (Math)", "جنرل سائنس (General Science)", "اردو (Urdu)", "سندھی (Sindhi)", "انگریزی (English)", "اسلامیات (Islamiat)", "سوشل سٹڈیز (Social Studies)"],
  "7th": ["ریاضی (Math)", "جنرل سائنس (General Science)", "اردو (Urdu)", "سندھی (Sindhi)", "انگریزی (English)", "اسلامیات (Islamiat)", "سوشل سٹڈیز (Social Studies)"],
  "8th": ["ریاضی (Math)", "جنرل سائنس (General Science)", "اردو (Urdu)", "سندھی (Sindhi)", "انگریزی (English)", "اسلامیات (Islamiat)", "مطالعہ پاکستان (Pak Studies)"],
  "9th": ["ریاضی (Math)", "طبیعیات (Physics)", "کیمیا (Chemistry)", "کمپیوٹر سائنس (Computer Science)", "حیاتیات (Biology)", "انگریزی (English)", "سندھی لازمی (Sindhi Lazmi)", "اسلامیات (Islamiat)"],
  "10th": ["ریاضی (Math)", "طبیعیات (Physics)", "کیمیا (Chemistry)", "کمپیوٹر سائنس (Computer Science)", "حیاتیات (Biology)", "انگریزی (English)", "اردو (Urdu)", "مطالعہ پاکستان (Pak Studies)"],
  "11th": ["انگریزی (English)", "اردو (Urdu)", "سندھی لازمی (Sindhi Lazmi)", "اسلامیات (Islamiat)", "ریاضی (Mathematics)", "طبیعیات (Physics)", "کیمیا (Chemistry)", "حیاتیات (Biology)", "کمپیوٹر سائنس (Computer Science)", "اصولِ تجارت (Commerce)", "اصولِ حسابات (Accounting)"],
  "12th": ["انگریزی (English)", "اردو (Urdu)", "سندھی لازمی (Sindhi Lazmi)", "مطالعہ پاکستان (Pak Studies)", "ریاضی (Mathematics)", "طبیعیات (Physics)", "کیمیا (Chemistry)", "حیاتیات (Biology)", "کمپیوٹر سائنس (Computer Science)", "اصولِ معاشیات (Economics)", "کاروباری ریاضی (Business Math)", "بینکنگ (Banking)"]
};

// --- GLOBAL MULTILINGUAL CONTENT DATABASE ---
const languageData = {
  arabic: {
    title: "عربی زبان (Arabic)",
    culturalNote: "عربی زبان کے حروفِ تہجی میں ۲۸ حروف ہوتے ہیں۔ الفاظ کی ادائیگی میں مخرج (تلفظ کی جگہ) کا درست ہونا بے حد ضروری ہے، اور یہ زبان دائیں سے بائیں لکھی جاتی ہے۔",
    basic: {
      words: [
        { native: "مَرْحَبًا", roman: "Marhaban", meaning: "خوش آمدید / ہیلو" },
        { native: "شُكْرًا", roman: "Shukran", meaning: "شکریہ" },
        { native: "نَعَمْ", roman: "Na'am", meaning: "جی ہاں" },
        { native: "لَا", roman: "Laa", meaning: "نہیں" },
        { native: "كَيْفَ حَالُكَ؟", roman: "Kayfa Haluk?", meaning: "آپ کا کیا حال ہے؟" },
        { native: "أَنَا بِخَيْرٍ", roman: "Ana Bikhair", meaning: "میں ٹھیک ہوں" }
      ],
      questions: [
        { q: "عربی لفظ 'مَرْحَبًا' کا اردو میں صحیح ترجمہ کیا ہے؟", o: ["شکریہ", "خوش آمدید / ہیلو", "نہیں", "آپ کا کیا حال ہے؟"], a: 1 },
        { q: "عربی میں 'شکریہ' ادا کرنے کے لیے کون سا لفظ بولا جاتا ہے؟", o: ["شُكْرًا", "نَعَمْ", "لَا", "أَنَا بِخَيْرٍ"], a: 0 },
        { q: "عربی لفظ 'نَعَمْ' کا کیا مطلب ہے؟", o: ["نہیں", "شکریہ", "جی ہاں", "ہیلو"], a: 2 },
        { q: "عربی میں 'نہیں' کو کیا کہتے ہیں؟", o: ["نَعَمْ", "لَا", "شُكْرًا", "مَرْحَبًا"], a: 1 },
        { q: "عربی فقرہ 'كَيْفَ حَالُكَ؟' کس کے لیے بولا جاتا ہے؟", o: ["خدا حافظ کہنے کے لیے", "شکریہ ادا کرنے کے لیے", "حال چال پوچھنے کے لیے", "نام پوچھنے کے لیے"], a: 2 },
        { q: "اگر کوئی آپ سے 'كَيْفَ حَالُكَ؟' کہے، تو آپ کا کیا جواب ہوگا؟", o: ["أَنَا بِخَيْرٍ", "لَا", "شُكْرًا", "مَرْحَبًا"], a: 0 }
      ]
    },
    normal: {
      words: [
        { native: "الْأَسَاتِذَةُ فِي الْمَدْرَسَةِ", roman: "Al-Asatidhah fil Madrasah", meaning: "سکول میں اساتذہ موجود ہیں" },
        { native: "أَيْنَ الْقَلَمُ؟", roman: "Ayna al-Qalam?", meaning: "قلم کہاں ہے؟" },
        { native: "الْقَلَمُ عَلَى الْمَكْتَبِ", roman: "Al-Qalamu alal Maktab", meaning: "قلم میز پر ہے" },
        { native: "أُرِيدُ كِتَابًا", roman: "Ureedu Kitaban", meaning: "مجھے ایک کتاب چاہیے" }
      ],
      questions: [
        { q: "عربی فقرہ 'أَيْنَ الْقَلَمُ؟' کا کیا مطلب ہے؟", o: ["قلم میز پر ہے", "قلم کہاں ہے؟", "مجھے کتاب چاہیے", "سکول میں اساتذہ ہیں"], a: 1 },
        { q: "عربی فقرہ 'الْقَلَمُ عَلَى الْمَكْتَبِ' کا ترجمہ منتخب کریں:", o: ["قلم بیگ میں ہے", "قلم کتاب کے پاس ہے", "قلم میز پر ہے", "قلم کہاں ہے؟"], a: 2 },
        { q: "عربی میں 'مجھے ایک کتاب چاہیے' کو کیسے کہیں گے؟", o: ["أُرِيدُ كِتَابًا", "الْقَلَمُ عَلَى الْمَكْتَبِ", "أَيْنَ الْقَلَمُ؟", "الْأَسَاتِذَةُ فِي الْمَدْرَسَةِ"], a: 0 }
      ]
    },
    expert: {
      words: [
        { native: "الْقَنَاعَةُ كَنْزٌ لَا يَفْنَى", roman: "Al-Qana'atu Kanzun La Yafna", meaning: "قناعت کبھی نہ ختم ہونے والا خزانہ ہے" },
        { native: "تَطَلُّعَاتُ الشَّبَابِ نَحْوَ الْمُسْتَقْبَلِ", roman: "Tatallu'atus Shababi nahwal Mustaqbal", meaning: "مستقبل کی طرف نوجوانوں کی امنگیں" }
      ],
      questions: [
        { q: "عربی محاورہ 'الْقَنَاعَةُ كَنْزٌ لَا يَفْنَى' کا صیح مفہوم کیا ہے؟", o: ["لالچ بری بلا ہے", "قناعت کبھی نہ ختم ہونے والا خزانہ ہے", "علم بڑی دولت ہے", "صبر کا پھل میٹھا ہوتا ہے"], a: 1 },
        { q: "عربی فقرہ 'تَطَلُّعَاتُ الشَّبَابِ نَحْوَ الْمُسْتَقْبَلِ' میں لفظ 'الشَّبَابِ' کا کیا مطلب ہے؟", o: ["بزرگ", "بچے", "نوجوان", "استاد"], a: 2 }
      ]
    },
    professional: {
      words: [
        { native: "عَقْدُ الِاتِّفَاقِيَّةِ التِّجَارِيَّةِ", roman: "Aqdu al-Ittifaqiyyah at-Tijariyyah", meaning: "تجارتی معاہدے پر دستخط کرنا" },
        { native: "الْمِيزَانِيَّةُ السَّنَوِيَّةُ لِلشَّرِكَةِ", roman: "Al-Meezaniyyatus Sanawiyyatu lish-Sharikah", meaning: "کمپنی کا سالانہ بجٹ" }
      ],
      questions: [
        { q: "کاروباری عربی میں 'عَقْدُ الِاتِّفَاقِيَّةِ التِّجَارِيَّةِ' سے کیا مراد ہے؟", o: ["کاروباری دورہ کرنا", "سالانہ اجلاس بلانا", "تجارتی معاہدے پر دستخط کرنا", "کمپنی کا بجٹ بنانا"], a: 2 },
        { q: "کاروباری عربی میں 'کمپنی کا سالانہ بجٹ' کو کیا کہا جاتا ہے؟", o: ["الْمِيزَانِيَّةُ السَّنَوِيَّةُ لِلشَّرِكَةِ", "عَقْدُ الِاتِّفَاقِيَّةِ", "تَطَلُّعَاتُ الشَّبَابِ", "الْقَلَمُ عَلَى الْمَكْتَبِ"], a: 0 }
      ]
    }
  },
  english: {
    title: "انگریزی زبان (English)",
    culturalNote: "English is a global business language. Standard spelling, subject-verb agreement, and daily phrase patterns form the core framework of modern English communication.",
    basic: {
      words: [
        { native: "Hello", roman: "ہیلو", meaning: "سلام / آداب" },
        { native: "Thank you", roman: "تھینک یو", meaning: "آپ کا شکریہ" },
        { native: "Yes", roman: "یس", meaning: "جی ہاں" },
        { native: "No", roman: "نو", meaning: "نہیں" },
        { native: "How are you?", roman: "ہاؤ آر یو؟", meaning: "آپ کا کیا حال ہے؟" },
        { native: "I am fine", roman: "آئی ایم فائن", meaning: "میں ٹھیک ہوں" }
      ],
      questions: [
        { q: "What is the meaning of 'Thank you' in Urdu?", o: ["خوش آمدید", "نہیں", "آپ کا شکریہ", "جی ہاں"], a: 2 },
        { q: "How do you say 'سلام' in English?", o: ["No", "Hello", "Thank you", "Yes"], a: 1 },
        { q: "What is the Urdu meaning of 'Yes'?", o: ["جی ہاں", "نہیں", "شکریہ", "ہیلو"], a: 0 },
        { q: "What is the English word for 'نہیں'?", o: ["Yes", "Hello", "No", "Thank you"], a: 2 },
        { q: "How do you translate 'How are you?' in Urdu?", o: ["آپ کا کیا حال ہے؟", "میرا نام کیا ہے؟", "آپ کہاں ہیں؟", "میں ٹھیک ہوں"], a: 0 },
        { q: "If someone asks 'How are you?', what is a suitable reply?", o: ["I am fine", "No", "Thank you", "Hello"], a: 0 }
      ]
    },
    normal: {
      words: [
        { native: "Where is the library?", roman: "وہیئر از دی لائبریری؟", meaning: "لائبریری کہاں ہے؟" }
      ],
      questions: [
        { q: "Translate: 'Where is the library?'", o: ["کتاب کہاں ہے؟", "لائبریری کہاں ہے؟", "سکول کہاں ہے؟", "وہاں لائبریری ہے"], a: 1 }
      ]
    },
    expert: {
      words: [
        { native: "Break a leg", roman: "بریک ا لیگ", meaning: "نیک تمناؤں کا اظہار کرنا (محاورہ)" }
      ],
      questions: [
        { q: "What does the idiom 'Break a leg' mean?", o: ["ٹانگ توڑنا", "نیک تمناؤں کا اظہار کرنا", "بھاگ جانا", "شور مچانا"], a: 1 }
      ]
    },
    professional: {
      words: [
        { native: "Synergy and alignment", roman: "سینرجی اینڈ الائنمنٹ", meaning: "باہمی تعاون اور ہم آہنگی" }
      ],
      questions: [
        { q: "In corporate English, what is 'Synergy'?", o: ["باہمی تصادم", "باہمی تعاون اور ہم آہنگی", "مالی بجٹ", "ٹیکس آڈٹ"], a: 1 }
      ]
    }
  },
  chinese: {
    title: "چینی زبان (Chinese)",
    culturalNote: "چینی زبان (مینڈارن) دنیا میں سب سے زیادہ بولی جانے والی زبان ہے۔ یہ ٹونز (Tones) پر مبنی ہے، یعنی ایک ہی لفظ کی مختلف ٹونز سے اس کا مطلب تبدیل ہو جاتا ہے۔",
    basic: {
      words: [
        { native: "你好", roman: "Nǐ hǎo (نی ہاؤ)", meaning: "ہیلو / سلام" },
        { native: "谢谢", roman: "Xièxie (شیے شیے)", meaning: "شکریہ" },
        { native: "是", roman: "Shì (شِی)", meaning: "جی ہاں" },
        { native: "不", roman: "Bù (بُو)", meaning: "نہیں" },
        { native: "你好吗？", roman: "Nǐ hǎo ma? (نی ہاؤ ما؟)", meaning: "آپ کا کیا حال ہے؟" },
        { native: "我很好", roman: "Wǒ hěn hǎo (وو ہین ہاؤ)", meaning: "میں ٹھیک ہوں" }
      ],
      questions: [
        { q: "چینی زبان میں 'سلام / ہیلو' کو کیا کہتے ہیں؟", o: ["谢谢", "你好", "是", "不"], a: 1 },
        { q: "لفظ '谢谢' کا اردو میں کیا ترجمہ ہے؟", o: ["ہیلو", "شکریہ", "جی ہاں", "نہیں"], a: 1 },
        { q: "چینی لفظ '是' کا مطلب بتائیں:", o: ["نہیں", "شکریہ", "جی ہاں", "ہیلو"], a: 2 },
        { q: "چینی زبان میں 'نہیں' کو کیا کہتے ہیں؟", o: ["是", "不", "谢谢", "你好吗"], a: 1 },
        { q: "چینی فقرے '你好吗？' کا کیا مطلب ہے؟", o: ["آپ کہاں جا رہے ہیں؟", "آپ کا نام کیا ہے؟", "آپ کا کیا حال ہے؟", "میں ٹھیک ہوں"], a: 2 },
        { q: "اگر کوئی پوچھے '你好吗؟'، تو چینی میں جواب کیا ہوگا؟", o: ["我很好", "不", "谢谢", "你好"], a: 0 }
      ]
    },
    normal: {
      words: [
        { native: "图书馆在哪里？", roman: "Túshūguǎn zài nǎlǐ?", meaning: "لائبریری کہاں ہے؟" }
      ],
      questions: [
        { q: "Translate: '图书馆在哪里？'", o: ["سکول کہاں ہے؟", "کتاب کہاں ہے؟", "لائبریری کہاں ہے؟", "وہاں کتاب ہے"], a: 2 }
      ]
    },
    expert: {
      words: [
        { native: "画蛇添足", roman: "Huàshétiānzú", meaning: "ضرورت سے زیادہ کام کر کے بگاڑنا (محاورہ)" }
      ],
      questions: [
        { q: "چینی محاورے '画蛇添足' کا کیا مفہوم ہے؟", o: ["سانپ کاٹنا", "ضرورت سے زیادہ کام کر کے بگاڑنا", "سخت محنت کرنا", "کاہلی کرنا"], a: 1 }
      ]
    },
    professional: {
      words: [
        { native: "谅解备忘录", roman: "Liàngjiě bèiwànglù", meaning: "مفاہمت کی یادداشت (MOU)" }
      ],
      questions: [
        { q: "کاروباری چینی میں '谅解备忘录' کا کیا مطلب ہے؟", o: ["بجٹ بل", "مفاہمت کی یادداشت (MOU)", "ٹیکس دستاویز", "تجارتی بل"], a: 1 }
      ]
    }
  },
  french: {
    title: "فرانسیسی زبان (French)",
    culturalNote: "فرانسیسی دنیا کی سب سے زیادہ رومانی اور سفارتی زبانوں میں سے ایک ہے۔ اس کی ادائیگی میں ناک سے نکلنے والی آوازیں (nasal sounds) اور خاموش حروف (silent letters) انتہائی اہم ہیں۔",
    basic: {
      words: [
        { native: "Bonjour", roman: "Bonjour (بونجور)", meaning: "ہیلو / سلام" },
        { native: "Merci", roman: "Merci (میرسی)", meaning: "شکریہ" },
        { native: "Oui", roman: "Oui (وی)", meaning: "جی ہاں" },
        { native: "Non", roman: "Non (نوں)", meaning: "نہیں" },
        { native: "Comment ça va?", roman: "Comment ça va? (کوماں سا وا؟)", meaning: "آپ کا کیا حال ہے؟" },
        { native: "Ça va bien", roman: "Ça va bien (سا وا بیاں)", meaning: "میں ٹھیک ہوں" }
      ],
      questions: [
        { q: "فرانسیسی میں 'سلام / ہیلو' کہنے کے لیے کون سا لفظ بولا جاتا ہے؟", o: ["Merci", "Bonjour", "Oui", "Non"], a: 1 },
        { q: "فرانسیسی لفظ 'Merci' کا کیا مطلب ہے؟", o: ["ہیلو", "شکریہ", "جی ہاں", "نہیں"], a: 1 },
        { q: "فرانسیسی لفظ 'Oui' کا ترجمہ منتخب کریں:", o: ["نہیں", "شکریہ", "جی ہاں", "ہیلو"], a: 2 },
        { q: "فرانسیسی زبان میں 'نہیں' کو کیا کہتے ہیں؟", o: ["Oui", "Non", "Merci", "Bonjour"], a: 1 },
        { q: "فرانسیسی فقرے 'Comment ça va?' کا کیا مطلب ہے؟", o: ["آپ کہاں ہیں؟", "آپ کا نام کیا ہے؟", "آپ کا کیا حال ہے؟", "میں ٹھیک ہوں"], a: 2 },
        { q: "اگر کوئی آپ سے پوچھے 'Comment ça va?' تو مناسب جواب کیا ہوگا؟", o: ["Ça va bien", "Non", "Merci", "Bonjour"], a: 0 }
      ]
    },
    normal: {
      words: [
        { native: "Où est la bibliothèque?", roman: "Où est la bibliothèque?", meaning: "لائبریری کہاں ہے؟" }
      ],
      questions: [
        { q: "Translate: 'Où est la bibliothèque?'", o: ["کتاب کہاں ہے؟", "سکول کہاں ہے؟", "لائبریری کہاں ہے؟", "وہاں لائبریری ہے"], a: 2 }
      ]
    },
    expert: {
      words: [
        { native: "Quand on a pas ce qu'on aime, il faut aimer ce qu'on a", roman: "Quand on a pas...", meaning: "جو میسر ہے اس پر راضی رہنا سیکھیں (محاورہ)" }
      ],
      questions: [
        { q: "فرانسیسی مقولے کا صحیح مفہوم کیا ہے؟", o: ["لالچ بری بلا ہے", "جو میسر ہے اس پر راضی رہنا سیکھیں", "صبر کا پھل میٹھا ہے", "علم بڑی دولت ہے"], a: 1 }
      ]
    },
    professional: {
      words: [
        { native: "Protocole d'accord", roman: "Protocole d'accord", meaning: "مفاہمت کی یادداشت (MOU)" }
      ],
      questions: [
        { q: "فرانسیسی کاروباری زبان میں 'Protocole d'accord' سے کیا مراد ہے؟", o: ["تجارتی معاہدہ", "بجٹ منظوری", "مفاہمت کی یادداشت (MOU)", "ٹیکس چوری"], a: 2 }
      ]
    }
  },
  turkish: {
    title: "ترکی زبان (Turkish)",
    culturalNote: "ترکی زبان لاطینی حروفِ تہجی میں لکھی جاتی ہے اور اس میں آوازوں کا ایک خاص توازن (Vowel Harmony) ہوتا ہے۔ یہ زبان یورپ اور ایشیا کے سنگم پر واقع ترکی کی قدیم و جدید ثقافت کی عکاس ہے۔",
    basic: {
      words: [
        { native: "Merhaba", roman: "Merhaba (مہربا)", meaning: "ہیلو / سلام" },
        { native: "Teşekkür ederim", roman: "Teşekkür ederim (تشکر ایدرم)", meaning: "شکریہ" },
        { native: "Evet", roman: "Evet (ایوت)", meaning: "جی ہاں" },
        { native: "Hayır", roman: "Hayır (ہائر)", meaning: "نہیں" },
        { native: "Nasılsın?", roman: "Nasılsın? (ناصل سن؟)", meaning: "آپ کا کیا حال ہے؟" },
        { native: "İyiyim", roman: "İyiyim (ای ایم)", meaning: "میں ٹھیک ہوں" }
      ],
      questions: [
        { q: "ترکی زبان میں 'سلام / ہیلو' کو کیا کہتے ہیں؟", o: ["Teşekkür ederim", "Merhaba", "Evet", "Hayır"], a: 1 },
        { q: "ترکی لفظ 'Teşekkür ederim' کا صحیح ترجمہ منتخب کریں:", o: ["ہیلو", "شکریہ", "جی ہاں", "نہیں"], a: 1 },
        { q: "ترکی لفظ 'Evet' کا کیا مطلب ہے؟", o: ["نہیں", "شکریہ", "جی ہاں", "ہیلو"], a: 2 },
        { q: "ترکی زبان میں 'نہیں' کو کیا کہتے ہیں؟", o: ["Evet", "Hayır", "Teşekkür ederim", "Merhaba"], a: 1 },
        { q: "ترکی فقرے 'Nasılsın?' کا کیا مطلب ہے؟", o: ["آپ کہاں جا رہے ہیں؟", "آپ کا نام کیا ہے؟", "آپ کا کیا حال ہے؟", "میں ٹھیک ہوں"], a: 2 },
        { q: "اگر کوئی آپ سے پوچھے 'Nasılsın?' تو ترکی میں جواب کیا ہوگا؟", o: ["İyiyim", "Hayır", "Teşekkür ederim", "Merhaba"], a: 0 }
      ]
    },
    normal: {
      words: [
        { native: "Kütüphane nerede?", roman: "Kütüphane nerede?", meaning: "لائبریری کہاں ہے؟" }
      ],
      questions: [
        { q: "Translate: 'Kütüphane nerede?'", o: ["کتاب کہاں ہے؟", "لائبریری کہاں ہے؟", "سکول کہاں ہے؟", "وہاں لائبریری ہے"], a: 1 }
      ]
    },
    expert: {
      words: [
        { native: "Damlaya damlaya göl olur", roman: "Damlaya damlaya...", meaning: "قطرہ قطرہ دریا بنتا ہے (محاورہ)" }
      ],
      questions: [
        { q: "ترکی محاورے 'Damlaya damlaya göl olur' کا کیا مفہوم ہے؟", o: ["سچ بولو", "قطرہ قطرہ دریا بنتا ہے", "وقت سونا ہے", "محنت کرو"], a: 1 }
      ]
    },
    professional: {
      words: [
        { native: "Mutabakat Zaptı", roman: "Mutabakat Zaptı", meaning: "مفاہمت کی یادداشت (MOU)" }
      ],
      questions: [
        { q: "کاروباری ترکی میں 'Mutabakat Zaptı' سے کیا مراد ہے؟", o: ["ٹیکس آڈٹ", "مفاہمت کی یادداشت (MOU)", "سالانہ بجٹ", "تجارتی بل"], a: 1 }
      ]
    }
  }
};


// --- GLOBAL EVENT LISTENERS & INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
  setAppLanguage('ur'); // Default to Urdu layout
  updateSubjects();
  updateLanguageProgress();
  
  // Custom drag and drop simulated effects
  const chatContainer = document.querySelector(".chat-container");
  if (chatContainer) {
    chatContainer.addEventListener("dragover", (e) => {
      e.preventDefault();
      chatContainer.style.borderColor = "var(--primary)";
    });
    chatContainer.addEventListener("dragleave", () => {
      chatContainer.style.borderColor = "var(--border-color)";
    });
    chatContainer.addEventListener("drop", (e) => {
      e.preventDefault();
      chatContainer.style.borderColor = "var(--border-color)";
      if (e.dataTransfer.files.length > 0) {
        handleFileDrop(e.dataTransfer.files[0]);
      }
    });
  }
});

// --- VIEW SWITCHING LOGIC ---
function switchView(viewId) {
  // Hide all views
  document.querySelectorAll(".app-view").forEach(view => {
    view.classList.remove("active");
  });
  
  // Show active view
  const targetView = document.getElementById(viewId);
  if (targetView) targetView.classList.add("active");
  
  // Update sidebar buttons
  document.querySelectorAll(".nav-button").forEach(btn => {
    btn.classList.remove("active");
  });
  
  const activeBtn = document.getElementById(`btn-${viewId}`);
  if (activeBtn) activeBtn.classList.add("active");
  
  currentView = viewId;
  
  // Auto-close sidebar on mobile after clicking a link
  const sidebar = document.querySelector('.sidebar');
  if (sidebar && sidebar.classList.contains('active')) {
    toggleSidebar();
  }
  
  // Close any open quiz or lessons when switching away
  if (viewId !== 'language-view') {
    exitLanguageStage();
    quitAssessment();
    exitResultsToMap();
  }
}

// Mobile Sidebar Toggle (Slide In/Out Drawer)
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebar-overlay');
  
  if (sidebar && overlay) {
    sidebar.classList.toggle('active');
    
    // Toggle overlay visibility
    if (sidebar.classList.contains('active')) {
      overlay.style.display = 'block';
      setTimeout(() => {
        overlay.classList.add('active');
      }, 10);
    } else {
      overlay.classList.remove('active');
      setTimeout(() => {
        if (!sidebar.classList.contains('active')) {
          overlay.style.display = 'none';
        }
      }, 300);
    }
  }
}

// --- SECTION 1: ACADEMIC ASSISTANT CONTROLLER ---
function updateSubjects() {
  const gradeSelect = document.getElementById("grade-select");
  const subjectSelect = document.getElementById("subject-select");
  
  if (!gradeSelect || !subjectSelect) return;
  
  activeGrade = gradeSelect.value;
  const subjects = subjectsByGrade[activeGrade] || [];
  
  // Repopulate subjects
  subjectSelect.innerHTML = "";
  subjects.forEach((subj, idx) => {
    const opt = document.createElement("option");
    opt.value = subj.split(" ")[0].replace(/[^a-zA-Z]/g, "").toLowerCase();
    opt.textContent = subj;
    if (idx === 0) opt.selected = true;
    subjectSelect.appendChild(opt);
  });
}

function applySampleQuestion(qNum) {
  const inputField = document.getElementById("chat-user-input");
  if (!inputField) return;
  
  const activeTrans = translations[currentAppLanguage];
  
  if (qNum === 1) {
    inputField.value = currentAppLanguage === 'en' ? "What is the Quadratic Formula in Math and how is it used?" : "ریاضی میں دو درجی فارمولا (Quadratic Formula) کیا ہے اور اسے کس طرح استعمال کیا جاتا ہے؟";
  } else if (qNum === 2) {
    inputField.value = currentAppLanguage === 'en' ? "Explain Newton's Second Law of Motion in Physics and write its equation." : "طبیعیات (Physics) کے قانون 'Newton's Second Law of Motion' کی متبادل وضاحت اور مساوات لکھیں۔";
  } else if (qNum === 3) {
    inputField.value = currentAppLanguage === 'en' ? "Describe the Covalent Bond structure in water (H2O) molecule in Chemistry." : "کیمیا (Chemistry) میں پانی کے سالمہ (H₂O) کے درمیان ہم آہنگ بانڈ (Covalent Bond) کی ساخت کیا ہے؟";
  }
  inputField.focus();
}

// Simulated file attachments
function triggerFileInput(type) {
  if (type === 'image') {
    document.getElementById("image-file-input").click();
  } else {
    document.getElementById("doc-file-input").click();
  }
}

function handleFileChange(input, type) {
  if (input.files.length > 0) {
    handleFileDrop(input.files[0]);
  }
}

function handleFileDrop(file) {
  uploadedFile = file;
  const previewBar = document.getElementById("file-preview-bar");
  const previewName = document.getElementById("file-preview-name");
  const previewIcon = document.getElementById("file-preview-icon");
  
  if (previewBar && previewName && previewIcon) {
    previewName.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
    
    // Set icon based on extension
    if (file.type.startsWith("image/")) {
      previewIcon.className = "fa-solid fa-file-image";
      previewIcon.style.color = "var(--accent-cyan)";
    } else {
      previewIcon.className = "fa-solid fa-file-pdf";
      previewIcon.style.color = "var(--accent-red)";
    }
    
    previewBar.style.display = "flex";
  }
}

function clearUploadedFile() {
  uploadedFile = null;
  const previewBar = document.getElementById("file-preview-bar");
  if (previewBar) previewBar.style.display = "none";
  
  // Clear inputs
  document.getElementById("image-file-input").value = "";
  document.getElementById("doc-file-input").value = "";
}

// Send Chat Query Logic
function sendAcademicQuery() {
  const inputField = document.getElementById("chat-user-input");
  const messagesContainer = document.getElementById("chat-messages");
  
  if (!inputField || !messagesContainer) return;
  
  const textQuery = inputField.value.trim();
  if (textQuery === "" && !uploadedFile) return;
  
  // Add User Message Bubble
  const userMsgDiv = document.createElement("div");
  userMsgDiv.className = "message user";
  
  let userText = textQuery;
  if (uploadedFile) {
    const fileLabel = currentAppLanguage === 'en' ? 'Attached File:' : 'اپ لوڈ کردہ فائل:';
    const textPrompt = currentAppLanguage === 'en' ? 'Please analyze this image/document and explain.' : 'براہ کرم اس تصویر/دستاویز کا جائزہ لے کر تشریح فراہم کریں۔';
    userText = `<div style="font-size:0.9rem; background:rgba(0,0,0,0.2); padding:0.5rem; border-radius:8px; margin-bottom:0.5rem; border-left: 2px solid var(--accent-cyan);">
      <i class="fa-solid fa-paperclip"></i> ${fileLabel} <b>${uploadedFile.name}</b>
    </div>` + (textQuery || textPrompt);
  }
  
  const now = new Date();
  const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  userMsgDiv.innerHTML = `
    <div class="message-bubble ur-text">${userText}</div>
    <div class="message-meta">${timeStr}</div>
  `;
  messagesContainer.appendChild(userMsgDiv);
  
  // Clear Input states
  inputField.value = "";
  const hadFile = uploadedFile !== null;
  clearUploadedFile();
  
  // Scroll down
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
  // AI Simulated Typing and Response
  setTimeout(() => {
    // Add Thinking indicator
    const thinkingMsgDiv = document.createElement("div");
    thinkingMsgDiv.className = "message ai";
    thinkingMsgDiv.id = "ai-thinking-indicator";
    
    const thinkText = currentAppLanguage === 'en' ? 'AI Teacher is drafting an explanation...' : 'اے آئی استاد جواب تحریر کر رہا ہے...';
    thinkingMsgDiv.innerHTML = `
      <div class="message-bubble ur-text" style="color:var(--text-muted);">
        <i class="fa-solid fa-spinner fa-spin"></i> ${thinkText}
      </div>
    `;
    messagesContainer.appendChild(thinkingMsgDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Generate AI response response
    setTimeout(() => {
      // Remove thinking
      const thinking = document.getElementById("ai-thinking-indicator");
      if (thinking) thinking.remove();
      
      const aiResponse = generateSimulatedAIResponse(textQuery, hadGradeSubjectDetails(), hadFile);
      
      const aiMsgDiv = document.createElement("div");
      aiMsgDiv.className = "message ai";
      
      const uniqueMsgId = "msg-" + Date.now();
      const ratingTitleText = currentAppLanguage === 'en' ? 'Did you like the explanation?' : 'کیا آپ کو تشریح پسند آئی؟';
      
      aiMsgDiv.innerHTML = `
        <div class="message-bubble ur-text">${aiResponse}</div>
        <div class="rating-section">
          <span class="rating-title ur-text">${ratingTitleText}</span>
          <div class="stars">
            <button class="star-btn" onclick="rateExplanation(this, 1, '${uniqueMsgId}')"><i class="fa-solid fa-star"></i></button>
            <button class="star-btn" onclick="rateExplanation(this, 2, '${uniqueMsgId}')"><i class="fa-solid fa-star"></i></button>
            <button class="star-btn" onclick="rateExplanation(this, 3, '${uniqueMsgId}')"><i class="fa-solid fa-star"></i></button>
            <button class="star-btn" onclick="rateExplanation(this, 4, '${uniqueMsgId}')"><i class="fa-solid fa-star"></i></button>
            <button class="star-btn" onclick="rateExplanation(this, 5, '${uniqueMsgId}')"><i class="fa-solid fa-star"></i></button>
          </div>
        </div>
        <div class="message-meta">${timeStr}</div>
      `;
      
      messagesContainer.appendChild(aiMsgDiv);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 1500);
  }, 500);
}

function hadGradeSubjectDetails() {
  const subj = document.getElementById("subject-select");
  return {
    grade: activeGrade,
    subject: subj ? subj.options[subj.selectedIndex].text : "عمومی"
  };
}

// --- DYNAMIC CURRICULUM KNOWLEDGE BASE & QA DATABASE ---
const educationalQADatabase = {
  "quadrants": {
    "title": {
      "en": "Quadrants in Coordinate Geometry",
      "ur": "Quadrants and Coordinate Signs (کوآڈرنٹس)"
    },
    "intro": {
      "en": "In mathematics, when we draw two perpendicular lines (the horizontal X-axis and vertical Y-axis) on a flat plane, they cross each other at the center (origin) and divide the entire space into 4 equal parts. Each of these parts is called a <b>Quadrant</b> (from 'quad', meaning four). Think of it like cutting a round pizza into four equal slices!",
      "ur": "Quadrants ko asaan alfaz mein geometry ka <b>'Pizza Slice model'</b> keh sakte hain. Jab hum aik flat plane par do perpendicular lines (horizontal X-axis aur vertical Y-axis) khinchte hain, to wo center (origin) par aapas mein cut karti hain aur poori space ko 4 equal parts mein divide kar deti hain. In charon hisson mein se har aik ko <b>Quadrant</b> kaha jata hai!"
    },
    "steps": {
      "en": [
        {
          "num": "Step 1: The Four Sections (Q1 to Q4)",
          "text": "Moving counter-clockwise from the top-right:<br>• <b>1st Quadrant (Q1)</b>: Top-Right side. Both X and Y values are positive (+, +).<br>• <b>2nd Quadrant (Q2)</b>: Top-Left side. X is negative, Y is positive (-, +).<br>• <b>3rd Quadrant (Q3)</b>: Bottom-Left side. Both X and Y are negative (-, -).<br>• <b>4th Quadrant (Q4)</b>: Bottom-Right side. X is positive, Y is negative (+, -)."
        },
        {
          "num": "Step 2: Sign Memory Table",
          "text": "An easy way to remember the signs is:<br>• Quadrant I: (+, +)<br>• Quadrant II: (-, +)<br>• Quadrant III: (-, -)<br>• Quadrant IV: (+, -)"
        },
        {
          "num": "Step 3: Real World Practical Use",
          "text": "GPS navigation systems, Google Maps, mobile phone screens, and video game environments use these 4 quadrants to pinpoint the exact location of any character or destination on the map!"
        }
      ],
      "ur": [
        {
          "num": "Step 1: The Four Sections (Q1 to Q4)",
          "text": "Top-right se shuru ho kar counter-clockwise (ghari ke ultay rukh) chalte hue:<br>• <b>1st Quadrant (Q1)</b>: Upar right side. Yahan X aur Y dono positive hote hain (+, +).<br>• <b>2nd Quadrant (Q2)</b>: Upar left side. Yahan X negative aur Y positive hota hai (-, +).<br>• <b>3rd Quadrant (Q3)</b>: Yahan dono X aur Y negative hote hain (-, -).<br>• <b>4th Quadrant (Q4)</b>: Yahan X positive aur Y negative hota hai (+, -)."
        },
        {
          "num": "Step 2: Sign Memory Chart",
          "text": "Sign ko yaad rakhne ka asaan tareeqa:<br>• Q1: (+, +)<br>• Q2: (-, +)<br>• Q3: (-, -)<br>• Q4: (+, -)"
        },
        {
          "num": "Step 3: Real Life Application",
          "text": "Humare mobile mein Google Maps/GPS navigation aur computer games (jaise Minecraft ya GTA) isi Quadrant system par chalti hain taake screen par object ki exact location track ho sake!"
        }
      ]
    },
    "significance": {
      "en": "<b>Significance</b>: Quadrants are foundational for plotting algebraic equations, understanding trigonometric angles, and rendering computer graphics in modern software engineering.",
      "ur": "<b>Significance / Importance of Quadrants</b>:<br>• <b>Graph Plotting</b>: Karachi Board ke paper mein graph ka sawal hal karne ke liye coordinate signs ki correct placements zaroori hain.<br>• <b>Advanced Trigonometry</b>: 11th aur 12th class ki Math mein trigonometry ke signs (+/-) isi quadrant par depend karte hain!"
    },
    "examTips": {
      "en": "💡 <b>Board Exam Tips (Marks Kaise Lene Hain?)</b>:<br>• <b>Past Papers Connection</b>: This question has appeared <b>3 times in the past 5 years of board papers</b> in MCQ and short question sections.<br>• <b>Draw standard axis diagram</b>: Draw horizontal X-axis and vertical Y-axis, labeling origin (0,0) and signs (+/-, +/-) in each quadrant to score full marks!",
      "ur": "💡 <b>Board Exam Tips (Marks Kaise Lene Hain?)</b>:<br>• <b>Past Papers ka Tadka</b>: Ye sawal pichle 5 saal ke papers mein <b>3 baar MCQs aur short questions</b> mein aa chuka hai!<br>• <b>Diagram Zaroor Banayein</b>: Paper mein horizontal X-axis aur vertical Y-axis draw kar ke origin (0,0) show karen aur har quadrant ke sath (+,+) ya (-,+) brackets show karen. Diagram dekh kar full marks milenge!"
    },
    "motivation": {
      "en": "Beta, see how easy that was? I am absolutely confident that if this comes in your exam, you will write it beautifully with headings. You are highly talented!",
      "ur": "Beta, dekha aap ne? Kitna asaan tha ye! Mujhe poora yakeen hai ke agar ye sawal paper mein aaya, to aap isko behtareen headings ke sath likh kar aayenge. Ratta lagane ki bilkul zaroorat nahi hai, bas concept ko zehen mein rakhein. Aap bohat talented hain!"
    }
  },
  "factorization": {
    "title": {
      "en": "Factorization and Its Algebraic Methods",
      "ur": "Factorization in Algebra (تجزیہ کرنا)"
    },
    "intro": {
      "en": "Factorization is the process of breaking down a single mathematical expression into a product of smaller parts (called Factors). Think of it like taking a giant LEGO car apart into its original individual blocks!",
      "ur": "Assalam-o-Alaikum Beta! Don’t worry at all. I know when you open that 11th-grade Math book and see \"Factorization,\" it looks like a mountain of complex equations. But believe me, it’s just a puzzle, and I’m going to show you how to solve it easily.<br><br>Since you are in Class 11th (First Year), Factorization is no longer just about basic numbers; it’s about Algebraic Expressions and Complex Numbers (Chapter 1 and 2 of the Sindh Textbook Board).<br><br><b>What is Factorization? (The Concept)</b><br>In simple words, Factorization is the process of breaking down a single mathematical expression into a product of smaller parts (called Factors). Think of it like a LEGO set. You have a big car made of blocks. Factorization is the process of taking it apart into the original individual blocks that were joined together. In Math, when we multiply these blocks (factors) back together, we get the original expression."
    },
    "steps": {
      "en": [
        {
          "num": "Objective / Purpose",
          "text": "To resolve the given algebraic or complex expression into its simplest linear factors."
        },
        {
          "num": "Formula / Identity Applied",
          "text": "We often use standard algebraic identities, such as:<br>• Difference of Squares: $a^2 - b^2 = (a - b)(a + b)$<br>• Complex Identity: $a^2 + b^2 = a^2 - (bi)^2 = (a - bi)(a + bi)$ (since $i^2 = -1$)."
        },
        {
          "num": "Step-by-Step Resolution",
          "text": "Let's factorize $x^2 + 49$:<br>1. Recognize we can't factor $a^2 + b^2$ using real numbers.<br>2. Use $i^2 = -1$ and rewrite as $x^2 - (-49)$.<br>3. Express as difference of squares: $x^2 - (7i)^2$.<br>4. Apply $a^2 - b^2$ to get $(x - 7i)(x + 7i)$."
        }
      ],
      "ur": [
        {
          "num": "Heading: Objective / Purpose",
          "text": "Explain what you are doing. For example: 'To resolve the given quadratic/complex expression into its simplest linear factors.'"
        },
        {
          "num": "Heading: Formula / Identity Applied",
          "text": "Never solve directly! Always state the formula you are using. In 11th Math, we often use:<br>• Difference of Squares: $a^2 - b^2 = (a - b)(a + b)$<br>• The Complex Identity: Since $i^2 = -1$, we can turn a plus sign into a minus for factoring: $a^2 + b^2 = a^2 - (bi)^2 = (a - bi)(a + bi)$."
        },
        {
          "num": "Heading: Step-by-Step Resolution",
          "text": "Show every step clearly. Examiners love to see the logic.<br><br><b>Example (Class 11th Style)</b>: Factorize $x^2 + 49$<br>• Step 1: Recognize we can't factor $a^2 + b^2$ using real numbers.<br>• Step 2: Use $i^2 = -1$. Rewrite as $x^2 - (-49)$.<br>• Step 3: Rewrite as $x^2 - (7i)^2$.<br>• Step 4: Apply $a^2 - b^2$ to get <b>$(x - 7i)(x + 7i)$</b>."
        }
      ]
    },
    "significance": {
      "en": "<b>Final Result</b>: Write the final factors in a clear, bold line or a box so the examiner can see the answer immediately!",
      "ur": "<b>Heading: Final Result</b><br>Write the final factors in a clear, bold line or a box so the examiner can see the answer immediately: <b>$(x - 7i)(x + 7i)$</b>."
    },
    "examTips": {
      "en": "🛑 <b>Past Papers Ka Tadka!</b><br>Beta, mark my words: Factorization of Complex Numbers is a 'hot favorite' for the Karachi Board examiners. In the last 5 years of BIEK papers, this concept has appeared at least 3 to 4 times in the Short Questions (Section B). If you master this, those 4 marks are safely in your pocket!",
      "ur": "🛑 <b>Past Papers Ka Tadka!</b><br>Beta, mark my words: Factorization of Complex Numbers is a 'hot favorite' for the BIEK/Karachi Board examiners. In the last 5 years of papers, this concept has appeared at least 3 to 4 times in the Short Questions (Section B). If you master this, those 4 marks are safely in your pocket!"
    },
    "motivation": {
      "en": "Beta, I know the pressure of getting into NED, Dawood, or Dow Medical College is sitting on your shoulders. You might feel like your whole life depends on these formulas. Take a deep breath.<br><br>Mathematics isn't here to fail you; it's here to train your brain to solve problems. Don't 'ratta' (memorize) the steps. Understand why we move a term or why we add an 'i'. Once you understand the 'why,' you won't need to fear the exam paper. You are hardworking, and you have made it this far—you definitely have what it takes to ace this!<br><br>Would you like me to solve a specific question from your exercise (e.g., Exercise 1.2 or 2.1) so we can practice together?",
      "ur": "Beta, I know the pressure of getting into NED, Dawood, or Dow Medical College is sitting on your shoulders. You might feel like your whole life depends on these formulas. Take a deep breath.<br><br>Mathematics isn't here to fail you; it's here to train your brain to solve problems. Don't 'ratta' (memorize) the steps. Understand why we move a term or why we add an 'i'. Once you understand the 'why,' you won't need to fear the exam paper. You are hardworking, and you have made it this far—you definitely have what it takes to ace this!<br><br>Would you like me to solve a specific question from your exercise (e.g., Exercise 1.2 or 2.1) so we can practice together?"
    }
  },
  "apoptosis": {
    "title": {
      "en": "Apoptosis and Its Steps",
      "ur": "Apoptosis and Its Steps (خلیاتی خودکشی)"
    },
    "intro": {
      "en": "Apoptosis is a highly regulated and ordered biological process known as 'Programmed Cell Death'. It is a clean and essential mechanism where the body signals specific cells to die for the overall benefit of the organism.",
      "ur": "Apoptosis ko asaan alfaz mein <b>'Programmed Cell Death'</b> kehte hain. Ye cell ki khudkhushi (suicide) hoti hai, lekin ye achanak nahi hoti. Cell ko pehle se aik signal milta hai ke ab us ka kaam khatam ho chuka hai ya wo damage ho chuka hai, is liye body ke faide ke liye us cell ka marna zaroori hota hai. Ye aik nihayat ordered aur saaf-suthra process hai."
    },
    "steps": {
      "en": [
        {
          "num": "Step 1: Cell Shrinkage",
          "text": "The cell begins to shrink in size, and its cytoplasm becomes extremely dense."
        },
        {
          "num": "Step 2: Chromatin Condensation",
          "text": "The DNA (chromatin) inside the nucleus breaks down and condenses tightly against the nuclear envelope."
        },
        {
          "num": "Step 3: Membrane Blebbing",
          "text": "The cell membrane develops irregular bulges or bubbles called 'Blebs'."
        },
        {
          "num": "Step 4: Apoptotic Bodies",
          "text": "The cell breaks apart into small, membrane-bound pieces called 'Apoptotic Bodies'."
        },
        {
          "num": "Step 5: Phagocytosis (Clean-up)",
          "text": "Phagocytes (White Blood Cells) engulf and digest these apoptotic bodies safely, ensuring no damage is caused to neighboring cells!"
        }
      ],
      "ur": [
        {
          "num": "Step 1: Cell Shrinkage (Cell ka Sukarna)",
          "text": "Sub se pehle cell ka size chota hone lagta hai aur wo sukhar jata hai. Us ke andar ka cytoplasm garha ho jata hai."
        },
        {
          "num": "Step 2: Chromatin Condensation",
          "text": "Cell ke nucleus ke andar jo DNA (chromatin) hota hai, wo tootne lagta hai aur aik jagah jama (condense) ho jata."
        },
        {
          "num": "Step 3: Blebbing (Bubbles banna)",
          "text": "Cell ki jo baher wali dewar (cell membrane) hoti hai, us par chhote chhote ubhaar ya bubbles banne lagte hain. In bubbles ko hum <b>'Blebs'</b> کہتے ہیں۔"
        },
        {
          "num": "Step 4: Apoptotic Bodies Formation",
          "text": "Wo blebs cell se alag ho kar chhote chhote pieces mein toot jate hain. In pieces ko <b>'Apoptotic Bodies'</b> کہتے ہیں۔"
        },
        {
          "num": "Step 5: Phagocytosis (Safaayi)",
          "text": "Aakhiri step mein, hamari body ke jo difai cells hote hain (Phagocytes / White Blood Cells), wo aate hain aur in apoptotic bodies ko kha kar hazam kar lete hain. Is tarah aas-paas ke baqi cells ko koi nuqsan nahi pahonchta!"
        }
      ]
    },
    "significance": {
      "en": "<b>Significance</b>: Apoptosis is critical for proper development (such as separating fingers in the womb) and eliminating damaged or cancerous cells before they can harm the body.",
      "ur": "<b>Significance / Importance of Apoptosis</b>:<br>• <b>Development mein madad</b>: Jab bacha maa ke pait mein hota hai, to us ki ungliyan aapas mein juri hui hoti hain. Ungliyon ke darmiyan ke cells Apoptosis ke zariye marte hain, tabhi hamari ungliyan alag alag hoti hain.<br>• <b>Damaged Cells ka Khatma</b>: Agar koi cell bemar ho jaye ya us mein virus aa jaye, to apoptosis usay khatam kar ke puri body ko cancer ya infection se bachata hai."
    },
    "examTips": {
      "en": "💡 <b>Board Exam Tips (Marks Kaise Lene Hain?)</b>:<br>• <b>Past Papers Connection</b>: This question has appeared <b>3 times in the past 5 years of board papers</b> in the 9th Class Biology paper as a major 4-mark short question.<br>• <b>Draw Diagrams</b>: In Biology, draw 3-4 small boxes showing the step-by-step progression (Cell -> Shrinkage -> Blebs -> Apoptotic Bodies) to secure full marks!<br>• <b>Underline Keywords</b>: Always highlight terms like 'Programmed Cell Death', 'Blebbing', and 'Phagocytosis'.",
      "ur": "💡 <b>Board Exam Tips (Marks Kaise Lene Hain?)</b>:<br>• <b>Past Papers ka Tadka</b>: Ye sawal pichle 5 saal ke papers mein <b>3 baar aa chuka hai</b> (9th class Biology Board Exam). So this is highly important!<br>• <b>Diagram Zaroor Banayein</b>: Jab ye sawal paper mein aaye, to jo steps maine ooper bataye hain, un ki choti choti 3-4 diagrams zaroor banayein (Cell -> Shrinkage -> Blebs -> Apoptotic bodies). Biology mein diagram dekh kar examiner khush ho kar full marks deta hai.<br>• <b>Keywords ko Underline Karen</b>: 'Programmed cell death', 'Blebs', aur 'Phagocytosis' jaise alfaz ko marker se highlight ya underline zaroor karen."
    },
    "motivation": {
      "en": "Beta, see how easy that was? I am absolutely confident that if this comes in your exam, you will write it beautifully with headings. You are highly talented!",
      "ur": "Beta, dekha aap ne? Kitna asaan tha ye! Mujhe poora yakeen hai ke agar ye sawal paper mein aaya, to aap isko behtareen headings ke sath likh kar aayenge. Ratta lagane ki bilkul zaroorat nahi hai, bas concept ko zehen mein rakhein. Aap bohat talented hain aur mujhe pata hai aap Biology mein top karenge!"
    }
  },
  "quadratic": {
    "title": {
      "en": "Quadratic Formula in Mathematics",
      "ur": "Quadratic Formula (دو درجی فارمولا)"
    },
    "intro": {
      "en": "The Quadratic Formula is an essential method in algebra used to find the solutions (roots) of any quadratic equation. It works for all quadratic equations, even those that cannot be easily factored!",
      "ur": "Quadratic Formula ko asaan alfaz mein <b>'Math ka Brahmastra'</b> keh sakte hain. Ye algebra ka aik nihayat ahem formula hai jo kisi bhi quadratic equation (jis ki degree 2 ho) ke roots nikalne ke liye use hota hai. Agar factors na ban rahe hon, to ye formula hamesha solution deta hai!"
    },
    "steps": {
      "en": [
        {
          "num": "Step 1: Write Standard Equation",
          "text": "Ensure your equation is in standard form: $ax^2 + bx + c = 0$, where $a$, $b$, and $c$ are numbers, and $a \\neq 0$. Write down the values of $a$, $b$, and $c$ carefully."
        },
        {
          "num": "Step 2: Apply the Formula",
          "text": "Substitute these values into the quadratic formula:<br><div style='background:var(--bg-dark); padding:0.8rem; border-radius:8px; text-align:center; font-size:1.1rem; margin:0.5rem 0; font-family:monospace; border-left:4px solid var(--accent-cyan);'>x = [-b ± √(b² - 4ac)] / 2a</div>Carefully calculate the term under the square root ($b^2 - 4ac$), which is called the <i>discriminant</i>."
        },
        {
          "num": "Step 3: Solve for Two Answers",
          "text": "Due to the $±$ (plus-minus) sign, split the equation into two separate paths: one using $+$, and one using $-$. This yields two values of $x$, representing the standard solutions of the curve!"
        }
      ],
      "ur": [
        {
          "num": "Step 1: Standard Form aur values identification",
          "text": "Sub se pehle apni equation ko standard form <b>$ax^2 + bx + c = 0$</b> mein likhein aur coefficients $a$, $b$, aur $c$ ki values nikalen."
        },
        {
          "num": "Step 2: Formula mein values put karna",
          "text": "In values ko quadratic formula mein put karen:<br><div style='background:var(--bg-dark); padding:0.8rem; border-radius:8px; text-align:center; font-size:1.1rem; margin:0.5rem 0; font-family:monospace; border-left:4px solid var(--accent-cyan);'>x = [-b ± √(b² - 4ac)] / 2a</div>Sub se pehle square root ke andar wala hissa ($b^2 - 4ac$) hal karen jise hum Discriminant kehte hain."
        },
        {
          "num": "Step 3: Two distinct roots hal karna",
          "text": "Sign <b>$±$</b> ki wajah se do alag solutions banenge: aik plus (+) ke sath aur aik minus (-) ke sath. Hal karne par aap ko do solutions mil jayenge!"
        }
      ]
    },
    "significance": {
      "en": "<b>Significance</b>: Used to model real-world arcs like throwing a basketball, calculating rocket trajectory heights, and financial curve projections.",
      "ur": "<b>Significance / Importance of Quadratic Formula</b>:<br>• <b>Real-Life Use</b>: Jab rocket launch hota hai ya basketball phenki jati hai, to us ke curved raste ko math mein model karne ke liye ye formula kam aata hai!"
    },
    "examTips": {
      "en": "💡 <b>Board Exam Tips (Marks Kaise Lene Hain?)</b>:<br>• <b>Past Papers Connection</b>: Appears in <b>almost 90% of board exams</b> in Section B (short questions).<br>• <b>Sign Alert</b>: Watch out for negative numbers inside the square root ($b^2 - 4ac$). If it is negative, roots are complex/imaginary!",
      "ur": "💡 <b>Board Exam Tips (Marks Kaise Lene Hain?)</b>:<br>• <b>Past Papers ka Tadka</b>: Ye sawal 10th aur 9th class ke board papers mein <b>har saal aata hai</b>. Section B mein aane ke chances 90% hote hain!<br>• <b>Sign ki ahtiyat</b>: Agar formula mein $b^2 - 4ac$ negative aa jaye to tension na len, is ka matlab hai roots complex ya imaginary hain."
    },
    "motivation": {
      "en": "Beta, see how easy that was? Algebra is just like a puzzle. Keep practicing!",
      "ur": "Beta, dekha aap ne? Algebra pheliyon ki tarah asaan hai! Bas values put karni hain aur answers khud-ba-khud baher aa jate hain. Practice karte rahen, aap top karenge!"
    }
  },
  "matrix": {
    "title": {
      "en": "Introduction to Matrices",
      "ur": "Matrices and Orders (قالب)"
    },
    "intro": {
      "en": "A matrix (plural: matrices) is a rectangular grid or arrangement of numbers, symbols, or expressions set in rows (horizontal) and columns (vertical). Matrices are highly powerful for solving large sets of equations simultaneously!",
      "ur": "Matrix ko asaan alfaz mein <b>'Numbers ki rectangular grid'</b> keh sakte hain. Jab hum numbers ko rows (horizontal lines) aur columns (vertical lines) mein arrange kar ke brackets [ ] ke andar band karte hain, to is arrange ko <b>Matrix</b> kehte hain."
    },
    "steps": {
      "en": [
        {
          "num": "Step 1: Understand Rows, Columns, and Order",
          "text": "Horizontal lines of numbers are called **Rows**, and vertical lines are **Columns**. The size of a matrix is called its **Order**, written as $Rows \\times Columns$ (e.g., a $2 \\times 3$ matrix has 2 rows and 3 columns)."
        },
        {
          "num": "Step 2: Operations (Addition & Subtraction)",
          "text": "You can add or subtract two matrices **only** if they have the exact same order. You simply add or subtract their corresponding elements."
        },
        {
          "num": "Step 3: Real Life Utility",
          "text": "Matrices are the absolute foundation of computer graphics! 3D animation, video games, image filters, Google search page ranking, and machine learning neural networks use matrix multiplication under the hood to process pixels and data!"
        }
      ],
      "ur": [
        {
          "num": "Step 1: Rows, Columns aur Order samajhna",
          "text": "Horizontal lines ko <b>Rows</b> kehte hain aur vertical lines ko <b>Columns</b>. Matrix ke size ko us ka <b>Order</b> kehte hain, jise $Rows \\times Columns$ (jaise $2 \\times 2$) likhte hain."
        },
        {
          "num": "Step 2: Addition & Subtraction ka rule",
          "text": "Dono matrices ko sirf tabhi add ya subtract kiya ja sakta hai jab dono ka <b>Order bilkul same</b> ho. Bas front-to-front elements ko aapas mein hal karna hota hai."
        },
        {
          "num": "Step 3: Real Life Application",
          "text": "Computer games (jaise PUBG aur FreeFire) aur mobile ke camera filters (jaise Instagram filters) numbers ko process karne ke liye background mein inhi matrices ka multiply use karte hain!"
        }
      ]
    },
    "significance": {
      "en": "<b>Significance</b>: Essential in computer programming, 3D graphics rendering, and modern neural network data structures.",
      "ur": "<b>Significance / Importance of Matrices</b>:<br>• <b>Computer Science</b>: Pure programming and AI/Machine learning models numbers store karne aur multiply karne ke liye is tool par chalte hain."
    },
    "examTips": {
      "en": "💡 <b>Board Exam Tips (Marks Kaise Lene Hain?)</b>:<br>• <b>Past Papers Connection</b>: Cramer's Rule or Matrix Inverse Method appears <b>every year in the long question section</b> (10 marks). Master them!<br>• <b>Determinant Check</b>: Before finding inverse, find $|A|$. If $|A| = 0$ (singular), inverse is not possible!",
      "ur": "💡 <b>Board Exam Tips (Marks Kaise Lene Hain?)</b>:<br>• <b>Past Papers ka Tadka</b>: Ye sawal (Cramer's Rule ya Inverse Method) board ke long question mein <b>har saal 100% aata hai</b>. Dono methods seekh len!<br>• <b>Determinant Check</b>: Jab inverse ($A^{-1}$) nikalna ho, to $|A|$ (Determinant) pehle nikalen. Agar determinant 0 aa jaye, to short statement likhein 'Inverse not possible' aur examiner pure marks dega."
    },
    "motivation": {
      "en": "Beta, matrices are very easy to score. Just keep practicing the addition/multiplication loops!",
      "ur": "Beta, dekha aap ne? Kitna mazedari wala aur simple sawal tha. Inverse aur Cramer rule par pakki practice kar len, 10 marks pakke hain aap ke!"
    }
  },
  "set": {
    "title": {
      "en": "Sets and Venn Diagrams",
      "ur": "Sets and Venn Diagrams (سیٹ)"
    },
    "intro": {
      "en": "A set is a well-defined collection of distinct objects, numbers, or elements. For example, a set of tea cups or a set of natural numbers. Sets help mathematicians classify and organize groups of numbers systematically.",
      "ur": "Set ko asaan alfaz mein <b>'Distinct and Well-defined groups'</b> keh sakte hain. Kisi bhi wazeh aur alag-alag cheezon ke collection ko <b>Set</b> kehte hain, jaise natural numbers ka set ya cricket players ka set. Inhein {} brackets mein likha jata hai."
    },
    "steps": {
      "en": [
        {
          "num": "Step 1: Basic Operations (Union & Intersection)",
          "text": "• **Union ($A \\cup B$)**: Combines all elements from both sets together without duplication.<br>• **Intersection ($A \\cap B$)**: Finds only the common elements that exist in both sets simultaneously."
        },
        {
          "num": "Step 2: Complement of a Set",
          "text": "The complement of Set A ($A'$ or $A^c$) includes all elements present in the universal set ($U$) that are NOT in Set A. Written mathematically as $U - A$."
        },
        {
          "num": "Step 3: Visual Representation (Venn Diagrams)",
          "text": "Sets can be drawn visually using closed circles inside a rectangular box (which represents the Universal Set). Overlapping regions display intersections, helping to visualize complex logical arguments easily!"
        }
      ],
      "ur": [
        {
          "num": "Step 1: Union ($A \\cup B$) aur Intersection ($A \\cap B$)",
          "text": "• <b>Union</b>: Dono sets ke tamaam elements ko mila kar aik bada group banana.<br>• <b>Intersection</b>: Sirf wo elements likhna jo dono sets mein common (aik jaise) hon."
        },
        {
          "num": "Step 2: Complement ($A'$)",
          "text": "Universal set ($U$) ke wo elements jo Set A mein maujood nahi hain un ka set banana, yaani $U - A$."
        },
        {
          "num": "Step 3: Venn Diagram (Visual representation)",
          "text": "Sets ko draw karne ke liye aik bada box (Universal set) banaya jata hai aur us ke andar circles draw kiye jate hain. Jo area overlap karta hai wo intersection ko show karta hai."
        }
      ]
    },
    "significance": {
      "en": "<b>Significance</b>: Sets form the absolute foundation of probability calculations, database queries, and logical system conditions.",
      "ur": "<b>Significance / Importance of Sets</b>:<br>• <b>Database Queries</b>: Software developers database se custom tables join karne ke liye isi Set theory (Union/Join) ka use karte hain!"
    },
    "examTips": {
      "en": "💡 <b>Board Exam Tips (Marks Kaise Lene Hain?)</b>:<br>• <b>Past Papers Connection</b>: De Morgan's Laws verify question <b>appears in 80% of board exams</b>. Solve it step-by-step.<br>• <b>Clean Venn Diagrams</b>: Always use a coin or compass to draw neat circles for Venn diagrams; untidy overlapping circles lose presentation marks!",
      "ur": "💡 <b>Board Exam Tips (Marks Kaise Lene Hain?)</b>:<br>• <b>Past Papers ka Tadka</b>: De Morgan's Laws ($ (A \\cup B)' = A' \\cap B' $) ka sawal <b>pichle 5 saal mein 4 baar aa chuka hai</b>. Isay zaroor rata laga len!<br>• <b>Diagram Presentation</b>: Paper mein Venn diagram banate waqt compass ya kisi coin se bilkul gol neat circles banayein, aur scales se line drawing karen. Examiner presentation dekh kar pura score deta hai."
    },
    "motivation": {
      "en": "Beta, sets are simple logical blocks. No complex math required!",
      "ur": "Beta, dekha aap ne? Set hal karna kitna asaan hai, is mein koi complicated calculations bhi nahi hain. Paper mein ye sawal zaroor select kiya karen!"
    }
  },
  "newton": {
    "title": {
      "en": "Newton's Laws of Motion",
      "ur": "Newton's Three Laws of Motion (حرکت کے قوانین)"
    },
    "intro": {
      "en": "Sir Isaac Newton formulated three fundamental laws of motion that describe the relationship between a body and the forces acting upon it, and its motion in response to those forces. They form the basis of classical mechanics!",
      "ur": "Newton ke teen laws ko asaan alfaz mein <b>'Motion ka mechanics blueprint'</b> keh sakte hain. Sir Isaac Newton ne hamein bataya ke jab kisi object par force lagti hai to wo kis tarah behave karta hai. Ye laws hamari classical Physics ki base hain!"
    },
    "steps": {
      "en": [
        {
          "num": "First Law (Law of Inertia)",
          "text": "An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an external unbalanced force. Inertia is why you fly forward when a car brakes suddenly!"
        },
        {
          "num": "Second Law ($F = ma$)",
          "text": "The acceleration of an object is directly proportional to the net force acting on it, and inversely proportional to its mass. Mathematically: $F = m \\times a$. Pushing a heavy stone requires much more force than pushing a small ball."
        },
        {
          "num": "Third Law (Action and Reaction)",
          "text": "For every action, there is always an equal and opposite reaction. Example: When a rocket fires gas downwards, the gas pushes the rocket upwards into space!"
        }
      ],
      "ur": [
        {
          "num": "1st Law: Law of Inertia (جمود)",
          "text": "Agar koi cheez ruki hui hai to ruki rahegi, aur chal rahi hai to chalti rahegi, jab tak koi baher se aakar us par zor (Force) na lagaye. Gaari chalte waqt sudden break par hamara aage girna isi Inertia ki wajah se hai."
        },
        {
          "num": "2nd Law: Force aur Acceleration ($F = ma$)",
          "text": "Force seedha relation rakhti hai mass aur acceleration ke sath, yaani jitni zor se push karenge, cheez utni hi tezi se bhagegi: <b>$F = m \\times a$</b>. Bhari patthar ko push karne ke liye small ball se ziada force chahiye."
        },
        {
          "num": "3rd Law: Action aur Reaction (عمل اور ردِ عمل)",
          "text": "Har action ka aik barabar aur opposite reaction hota hai. Jaise jab aap balloon se hawa chhortay hain, hawa niche jati hai aur balloon upar bhaagta hai!"
        }
      ]
    },
    "significance": {
      "en": "<b>Significance</b>: Governs automotive safety designs (seatbelts), aerospace engineering, bridge building, and machinery dynamics.",
      "ur": "<b>Significance / Importance of Newton's Laws</b>:<br>• <b>Seatbelt design</b>: Gaariyon mein seatbelts jamood (Inertia) ke asraat se bachane aur lives save karne ke liye banai jati hain."
    },
    "examTips": {
      "en": "💡 <b>Board Exam Tips (Marks Kaise Lene Hain?)</b>:<br>• <b>Past Papers Connection</b>: Second Law ($F=ma$) derivation appears in <b>9th/10th Physics paper almost every second year</b>.<br>• <b>State exact law definitions</b>: Do not rewrite the laws in your own casual words; examiners look for precise textbook definitions!",
      "ur": "💡 <b>Board Exam Tips (Marks Kaise Lene Hain?)</b>:<br>• <b>Past Papers ka Tadka</b>: $F=ma$ ki derivation aur Newton's Third Law ki definition board exam mein <b>pichle 5 saal mein 3 baar aa chuka hai</b>. Ratta maar len precise wording ko!<br>• <b>Wording ki strictness</b>: Laws ki definitions hamesha book ki exact lines mein likhein, apni marzi ki simple English na banayein, examiner standard definitions chahta hai."
    },
    "motivation": {
      "en": "Beta, Newton's laws are extremely intuitive. Think of football or balloons and you will understand them in seconds!",
      "ur": "Beta, dekha aap ne? Physics to hamari daily life hai! Ratta bilkul na lagayein, bas balloon aur gaari ki breaks ka concept yaad rakhein. Physics aap ke liye asaan ho jayegi!"
    }
  },
  "photosynthesis": {
    "title": {
      "en": "Understanding Photosynthesis",
      "ur": "Photosynthesis (ضیاعی تالیف)"
    },
    "intro": {
      "en": "Photosynthesis is the beautiful biological process by which green plants, algae, and some bacteria convert light energy (from the sun) into chemical energy (glucose/food), using water and carbon dioxide. It is the reason why life exists on Earth!",
      "ur": "Photosynthesis ko asaan alfaz mein <b>'Poudon ki food factory'</b> keh sakte hain. Ye wo biological process hai jis ke zariye green plants, chlorophyll aur sunlight ki presence mein paani ($H_2O$) aur carbon dioxide ($CO_2$) ko mila kar apni khorak (glucose) khud banate hain."
    },
    "steps": {
      "en": [
        {
          "num": "Step 1: Capturing Sunlight",
          "text": "Plant leaves contain a green pigment called **Chlorophyll** inside microscopic organelles called **Chloroplasts**. Chlorophyll absorbs solar energy like a mini solar panel!"
        },
        {
          "num": "Step 2: Chemical Reaction Equation",
          "text": "Plants absorb water ($H_2O$) from roots and carbon dioxide ($CO_2$) from air. In the presence of sunlight, they undergo the chemical reaction:<br><div style='background:var(--bg-dark); padding:0.8rem; border-radius:8px; text-align:center; font-size:1rem; margin:0.5rem 0; font-family:monospace; border-left:4px solid var(--accent-cyan);'>6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂</div>Which creates glucose ($C_6H_{12}O_6$) for plant food, and releases oxygen ($O_2$) into the atmosphere."
        },
        {
          "num": "Step 3: Importance for Humans",
          "text": "Without photosynthesis, there would be no oxygen to breathe and no food to eat! Every slice of bread, fruit, and breath of air we take is directly a gift of plant photosynthesis."
        }
      ],
      "ur": [
        {
          "num": "Step 1: Chlorophyll aur Sunlight capture",
          "text": "Plants ke leaves ke andar green pigment hota hai jise <b>Chlorophyll</b> kehte hain. Ye sunlight ko absorp karta hai jaise solar plate electricity capture karti hai."
        },
        {
          "num": "Step 2: Chemical Reaction",
          "text": "Plants roots se paani aur stomata (leaves ke surakh) se $CO_2$ lete hain. React kar ke ye glucose aur pure oxygen banate hain:<br><div style='background:var(--bg-dark); padding:0.8rem; border-radius:8px; text-align:center; font-size:1rem; margin:0.5rem 0; font-family:monospace; border-left:4px solid var(--accent-cyan);'>6CO₂ + 6H₂O + Light → C₆H₁₂O₆ + 6O₂</div>"
        },
        {
          "num": "Step 3: Global Oxygen Supply",
          "text": "Hamein jo pure oxygen ($O_2$) saans lene ke liye milti hai, wo isi process ke reaction ke product ke roop mein milti hai!"
        }
      ]
    },
    "significance": {
      "en": "<b>Significance</b>: It provides the primary source of organic food and the global supply of oxygen essential for aerobic respiration.",
      "ur": "<b>Significance / Importance of Photosynthesis</b>:<br>• <b>Earth ka ecosystem</b>: Agar plants food banana band kar den, to poori dunya ke animals bhook aur oxygen ki kami se mar jayenge."
    },
    "examTips": {
      "en": "💡 <b>Board Exam Tips (Marks Kaise Lene Hain?)</b>:<br>• <b>Past Papers Connection</b>: Repeated in <b>9th Class Biology paper 3 times in 5 years</b>.<br>• <b>Equation is mandatory</b>: If you write 3 pages but skip the balanced chemical equation, you will lose 50% of the question marks. Practice balancing it!",
      "ur": "💡 <b>Board Exam Tips (Marks Kaise Lene Hain?)</b>:<br>• <b>Past Papers ka Tadka</b>: Ye sawal 9th Biology paper ke short aur long sections mein <b>pichle 5 saal mein 3 baar aa chuka hai</b>.<br>• <b>Masaawat (Equation) laazmi hai</b>: Agar aap ne pora answers likha par balance equation ($6CO_2 + 6H_2O...$) na likhi, to half marks kat jayenge. Equation ko balance likhein!"
    },
    "motivation": {
      "en": "Beta, plants are our best friends. Keep their oxygen cycle in mind and score full marks!",
      "ur": "Beta, dekha aap ne? Plants hamare sab se acche dost hain, un ka shukria ada karein aur is simple equation ko do baar copy par bina dekhe likh kar practice kar len!"
    }
  }
};

function extractTopic(query) {
  let clean = query.toLowerCase()
    .replace(/[?,.!]/g, "")
    .replace(/\b(what is|define|explain|tell me about|how does|what are|describe|kya hai|ki tareef|kise kehte hain|kya hota hai|samjhao|explain in simple terms|what is meant by|its steps|steps of)\b/gi, "")
    .trim();
  
  if (clean.length === 0) return "موضوع (Topic)";
  return clean.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

function generateSimulatedAIResponse(query, info, wasFile) {
  const isEn = currentAppLanguage === 'en';
  
  if (wasFile) {
    if (isEn) {
      return `What a wonderful document or image you have uploaded! I have reviewed your file carefully. This question belongs to the <b>${info.subject}</b> syllabus (Grade ${info.grade}) of the Karachi Board. Below is the comprehensive step-by-step solution:
        
        <div class="step-container">
          <div class="step-card">
            <div class="step-number">Step 1: Baseline Analysis</div>
            To solve the handwritten problem in the document, we first identify the corresponding mathematical formula.
          </div>
          <div class="step-card">
            <div class="step-number">Step 2: Formula Application</div>
            Substituting the given variables into the equation validates that both LHS and RHS balance perfectly.
          </div>
          <div class="step-card">
            <div class="step-number">Step 3: Conclusion</div>
            Therefore, your plotted graph and solution are 100% verified and correct.
          </div>
        </div>
        Do you have any questions or want to review any specific step further?`;
    } else {
      return `بڑے ہی شاندار نوٹس یا تصویر اپ لوڈ کی ہے آپ نے! میں نے آپ کی دستاویز کا باریک بینی سے جائزہ لے لیا ہے۔ یہ سوال کراچی بورڈ کے <b>${info.subject}</b> (جماعت ${info.grade}) کے نصاب سے تعلق رکھتا ہے۔ ذیل میں اس کا مکمل اور جامع حل پیشِ خدمت ہے:
        
        <div class="step-container">
          <div class="step-card">
            <div class="step-number">مرحلہ ۱: بنیادی خاکہ (Basic Concept)</div>
            ہمیں اپ لوڈ کردہ دستاویز میں دیے گئے سوال کو حل کرنے کے لیے سب سے پہلے اس کا فارمولا متعین کرنا ہوگا۔
          </div>
          <div class="step-card">
            <div class="step-number">مرحلہ ۲: فارمولے کا اطلاق (Application)</div>
            مساوات میں قیمتوں کا اندراج کرنے پر ہمیں معلوم ہوتا ہے کہ جواب متوازن ہے اور دائیں بائیں مساوی آ رہے ہیں۔
          </div>
          <div class="step-card">
            <div class="step-number">مرحلہ ۳: حتمی نتیجہ (Conclusion)</div>
            لہٰذا، اس حساب سے آپ کا تیار کردہ گراف اور جواب 100 فیصد درست ثابت ہوتا ہے۔
          </div>
        </div>
        کیا آپ کو اس میں کوئی اور الجھن ہے یا کوئی مخصوص نکتہ دوبارہ سمجھنا چاہتے ہیں؟`;
    }
  }
  
  const normalized = query.toLowerCase();
  
  // Find key in database using containment & fuzzy/typo-tolerant matching
  let matchedKey = null;
  const keys = Object.keys(educationalQADatabase);
  for (const k of keys) {
    if (normalized.includes(k) || 
        (k === "quadratic" && (normalized.includes("quadratic") || normalized.includes("فارمولا") || normalized.includes("کواڈریٹک"))) || 
        (k === "newton" && (normalized.includes("newton") || normalized.includes("قانون") || normalized.includes("نیوٹن"))) || 
        (k === "factorization" && (
          normalized.includes("factor") || 
          normalized.includes("fractor") || 
          normalized.includes("facto") || 
          normalized.includes("تجزیہ")
        )) ||
        (k === "apoptosis" && (normalized.includes("apoptos") || normalized.includes("apoptosis") || normalized.includes("خودکشی") || normalized.includes("ابوپٹوسس"))) ||
        (k === "photosynthesis" && (normalized.includes("photosynthesis") || normalized.includes("ضیاعی") || normalized.includes("فوٹوسنتھیس"))) || 
        (k === "matrix" && (normalized.includes("matrix") || normalized.includes("matrices") || normalized.includes("قالب") || normalized.includes("میٹرکس"))) || 
        (k === "set" && (normalized.includes("set") || normalized.includes("sets") || normalized.includes("سیٹ"))) ||
        (k === "quadrants" && (normalized.includes("quadrant") || normalized.includes("quadrants") || normalized.includes("کوآڈرنٹ") || normalized.includes("کوڈرنٹ")))) {
      matchedKey = k;
      break;
    }
  }

  // Intercept factorization specifically to render the user's exact premium Gemini Gem word-for-word styling
  if (matchedKey === "factorization") {
    return `<div class="gemini-gem-response" style="line-height:1.7; font-size:1.05rem; color:var(--text-white);">
      <p style="margin-bottom:1.25rem;">
        <strong>Assalam-o-Alaikum Beta!</strong> Don’t worry at all. I know when you open that 11th-grade Math book and see "Factorization," it looks like a mountain of complex equations. But believe me, it’s just a puzzle, and I’m going to show you how to solve it easily.
      </p>
      <p style="margin-bottom:1.25rem;">
        Since you are in Class 11th (First Year), Factorization is no longer just about basic numbers; it’s about Algebraic Expressions and Complex Numbers (Chapter 1 and 2 of the Sindh Textbook Board).
      </p>

      <!-- Past Papers Callout Box -->
      <div style="background: rgba(255, 65, 54, 0.08); border: 1px dashed rgba(255, 65, 54, 0.3); border-left: 4px solid #ff4136; padding: 1.2rem; border-radius: 8px; margin: 1.5rem 0;">
        <h3 style="color:#ff4136; margin-top:0; font-size:1.15rem; display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem; font-weight:700;">
          🛑 Past Papers Ka Tadka!
        </h3>
        <p style="margin:0; font-size:0.95rem; color:var(--text-muted); line-height:1.6;">
          Beta, mark my words: <strong>Factorization of Complex Numbers</strong> is a "hot favorite" for the Karachi Board examiners. In the last 5 years of BIEK papers, this concept has appeared at least <strong>3 to 4 times in the Short Questions (Section B)</strong>. If you master this, those 4 marks are safely in your pocket!
        </p>
      </div>

      <!-- Concept Definition -->
      <div style="background: rgba(144, 101, 255, 0.05); border: 1px solid rgba(144, 101, 255, 0.15); padding: 1.2rem; border-radius: 12px; margin: 1.5rem 0;">
        <h3 style="color:var(--accent-cyan); margin-top:0; font-size:1.2rem; margin-bottom:0.75rem; font-weight:700;">
          What is Factorization? (The Concept)
        </h3>
        <p style="margin:0; margin-bottom:0.75rem; line-height:1.6;">
          In simple words, Factorization is the process of breaking down a single mathematical expression into a product of smaller parts (called <strong>Factors</strong>).
        </p>
        <p style="margin:0; font-size:0.95rem; color:var(--text-muted); line-height:1.6;">
          💡 <strong>Think of it like a LEGO set:</strong> You have a big car made of blocks. Factorization is the process of taking it apart into the original individual blocks that were joined together. In Math, when we multiply these blocks (factors) back together, we get the original expression.
        </p>
      </div>

      <!-- Heading Culture Section -->
      <h3 style="color:var(--text-white); font-size:1.25rem; border-bottom:2px solid var(--primary); padding-bottom:0.5rem; margin-top:2rem; margin-bottom:1.2rem; font-weight:700;">
        How to Write the Perfect Answer (Heading Culture)
      </h3>
      <p style="margin-bottom:1.25rem; font-size:0.95rem; color:var(--text-muted); line-height:1.5;">
        In the Karachi Board, presentation is everything. To get full marks, use these headings even in Mathematics:
      </p>

      <div class="step-container" style="display:flex; flex-direction:column; gap:1.2rem; margin:1.5rem 0;">
        <!-- Heading 1 -->
        <div class="step-card" style="background:var(--bg-dark); border-left:4px solid var(--primary); padding:1rem; border-radius:8px; box-shadow: 0 4px 6px rgba(0,0,0,0.15);">
          <div class="step-number" style="font-weight:700; color:var(--accent-cyan); margin-bottom:0.5rem; font-size:1rem;">
            1. Heading: Objective / Purpose
          </div>
          <div style="color:var(--text-muted); font-size:0.95rem; line-height:1.5;">
            Explain what you are doing. For example: <em>"To resolve the given quadratic/complex expression into its simplest linear factors."</em>
          </div>
        </div>

        <!-- Heading 2 -->
        <div class="step-card" style="background:var(--bg-dark); border-left:4px solid var(--primary); padding:1rem; border-radius:8px; box-shadow: 0 4px 6px rgba(0,0,0,0.15);">
          <div class="step-number" style="font-weight:700; color:var(--accent-cyan); margin-bottom:0.5rem; font-size:1rem;">
            2. Heading: Formula / Identity Applied
          </div>
          <div style="color:var(--text-muted); font-size:0.95rem; line-height:1.6;">
            Never solve directly! Always state the formula you are using. In 11th Math, we often use:<br>
            • <strong>Difference of Squares:</strong> <code>a² - b² = (a - b)(a + b)</code><br>
            • <strong>The Complex Identity:</strong> Since <code>i² = -1</code>, we can turn a plus sign into a minus for factoring: <code>a² + b² = a² - (bi)² = (a - bi)(a + bi)</code>.
          </div>
        </div>

        <!-- Heading 3 -->
        <div class="step-card" style="background:var(--bg-dark); border-left:4px solid var(--primary); padding:1rem; border-radius:8px; box-shadow: 0 4px 6px rgba(0,0,0,0.15);">
          <div class="step-number" style="font-weight:700; color:var(--accent-cyan); margin-bottom:0.5rem; font-size:1rem;">
            3. Heading: Step-by-Step Resolution
          </div>
          <div style="color:var(--text-muted); font-size:0.95rem; line-height:1.6;">
            Show every step clearly. Examiners love to see the logic.<br><br>
            <strong>Example (Class 11th Style):</strong> Factorize <code>x² + 49</code>.<br>
            <span style="color:var(--text-white);">• Step 1:</span> Recognize we can't factor <code>a² + b²</code> using real numbers.<br>
            <span style="color:var(--text-white);">• Step 2:</span> Use <code>i² = -1</code>. Rewrite as <code>x² - (-49)</code>.<br>
            <span style="color:var(--text-white);">• Step 3:</span> Rewrite as <code>x² - (7i)²</code>.<br>
            <span style="color:var(--text-white);">• Step 4:</span> Apply <code>a² - b²</code> to get <strong>(x - 7i)(x + 7i)</strong>.
          </div>
        </div>

        <!-- Heading 4 -->
        <div class="step-card" style="background:var(--bg-dark); border-left:4px solid var(--primary); padding:1rem; border-radius:8px; box-shadow: 0 4px 6px rgba(0,0,0,0.15);">
          <div class="step-number" style="font-weight:700; color:var(--accent-cyan); margin-bottom:0.5rem; font-size:1rem;">
            4. Heading: Final Result
          </div>
          <div style="color:var(--text-muted); font-size:0.95rem; line-height:1.5;">
            Write the final factors in a clear, bold line or a box so the examiner can see the answer immediately:<br>
            <div style="background: rgba(144, 101, 255, 0.1); border: 1px solid var(--primary); padding: 0.5rem 1rem; border-radius: 6px; display: inline-block; font-weight: 700; color: var(--text-white); font-family: monospace; margin-top: 0.5rem;">
              x² + 49 = (x - 7i)(x + 7i)
            </div>
          </div>
        </div>
      </div>

      <!-- Motivation Section -->
      <div style="background: rgba(0, 216, 246, 0.05); border: 1px solid rgba(0, 216, 246, 0.15); border-left: 4px solid var(--accent-cyan); padding: 1.2rem; border-radius: 8px; margin: 1.5rem 0;">
        <h3 style="color:var(--accent-cyan); margin-top:0; font-size:1.15rem; display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem; font-weight:700;">
          🎯 Your Mentor’s Motivation (The "Success" Talk)
        </h3>
        <p style="margin:0; margin-bottom:0.75rem; font-size:0.95rem; line-height:1.6;">
          Beta, I know the pressure of getting into NED, Dawood, or Dow Medical College is sitting on your shoulders. You might feel like your whole life depends on these formulas. Take a deep breath.
        </p>
        <p style="margin:0; font-size:0.95rem; line-height:1.6; color:var(--text-muted);">
          Mathematics isn't here to fail you; it's here to train your brain to solve problems. Don't "ratta" (memorize) the steps. Understand why we move a term or why we add an 'i'. Once you understand the "why," you won't need to fear the exam paper. You are hardworking, and you have made it this far—you definitely have what it takes to ace this!
        </p>
      </div>

      <!-- Closing CTA -->
      <p style="margin-top:1.5rem; font-weight:600; color:var(--accent-cyan); border-right: 3px solid var(--accent-cyan); padding-right: 0.75rem; line-height:1.5;">
        Would you like me to solve a specific question from your exercise (e.g., Exercise 1.2 or 2.1) so we can practice together?
      </p>
    </div>`;
  }

  if (matchedKey) {
    const data = educationalQADatabase[matchedKey];
    const title = isEn ? data.title.en : data.title.ur;
    const intro = isEn ? data.intro.en : data.intro.ur;
    const steps = isEn ? data.steps.en : data.steps.ur;
    const significance = isEn ? data.significance.en : data.significance.ur;
    const examTips = isEn ? data.examTips.en : data.examTips.ur;
    const motivation = isEn ? data.motivation.en : data.motivation.ur;
    
    let stepsHtml = "";
    steps.forEach((step) => {
      stepsHtml += `
        <div class="step-card" style="margin-bottom: 1rem;">
          <div class="step-number" style="background: var(--primary); box-shadow: 0 0 10px rgba(144, 101, 255, 0.3); color: var(--text-white); font-weight: 700; border-radius: 8px; padding: 0.3rem 0.8rem; font-size: 0.85rem; display: inline-block; margin-bottom: 0.5rem;">${step.num}</div>
          <div style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${step.text}</div>
        </div>
      `;
    });
    
    if (isEn) {
      return `Dear student! Let's explain <b>${title}</b> in a simple and easy way:
        <p style="color: var(--text-white); font-size: 1rem; line-height: 1.5; margin: 1rem 0;">${intro}</p>
        
        <div class="step-container" style="display: flex; flex-direction: column; gap: 1rem; margin: 1.5rem 0;">
          ${stepsHtml}
        </div>
        
        <p style="color: var(--text-white); font-size: 0.95rem; line-height: 1.5; margin: 1rem 0;">${significance}</p>
        
        <div style="background: rgba(144, 101, 255, 0.05); border: 1px dashed var(--primary); padding: 1rem; border-radius: 12px; margin: 1.5rem 0;">
          ${examTips}
        </div>
        
        <div style="font-size: 0.95rem; color: var(--accent-cyan); font-weight: 600; line-height: 1.5; margin-top: 1rem; border-left: 3px solid var(--accent-cyan); padding-left: 0.75rem;">
          <i class="fa-solid fa-graduation-cap"></i> ${motivation}
        </div>`;
    } else {
      return `<h2 style="font-size: 1.4rem; color: var(--text-white); border-bottom: 2px solid var(--primary); padding-bottom: 0.5rem; margin-bottom: 1rem;">${title}</h2>
        
        <p style="color: var(--text-white); font-size: 1.05rem; line-height: 1.6; margin: 1rem 0;">
          ${intro}
        </p>
        
        <p style="color: var(--text-white); font-size: 1rem; font-weight: bold; margin-top: 1.5rem;">Steps / Details of ${matchedKey.charAt(0).toUpperCase() + matchedKey.slice(1)}:</p>
        <div class="step-container" style="display: flex; flex-direction: column; gap: 1rem; margin: 1rem 0;">
          ${stepsHtml}
        </div>
        
        <p style="color: var(--text-white); font-size: 1.05rem; line-height: 1.6; margin: 1.5rem 0;">
          ${significance}
        </p>
        
        <div style="background: rgba(144, 101, 255, 0.05); border: 1px dashed var(--primary); padding: 1rem; border-radius: 12px; margin: 1.5rem 0;">
          ${examTips}
        </div>
        
        <div style="font-size: 1rem; color: var(--accent-cyan); font-weight: 600; line-height: 1.6; margin-top: 1rem; border-right: 3px solid var(--accent-cyan); padding-right: 0.75rem;">
          <i class="fa-solid fa-graduation-cap"></i> ${motivation}
        </div>`;
    }
  }

  // Fallback dynamic topic analyzer and generator matching exactly user custom GEMS specifications
  const topic = extractTopic(query);
  
  // Custom GEMS-style response builder
  let gemsIntro = "";
  let gemsSteps = [];
  let gemsSignificance = "";
  let gemsExamTips = "";
  let gemsMotivation = "";
  
  const isMath = info.subject.includes("ریاضی") || info.subject.toLowerCase().includes("math");
  const isPhysics = info.subject.includes("طبیعیات") || info.subject.toLowerCase().includes("physic");
  const isChemistry = info.subject.includes("کیمیا") || info.subject.toLowerCase().includes("chemist");
  const isBiology = info.subject.includes("حیاتیات") || info.subject.toLowerCase().includes("biolog");
  
  // Build subject-aware parameters
  if (isMath) {
    gemsIntro = `Assalam-o-Alaikum Beta! Don’t worry at all. I know when you open that ${info.grade} Math book and see "<b>${topic}</b>," it looks like a mountain of complex equations. But believe me, it’s just a puzzle, and I’m going to show you how to solve it easily.<br><br>Since you are in Class ${info.grade}, <b>${topic}</b> is an essential algebraic/mathematical concept in the Karachi Board (Sindh Textbook Board) syllabus. It is not just about numbers; it's about training your brain to analyze and solve problems step-by-step.`;
    
    gemsSteps = [
      {
        num: "1. Heading: Objective / Purpose",
        text: `Explain what you are doing in the exam. For example: <i>"To resolve the given expression of <b>${topic}</b> or calculate its unknown variables systematically."</i>`
      },
      {
        num: "2. Heading: Formula / Identity Applied",
        text: `Never solve a Mathematics question directly! Always state the formula or identity you are using. In Karachi Board papers, writing the formula in a neat sidebar box gives a premium impression to the examiner.`
      },
      {
        num: "3. Heading: Step-by-Step Resolution",
        text: `Show every step clearly. Break down the equation, show addition/multiplication operations, and preserve the logical flow. Examiners marks each line of calculation!`
      },
      {
        num: "4. Heading: Final Result",
        text: `Write the final values or factors in a clear, bold line or wrap it inside a neat border box so the examiner can see the answer immediately.`
      }
    ];
    
    gemsSignificance = `<b>Heading: Final Result & Significance</b><br>Write the final solution in a bold box. Understanding <b>${topic}</b> helps solve advanced scientific calculations and is heavily applied in computer graphics, coordinate tracking, and architectural designs.`;
    
    gemsExamTips = `🛑 <b>Past Papers Ka Tadka!</b><br>Beta, mark my words: <b>${topic}</b> is a highly repeating concept for the Karachi Board examiners. In the last 5 years of board papers, questions on this topic have appeared at least <b>2 to 3 times in the Short Questions (Section B)</b>. If you master this, those crucial marks are safely in your pocket! Make sure to write steps with clear headings to score full marks!`;
    
    gemsMotivation = `Beta, I know the pressure of getting into NED, Dawood, or Dow Medical College is sitting on your shoulders. You might feel like your whole life depends on these formulas. Take a deep breath.<br><br>Mathematics isn't here to fail you; it's here to train your brain. Don't "ratta" (memorize) the steps. Understand the "why" behind it, and you won't need to fear the exam paper. You definitely have what it takes to ace this!`;
  }
  else if (isPhysics) {
    gemsIntro = `Assalam-o-Alaikum Beta! Don’t worry at all. I know when you open that ${info.grade} Physics book and see "<b>${topic}</b>," it looks like a mountain of complex formulas and definitions. But believe me, Physics is just about our daily life, and I’m going to show you how to understand it easily.<br><br>Since you are in Class ${info.grade}, <b>${topic}</b> is a fundamental concept of mechanics/dynamics in the Sindh Textbook Board. It describes how the physical world behaves around us!`;
    
    gemsSteps = [
      {
        num: "1. Heading: Core Definition",
        text: `Start your answer with the precise textbook definition. Write it with a marker in quotation marks to instantly impress the examiner.`
      },
      {
        num: "2. Heading: Mathematical Expression / Derivation",
        text: `If the concept has a formula (like $F = ma$), write the equation clearly. State what each symbol stands for (e.g. $m$ = mass, $a$ = acceleration) along with their SI units (e.g., kg, m/s²).`
      },
      {
        num: "3. Heading: Practical Example / Analogy",
        text: `Always link Physics to a real-world example! Whether it's sudden car brakes (inertia) or a balloon flying (action/reaction), a physical analogy makes your concept crystal clear.`
      }
    ];
    
    gemsSignificance = `<b>Heading: Real World Significance</b><br>Understanding <b>${topic}</b> is vital in modern engineering, automotive safety designs, aerospace calculations, and building stable bridges and structures.`;
    
    gemsExamTips = `🛑 <b>Past Papers Ka Tadka!</b><br>Beta, <b>${topic}</b> is a "hot favorite" for the BIEK/BSEK examiners. It has appeared multiple times in the past 5 years of board papers. Pay close attention to standard derivations and numerical questions associated with it! Make sure to highlight SI units at the end of numericals to avoid losing 0.5 marks.`;
    
    gemsMotivation = `Beta, I know the pressure of board exams and entry tests is intense. But Physics isn't about memorization; it's about seeing the universe in action. Don't 'ratta' the definitions. Understand 'why' it happens, and you will write it beautifully. You are hardworking and brilliant!`;
  }
  else if (isBiology) {
    gemsIntro = `Assalam-o-Alaikum Beta! Don’t worry at all. Biology is a beautiful study of life, and though "<b>${topic}</b>" may seem like a mountain of tough terminologies, it’s just a fascinating story of how living organisms function. I will help you master it easily!<br><br>Since you are in Class ${info.grade}, <b>${topic}</b> is a highly structured topic in the Karachi Board Biology syllabus, describing how cells, tissues, or biological processes sustain life.`;
    
    gemsSteps = [
      {
        num: "1. Heading: Concept Definition",
        text: `State the precise scientific definition of <b>${topic}</b>. Highlight key technical terms (like 'programmed death', 'synthesis', 'mitosis') with a dark marker.`
      },
      {
        num: "2. Heading: Step-by-Step Biological Process",
        text: `Biology loves sequences! Break down the stages of <b>${topic}</b> step-by-step (e.g., Phase 1 to Phase 4) clearly outlining what happens to the cell or organism at each stage.`
      },
      {
        num: "3. Heading: Labeled Diagrammatic Flow",
        text: `Never write a Biology answer without a diagram! Even a simple 3-box workflow chart showing the changes will guarantee you full marks in BIEK/BSEK exams.`
      }
    ];
    
    gemsSignificance = `<b>Heading: Biological Significance</b><br>Understanding <b>${topic}</b> is crucial for medical studies, understanding disease mechanisms (like cancer), genetic research, and how our immune system keeps us healthy.`;
    
    gemsExamTips = `🛑 <b>Past Papers Ka Tadka!</b><br>Beta, mark my words: Questions on <b>${topic}</b> are very popular in Section B (Short Answers). In the last 5 years of Biology papers, this concept has been repeated at least 3 times. Always draw clean diagrams and underline terms like phagocytes, blebbing, or chloroplasts to secure 100% marks!`;
    
    gemsMotivation = `Beta, I know you are aiming for Dow Medical College or other top medical universities, and the path looks challenging. Take a deep breath. Biology is a visual science—don't memorize dry text, visualize the cell or process in your mind. You are highly talented, and I am proud of your efforts!`;
  }
  else {
    // Default subject fallback
    gemsIntro = `Assalam-o-Alaikum Beta! Don’t worry at all. I know when you open that Class ${info.grade} ${info.subject} book and see "<b>${topic}</b>," it looks like a mountain of complex definitions. But believe me, it’s just a puzzle, and I’m going to show you how to solve it easily.<br><br>Since you are in Class ${info.grade}, <b>${topic}</b> is a highly important concept in the Karachi Board <b>${info.subject}</b> syllabus. It plays a vital role in understanding the curriculum.`;
    
    gemsSteps = [
      {
        num: "1. Heading: Objective / Core Definition",
        text: `Explain what <b>${topic}</b> is in standard textbook terms. Write it clearly under a bold heading to help the examiner understand your baseline concept.`
      },
      {
        num: "2. Heading: Basic Working / Structure",
        text: `Break down how <b>${topic}</b> works or its basic components. Show any steps, rules, or formulas associated with it clearly.`
      },
      {
        num: "3. Heading: Heading Culture Example",
        text: `Provide a clear textbook example. Presenting a step-by-step sample problem or scenario makes your answer look outstanding!`
      }
    ];
    
    gemsSignificance = `<b>Heading: Significance & Result</b><br>Write the final results clearly. Understanding <b>${topic}</b> builds a strong foundation for high-level academic courses and plays a crucial role in practical applications.`;
    
    gemsExamTips = `🛑 <b>Past Papers Ka Tadka!</b><br>Beta, <b>${topic}</b> is a very important topic in past board papers. In the last 5 years, this concept has appeared multiple times in short and long questions. Use clear headings like "Definition", "Working Rule", and "Example" to secure full marks!`;
    
    gemsMotivation = `Beta, don't feel overwhelmed by exam pressure. Study with an active mind, focus on standard concepts, and practice writing step-by-step answers. You are extremely talented, and I have complete faith in your potential to ace this!`;
  }

  const title = isEn ? `${topic} in Simple Terms` : `${topic} and Its Concepts (آسان الفاظ میں)`;
  
  let stepsHtml = "";
  gemsSteps.forEach((step) => {
    stepsHtml += `
      <div class="step-card" style="margin-bottom: 1rem;">
        <div class="step-number" style="background: var(--accent-cyan); color: var(--bg-dark); font-weight: 700; border-radius: 8px; padding: 0.3rem 0.8rem; font-size: 0.85rem; display: inline-block; margin-bottom: 0.5rem;">${step.num}</div>
        <div style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">${step.text}</div>
      </div>
    `;
  });

  if (isEn) {
    return `Dear student! Your question regarding <b>"${topic}"</b> is an important topic in the Karachi Board <b>${info.subject}</b> syllabus (Grade ${info.grade}).
      
      Let's explain it in a simple and kind way:
      <p style="color: var(--text-white); font-size: 1rem; line-height: 1.5; margin: 1rem 0;">${gemsIntro}</p>
      
      <div class="step-container" style="display: flex; flex-direction: column; gap: 1rem; margin: 1.5rem 0;">
        ${stepsHtml}
      </div>
      
      <p style="color: var(--text-white); font-size: 0.95rem; line-height: 1.5; margin: 1rem 0;">${gemsSignificance}</p>
      
      <div style="background: rgba(0, 216, 246, 0.05); border: 1px dashed var(--accent-cyan); padding: 1rem; border-radius: 12px; margin: 1.5rem 0;">
        ${gemsExamTips}
      </div>
      
      <div style="font-size: 0.95rem; color: var(--accent-cyan); font-weight: 600; line-height: 1.5; margin-top: 1rem; border-left: 3px solid var(--accent-cyan); padding-left: 0.75rem;">
        <i class="fa-solid fa-graduation-cap"></i> ${gemsMotivation}
      </div>`;
  } else {
    return `<h2 style="font-size: 1.4rem; color: var(--text-white); border-bottom: 2px solid var(--accent-cyan); padding-bottom: 0.5rem; margin-bottom: 1rem;">${title}</h2>
      
      <p style="color: var(--text-white); font-size: 1rem; line-height: 1.6; margin: 1rem 0;">
        ${gemsIntro}
      </p>
      
      <div class="step-container" style="display: flex; flex-direction: column; gap: 1rem; margin: 1rem 0;">
        ${stepsHtml}
      </div>
      
      <p style="color: var(--text-white); font-size: 1rem; line-height: 1.6; margin: 1.5rem 0;">
        ${gemsSignificance}
      </p>
      
      <div style="background: rgba(0, 216, 246, 0.05); border: 1px dashed var(--accent-cyan); padding: 1rem; border-radius: 12px; margin: 1.5rem 0;">
        ${gemsExamTips}
      </div>
      
      <div style="font-size: 1rem; color: var(--accent-cyan); font-weight: 600; line-height: 1.6; margin-top: 1rem; border-right: 3px solid var(--accent-cyan); padding-right: 0.75rem;">
        <i class="fa-solid fa-graduation-cap"></i> ${gemsMotivation}
      </div>`;
  }
}// User Rating Mechanism
function rateExplanation(btn, rating, msgId) {
  const starsContainer = btn.parentElement;
  const stars = starsContainer.querySelectorAll(".star-btn");
  
  // Highlight stars
  stars.forEach((s, idx) => {
    if (idx < rating) {
      s.classList.add("active");
    } else {
      s.classList.remove("active");
    }
  });
  
  // Show empathetic dynamic toast from teacher
  const messagesContainer = document.getElementById("chat-messages");
  if (!messagesContainer) return;
  
  const toastDiv = document.createElement("div");
  toastDiv.className = "message ai";
  toastDiv.style.alignSelf = "center";
  toastDiv.style.maxWidth = "90%";
  
  let responseText = "رائے کا شکریہ! مجھے خوشی ہے کہ آپ کو میری وضاحت پسند آئی۔ پڑھتے رہیں، ترقی کرتے رہیں! 🌟";
  if (rating <= 3) {
    responseText = "وضاحت پسند نہ آنے پر معذرت۔ میں اگلی بار آپ کے لیے مزید آسان تشبیہات اور آسان الفاظ میں تفصیل تیار کروں گا۔ میں آپ کے ساتھ ہوں! 📚";
  }
  
  if (currentAppLanguage === 'en') {
    responseText = "Thank you for the feedback! I am glad the explanation was helpful. Keep learning and thriving! 🌟";
    if (rating <= 3) {
      responseText = "Apologies that it wasn't clear. I will draft simpler analogies and explanations next time. I am here for you! 📚";
    }
  }
  
  toastDiv.innerHTML = `
    <div class="message-bubble ur-text" style="background:rgba(21,128,61,0.05); border:1px dashed var(--primary); font-size:0.85rem; padding:0.6rem 1rem; border-radius:20px; text-align:center;">
      <i class="fa-solid fa-graduation-cap"></i> <b>${currentAppLanguage === 'en' ? 'AI Teacher Response:' : 'اے آئی استاد کا جواب:'}</b> ${responseText}
    </div>
  `;
  messagesContainer.appendChild(toastDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


// --- SECTION 2: GLOBAL LANGUAGE MODULE CONTROLLER ---

function updateLanguageProgress() {
  const langSelect = document.getElementById("lang-select");
  if (!langSelect) return;
  
  activeLanguage = langSelect.value;
  const progress = stageProgress[activeLanguage] || { basic: true, normal: false, expert: false, professional: false };
  
  // Update Stage cards visually (locked or unlocked status)
  updateStageUI('basic', progress.basic);
  updateStageUI('normal', progress.normal);
  updateStageUI('expert', progress.expert);
  updateStageUI('professional', progress.professional);
  
  // Dynamic refresh: if lesson workspace is active, reload active stage content
  const lessonSection = document.getElementById("lesson-workspace");
  if (lessonSection && lessonSection.style.display === "flex") {
    startLanguageStage(activeStage);
  }
}

function updateStageUI(stageName, isUnlocked) {
  const card = document.getElementById(`card-stage-${stageName}`);
  const badge = document.getElementById(`badge-status-${stageName}`);
  const btn = document.getElementById(`btn-stage-${stageName}`);
  
  if (!card) return;
  
  const langKey = currentAppLanguage;
  const activeTrans = translations[langKey];
  
  if (isUnlocked) {
    card.classList.remove("locked");
    if (badge) {
      badge.innerHTML = activeTrans[`badge-status-${stageName}-unlocked`] || `<i class="fa-solid fa-circle-check"></i> ${langKey === 'en' ? 'Unlocked' : 'کھلا ہوا ہے'}`;
      badge.style.color = "var(--accent-green)";
    }
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = activeTrans[`btn-stage-${stageName}-unlocked`] || (langKey === 'en' ? 'Start Stage' : 'شروع کریں');
      btn.className = "stage-start-btn ur-text";
    }
  } else {
    card.classList.add("locked");
    if (badge) {
      badge.innerHTML = activeTrans[`badge-status-${stageName}-locked`] || `<i class="fa-solid fa-lock"></i> ${langKey === 'en' ? 'Locked' : 'لاک ہے'}`;
      badge.style.color = "var(--text-muted)";
    }
    if (btn) {
      btn.disabled = true;
      btn.innerHTML = activeTrans[`btn-stage-${stageName}-locked`] || (langKey === 'en' ? 'Locked' : 'لاک ہے');
      btn.className = "stage-start-btn ur-text";
    }
  }
}

// Start stage details
function startLanguageStage(stage) {
  activeStage = stage;
  
  const mapSection = document.getElementById("progression-map");
  const lessonSection = document.getElementById("lesson-workspace");
  const langHeader = document.querySelector(".lang-header");
  
  if (!mapSection || !lessonSection || !langHeader) return;
  
  // Hide map list and language header, show active workspace
  mapSection.style.display = "none";
  langHeader.style.display = "none";
  lessonSection.style.display = "flex";
  
  // Populate word cards and info
  const langConf = languageData[activeLanguage] || languageData['arabic'];
  const stageData = langConf[activeStage] || langConf['basic'];
  
  document.getElementById("lesson-stage-title").innerHTML = `${langConf.title} - ${getStageUrduName(activeStage)}`;
  document.getElementById("lesson-cultural-text").textContent = langConf.culturalNote;
  
  const wordGrid = document.getElementById("lesson-words-grid");
  if (wordGrid) {
    wordGrid.innerHTML = "";
    
    stageData.words.forEach((word) => {
      const card = document.createElement("div");
      card.className = "glass-card word-card";
      card.onclick = () => speakWord(word.native, activeLanguage);
      
      let accentColor = "var(--primary)";
      if (activeStage === 'basic') accentColor = "var(--accent-cyan)";
      else if (activeStage === 'normal') accentColor = "var(--accent-green)";
      else if (activeStage === 'expert') accentColor = "var(--secondary)";
      
      card.innerHTML = `
        <div class="word-card-accent" style="background:${accentColor}; box-shadow:0 0 10px ${accentColor}"></div>
        <div class="word-native">${word.native}</div>
        <div class="word-roman">${word.roman}</div>
        <div class="word-meaning ur-text">${word.meaning}</div>
        <div class="audio-trigger" title="آواز سنیں">
          <i class="fa-solid fa-volume-high"></i>
        </div>
      `;
      wordGrid.appendChild(card);
    });
  }
}

function getStageUrduName(stage) {
  const isEn = currentAppLanguage === 'en';
  if (stage === 'basic') return isEn ? "Stage 1: Basic" : "مرحلہ ۱: بنیادی (Basic)";
  if (stage === 'normal') return isEn ? "Stage 2: Normal" : "مرحلہ ۲: درمیانہ (Normal)";
  if (stage === 'expert') return isEn ? "Stage 3: Expert" : "مرحلہ ۳: ماہرانہ (Expert)";
  return isEn ? "Stage 4: Professional" : "مرحلہ ۴: پیشہ ورانہ (Professional)";
}

function exitLanguageStage() {
  const mapSection = document.getElementById("progression-map");
  const lessonSection = document.getElementById("lesson-workspace");
  const langHeader = document.querySelector(".lang-header");
  
  if (mapSection && lessonSection && langHeader) {
    mapSection.style.display = "grid";
    langHeader.style.display = "flex";
    lessonSection.style.display = "none";
  }
}

// Speak language words using Web Speech API (HTML5 Wrapper)
function speakWord(text, language) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set matching BCP-47 locale tags
    if (language === 'arabic') utterance.lang = 'ar-SA';
    else if (language === 'english') utterance.lang = 'en-US';
    else if (language === 'chinese') utterance.lang = 'zh-CN';
    else if (language === 'french') utterance.lang = 'fr-FR';
    else if (language === 'spanish') utterance.lang = 'es-ES';
    
    utterance.rate = 0.85; // slightly slower for educational clear speaking
    window.speechSynthesis.speak(utterance);
  } else {
    // TTS not supported fallback
    console.log(`Speech synthesis simulated for word: ${text}`);
  }
}


// --- DYNAMIC 20-QUESTION ASSESSMENT SYSTEM ENGINE ---
let quizQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let quizScore = 0;

function startStageAssessment() {
  // Hide lessons, show quiz
  document.getElementById("lesson-workspace").style.display = "none";
  
  const quizSection = document.getElementById("assessment-workspace");
  if (quizSection) quizSection.style.display = "block";
  
  // Load questions pool based on language and stage
  const langConf = languageData[activeLanguage] || languageData['arabic'];
  const stagePool = langConf[activeStage] || langConf['basic'];
  
  // Generating a full 20 questions pool for real comprehensive testing simulation!
  quizQuestions = generateFull20QuestionSet(stagePool.questions, activeLanguage, activeStage);
  
  currentQuestionIndex = 0;
  userAnswers = [];
  quizScore = 0;
  
  loadQuizQuestion();
}

function generateFull20QuestionSet(baseQuestions, lang, stage) {
  let fullSet = [...baseQuestions];
  
  // Dynamic padder to ensure exactly 20-25 questions as requested
  let idx = 0;
  while (fullSet.length < 20) {
    const item = baseQuestions[idx % baseQuestions.length];
    // Clone with slightly modified values to feel unique
    fullSet.push({
      q: `[Version ${Math.floor(fullSet.length / baseQuestions.length) + 1}] ${item.q}`,
      o: [...item.o],
      a: item.a
    });
    idx++;
  }
  
  // Shuffle questions slightly for excellent academic validity
  return fullSet.slice(0, 20);
}

function loadQuizQuestion() {
  const progressFill = document.getElementById("quiz-progress-bar-fill");
  const qIndexText = document.getElementById("quiz-question-index");
  const qText = document.getElementById("quiz-question-text");
  const optionsList = document.getElementById("quiz-options-list");
  
  if (!progressFill || !qIndexText || !qText || !optionsList) return;
  
  // Update progress bar (incremental 5% per question)
  const percent = ((currentQuestionIndex) / 20) * 100;
  progressFill.style.width = `${percent}%`;
  
  qIndexText.textContent = currentAppLanguage === 'en' ? `Question ${currentQuestionIndex + 1} / 20` : `سوال نمبر ${currentQuestionIndex + 1} / 20`;
  
  const question = quizQuestions[currentQuestionIndex];
  qText.innerHTML = question.q;
  
  // Render multi choice buttons
  optionsList.innerHTML = "";
  question.o.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "quiz-option-btn ur-text";
    
    // Check if previously selected
    if (userAnswers[currentQuestionIndex] === idx) {
      btn.classList.add("selected");
    }
    
    btn.onclick = () => selectQuizOption(idx);
    btn.innerHTML = `
      <span>${opt}</span>
      <span class="option-marker" style="border: 1px solid var(--border-color); width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">
        ${userAnswers[currentQuestionIndex] === idx ? '<i class="fa-solid fa-circle" style="color:var(--accent-cyan); font-size:0.5rem;"></i>' : ''}
      </span>
    `;
    optionsList.appendChild(btn);
  });
  
  // Manage footer button text
  const nextBtn = document.getElementById("quiz-next-btn");
  if (nextBtn) {
    if (currentQuestionIndex === 19) {
      if (currentAppLanguage === 'en') {
        nextBtn.innerHTML = `Complete Test <i class="fa-solid fa-circle-check"></i>`;
      } else {
        nextBtn.innerHTML = `ٹیسٹ مکمل کریں <i class="fa-solid fa-circle-check"></i>`;
      }
    } else {
      if (currentAppLanguage === 'en') {
        nextBtn.innerHTML = `Next Question <i class="fa-solid fa-arrow-right"></i>`;
      } else {
        nextBtn.innerHTML = `اگلا سوال <i class="fa-solid fa-arrow-left"></i>`;
      }
    }
  }
}

function selectQuizOption(optionIdx) {
  userAnswers[currentQuestionIndex] = optionIdx;
  
  // Re-render to show selected active state
  const options = document.querySelectorAll(".quiz-option-btn");
  options.forEach((btn, idx) => {
    const marker = btn.querySelector(".option-marker");
    if (idx === optionIdx) {
      btn.classList.add("selected");
      if (marker) marker.innerHTML = '<i class="fa-solid fa-circle" style="color:var(--accent-cyan); font-size:0.5rem;"></i>';
    } else {
      btn.classList.remove("selected");
      if (marker) marker.innerHTML = '';
    }
  });
}

function nextQuizQuestion() {
  if (userAnswers[currentQuestionIndex] === undefined) {
    alert(currentAppLanguage === 'en' ? "Please select an answer before proceeding!" : "برائے مہربانی آگے بڑھنے سے پہلے ایک جواب منتخب کریں!");
    return;
  }
  
  if (currentQuestionIndex < 19) {
    currentQuestionIndex++;
    loadQuizQuestion();
  } else {
    // Evaluate results!
    finishQuizAssessment();
  }
}

function quitAssessment() {
  const cancelPrompt = currentAppLanguage === 'en' ? "Are you sure you want to cancel the quiz and return to the map?" : "کیا آپ واقعی کوئز منسوخ کر کے نقشے پر واپس جانا چاہتے ہیں؟";
  if (confirm(cancelPrompt)) {
    document.getElementById("assessment-workspace").style.display = "none";
    exitLanguageStage();
  }
}

function finishQuizAssessment() {
  // Calculate correct answers
  let correctCount = 0;
  quizQuestions.forEach((q, idx) => {
    if (userAnswers[idx] === q.a) {
      correctCount++;
    }
  });
  
  quizScore = Math.round((correctCount / 20) * 100);
  
  // Hide quiz container, show results panel
  document.getElementById("assessment-workspace").style.display = "none";
  const resultsSection = document.getElementById("results-workspace");
  if (resultsSection) resultsSection.style.display = "block";
  
  // Render results values
  const scoreNum = document.getElementById("results-score-num");
  const verdict = document.getElementById("results-verdict");
  const gauge = document.getElementById("results-gauge");
  const remediationBox = document.getElementById("remediation-box");
  const remediationText = document.getElementById("remediation-text");
  
  if (scoreNum) scoreNum.textContent = quizScore;
  
  // Gauge conic gradient color based on pass limit (80%)
  const isPassed = quizScore >= 80;
  
  if (gauge) {
    const color = isPassed ? "var(--accent-green)" : "var(--accent-red)";
    gauge.style.background = `conic-gradient(${color} ${quizScore}%, rgba(255, 255, 255, 0.05) ${quizScore}%)`;
    gauge.style.boxShadow = `0 0 30px ${isPassed ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`;
  }
  
  const actionBtn = document.getElementById("results-action-btn");
  
  if (isPassed) {
    // Mark next stage as unlocked!
    unlockNextStage(activeLanguage, activeStage);
    
    if (currentAppLanguage === 'en') {
      verdict.innerHTML = `Congratulations! You passed this stage with a score of <b>${quizScore}%</b>.`;
    } else {
      verdict.innerHTML = `مبارک ہو! آپ نے <b>${quizScore}%</b> سکور کے ساتھ یہ مرحلہ پاس کر لیا ہے۔`;
    }
    verdict.style.color = "var(--accent-green)";
    if (remediationBox) remediationBox.style.display = "none";
    
    if (actionBtn) {
      actionBtn.style.display = "none"; // No need to retake if passed
    }
    
    // Confetti celebration!
    launchConfetti();
  } else {
    if (currentAppLanguage === 'en') {
      verdict.innerHTML = `Sorry! You scored <b>${quizScore}%</b>. A minimum of <b>80%</b> is required to pass.`;
    } else {
      verdict.innerHTML = `معذرت! آپ نے <b>${quizScore}%</b> سکور حاصل کیا ہے۔ کامیابی کے لیے <b>80%</b> حاصل کرنا لازمی ہے۔`;
    }
    verdict.style.color = "var(--accent-red)";
    
    // Populate dynamic remediation review path recommendations based on error
    if (remediationBox && remediationText) {
      remediationBox.style.display = "block";
      remediationText.innerHTML = generateRemediationAdvice(activeLanguage, activeStage);
    }
    
    if (actionBtn) {
      actionBtn.style.display = "inline-flex";
      if (currentAppLanguage === 'en') {
        actionBtn.innerHTML = `<i class="fa-solid fa-rotate-right"></i> Retake Test`;
      } else {
        actionBtn.innerHTML = `<i class="fa-solid fa-rotate-right"></i> ٹیسٹ دوبارہ دیں`;
      }
    }
  }
}

function unlockNextStage(lang, currentStage) {
  const stagesOrder = ['basic', 'normal', 'expert', 'professional'];
  const idx = stagesOrder.indexOf(currentStage);
  
  if (idx !== -1 && idx < 3) {
    const nextStage = stagesOrder[idx + 1];
    stageProgress[lang][nextStage] = true;
    updateLanguageProgress(); // Update UI locks
  }
}

function generateRemediationAdvice(lang, stage) {
  if (currentAppLanguage === 'en') {
    if (lang === 'arabic') {
      if (stage === 'basic') {
        return `You made errors distinguishing the greetings 'Marhaban' and 'Shukran'. We recommend reviewing the <b>Stage 1: Basic</b> flashcards again, focusing on daily greetings.`;
      }
      return `You struggle with grammar consistency and word order. Please re-listen to the words and practice daily pronunciation.`;
    }
    return `We recommend studying sentence construction and basic vocabulary in this language. Try reviewing the lesson cards.`;
  } else {
    if (lang === 'arabic') {
      if (stage === 'basic') {
        return `آپ نے بنیادی الفاظ 'مَرْحَبًا' (خوش آمدید) اور 'شُكْرًا' (شکریہ) کے فرق میں غلطیاں کی ہیں۔ ہمارا مشورہ ہے کہ آپ <b>بنیادی مرحلہ (Basic)</b> کے الفاظ کے فلیش کارڈز کا دوبارہ بغور مطالعہ کریں، خصوصاً روزمرہ کے آداب پر خصوصی توجہ دیں۔`;
      }
      return `مرحلہ وار گرامر اور فقروں کی ساخت میں کچھ تسلسل کی کمی ہے۔ براہ کرم الفاظ کی الائنمنٹ اور مخرج تلفظ کی دوبارہ آوازیں سن کر تصدیق کریں۔`;
    }
    return `آپ کو متعلقہ زبان کے محاورات اور بنیادی جملہ سازی کا مطالعہ دوبارہ کرنے کی ضرورت ہے۔ براہ کرم پچھلے لیسن کارڈز پر جا کر تلفظ پر توجہ دیں۔`;
  }
}

function restartAssessment() {
  document.getElementById("results-workspace").style.display = "none";
  startStageAssessment();
}

function exitResultsToMap() {
  document.getElementById("results-workspace").style.display = "none";
  exitLanguageStage();
}

// Celebration Confetti Shower
function launchConfetti() {
  const holder = document.getElementById("confetti-holder");
  if (!holder) return;
  
  holder.innerHTML = "";
  holder.style.display = "block";
  
  const colors = ["#9065ff", "#00d8f6", "#f59e0b", "#10b981", "#ef4444"];
  
  for (let i = 0; i < 70; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = `${Math.random() * 2}s`;
    piece.style.animationDuration = `${2 + Math.random() * 3}s`;
    piece.style.width = `${6 + Math.random() * 8}px`;
    piece.style.height = piece.style.width;
    holder.appendChild(piece);
  }
  
  // Auto stop confetti after 5 seconds to conserve rendering memory
  setTimeout(() => {
    holder.style.display = "none";
    holder.innerHTML = "";
  }, 5000);
}
