const translations = {
    en: {
        // Navbar
        "brand": "Titanic Survival Predictor Dashboard",
        "nav.dashboard": "Dashboard",
        "nav.explore": "Explore Data",
        "nav.performance": "Model Performance",

        // Stat cards
        "stat.total_passengers": "Total Passengers",
        "stat.survival_rate": "Survival Rate",
        "stat.avg_age": "Average Age",
        "stat.model_accuracy": "Model Accuracy",

        // Dashboard heading
        "dashboard.title": "Dashboard",

        // Prediction form
        "form.title": "Predict Survival",
        "form.pclass": "Passenger Class",
        "form.class1": "First Class",
        "form.class2": "Business Class",
        "form.class3": "Economy Class",
        "form.sex": "Sex",
        "form.male": "Male",
        "form.female": "Female",
        "form.age": "Age",
        "form.sibsp": "Siblings/Spouses",
        "form.parch": "Parents/Children",
        "form.fare": "Fare",
        "form.embarked": "Port of Embarkation",
        "form.southampton": "Southampton",
        "form.cherbourg": "Cherbourg",
        "form.queenstown": "Queenstown",
        "form.liverpool": "Liverpool",
        "form.predict": "Predict",

        // Charts
        "chart.survival_class": "Survival by Class",
        "chart.survival_sex": "Survival by Sex",
        "chart.age_dist": "Age Distribution",
        "chart.embarked": "Embarkation Port",

        // Results
        "result.survived": "Survived!",
        "result.not_survived": "Did Not Survive",
        "result.chance": "chance of survival",
        "result.died_label": "Died",
        "result.survived_label": "Survived",
        "result.details": "Passenger Details",
        "result.back": "Back to Dashboard",

        // Explore page
        "explore.title": "Explore Dataset",
        "explore.subtitle": "Browse the Titanic dataset",
        "explore.passengers": "passengers total",
        "explore.desc_stats": "Descriptive Statistics",
        "explore.statistic": "Statistic",
        "explore.survival_age": "Survival by Age Group",
        "explore.class_dist": "Class Distribution",
        "explore.sample_title": "Sample Data (First 20 Rows)",
        "explore.col.survived": "Survived",
        "explore.col.class": "Class",
        "explore.col.sex": "Sex",
        "explore.col.age": "Age",
        "explore.col.sibsp": "SibSp",
        "explore.col.parch": "Parch",
        "explore.col.fare": "Fare",
        "explore.col.embarked": "Embarked",
        "explore.yes": "Yes",
        "explore.no": "No",

        // Performance page
        "perf.title": "Model Performance",
        "perf.subtitle": "Random Forest Classifier (200 trees, max depth 8)",
        "perf.accuracy": "Accuracy",
        "perf.precision": "Precision",
        "perf.recall": "Recall",
        "perf.f1": "F1 Score",
        "perf.cm": "Confusion Matrix",
        "perf.pred_died": "Predicted: Died",
        "perf.pred_survived": "Predicted: Survived",
        "perf.actual_died": "Actual: Died",
        "perf.actual_survived": "Actual: Survived",
        "perf.cv_mean": "CV Mean Accuracy",
        "perf.feature_imp": "Feature Importance",
        "perf.cv_scores": "Cross-Validation Scores",

        // Footer
        "footer.text": "Titanic Survival Predictor Dashboard — Built with Flask, scikit-learn & Chart.js",

        // Theme
        "theme.light": "Light",
        "theme.dark": "Dark",

        // Animation
        "anim.predicting": "Sailing through the data...",
        "anim.continue": "Click to Continue",
    },
    ar: {
        // Navbar
        "brand": "لوحة تحكم التنبؤ بالنجاة من تايتانيك",
        "nav.dashboard": "لوحة التحكم",
        "nav.explore": "استكشاف البيانات",
        "nav.performance": "أداء النموذج",

        // Stat cards
        "stat.total_passengers": "إجمالي الركاب",
        "stat.survival_rate": "معدل النجاة",
        "stat.avg_age": "متوسط العمر",
        "stat.model_accuracy": "دقة النموذج",

        // Dashboard heading
        "dashboard.title": "لوحة التحكم",

        // Prediction form
        "form.title": "التنبؤ بالنجاة",
        "form.pclass": "درجة الركاب",
        "form.class1": "الدرجة الأولى",
        "form.class2": "درجة رجال الأعمال",
        "form.class3": "الدرجة الاقتصادية",
        "form.sex": "الجنس",
        "form.male": "ذكر",
        "form.female": "أنثى",
        "form.age": "العمر",
        "form.sibsp": "الأشقاء / الأزواج",
        "form.parch": "الوالدين / الأطفال",
        "form.fare": "السعر",
        "form.embarked": "ميناء المغادرة",
        "form.southampton": "ساوثهامبتون",
        "form.cherbourg": "شيربورغ",
        "form.queenstown": "كوينزتاون",
        "form.liverpool": "ليفربول",
        "form.predict": "تنبؤ",

        // Charts
        "chart.survival_class": "النجاة حسب الدرجة",
        "chart.survival_sex": "النجاة حسب الجنس",
        "chart.age_dist": "توزيع الأعمار",
        "chart.embarked": "ميناء المغادرة",

        // Results
        "result.survived": "!نجا",
        "result.not_survived": "لم ينجُ",
        "result.chance": "فرصة النجاة",
        "result.died_label": "لم ينجُ",
        "result.survived_label": "نجا",
        "result.details": "تفاصيل الراكب",
        "result.back": "العودة إلى لوحة التحكم",

        // Explore page
        "explore.title": "استكشاف البيانات",
        "explore.subtitle": "تصفح بيانات تايتانيك",
        "explore.passengers": "إجمالي الركاب",
        "explore.desc_stats": "الإحصاءات الوصفية",
        "explore.statistic": "الإحصاء",
        "explore.survival_age": "النجاة حسب الفئة العمرية",
        "explore.class_dist": "توزيع الدرجات",
        "explore.sample_title": "عينة بيانات (أول 20 صف)",
        "explore.col.survived": "النجاة",
        "explore.col.class": "الدرجة",
        "explore.col.sex": "الجنس",
        "explore.col.age": "العمر",
        "explore.col.sibsp": "الأشقاء",
        "explore.col.parch": "الوالدين",
        "explore.col.fare": "السعر",
        "explore.col.embarked": "الميناء",
        "explore.yes": "نعم",
        "explore.no": "لا",

        // Performance page
        "perf.title": "أداء النموذج",
        "perf.subtitle": "مصنف الغابة العشوائية (200 شجرة، عمق أقصى 8)",
        "perf.accuracy": "الدقة",
        "perf.precision": "الإحكام",
        "perf.recall": "الاستدعاء",
        "perf.f1": "مقياس F1",
        "perf.cm": "مصفوفة الارتباك",
        "perf.pred_died": "التنبؤ: لم ينجُ",
        "perf.pred_survived": "التنبؤ: نجا",
        "perf.actual_died": "الفعلي: لم ينجُ",
        "perf.actual_survived": "الفعلي: نجا",
        "perf.cv_mean": "متوسط دقة التحقق المتقاطع",
        "perf.feature_imp": "أهمية الميزات",
        "perf.cv_scores": "درجات التحقق المتقاطع",

        // Footer
        "footer.text": "لوحة تحكم التنبؤ بالنجاة من تايتانيك — بُنيت باستخدام Flask و scikit-learn و Chart.js",

        // Theme
        "theme.light": "فاتح",
        "theme.dark": "داكن",

        // Animation
        "anim.predicting": "...الإبحار عبر البيانات",
        "anim.continue": "انقر للمتابعة",
    }
};

let currentLang = localStorage.getItem('titanic-lang') || 'en';

function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) || translations.en[key] || key;
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const text = t(key);
        if (el.tagName === 'INPUT' && el.type !== 'hidden') {
            el.placeholder = text;
        } else {
            el.textContent = text;
        }
    });

    // Handle dir attribute for RTL
    if (currentLang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.body.classList.add('rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.body.classList.remove('rtl');
    }

    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === currentLang);
    });
}

function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('titanic-lang', lang);
    applyTranslations();
}

document.addEventListener('DOMContentLoaded', function() {
    applyTranslations();
});
