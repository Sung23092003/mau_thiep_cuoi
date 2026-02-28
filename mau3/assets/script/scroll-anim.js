document.addEventListener('DOMContentLoaded', () => {
  const aosElements = document.querySelectorAll('[data-aos]');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, observerOptions);

  aosElements.forEach(el => observer.observe(el));

  const coverContent = document.querySelector('.cover-content[data-aos]');
  if (coverContent) {
    coverContent.classList.add('aos-animate');
  }

  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    section.style.opacity = '1';
  });

  const revealSection = () => {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      if (sectionTop < windowHeight * 0.85) {
        section.classList.add('section-revealed');
      }
    });
  };

  document.querySelectorAll('section').forEach(section => {
    section.classList.add('section-revealed');
  });

  window.addEventListener('scroll', revealSection);

  const coverSection = document.querySelector('.cover-section');
  if (coverSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      coverSection.style.backgroundPositionY = scrolled * 0.3 + 'px';
    });
  }

  const floatElements = document.querySelectorAll('[data-aos="float"]');
  floatElements.forEach(el => {
    el.addEventListener('animationend', () => {
      el.style.animation = 'softFloat 3s ease-in-out infinite';
    });
  });

  // Music Player
  const musicToggle = document.getElementById('musicToggle3');
  const bgMusic = document.getElementById('bgMusic3');
  
  if (musicToggle && bgMusic) {
    bgMusic.volume = 0.5;
    
    bgMusic.play().then(() => {
      musicToggle.classList.add('playing');
    }).catch(() => {});
    
    musicToggle.addEventListener('click', () => {
      if (bgMusic.paused) {
        bgMusic.play().then(() => {
          musicToggle.classList.add('playing');
        });
      } else {
        bgMusic.pause();
        musicToggle.classList.remove('playing');
      }
    });
  }
});
