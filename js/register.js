// ============================================
// STUDENT REGISTRATION — SCRIPT
// (Frontend only — no backend submission)
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- LOADER ----
  const loader = document.getElementById('loader');
  window.addEventListener('load', function () {
    setTimeout(function () { loader.classList.add('loaded'); }, 350);
  });
  setTimeout(function () { if (loader) loader.classList.add('loaded'); }, 1200);

  // ---- FOOTER YEAR ----
  const yearEl = document.getElementById('year');
  if (yearEl) { yearEl.textContent = new Date().getFullYear(); }

  // ---- SHOW / HIDE PASSWORD ----
  document.querySelectorAll('.toggle-password').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetId = btn.getAttribute('data-target');
      const input = document.getElementById(targetId);
      const icon = btn.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('bi-eye', 'bi-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.replace('bi-eye-slash', 'bi-eye');
      }
    });
  });

  // ---- PASSWORD STRENGTH METER ----
  const passwordInput = document.getElementById('password');
  const strengthBar = document.querySelector('.strength-bar span');
  const strengthLabel = document.querySelector('.strength-label');

  function getStrength(value) {
    let score = 0;
    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;
    if (value.length >= 12) score++;
    return score; // 0-5
  }

  const strengthMap = {
    0: { width: '0%', color: '#dc3545', label: 'Password strength' },
    1: { width: '20%', color: '#dc3545', label: 'Weak' },
    2: { width: '40%', color: '#fd7e14', label: 'Fair' },
    3: { width: '65%', color: '#ffc107', label: 'Good' },
    4: { width: '85%', color: '#0dcaf0', label: 'Strong' },
    5: { width: '100%', color: '#198754', label: 'Very strong' }
  };

  if (passwordInput) {
    passwordInput.addEventListener('input', function () {
      const score = getStrength(passwordInput.value);
      const cfg = strengthMap[score];
      strengthBar.style.width = cfg.width;
      strengthBar.style.background = cfg.color;
      strengthLabel.textContent = passwordInput.value ? cfg.label : 'Password strength';
    });
  }

  // ---- FORM VALIDATION ----
  const form = document.getElementById('registerForm');
  const submitBtn = document.getElementById('submitBtn');
  const successAlert = document.getElementById('successAlert');

  const fields = [
    { id: 'fullName', validate: v => v.trim().length >= 3 },
    { id: 'matricNumber', validate: v => v.trim().length >= 4 },
    { id: 'faculty', validate: v => v !== '' },
    { id: 'department', validate: v => v !== '' },
    { id: 'gender', validate: v => v !== '' },
    { id: 'dob', validate: v => v !== '' },
    { id: 'phoneNumber', validate: v => /^[\d+\s()-]{7,}$/.test(v.trim()) },
    { id: 'email', validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
    { id: 'password', validate: v => v.length >= 8 },
    { id: 'confirmPassword', validate: v => v === passwordInput.value && v.length >= 8 }
  ];

  function validateField(field) {
    const input = document.getElementById(field.id);
    const wrapper = input.closest('.col-12, .col-sm-6');
    const isValid = field.validate(input.value);

    input.classList.remove('is-valid', 'is-invalid');
    wrapper.classList.remove('invalid');

    if (input.value.trim() === '' && input.type !== 'checkbox') {
      // untouched / empty — neutral state, no styling yet unless explicitly validated on submit
    }

    if (isValid) {
      input.classList.add('is-valid');
    } else {
      input.classList.add('is-invalid');
      wrapper.classList.add('invalid');
    }
    return isValid;
  }

  fields.forEach(function (field) {
    const input = document.getElementById(field.id);
    input.addEventListener('blur', function () { validateField(field); });
    input.addEventListener('input', function () {
      if (input.classList.contains('is-invalid') || input.classList.contains('is-valid')) {
        validateField(field);
      }
    });
  });

  const termsCheck = document.getElementById('termsCheck');
  termsCheck.addEventListener('change', function () {
    const wrapper = termsCheck.closest('.col-12');
    if (termsCheck.checked) {
      wrapper.classList.remove('invalid');
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();

    let allValid = true;
    fields.forEach(function (field) {
      if (!validateField(field)) { allValid = false; }
    });

    if (!termsCheck.checked) {
      termsCheck.closest('.col-12').classList.add('invalid');
      allValid = false;
    } else {
      termsCheck.closest('.col-12').classList.remove('invalid');
    }

    if (!allValid) {
      const firstInvalid = form.querySelector('.is-invalid, .form-check-input:invalid');
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // ---- SIMULATED SUBMIT (frontend only) ----
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    btnText.classList.add('d-none');
    btnLoader.classList.remove('d-none');
    submitBtn.disabled = true;

    setTimeout(function () {
      btnLoader.classList.add('d-none');
      btnText.classList.remove('d-none');
      submitBtn.disabled = false;

      successAlert.classList.remove('d-none');
      successAlert.classList.add('d-flex');
      successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });

      setTimeout(function () {
        // In a connected app this would redirect to login.html
        successAlert.classList.add('d-none');
        form.reset();
        window.location.href = '/FrontEnd/login.html'; // Redirect to login page after successful registration
        document.querySelectorAll('.is-valid, .is-invalid').forEach(function (el) {
          el.classList.remove('is-valid', 'is-invalid');
        });
        strengthBar.style.width = '0%';
        strengthLabel.textContent = 'Password strength';
      }, 2800);
    }, 1800);
  });

});
