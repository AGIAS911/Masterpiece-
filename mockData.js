/**
 * Sugar Hero - Central Reactive Mock Database Engine (Complete & Unified)
 */

(function () {
    const STORAGE_KEY = 'SUGAR_HERO_DATABASE_V2';
    const SESSION_USER_KEY = 'SUGAR_HERO_ACTIVE_USER';
    const ACTIVE_PATIENT_KEY = 'SUGAR_HERO_ACTIVE_PATIENT';

    const defaultInitialData = {
        users: [
            { id: 1, name: "مسؤول النظام الرئيسي", email: "admin@sugarhero.com", password: "AdminSecurePass2026", role: "admin" },
            { id: 2, name: "د. محمود الغالي", email: "doctor@clinic.com", password: "12345678", role: "doctor" },
            { id: 3, name: "د. رانيا النجار", email: "dr.rania@clinic.com", password: "12345678", role: "doctor" },
            { id: 4, name: "د. طارق الحنيطي", email: "dr.tariq@hospital.com", password: "12345678", role: "doctor" },
            { id: 5, name: "د. ميساء الكردي", email: "dr.maysaa@endo.jo", password: "12345678", role: "doctor" },
            { id: 6, name: "د. يزن الحديدي", email: "dr.yazan@pediatric.com", password: "12345678", role: "doctor" },
            { id: 10, name: "أبو أنس", email: "abu.anas@sugarhero.com", password: "12345678", phone: "0791234567", role: "guardian" },
            { id: 11, name: "أم يوسف", email: "om.yousef@gmail.com", password: "12345678", phone: "0785551234", role: "guardian" },
            { id: 12, name: "م. خالد الشامي", email: "khaled.shami@outlook.com", password: "12345678", phone: "0779998877", role: "guardian" },
            { id: 13, name: "د. هبة القاسم", email: "hiba.qasim@yahoo.com", password: "12345678", phone: "0793332211", role: "guardian" },
            { id: 20, name: "أحمد", code: "482910", role: "patient", type: "kid" },
            { id: 21, name: "سارة", code: "110293", role: "patient", type: "kid" },
            { id: 22, name: "الوالد (أبو أحمد)", code: "992014", role: "patient", type: "elderly" },
            { id: 23, name: "يوسف", code: "554120", role: "patient", type: "kid" },
            { id: 24, name: "ليان", code: "332145", role: "patient", type: "kid" },
            { id: 25, name: "الحاج محمود", code: "778901", role: "patient", type: "elderly" },
            { id: 26, name: "أم خالد", code: "664321", role: "patient", type: "elderly" },
            { id: 27, name: "عمر", code: "889912", role: "patient", type: "teen" },
            { id: 28, name: "م. رامي السعيد", email: "rami.said@tech.com", password: "12345678", role: "patient", type: "adult" }
        ],

        doctors: [
            { id: 1, userId: 2, name: "د. محمود الغالي", specialization: "غدد صماء وسكري أطفال", license: "JO-MED-88412", clinic: "عيادات السكري التخصصية - عمّان", experience: 14, phone: "0798888882", status: "verified", activePatientsCount: 4 },
            { id: 2, userId: 3, name: "د. رانيا النجار", specialization: "تغذية علاجية وسمنة سريرية", license: "NUT-JO-5520", clinic: "المركز الطبي الدولي - الشميساني", experience: 9, phone: "0798888883", status: "verified", activePatientsCount: 3 },
            { id: 3, userId: 5, name: "د. ميساء الكردي", specialization: "سكري وباطنية عامة (كبار سن)", license: "JO-MED-77190", clinic: "مستشفى الأردن الاستشاري", experience: 18, phone: "0795554411", status: "verified", activePatientsCount: 3 },
            { id: 4, userId: 6, name: "د. يزن الحديدي", specialization: "غدد صماء وسكري يافعين", license: "JO-MED-66321", clinic: "مجمع الخالدي الطبي", experience: 7, phone: "0792221199", status: "verified", activePatientsCount: 2 },
            { id: 5, userId: 4, name: "د. طارق الحنيطي", specialization: "غدد صماء وسكري عام", license: "JO-MED-99120", clinic: "مستشفى الملك المؤسس - إربد", experience: 11, phone: "0780001122", status: "pending", date: "2026-10-14", activePatientsCount: 0 },
            { id: 6, userId: null, name: "د. سمر عبد الهادي", specialization: "تغذية أطفال وسكري نمط 1", license: "NUT-JO-4419", clinic: "عيادات عبدون الحديثة", experience: 6, phone: "0771122334", status: "pending", date: "2026-10-14", activePatientsCount: 0 }
        ],

        guardians: [
            { id: 1, userId: 10, name: "أبو أنس", emergencyContact: "0791234567", relationship: "أب", subscriptionPlan: "باقة العائلة المميزة (Family Premium)", renewalDate: "2026-11-15", status: "active" },
            { id: 2, userId: 11, name: "أم يوسف", emergencyContact: "0785551234", relationship: "أم", subscriptionPlan: "باقة العائلة المميزة (Family Premium)", renewalDate: "2026-12-01", status: "active" },
            { id: 3, userId: 12, name: "م. خالد الشامي", emergencyContact: "0779998877", relationship: "ابن (راعي كبار سن)", subscriptionPlan: "باقة رعاية الوالدين (Elderly Care)", renewalDate: "2026-11-20", status: "active" },
            { id: 4, userId: 13, name: "د. هبة القاسم", emergencyContact: "0793332211", relationship: "أم", subscriptionPlan: "الباقة السنوية الشاملة", renewalDate: "2027-05-10", status: "active" }
        ],

        patients: [
            { id: 1, userId: 10, guardianId: null, name: "أبو أنس", diabetesType: "Type 2", hba1c: 6.8, currentWeight: 88.5, targetWeight: 78.0, isSelfGuardian: true, avatar: "👨🏽", category: "adult", dob: "1982-05-14" },
            { id: 2, userId: 20, guardianId: 1, name: "أحمد", diabetesType: "Type 1", hba1c: 7.2, currentWeight: 31.0, targetWeight: 32.0, avatar: "👦🏽", category: "kid", dob: "2016-08-20" },
            { id: 3, userId: 21, guardianId: 1, name: "سارة", diabetesType: "Prediabetes", hba1c: 5.6, currentWeight: 22.0, targetWeight: 21.0, avatar: "👧🏽", category: "kid", dob: "2019-11-10" },
            { id: 4, userId: 22, guardianId: 1, name: "الوالد (أبو أحمد)", diabetesType: "Type 2", hba1c: 7.4, currentWeight: 76.0, targetWeight: 74.0, avatar: "👴🏽", category: "elderly", dob: "1952-03-01" },
            { id: 5, userId: 23, guardianId: 2, name: "يوسف", diabetesType: "Type 1", hba1c: 8.1, currentWeight: 36.5, targetWeight: 37.0, avatar: "🧒🏻", category: "kid", dob: "2015-02-18" },
            { id: 6, userId: 24, guardianId: 2, name: "ليان", diabetesType: "Type 1", hba1c: 6.9, currentWeight: 27.0, targetWeight: 28.0, avatar: "👧🏻", category: "kid", dob: "2018-09-05" },
            { id: 7, userId: 25, guardianId: 3, name: "الحاج محمود", diabetesType: "Type 2", hba1c: 8.4, currentWeight: 84.0, targetWeight: 79.0, avatar: "🧓🏼", category: "elderly", dob: "1948-12-10" },
            { id: 8, userId: 26, guardianId: 3, name: "أم خالد", diabetesType: "Type 2", hba1c: 7.1, currentWeight: 69.0, targetWeight: 66.0, avatar: "👵🏼", category: "elderly", dob: "1955-07-22" },
            { id: 9, userId: 27, guardianId: 4, name: "عمر", diabetesType: "Type 1", hba1c: 7.6, currentWeight: 54.0, targetWeight: 56.0, avatar: "🧑🏻", category: "teen", dob: "2010-04-12" },
            { id: 10, userId: 28, guardianId: null, name: "م. رامي السعيد", diabetesType: "Type 2", hba1c: 6.5, currentWeight: 81.0, targetWeight: 75.0, isSelfGuardian: true, avatar: "🧔🏻", category: "adult", dob: "1989-10-03" }
        ],

        doctorPatients: [
            { id: 1, doctorId: 1, patientId: 2, treatmentPlan: "جرعة أنسولين سريع Novorapid: 1 وحدة لكل 15g كربوهيدرات، وتصحيح هبوط فوري إذا قل عن 70.", status: "active" },
            { id: 2, doctorId: 1, patientId: 5, treatmentPlan: "تعديل جرعة اللانتوس الصباحية إلى 14 وحدة، وفحص مستمر قبل وبعد حصة الرياضة.", status: "active" },
            { id: 3, doctorId: 1, patientId: 6, treatmentPlan: "نظام مضخة إنسولين معدل، كربوهيدرات الوجبة لا تتجاوز 45g.", status: "active" },
            { id: 4, doctorId: 1, patientId: 9, treatmentPlan: "متابعة أسبوعية لقراءات السكر الرياضي، وأخذ 15g كربوهيدرات سريعة قبل تدريب كرة القدم.", status: "active" },
            { id: 5, doctorId: 2, patientId: 3, treatmentPlan: "حمية غذائية منخفضة المؤشر الجلايسيمي، واستبدال السكريات المصنعة بالفواكه والمكسرات.", status: "active" },
            { id: 6, doctorId: 2, patientId: 1, treatmentPlan: "تقليل النشويات في وجبة العشاء، وإلزام المشي 30 دقيقة يومياً بعد الإفطار.", status: "active" },
            { id: 7, doctorId: 2, patientId: 10, treatmentPlan: "حمية البحر الأبيض المتوسط، مراقبة الكيتونات والدهون الثلاثية شهرياً.", status: "active" },
            { id: 8, doctorId: 3, patientId: 4, treatmentPlan: "ميتفورمين 850 ملغ مرتين يومياً مع الإفطار والعشاء، ومراقبة سكر الصيام.", status: "active" },
            { id: 9, doctorId: 3, patientId: 7, treatmentPlan: "جانوفيا 100 ملغ صباحاً، وإشعار فوري للعيادة عند تجاوز السكر 220 mg/dL.", status: "active" },
            { id: 10, doctorId: 3, patientId: 8, treatmentPlan: "أماريل 2 ملغ قبل الإفطار، فحص القدمين الدوري ومراقبة ضغط الدم.", status: "active" }
        ],

        glucoseLogs: [
            { id: 1, patientId: 2, value: 55, time: "منذ ساعة (بعد الغداء)", status: "danger", note: "هبوط سكر حاد - تم إرسال نداء SOS لولي الأمر والطبيب", createdAt: "2026-10-14 14:15" },
            { id: 2, patientId: 2, value: 118, time: "قبل الغداء", status: "stable", note: "ضمن النطاق المستهدف", createdAt: "2026-10-14 12:30" },
            { id: 3, patientId: 5, value: 265, time: "منذ ساعتين", status: "danger", note: "ارتفاع حاد بعد وجبة دسمة - مطلوب جرعة تصحيح", createdAt: "2026-10-14 13:00" },
            { id: 4, patientId: 7, value: 64, time: "صيام الصباح", status: "danger", note: "هبوط صائم لكبير السن - تم تناول ملعقة عسل", createdAt: "2026-10-14 07:15" },
            { id: 5, patientId: 1, value: 128, time: "صيام الصباح", status: "stable", note: "سكر صائم منتظم لولي الأمر", createdAt: "2026-10-14 07:00" },
            { id: 6, patientId: 3, value: 98, time: "قبل الغداء", status: "stable", note: "مستوى طبيعي جداً", createdAt: "2026-10-14 12:45" },
            { id: 7, patientId: 4, value: 135, time: "بعد الإفطار", status: "stable", note: "ممتاز لكبير السن", createdAt: "2026-10-14 09:30" }
        ],

        mealLogs: [
            { id: 1, patientId: 2, foodName: "أرز بسمتي مع صدر دجاج مشوي وسلطة", calories: 460, carbsGrams: 48.0, sugarGrams: 2.5, aiAnalysis: "مؤشر جلايسيمي متوسط، مناسب لجرعة 3.2 وحدة.", createdAt: "2026-10-14 13:30" }
        ],

        kidsGamification: {
            2: { patientId: 2, level: 5, totalXp: 650, maxXp: 1000, character: "🦸🏽‍♂️", badges: ["درع البطل السحري", "وسام الفحص المنتظم"] },
            3: { patientId: 3, level: 3, totalXp: 310, maxXp: 500, character: "🧚🏽‍♀️", badges: ["نجمة الغذاء الصحي"] }
        }
    };

    window.SugarHeroDB = {
        data: null,

        init() {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    this.data = JSON.parse(stored);
                } catch (e) {
                    this.resetToDefault();
                }
            } else {
                this.resetToDefault();
            }
        },

        save() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
        },

        resetToDefault() {
            this.data = JSON.parse(JSON.stringify(defaultInitialData));
            this.save();
        },

        validateUserLogin(email, password, expectedRole) {
            if (!email || !password) return { success: false, message: "يرجى إدخال البريد الإلكتروني وكلمة المرور." };
            const user = this.data.users.find(u => u.email && u.email.toLowerCase() === email.trim().toLowerCase());
            if (!user) return { success: false, message: "البريد الإلكتروني غير مسجل في النظام." };
            if (user.password !== password) return { success: false, message: "كلمة المرور غير صحيحة." };
            if (expectedRole && user.role !== expectedRole) return { success: false, message: `هذا الحساب غير مسجل كـ (${expectedRole}).` };

            sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
            return { success: true, user };
        },

        validatePatientByCode(code) {
            if (!code || code.trim().length !== 6) return { success: false, message: "الكود يجب أن يتكون من 6 أرقام." };
            const user = this.data.users.find(u => u.role === 'patient' && u.code === code.trim());
            if (!user) return { success: false, message: "رمز المريض غير صحيح." };
            const patient = this.data.patients.find(p => p.userId === user.id);

            sessionStorage.setItem(SESSION_USER_KEY, JSON.stringify(user));
            sessionStorage.setItem(ACTIVE_PATIENT_KEY, JSON.stringify(patient));
            return { success: true, user, patient };
        },

        logout() {
            sessionStorage.removeItem(SESSION_USER_KEY);
            sessionStorage.removeItem(ACTIVE_PATIENT_KEY);
            window.location.href = 'logout.html';
        },

        // الدالة المطلوبة لصفحة ولي الأمر
        getGuardianProfiles(guardianUserId) {
            const guardian = this.data.guardians.find(g => g.userId === guardianUserId) || this.data.guardians[0];
            return this.data.patients.filter(p => p.guardianId === guardian.id || p.userId === guardianUserId);
        },

        addDependentPatient(guardianUserId, patientData) {
            if (!patientData.name || !patientData.diabetesType) return { success: false, message: "البيانات ناقصة." };
            const guardian = this.data.guardians.find(g => g.userId === guardianUserId) || this.data.guardians[0];

            let randomCode = "";
            do {
                randomCode = Math.floor(100000 + Math.random() * 900000).toString();
            } while (this.data.users.some(u => u.code === randomCode));

            const newUserId = this.data.users.length + 10;
            const newPatientId = this.data.patients.length + 10;

            const newUser = { id: newUserId, name: patientData.name, code: randomCode, role: "patient", type: patientData.type || "kid" };
            const newPatient = {
                id: newPatientId,
                userId: newUserId,
                guardianId: guardian.id,
                name: patientData.name,
                diabetesType: patientData.diabetesType,
                hba1c: 7.0,
                currentWeight: 30.0,
                targetWeight: 30.0,
                avatar: patientData.type === 'elderly' ? "👴🏽" : "🧒🏽",
                category: patientData.type || 'kid'
            };

            this.data.users.push(newUser);
            this.data.patients.push(newPatient);
            this.save();
            return { success: true, patient: newPatient, code: randomCode };
        },

        getActivePatient() {
            const stored = sessionStorage.getItem(ACTIVE_PATIENT_KEY);
            if (stored) return JSON.parse(stored);
            return this.data.patients[1];
        },

        setActivePatientById(patientId) {
            const p = this.data.patients.find(item => item.id === patientId);
            if (p) sessionStorage.setItem(ACTIVE_PATIENT_KEY, JSON.stringify(p));
            return p;
        },

        addGlucoseReading(patientId, value, measurementTime = "الآن") {
            const val = parseInt(value, 10);
            if (isNaN(val) || val <= 20 || val >= 600) return { success: false, message: "قراءة غير صالحة." };
            const isDanger = val < 70 || val > 250;
            const newLog = {
                id: this.data.glucoseLogs.length + 1,
                patientId,
                value: val,
                time: measurementTime,
                status: isDanger ? "danger" : "stable",
                note: val < 70 ? "هبوط حاد" : (val > 250 ? "ارتفاع حاد" : "مستقر"),
                createdAt: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
            };
            this.data.glucoseLogs.unshift(newLog);

            let xpGained = 0;
            if (this.data.kidsGamification[patientId]) {
                xpGained = 30;
                this.data.kidsGamification[patientId].totalXp += xpGained;
            }
            this.save();
            return { success: true, log: newLog, isDanger, xpGained };
        },

        addMealRecord(patientId, foodName, calories = 300, carbs = 35) {
            const newMeal = {
                id: this.data.mealLogs.length + 1,
                patientId,
                foodName,
                calories,
                carbsGrams: carbs,
                sugarGrams: 4.0,
                createdAt: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
            };
            this.data.mealLogs.unshift(newMeal);
            this.save();
            return { success: true, meal: newMeal, xpGained: 50 };
        },

        getGamificationData(patientId) {
            return this.data.kidsGamification[patientId] || { level: 1, totalXp: 50, maxXp: 200, character: "🦸🏽‍♂️", badges: [] };
        },

        getDoctorTriageList() {
            return this.data.patients.map(p => {
                const lastLog = this.data.glucoseLogs.find(l => l.patientId === p.id) || { value: 110, status: 'stable' };
                return {
                    id: p.id,
                    name: p.name,
                    diabetesType: p.diabetesType,
                    lastGlucose: lastLog.value,
                    status: lastLog.status,
                    statusLabel: lastLog.value < 70 ? "هبوط حاد 🚨" : (lastLog.value > 200 ? "ارتفاع" : "مستقر 🟢")
                };
            }).sort((a, b) => (a.status === 'danger' ? -1 : 1));
        },

        approveDoctor(doctorId) {
            const doc = this.data.doctors.find(d => d.id === doctorId);
            if (doc) { doc.status = 'verified'; this.save(); return true; }
            return false;
        },

        rejectDoctor(doctorId) {
            this.data.doctors = this.data.doctors.filter(d => d.id !== doctorId);
            this.save();
            return true;
        },

        getPatientsForDoctor(doctorId) {
            const relations = this.data.doctorPatients.filter(dp => dp.doctorId === doctorId && dp.status === 'active');
            return relations.map(rel => {
                const patient = this.data.patients.find(p => p.id === rel.patientId);
                const lastLog = this.data.glucoseLogs.find(l => l.patientId === patient.id) || { value: 115, status: 'stable' };
                return {
                    ...patient,
                    treatmentPlan: rel.treatmentPlan,
                    lastGlucose: lastLog.value,
                    glucoseStatus: lastLog.status
                };
            });
        },

        getPatientFullDetails(patientId) {
            const patient = this.data.patients.find(p => p.id === patientId);
            if (!patient) return null;
            const guardian = patient.guardianId ? this.data.guardians.find(g => g.id === patient.guardianId) : null;
            const relation = this.data.doctorPatients.find(dp => dp.patientId === patient.id && dp.status === 'active');
            const doctor = relation ? this.data.doctors.find(d => d.id === relation.doctorId) : null;
            const logs = this.data.glucoseLogs.filter(l => l.patientId === patient.id);
            const meals = this.data.mealLogs.filter(m => m.patientId === patient.id);
            const game = this.data.kidsGamification[patient.id] || null;
            return { patient, guardian, doctor, relation, logs, meals, game };
        }
    };

    window.SugarHeroDB.init();
})();