/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
    const aosElements = document.querySelectorAll('[data-aos]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    aosElements.forEach(el => observer.observe(el));
}

/* ===== QR MODAL FUNCTIONS ===== */
window.openQrModal = function() {
    const modal = document.getElementById('qrModal');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.closeQrModal = function() {
    const modal = document.getElementById('qrModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

window.openFullQrModal = function() {
    closeQrModal();
    const modal = document.getElementById('fullQrModal');
    if (modal) {
        modal.classList.add('active');
    }
};

window.closeFullQrModal = function() {
    const modal = document.getElementById('fullQrModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
};

// Close modal with ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeQrModal();
        closeFullQrModal();
    }
});

/* ===== DOMContentLoaded ===== */
document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    
    const lixiBtn = document.getElementById('lixiBtn');
    if (lixiBtn) {
        lixiBtn.addEventListener('click', openQrModal);
    }
});

/* ===== WISH FORM ===== */
const wishForm2 = document.querySelector('.wish-form-minimal');
if (wishForm2) {
    const STORAGE_KEY = 'wedding_wishes_m2';
    
    function getWishes2() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }
    
    function saveWish2(wish) {
        const wishes = getWishes2();
        wishes.unshift(wish);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    }
    
    wishForm2.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = wishForm2.querySelector('input');
        const messageInput = wishForm2.querySelector('textarea');
        
        const name = nameInput.value.trim();
        const message = messageInput.value.trim();
        if (!name || !message) return;
        
        saveWish2({
            name,
            message,
            time: new Date().toLocaleString('vi-VN')
        });
        
        nameInput.value = '';
        messageInput.value = '';
        
        renderWishes2();
    });
    
    function renderWishes2() {
        let wishList = document.querySelector('.wish-list-m2');
        if (!wishList) {
            wishList = document.createElement('div');
            wishList.className = 'wish-list-m2';
            wishList.style.cssText = 'max-width:500px;margin:40px auto 0;padding:0 20px;';
            wishForm2.parentNode.insertBefore(wishList, wishForm2.nextSibling);
        }
        
        const wishes = getWishes2();
        wishList.innerHTML = '';
        
        wishes.forEach(wish => {
            const item = document.createElement('div');
            item.style.cssText = 'background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.1);border-radius:8px;padding:20px;margin-bottom:15px;';
            item.innerHTML = `
                <p style="color:var(--white);font-style:italic;margin-bottom:10px;line-height:1.6;">"${wish.message}"</p>
                <p style="color:var(--gold);font-size:14px;">— ${wish.name}</p>
            `;
            wishList.appendChild(item);
        });
    }
    
    renderWishes2();
}

/* ===== RSVP FORM ===== */
const rsvpForm2 = document.querySelector('.rsvp-form-minimal');
if (rsvpForm2) {
    const RSVP_KEY = 'wedding_rsvp_m2';
    
    rsvpForm2.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = rsvpForm2.querySelectorAll('input[type="text"], input[type="tel"], textarea');
        const eventCheckboxes = rsvpForm2.querySelectorAll('input[name="event"]:checked');
        const events = Array.from(eventCheckboxes).map(cb => cb.value);
        
        const data = {
            name: inputs[0].value,
            phone: inputs[1].value,
            attending: rsvpForm2.querySelector('input[name="rsvp"]:checked').nextElementSibling.textContent,
            events: events,
            guests: document.getElementById('guestCount2').textContent,
            message: inputs[2] ? inputs[2].value : '',
            time: new Date().toLocaleString('vi-VN')
        };
        
        const rsvps = JSON.parse(localStorage.getItem(RSVP_KEY)) || [];
        rsvps.unshift(data);
        localStorage.setItem(RSVP_KEY, JSON.stringify(rsvps));
        rsvpForm2.reset();
        document.getElementById('guestCount2').textContent = '1';
    });
}
