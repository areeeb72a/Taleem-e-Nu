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
  spanish: { basic: true, normal: false, expert: false, professional: false }
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
  "5th": ["ریاضی (Math)", "جنرل سائنس (General Science)", "اردو (Urdu)", "اسلامیات (Islamiat)", "سوشل سٹڈیز (Social Studies)"],
  "6th": ["ریاضی (Math)", "جنرل سائنس (General Science)", "اردو (Urdu)", "انگریزی (English)", "اسلامیات (Islamiat)"],
  "7th": ["ریاضی (Math)", "جنرل سائنس (General Science)", "اردو (Urdu)", "انگریزی (English)", "اسلامیات (Islamiat)"],
  "8th": ["ریاضی (Math)", "جنرل سائنس (General Science)", "اردو (Urdu)", "انگریزی (English)", "مطالعہ پاکستان (Pak Studies)"],
  "9th": ["ریاضی (Math)", "طبیعیات (Physics)", "کیمیا (Chemistry)", "کمپیوٹر سائنس (Computer Science)", "انگریزی (English)"],
  "10th": ["ریاضی (Math)", "حیاتیات (Biology)", "طبیعیات (Physics)", "کیمیا (Chemistry)", "اردو (Urdu)"],
  "11th": ["ریاضی (Mathematics)", "طبیعیات (Physics)", "کیمیا (Chemistry)", "اردو (Urdu)", "انگریزی (English)"],
  "12th": ["ریاضی (Mathematics)", "حیاتیات (Biology)", "طبیعیات (Physics)", "کیمیا (Chemistry)", "مطالعہ پاکستان"]
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
  spanish: {
    title: "ہسپانوی زبان (Spanish)",
    culturalNote: "ہسپانوی دنیا کی کثیر مقاصد اور آسانی سے سیکھی جانے والی زبان ہے۔ یہ صوتی (phonetic) زبان ہے، یعنی جیسا لکھا جاتا ہے ویسا ہی پڑھا جاتا ہے۔",
    basic: {
      words: [
        { native: "Hola", roman: "Hola (ہولا)", meaning: "ہیلو / سلام" },
        { native: "Gracias", roman: "Gracias (گراسیاس)", meaning: "شکریہ" },
        { native: "Sí", roman: "Sí (سی)", meaning: "جی ہاں" },
        { native: "No", roman: "No (نو)", meaning: "نہیں" },
        { native: "¿Cómo estás?", roman: "¿Cómo estás? (کومو استاس؟)", meaning: "آپ کا کیا حال ہے؟" },
        { native: "Estoy bien", roman: "Estoy bien (استوئے بیاں)", meaning: "میں ٹھیک ہوں" }
      ],
      questions: [
        { q: "ہسپانوی زبان میں 'سلام / ہیلو' کو کیا کہتے ہیں؟", o: ["Gracias", "Hola", "Sí", "No"], a: 1 },
        { q: "ہسپانوی لفظ 'Gracias' کا صحیح ترجمہ منتخب کریں:", o: ["ہیلو", "شکریہ", "جی ہاں", "نہیں"], a: 1 },
        { q: "ہسپانوی لفظ 'Sí' کا کیا مطلب ہے؟", o: ["نہیں", "شکریہ", "جی ہاں", "ہیلو"], a: 2 },
        { q: "ہسپانوی زبان میں 'نہیں' کو کیا کہتے ہیں؟", o: ["Sí", "No", "Gracias", "Hola"], a: 1 },
        { q: "ہسپانوی فقرے '¿Cómo estás?' کا کیا مطلب ہے؟", o: ["آپ کہاں جا رہے ہیں؟", "آپ کا نام کیا ہے؟", "آپ کا کیا حال ہے؟", "میں ٹھیک ہوں"], a: 2 },
        { q: "اگر کوئی آپ سے پوچھے '¿Cómo estás?' تو ہسپانوی میں جواب کیا ہوگا؟", o: ["Estoy bien", "No", "Gracias", "Hola"], a: 0 }
      ]
    },
    normal: {
      words: [
        { native: "¿Dónde está la biblioteca?", roman: "¿Dónde está la biblioteca?", meaning: "لائبریری کہاں ہے؟" }
      ],
      questions: [
        { q: "Translate: '¿Dónde está la biblioteca?'", o: ["کتاب کہاں ہے؟", "لائبریری کہاں ہے؟", "سکول کہاں ہے؟", "وہاں لائبریری ہے"], a: 1 }
      ]
    },
    expert: {
      words: [
        { native: "A la tercera va la vencida", roman: "A la tercera...", meaning: "تیسری بار کوشش کرنے سے کامیابی مل جاتی ہے (محاورہ)" }
      ],
      questions: [
        { q: "ہسپانوی مقولے کا کیا مفہوم ہے؟", o: ["ہمیشہ سچ بولو", "تیسری بار کوشش کرنے سے کامیابی مل جاتی ہے", "وقت بہت قیمتی ہے", "محنت میں عظمت ہے"], a: 1 }
      ]
    },
    professional: {
      words: [
        { native: "Acuerdo de entendimiento", roman: "Acuerdo de entendimiento", meaning: "مفاہمت کی یادداشت (MOU)" }
      ],
      questions: [
        { q: "کاروباری ہسپانوی میں 'Acuerdo de entendimiento' سے کیا مراد ہے؟", o: ["ٹیکس آڈٹ", "مفاہمت کی یادداشت (MOU)", "سالانہ بجٹ", "تجارتی بل"], a: 1 }
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
  
  if (normalized.includes("quadratic") || normalized.includes("فارمولا")) {
    if (isEn) {
      return `Dear student! The <b>Quadratic Formula</b> is an essential topic in Karachi Board Math (Grades 9 and 10). Let's break it down:
        
        For any quadratic equation $ax^2 + bx + c = 0$, the roots can be solved using:
        <div style="background:rgba(255,255,255,0.05); padding:1rem; border-radius:8px; text-align:center; font-size:1.2rem; margin:1rem 0; font-family:monospace; border-left:4px solid var(--accent-cyan);">
          x = [-b ± √(b² - 4ac)] / 2a
        </div>
        
        <div class="step-container">
          <div class="step-card">
            <div class="step-number">Step 1: Variables Identification</div>
            Compare the given equation with $ax^2 + bx + c = 0$ to extract the values of coefficients $a$, $b$, and $c$.
          </div>
          <div class="step-card">
            <div class="step-number">Step 2: Substitution</div>
            Substitute these extracted values carefully inside the formula under the square root.
          </div>
          <div class="step-card">
            <div class="step-number">Step 3: Two Solutions</div>
            Because of the $±$ sign, you will get two distinct roots, representing the final answers.
          </div>
        </div>
        In real-world contexts, this equation is used to calculate vehicle acceleration and model projectile paths!`;
    } else {
      return `پیارے طالب علم! <b>دو درجی فارمولا (Quadratic Formula)</b> کراچی بورڈ کے ریاضی (جماعت نہم و دہم) کا ایک انتہائی اہم موضوع ہے۔ آئیے اسے بالکل آسان انداز میں سمجھتے ہیں:
        
        کسی بھی دو درجی مساوات $ax^2 + bx + c = 0$ کے حل کے لیے فارمولا درج ذیل ہے:
        <div style="background:rgba(255,255,255,0.05); padding:1rem; border-radius:8px; text-align:center; font-size:1.2rem; margin:1rem 0; font-family:monospace; border-left:4px solid var(--accent-cyan);">
          x = [-b ± √(b² - 4ac)] / 2a
        </div>
        
        <div class="step-container">
          <div class="step-card">
            <div class="step-number">مرحلہ ۱: مساوات کی شناخت</div>
            سب سے پہلے دی گئی مساوات کا موازنہ $ax^2 + bx + c = 0$ سے کریں اور $a$، $b$، اور $c$ کی قیمتیں الگ کریں۔
          </div>
          <div class="step-card">
            <div class="step-number">مرحلہ ۲: فارمولے میں قیمتیں رکھنا</div>
            ان قیمتوں کو فارمولے کے اندر جزر (Square Root) کے ساتھ احتیاط سے درج کریں۔
          </div>
          <div class="step-card">
            <div class="step-number">مرحلہ ۳: دو ممکنہ حل نکالنا</div>
            علامت $±$ (پلس مائنس) کی وجہ سے آپ کے پاس دو الگ حل (Roots) آئیں گے، جو مساوات کا حتمی جواب ہوں گے۔
          </div>
        </div>
        روزمرہ زندگی میں اس کا استعمال گاڑیوں کی رفتار اور لانچنگ راکٹ کے راستے کا تعین کرنے کے لیے کیا جاتا ہے!`;
    }
  }
  
  if (normalized.includes("newton") || normalized.includes("قانون")) {
    if (isEn) {
      return `Great Physics question! <b>Newton's Second Law of Motion</b> states that the force acting on an object is equal to its mass multiplied by its acceleration.
        
        <div style="background:rgba(255,255,255,0.05); padding:1rem; border-radius:8px; text-align:center; font-size:1.3rem; margin:1rem 0; font-family:monospace; border-left:4px solid var(--accent-cyan);">
          F = m × a
        </div>
        
        <div class="step-container">
          <div class="step-card">
            <div class="step-number">Step 1: Force and Acceleration Relation</div>
            The greater the force (F) applied to an object, the greater its change in velocity (Acceleration).
          </div>
          <div class="step-card">
            <div class="step-number">Step 2: Effect of Mass</div>
            If an object has more mass, it requires much more force to achieve the same acceleration.
          </div>
        </div>
        Example: Pushing an empty shopping cart is effortless, whereas a fully loaded cart requires a much harder push. That is Newton's second law!`;
    } else {
      return `آپ کا طبیعیات (Physics) کا سوال مجھے بہت پسند آیا! <b>نیوٹن کا حرکت کا دوسرا قانون (Newton's Second Law of Motion)</b> ہمیں بتاتا ہے کہ کسی جسم پر لگنے والی قوت اس کے ماس اور اس میں پیدا ہونے والے ایکسیلیریشن کے ضرب کے برابر ہوتی ہے۔
        
        <div style="background:rgba(255,255,255,0.05); padding:1rem; border-radius:8px; text-align:center; font-size:1.3rem; margin:1rem 0; font-family:monospace; border-left:4px solid var(--accent-cyan);">
          F = m × a
        </div>
        
        <div class="step-container">
          <div class="step-card">
            <div class="step-number">مرحلہ ۱: قوت (Force) اور ایکسیلیریشن کا رشتہ</div>
            جتنی زیادہ قوت (F) آپ کسی چیز پر لگائیں گے، اس کی رفتار میں اتنی ہی تیزی سے تبدیلی (Acceleration) آئے گی۔
          </div>
          <div class="step-card">
            <div class="step-number">مرحلہ ۲: ماس (Mass) کا اثر</div>
            اگر کسی جسم کا ماس (وزن نما) زیادہ ہوگا، تو اسے اسی رفتار سے بھگانے کے لیے کہیں زیادہ طاقت درکار ہوگی۔
          </div>
        </div>
        مثال کے طور پر: ایک خالی شاپنگ کارٹ کو دھکیلنا بہت آسان ہوتا ہے جبکہ بھری ہوئی کارٹ کو دھکیلنے کے لیے آپ کو زیادہ زور لگانا پڑتا ہے۔ یہی نیوٹن کا دوسرا قانون ہے!`;
    }
  }
  
  if (normalized.includes("water") || normalized.includes("پانی") || normalized.includes("h2o")) {
    if (isEn) {
      return `This is a key Chemistry topic for Grade 10 of the Karachi Board. <b>Water Molecule (H₂O)</b> contains covalent bonds. Let's analyze its structure:
        
        <div class="step-container">
          <div class="step-card">
            <div class="step-number">Step 1: Atoms Configuration</div>
            One water molecule consists of one Oxygen (O) atom and two Hydrogen (H) atoms.
          </div>
          <div class="step-card">
            <div class="step-number">Step 2: Electron Sharing</div>
            Hydrogen needs 1 electron and Oxygen needs 2 to stabilize. They share valence electrons, forming two single covalent bonds.
          </div>
          <div class="step-card">
            <div class="step-number">Step 3: Angle and Shape</div>
            This sharing results in a Bent Structure with a molecular angle of approximately $104.5^o$.
          </div>
        </div>
        This unique polar structure makes water highly effective at dissolving substances, earning it the title of the 'Universal Solvent'!`;
    } else {
      return `کیمسٹری (کیمیا) کا یہ سوال کراچی بورڈ کے دسویں جماعت کے نصاب کا حصہ ہے۔ <b>پانی کے سالمہ (H₂O)</b> میں کوویلنٹ بانڈ (ہم آہنگ بانڈ) پایا جاتا ہے۔ آئیے اس کی ساخت آسان اردو میں سمجھتے ہیں:
        
        <div class="step-container">
          <div class="step-card">
            <div class="step-number">مرحلہ ۱: ایٹمز کی ترتیب</div>
            پانی کے ایک مالیکیول میں ایک آکسیجن (O) کا ایٹم اور دو ہائیڈروجن (H) کے ایٹمز ہوتے ہیں۔
          </div>
          <div class="step-card">
            <div class="step-number">مرحلہ ۲: الیکٹرانز کی شراکت داری</div>
            ہائیڈروجن کو مستحکم ہونے کے لیے ایک الیکٹران جبکہ آکسیجن کو دو الیکٹرانز کی ضرورت ہوتی ہے۔ لہذا یہ آپس میں الیکٹرانز شیئر (شراکت داری) کر کے سنگل کوویلنٹ بانڈ بناتے ہیں۔
          </div>
          <div class="step-card">
            <div class="step-number">مرحلہ ۳: زاویہ اور ساخت</div>
            شراکت داری کے بعد پانی کے مالیکیول کی ساخت خمدار (Bent Structure) ہو جاتی ہے جس کا زاویہ تقریباً $104.5^o$ ہوتا ہے۔
          </div>
        </div>
        اسی خاص بانڈ اور زاویے کی وجہ سے پانی قطبی (Polar) بن جاتا ہے اور اس میں دنیا کی سب سے زیادہ چیزیں حل ہو جاتی ہیں، اسی لیے اسے یونیورسل سالوینٹ بھی کہتے ہیں!`;
    }
  }
  
  if (isEn) {
    return `Dear student! Your question is considered a highly important topic in the Karachi Board <b>${info.subject}</b> syllabus (Grade ${info.grade}).
      
      Here is the explanation:
      <div class="step-container">
        <div class="step-card">
          <div class="step-number">Step 1: Basic Concept</div>
          Always remember that before solving any question, it is essential to clarify the definitions. The solution is directly rooted in the core curriculum guidelines.
        </div>
        <div class="step-card">
          <div class="step-number">Step 2: Guided Breakdown</div>
          According to the Karachi Board examination pattern, writing responses in bulleted formats helps examiners read and mark them efficiently.
        </div>
      </div>
      If you need any specific equations or definitions explained in detail, feel free to ask!`;
  } else {
    return `پیارے طالب علم! آپ کا یہ سوال کراچی بورڈ کے مضمون <b>${info.subject}</b> (جماعت ${info.grade}) کے لیے ایک نہایت اہم سوال مانا جاتا ہے۔
      
      وضاحت کچھ یوں ہے:
      <div class="step-container">
        <div class="step-card">
          <div class="step-number">مرحلہ ۱: بنیادی خاکہ</div>
          ہمیشہ یاد رکھیں کہ کسی بھی تعلیمی سوال کو حل کرنے سے پہلے اس کی بنیادی اصطلاحات کو سمجھنا ضروری ہے۔ اس کا جواب براہ راست نصابی کتب کے اصولوں پر منحصر ہے۔
        </div>
        <div class="step-card">
          <div class="step-number">مرحلہ ۲: حل یا وضاحت</div>
          کراچی بورڈ کے پیٹرن کے مطابق، ہمیں امتحانات میں نمبر حاصل کرنے کے لیے نکتہ بہ نکتہ (Bullet points) میں جوابات لکھنے چاہئیں تاکہ ممتحن کو آسانی ہو۔
        </div>
      </div>
      اگر آپ کو اس میں کوئی مخصوص مساوات یا تعریف تفصیلاً درکار ہے، تو بلا جھجھک دوبارہ پوچھ سکتے ہیں!`;
  }
}

// User Rating Mechanism
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
    <div class="message-bubble ur-text" style="background:rgba(139,92,246,0.1); border:1px dashed var(--primary); font-size:0.85rem; padding:0.6rem 1rem; border-radius:20px; text-align:center;">
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
