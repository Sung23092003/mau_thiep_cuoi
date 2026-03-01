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

  // Cover frame animation
  const coverFrame = document.querySelector('.cover-frame[data-aos]');
  if (coverFrame) {
    coverFrame.classList.add('aos-animate');
  }

  // Music Player
  const musicToggle = document.getElementById('musicToggle4');
  const bgMusic = document.getElementById('bgMusic4');
  
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
