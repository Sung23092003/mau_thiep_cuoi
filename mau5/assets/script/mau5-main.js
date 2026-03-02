// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
  offset: 100,
  easing: 'ease-out-cubic'
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scrollTopBtn');
if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Music Toggle
const musicToggle = document.getElementById('musicToggle');
const bgMusic = document.getElementById('bgMusic');

if (musicToggle && bgMusic) {
  musicToggle.addEventListener('click', () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicToggle.classList.add('playing');
    } else {
      bgMusic.pause();
      musicToggle.classList.remove('playing');
    }
  });
}

// Shutter Sequence: countdown → flash → slide-in photo → print sound → shake
const shutterBtn = document.getElementById('shutterBtn');
const flashOverlay = document.getElementById('flashOverlay');
const countdownOverlay = document.getElementById('countdownOverlay');
const countdownNum = document.getElementById('countdownNum');
const printSfx = document.getElementById('printSfx');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));
let shotCount = 0;
const MAX_SHOTS = 4;

async function runShutterSequence() {
  if (!shutterBtn) return;
  
  // Check if already reached max shots
  if (shotCount >= MAX_SHOTS) {
    return; // Do nothing if already at max
  }
  
  // Check if this is the 5th click (after 4 shots)
  if (shotCount === MAX_SHOTS) {
    // Trigger full film effect
    triggerFullFilmEffect();
    return;
  }
  
  shutterBtn.disabled = true;
  try {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    await sleep(700);
    if (countdownOverlay && countdownNum) {
      // Play sound once at start of countdown
      if (printSfx && printSfx.play) {
        try { printSfx.currentTime = 0; printSfx.play(); } catch {}
      }
      countdownOverlay.classList.add('active');
      for (const n of [3, 2, 1]) {
        countdownNum.textContent = n;
        await sleep(700);
      }
      countdownOverlay.classList.remove('active');
    }
    if (flashOverlay) {
      flashOverlay.classList.remove('active');
      void flashOverlay.offsetWidth;
      flashOverlay.classList.add('active');
    }
    addNewShot(true);
    document.querySelectorAll('.film-strip').forEach(el => {
      el.classList.add('shake');
      setTimeout(() => el.classList.remove('shake'), 550);
    });
    
    shotCount++;
    
    // Disable button after 4 shots
    if (shotCount >= MAX_SHOTS) {
      shutterBtn.style.opacity = '0.5';
      shutterBtn.style.cursor = 'not-allowed';
    }
  } finally {
    await sleep(400);
    shutterBtn.disabled = false;
  }
}

function triggerFullFilmEffect() {
  // Add shake to entire body
  document.body.classList.add('film-full-shake');
  
  // Turn to black and white
  document.body.classList.add('film-full-bw');
  
  // Show message
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    const existingMsg = heroSection.querySelector('.full-film-message');
    if (!existingMsg) {
      const msg = document.createElement('div');
      msg.className = 'full-film-message';
      msg.innerHTML = `
        <div class="message-content">
          <span class="film-icon">🎞</span>
          <h2>Cuộn Film Đã Đầy</h2>
          <p>4 khoảnh khắc đã được lưu lại</p>
        </div>
      `;
      heroSection.appendChild(msg);
      
      // Animate in
      setTimeout(() => msg.classList.add('show'), 100);
    }
  }
  
  // Remove shake after animation
  setTimeout(() => {
    document.body.classList.remove('film-full-shake');
  }, 600);
}

if (shutterBtn) {
  shutterBtn.addEventListener('click', runShutterSequence);
}

function addNewShot(toBoth) {
  const pool = [
    'assets/img/gallery/11.jpg',
    'assets/img/gallery/12.jpg',
    'assets/img/gallery/13.jpg',
    'assets/img/gallery/14.jpg',
    'assets/img/gallery/15.jpg'
  ];
  const printed = document.querySelectorAll('#printed .film-strip');
  const strips = printed.length ? Array.from(printed) : Array.from(document.querySelectorAll('.strips-wrap .film-strip'));
  if (strips.length === 0) return;
  const src = pool[shotCount % pool.length];
  const targets = toBoth && strips.length >= 2 ? [strips[0], strips[1]] : [strips[0]];
  targets.forEach(strip => {
    const frame = document.createElement('div');
    frame.className = 'frame new-shot';
    const win = document.createElement('div');
    win.className = 'frame-window';
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Ảnh photobooth mới: trượt xuống từ máy in';
    win.appendChild(img);
    frame.appendChild(win);
    const footer = strip.querySelector('.strip-footer');
    if (footer) {
      strip.insertBefore(frame, footer);
    } else {
      strip.insertBefore(frame, strip.querySelector('.sprocket.bottom'));
    }
  });
}

// Simple parallax tilt for film strips
const strips = document.querySelectorAll('.film-strip');
if (strips.length) {
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 6;
    strips.forEach((el, i) => {
      el.style.transform = `rotate(${i % 2 === 0 ? -3 + x : 3 - x}deg) translateZ(0)`;
    });
  });
}

// Wish Form - Save to localStorage
const floatingForm = document.querySelector('.wish-form');
if (floatingForm) {
  floatingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = floatingForm.querySelector('input[type="text"]').value;
    const message = floatingForm.querySelector('textarea').value;
    
    if (!name || !message) return;
    
    const wish = {
      name,
      message,
      date: new Date().toLocaleDateString('vi-VN')
    };
    
    let wishes = JSON.parse(localStorage.getItem('wishes_m5') || '[]');
    wishes.unshift(wish);
    localStorage.setItem('wishes_m5', JSON.stringify(wishes));
    
    displayWishes();
    floatingForm.reset();
  });
}

// Display Wishes
function displayWishes() {
  const wishesList = document.getElementById('wishesList');
  if (!wishesList) return;
  
  const wishes = JSON.parse(localStorage.getItem('wishes_m5') || '[]');
  
  if (wishes.length === 0) {
    wishesList.innerHTML = '<p style="text-align: center; color: #999; grid-column: span 2;">Chưa có lời chúc nào. Hãy là người đầu tiên!</p>';
    return;
  }
  
  wishesList.innerHTML = wishes.map(wish => `
    <div class="wish-item">
      <p class="wish-name">${wish.name}</p>
      <p class="wish-text">"${wish.message}"</p>
    </div>
  `).join('');
}

displayWishes();

// RSVP Form
const minimalForm = document.querySelector('.rsvp-form');
if (minimalForm) {
  minimalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    minimalForm.reset();
  });
}

// Optional: strengthen hover transitions on frames
document.querySelectorAll('.film-strip .frame img').forEach(img => {
  img.style.willChange = 'transform, filter';
});
