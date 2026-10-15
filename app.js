/**
 * Sugar Hero - UI Controller & Event Handlers
 */

function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
}

// 1. تسجيل دخول الطبيب مع الفاليديشن
function handleDoctorLogin(event) {
    event.preventDefault();
    const email = document.getElementById('doc-email').value;
    const pass = document.getElementById('doc-pass').value;

    const res = SugarHeroDB.validateUserLogin(email, pass, 'doctor');
    if (!res.success) {
        alert(res.message);
        return;
    }

    window.location.href = 'doctor-dashboard.html';
}

// 2. تسجيل دخول ولي الأمر مع الفاليديشن
function handleGuardianLogin(event) {
    event.preventDefault();
    const email = document.getElementById('guard-email').value;
    const pass = document.getElementById('guard-pass').value;

    const res = SugarHeroDB.validateUserLogin(email, pass, 'guardian');
    if (!res.success) {
        alert(res.message);
        return;
    }

    window.location.href = 'guardian-dashboard.html';
}

// 3. دخول المريض السريع عبر الكود مع الفاليديشن
function handlePatientFastEntry() {
    const codeInput = document.getElementById('patient-code');
    const code = codeInput ? codeInput.value.trim() : '';

    const res = SugarHeroDB.validatePatientByCode(code);
    if (!res.success) {
        alert(res.message);
        return;
    }

    window.location.href = 'patient-dashboard.html';
}

function handleQrScanSim() {
    // محاكاة مسح QR للطفل أحمد
    SugarHeroDB.validatePatientByCode('482910');
    window.location.href = 'patient-dashboard.html';
}