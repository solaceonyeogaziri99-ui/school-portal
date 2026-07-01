// ============================================
// STUDENT LOGIN — SCRIPT
// (Frontend only — simulated authentication)
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- LOADER ----
  const loader = document.getElementById('loader');
  window.addEventListener('load', function () {
    setTimeout(function () { loader.classList.add('loaded'); }, 350);
  });
  setTimeout(function () { if (loader) loader.classList.add('loaded'); }, 1200);

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

  // ---- FORM VALIDATION ----
  const form = document.getElementById('loginForm');
  const submitBtn = document.getElementById('submitBtn');
  const errorAlert = document.getElementById('errorAlert');
  const successAlert = document.getElementById('successAlert');

  const identifierInput = document.getElementById('identifier');
  const passwordInput = document.getElementById('password');

  function validateIdentifier() {
    const value = identifierInput.value.trim();
    const isValid = value.length >= 3;
    toggleFieldState(identifierInput, isValid);
    return isValid;
  }

  function validatePassword() {
    const value = passwordInput.value;
    const isValid = value.length >= 6;
    toggleFieldState(passwordInput, isValid);
    return isValid;
  }

  function toggleFieldState(input, isValid) {
    const wrapper = input.closest('.mb-3, .mb-2');
    input.classList.remove('is-valid', 'is-invalid');
    wrapper.classList.remove('invalid');
    if (isValid) {
      input.classList.add('is-valid');
    } else {
      input.classList.add('is-invalid');
      wrapper.classList.add('invalid');
    }
  }

  identifierInput.addEventListener('blur', validateIdentifier);
  passwordInput.addEventListener('blur', validatePassword);
  identifierInput.addEventListener('input', function () {
    if (identifierInput.classList.contains('is-invalid') || identifierInput.classList.contains('is-valid')) validateIdentifier();
  });
  passwordInput.addEventListener('input', function () {
    if (passwordInput.classList.contains('is-invalid') || passwordInput.classList.contains('is-valid')) validatePassword();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();

    errorAlert.classList.add('d-none');
    errorAlert.classList.remove('d-flex');
    successAlert.classList.add('d-none');
    successAlert.classList.remove('d-flex');

    const validIdentifier = validateIdentifier();
    const validPassword = validatePassword();

    if (!validIdentifier || !validPassword) {
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // ---- SIMULATED LOGIN (frontend only) ----
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoader = submitBtn.querySelector('.btn-loader');
    btnText.classList.add('d-none');
    btnLoader.classList.remove('d-none');
    submitBtn.disabled = true;

    setTimeout(function () {
      btnLoader.classList.add('d-none');
      btnText.classList.remove('d-none');
      submitBtn.disabled = false;

      // Demo logic: any password containing "fail" simulates an error state
      if (passwordInput.value.toLowerCase().includes('fail')) {
        errorAlert.classList.remove('d-none');
        errorAlert.classList.add('d-flex');
        errorAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        successAlert.classList.remove('d-none');
        successAlert.classList.add('d-flex');
        successAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // In a connected app this would redirect to dashboard.html
        setTimeout(function () {
          window.location.href = '/FrontEnd/dashboard.html'; // Redirect to dashboard page after successful login
        }, 1600);
      }
    }, 1600);
  });

  // ---- SOCIAL LOGIN BUTTONS (UI only) ----
  document.querySelectorAll('.social-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      btn.classList.add('disabled');
      const original = btn.innerHTML;
      btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
      setTimeout(function () {
        btn.innerHTML = original;
        btn.classList.remove('disabled');
      }, 1200);
    });
  });

});
