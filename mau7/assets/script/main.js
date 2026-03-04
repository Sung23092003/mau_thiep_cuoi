/**
 * Mẫu 7 - Scrapbook Wedding Invitation
 * Main JavaScript
 */

// ============================================
// SCROLL ANIMATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll(
        '.timeline-item, .person-card, .gallery-item, .event-card, .wishes-card, .rsvp-card, .gift-card, .ceremony-card'
    );
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
});


// ============================================
// COUNTDOWN TIMER
// ============================================
function updateCountdown() {
    const weddingDate = new Date('2027-01-20T11:00:00');
    const now = new Date();
    const diff = weddingDate - now;

    if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
    }
}

// Start countdown
setInterval(updateCountdown, 1000);
updateCountdown();


// ============================================
// MUSIC PLAYER
// ============================================
const musicToggle = document.getElementById('musicToggle');
const weddingSong = document.getElementById('weddingSong');

if (musicToggle && weddingSong) {
    let isPlaying = false;

    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            weddingSong.pause();
            musicToggle.classList.remove('playing');
        } else {
            weddingSong.play().catch(e => console.log('Auto-play blocked'));
            musicToggle.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });
}


// ============================================
// WISH FORM
// ============================================
const wishForm = document.getElementById('wishForm');

if (wishForm) {
    wishForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.name.value;
        const message = this.message.value;
        
        if (name && message) {
            const wishItem = document.createElement('div');
            wishItem.className = 'wish-item';
            wishItem.innerHTML = `
                <div class="wish-avatar">♥</div>
                <div class="wish-content">
                    <span class="wish-name">${name}</span>
                    <p class="wish-text">${message}</p>
                </div>
            `;
            
            const wishesList = document.getElementById('wishesList');
            if (wishesList) {
                wishesList.insertBefore(wishItem, wishesList.firstChild);
            }
            
            this.reset();
            alert('Cảm ơn lời chúc của bạn!');
        }
    });
}


// ============================================
// RSVP FORM
// ============================================
const rsvpForm = document.getElementById('rsvpForm');

if (rsvpForm) {
    rsvpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = this.guestName.value;
        const attending = this.attendance.value;
        const guests = this.guestCount.value;
        
        if (name && attending) {
            alert(`Cảm ơn ${name}!\nBạn ${attending === 'yes' ? 'sẽ tham dự' : 'không thể tham dự'}.\nSố khách: ${guests}`);
            this.reset();
        }
    });
}
