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
