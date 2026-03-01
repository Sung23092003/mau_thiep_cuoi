/* ===== QR MODAL ===== */
function openQrModal4() {
    const modal = document.getElementById('qrModal4');
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeQrModal4() {
    const modal = document.getElementById('qrModal4');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openFullQrModal4() {
    closeQrModal4();
    const modal = document.getElementById('fullQrModal4');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeFullQrModal4() {
    const modal = document.getElementById('fullQrModal4');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

const lixiBtn4 = document.getElementById('lixiBtn4');
if (lixiBtn4) {
    lixiBtn4.addEventListener('click', openQrModal4);
}

// ESC key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeQrModal4();
        closeFullQrModal4();
    }
});

/* ===== WISH FORM ===== */
const wishForm4 = document.getElementById('wishForm4');
if (wishForm4) {
    const STORAGE_KEY = 'wedding_wishes_m4';
    
    function getWishes4() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }
    
    function saveWish4(wish) {
        const wishes = getWishes4();
        wishes.unshift(wish);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    }
    
    function renderWishes4() {
        const wishList = document.getElementById('wishList4');
        if (!wishList) return;
        
        const wishes = getWishes4();
        wishList.innerHTML = '';
        
        wishes.forEach(wish => {
            const item = document.createElement('div');
            item.className = 'wish-item';
            item.innerHTML = `
                <p class="wish-message">"${wish.message}"</p>
                <div class="wish-info">
                    <span class="wish-name">${wish.name}</span>
                    <span class="wish-time">${wish.time}</span>
                </div>
            `;
            wishList.appendChild(item);
        });
    }
    
    wishForm4.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = wishForm4.querySelector('input');
        const messageInput = wishForm4.querySelector('textarea');
        
        const name = nameInput.value.trim();
        const message = messageInput.value.trim();
        if (!name || !message) return;
        
        saveWish4({
            name,
            message,
            time: new Date().toLocaleString('vi-VN')
        });
        
        nameInput.value = '';
        messageInput.value = '';
        
        renderWishes4();
    });
    
    renderWishes4();
}

/* ===== RSVP FORM ===== */
const rsvpForm4 = document.querySelector('.rsvp-form');
if (rsvpForm4) {
    const RSVP_KEY = 'wedding_rsvp_m4';
    
    rsvpForm4.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = rsvpForm4.querySelectorAll('input[type="text"], input[type="tel"], textarea');
        const eventCheckboxes = rsvpForm4.querySelectorAll('input[name="event"]:checked');
        const events = Array.from(eventCheckboxes).map(cb => cb.value);
        
        const data = {
            name: inputs[0].value,
            phone: inputs[1].value,
            attending: rsvpForm4.querySelector('input[name="rsvp"]:checked').nextElementSibling.textContent,
            events: events,
            guests: document.getElementById('guestCount4').textContent,
            message: inputs[2] ? inputs[2].value : '',
            time: new Date().toLocaleString('vi-VN')
        };
        
        const rsvps = JSON.parse(localStorage.getItem(RSVP_KEY)) || [];
        rsvps.unshift(data);
        localStorage.setItem(RSVP_KEY, JSON.stringify(rsvps));
        
        rsvpForm4.reset();
        document.getElementById('guestCount4').textContent = '1';
        alert('Cảm ơn bạn đã xác nhận!');
    });
}

/* ===== UPDATE GUESTS ===== */
window.updateGuests4 = function(delta) {
    const guestCount = document.getElementById('guestCount4');
    let count = parseInt(guestCount.textContent);
    count = Math.max(1, count + delta);
    guestCount.textContent = count;
};
