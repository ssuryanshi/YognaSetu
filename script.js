/* ============================================
   YojnaSetu — Interactive Behaviors
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Navigation Toggle ----
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      // Animate hamburger
      const spans = navToggle.querySelectorAll('span');
      navToggle.classList.toggle('open');
      if (navToggle.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Close nav on link click (mobile)
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      if (navToggle.classList.contains('open')) {
        navToggle.click();
      }
    });
  });

  // ---- Scroll-triggered Fade-in ----
  const fadeEls = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animations for siblings
        const siblings = entry.target.parentElement.querySelectorAll('.fade-in');
        let delay = 0;
        siblings.forEach((sib, i) => {
          if (sib === entry.target) delay = i * 100;
        });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  fadeEls.forEach(el => fadeObserver.observe(el));

  // ---- Navbar Background on Scroll ----
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.style.boxShadow = '0 2px 20px rgba(27, 94, 32, 0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 72; // navbar height
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Counter Animation ----
  const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-value, .metric-value, .impact-card h4');

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          entry.target.dataset.animated = 'true';
          const text = entry.target.textContent;
          const match = text.match(/^([\d.]+)/);

          if (match) {
            const target = parseFloat(match[1]);
            const suffix = text.replace(match[1], '');
            const duration = 1500;
            const startTime = performance.now();

            const animate = (currentTime) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out
              const eased = 1 - Math.pow(1 - progress, 3);
              const current = target * eased;

              if (Number.isInteger(target)) {
                entry.target.textContent = Math.floor(current) + suffix;
              } else {
                entry.target.textContent = current.toFixed(1) + suffix;
              }

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                entry.target.textContent = text;
              }
            };
            requestAnimationFrame(animate);
          }
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(c => counterObserver.observe(c));
  };

  animateCounters();

  // ---- Chat Message Replay (Demo Section) ----
  const demoChatSection = document.getElementById('demo');
  if (demoChatSection) {
    const demoMessages = demoChatSection.querySelectorAll('.chat-msg');
    let chatAnimated = false;

    const chatObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !chatAnimated) {
          chatAnimated = true;
          demoMessages.forEach((msg, i) => {
            msg.style.opacity = '0';
            msg.style.transform = 'translateY(10px)';
            msg.style.animation = 'none';
            setTimeout(() => {
              msg.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              msg.style.opacity = '1';
              msg.style.transform = 'translateY(0)';
            }, 300 + i * 500);
          });
          chatObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    chatObserver.observe(demoChatSection);
  }

  // ---- Architecture Layer Hover Interactivity ----
  const archLayers = document.querySelectorAll('.arch-layer');
  archLayers.forEach(layer => {
    layer.addEventListener('mouseenter', () => {
      archLayers.forEach(l => {
        if (l !== layer) l.style.opacity = '0.5';
      });
    });
    layer.addEventListener('mouseleave', () => {
      archLayers.forEach(l => l.style.opacity = '1');
    });
  });

  // ---- Typing Indicator in Solution Chat ----
  const chatMockup = document.getElementById('chatMockup');
  if (chatMockup) {
    const chatMessages = chatMockup.querySelectorAll('.chat-msg');
    let solutionChatAnimated = false;

    const solutionChatObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !solutionChatAnimated) {
          solutionChatAnimated = true;
          chatMessages.forEach((msg, i) => {
            msg.style.opacity = '0';
            msg.style.transform = 'translateY(10px)';
            msg.style.animation = 'none';
            setTimeout(() => {
              msg.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              msg.style.opacity = '1';
              msg.style.transform = 'translateY(0)';
            }, 400 + i * 600);
          });
          solutionChatObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    solutionChatObserver.observe(chatMockup);
  }

  // ---- Parallax effect on bridge visual ----
  const bridgeVisual = document.querySelector('.bridge-visual');
  if (bridgeVisual) {
    const floatingIcons = bridgeVisual.querySelectorAll('.floating-icon');
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        const factor = scrolled * 0.05;
        floatingIcons.forEach((icon, i) => {
          icon.style.transform = `translateY(${-factor * (i + 1)}px)`;
        });
      }
    });
  }

});
