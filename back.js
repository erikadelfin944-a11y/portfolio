/**
 * Erika E. Delfin - Portfolio Interactivity Script
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right');
  
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // 2. Sticky Header with Shadow on Scroll
  const header = document.getElementById('header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // 3. Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
      }
    });
  }

  // 4. Active Nav Link on Scroll
  const sections = document.querySelectorAll('section[id]');
  const highlightNavLink = () => {
    const scrollY = window.scrollY;
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');
      
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  window.addEventListener('scroll', highlightNavLink, { passive: true });

  // 5. Contact Form Submission Handling (mailto: direct email)
  const contactForm = document.getElementById('contact-form') || document.querySelector('.contact-form');
  const formFeedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && formFeedback) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contact-name')?.value.trim() || '';
      const email = document.getElementById('contact-email')?.value.trim() || '';
      const subject = document.getElementById('contact-subject')?.value.trim() || 'Portfolio Inquiry';
      const message = document.getElementById('contact-message')?.value.trim() || '';

      const emailSubject = `[Portfolio] ${subject} - from ${name}`;
      const emailBody = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

      const mailtoUrl = `mailto:erikadelfin944@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

      // Show feedback
      formFeedback.className = 'form-feedback success';
      formFeedback.innerHTML = '<i class="fa-solid fa-circle-check"></i> Opening your email client to send the message...';
      formFeedback.style.display = 'block';

      // Launch email client
      window.location.href = mailtoUrl;

      // Reset form
      contactForm.reset();

      setTimeout(() => {
        formFeedback.style.display = 'none';
      }, 8000);
    });
  }

  // 6. Back to top button smooth behavior
  const backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    backToTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
});
