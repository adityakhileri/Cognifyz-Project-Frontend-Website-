// Enhanced form submission with success notifications
document.addEventListener('DOMContentLoaded', function() {
  // --- Internship Application Form ---
  const appForm = document.getElementById('applicationForm');
  const submitMessage = document.getElementById('submitMessage');
  const newAppBtn = document.getElementById('newApplication');
  const saveDraft = document.getElementById('saveDraft');
  const appNotify = document.createElement('div');
  appNotify.className = 'notify-box';
  document.body.appendChild(appNotify);

  if (appForm) {
    appForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        college: document.getElementById('college').value,
        course: document.getElementById('course').value,
        track: document.getElementById('track').value,
        bio: document.getElementById('bio').value,
        submittedAt: new Date().toISOString()
      };

      const existing = JSON.parse(localStorage.getItem('cognifyz_applications') || '[]');
      existing.push(data);
      localStorage.setItem('cognifyz_applications', JSON.stringify(existing));

      // Show success message below form
      showNotification("✅ Application submitted successfully!", appNotify);

      // Hide form and show confirmation card
      if (submitMessage) {
        appForm.hidden = true;
        submitMessage.hidden = false;
      }
    });
  }

  if (newAppBtn) {
    newAppBtn.addEventListener('click', function() {
      appForm.reset();
      appForm.hidden = false;
      submitMessage.hidden = true;
    });
  }

  if (saveDraft) {
    saveDraft.addEventListener('click', function() {
      const draft = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        college: document.getElementById('college').value,
        course: document.getElementById('course').value,
        track: document.getElementById('track').value,
        bio: document.getElementById('bio').value,
        savedAt: new Date().toISOString()
      };
      localStorage.setItem('cognifyz_application_draft', JSON.stringify(draft));
      showNotification("💾 Draft saved locally in your browser!", appNotify);
    });
  }

  // --- Contact Form ---
  const contactForm = document.getElementById('contactForm');
  const contactNotify = document.createElement('div');
  contactNotify.className = 'notify-box';
  document.body.appendChild(contactNotify);

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const cdata = {
        name: document.getElementById('cname').value,
        email: document.getElementById('cemail').value,
        message: document.getElementById('cmessage').value,
        submittedAt: new Date().toISOString()
      };

      const existing = JSON.parse(localStorage.getItem('cognifyz_messages') || '[]');
      existing.push(cdata);
      localStorage.setItem('cognifyz_messages', JSON.stringify(existing));

      contactForm.reset();
      showNotification("✅ Message sent successfully! We'll get back to you soon.", contactNotify);
    });
  }

  // --- Notification Box Function ---
  function showNotification(message, box) {
    box.textContent = message;
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 4000);
  }
});
// ==== Course Info Popup Handling ====
document.addEventListener('DOMContentLoaded', () => {
  const modals = {
    frontend: document.getElementById('frontend-modal'),
    backend: document.getElementById('backend-modal'),
    fullstack: document.getElementById('fullstack-modal'),
    uiux: document.getElementById('uiux-modal')
  };

  const icons = document.querySelectorAll('.info-icon');
  icons.forEach(icon => {
    icon.addEventListener('click', () => {
      const course = icon.getAttribute('data-course');
      const modal = modals[course];
      if (modal) modal.style.display = 'flex';
    });
  });

  const closeBtns = document.querySelectorAll('.close');
  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.closest('.modal').style.display = 'none';
    });
  });

  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });
});
// ===== Course popup initialization (safe, idempotent) =====
(function initCoursePopups() {
  // run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCoursePopups);
    return;
  }

  const map = {
    frontend: document.getElementById('frontend-modal'),
    backend: document.getElementById('backend-modal'),
    fullstack: document.getElementById('fullstack-modal'),
    uiux: document.getElementById('uiux-modal')
  };

  // Attach click to each info button
  document.querySelectorAll('.course-info-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const key = btn.getAttribute('data-course');
      const modal = map[key];
      if (!modal) return console.warn('No modal for', key);
      modal.setAttribute('aria-hidden', 'false');
      // trap focus: focus the close button for keyboard users
      const closeBtn = modal.querySelector('.close');
      if (closeBtn) closeBtn.focus();
      // prevent body scroll
      document.documentElement.style.overflow = 'hidden';
    });
  });

  // Close buttons
  document.querySelectorAll('.modal .close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      const modal = closeBtn.closest('.modal');
      modal.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
    });
  });

  // Click outside to close
  window.addEventListener('click', (e) => {
    if (e.target.classList && e.target.classList.contains('modal')) {
      e.target.setAttribute('aria-hidden', 'true');
      document.documentElement.style.overflow = '';
    }
  });

  // ESC key to close any open modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      Object.values(map).forEach(m => { if (m && m.getAttribute('aria-hidden') === 'false') m.setAttribute('aria-hidden', 'true'); });
      document.documentElement.style.overflow = '';
    }
  });
})();
// === Popup Logic for Course Info ===
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.info-btn');
  const modals = document.querySelectorAll('.modal');
  const closes = document.querySelectorAll('.close');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.course);
      if (target) target.style.display = 'flex';
    });
  });

  closes.forEach(close => {
    close.addEventListener('click', () => {
      close.closest('.modal').style.display = 'none';
    });
  });

  window.addEventListener('click', e => {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });
});
