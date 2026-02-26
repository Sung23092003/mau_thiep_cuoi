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
      } else {
        entry.target.classList.remove('aos-animate');
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

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.ambient-orb');
    
    orbs.forEach((orb, index) => {
      const speed = 0.05 + (index * 0.02);
      orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // Music Player Toggle
  const musicToggle = document.getElementById('musicToggle');
  const bgMusic = document.getElementById('bgMusic');
  
  if (musicToggle && bgMusic) {
    bgMusic.play().then(() => {
      musicToggle.classList.add('playing');
    }).catch(() => {
      console.log('Autoplay blocked, tap to play');
    });
    
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
