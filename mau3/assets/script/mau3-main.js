/* ===== FLIP BOOK ===== */
const flipbookModal = document.getElementById('flipbookModal');

const galleryImages = [
    'assets/img/gallery/1.jpg',
    'assets/img/gallery/2.jpg',
    'assets/img/gallery/3.jpg',
    'assets/img/gallery/4.jpg',
    'assets/img/gallery/5.jpg',
    'assets/img/gallery/6.jpg'
];

function openFlipBook(startIndex) {
    if (!flipbookModal) return;
    
    // Reset 
    const checkboxes = flipbookModal.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);

    for (let i = 1; i <= 8; i++) {
        const imgElement = document.getElementById('flip-img-' + i);
        if (imgElement) {
            const srcIndex = (startIndex + (i - 1)) % galleryImages.length;
            imgElement.src = galleryImages[srcIndex];
        }
    }
    
    flipbookModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeFlipBook() {
    if (flipbookModal) {
        flipbookModal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset checkboxes when closing
        const checkboxes = flipbookModal.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(cb => cb.checked = false);
    }
}

if (flipbookModal) {
    const overlay = flipbookModal.querySelector('.flipbook-overlay');
    if (overlay) {
        overlay.addEventListener('click', closeFlipBook);
    }
}

/* ===== QR MODAL ===== */
const qrModal3 = document.getElementById('qrModal3');
const fullQrModal3 = document.getElementById('fullQrModal3');
const lixiBtn3 = document.getElementById('lixiBtn3');

function openQrModal3() {
    if (qrModal3) {
        qrModal3.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeQrModal3() {
    if (qrModal3) {
        qrModal3.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function openFullQrModal3() {
    closeQrModal3();
    if (fullQrModal3) {
        fullQrModal3.classList.add('active');
    }
}

function closeFullQrModal3() {
    if (fullQrModal3) {
        fullQrModal3.classList.remove('active');
        document.body.style.overflow = '';
    }
}

if (lixiBtn3) {
    lixiBtn3.addEventListener('click', openQrModal3);
}

if (qrModal3) {
    const qrOverlay = qrModal3.querySelector('.qr-modal-overlay');
    const qrClose = qrModal3.querySelector('.qr-modal-close');
    const qrFrame = qrModal3.querySelector('.qr-frame');
    
    if (qrOverlay) qrOverlay.addEventListener('click', closeQrModal3);
    if (qrClose) qrClose.addEventListener('click', closeQrModal3);
    if (qrFrame) qrFrame.addEventListener('click', openFullQrModal3);
}

if (fullQrModal3) {
    const fullQrOverlay = fullQrModal3.querySelector('.full-qr-overlay');
    const fullQrClose = fullQrModal3.querySelector('.full-qr-close');
    
    if (fullQrOverlay) fullQrOverlay.addEventListener('click', closeFullQrModal3);
    if (fullQrClose) fullQrClose.addEventListener('click', closeFullQrModal3);
}

// ESC 
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeFlipBook();
        closeQrModal3();
        closeFullQrModal3();
    }
});

/* ===== WISH FORM ===== */
const wishForm3 = document.getElementById('wishForm3');
if (wishForm3) {
    const STORAGE_KEY = 'wedding_wishes_m3';
    
    function getWishes3() {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    }
    
    function saveWish3(wish) {
        const wishes = getWishes3();
        wishes.unshift(wish);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
    }
    
    function renderWishes3() {
        const wishList = document.getElementById('wishList3');
        if (!wishList) return;
        
        const wishes = getWishes3();
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
    
    wishForm3.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const nameInput = wishForm3.querySelector('input');
        const messageInput = wishForm3.querySelector('textarea');
        
        const name = nameInput.value.trim();
        const message = messageInput.value.trim();
        if (!name || !message) return;
        
        saveWish3({
            name,
            message,
            time: new Date().toLocaleString('vi-VN')
        });
        
        nameInput.value = '';
        messageInput.value = '';
        
        renderWishes3();
    });
    
    renderWishes3();
}

/* ===== RSVP FORM ===== */
const rsvpForm3 = document.querySelector('.rsvp-form');
if (rsvpForm3) {
    const RSVP_KEY = 'wedding_rsvp_m3';
    
    rsvpForm3.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const inputs = rsvpForm3.querySelectorAll('input[type="text"], input[type="tel"], textarea');
        const eventCheckboxes = rsvpForm3.querySelectorAll('input[name="event"]:checked');
        const events = Array.from(eventCheckboxes).map(cb => cb.value);
        
        const data = {
            name: inputs[0].value,
            phone: inputs[1].value,
            attending: rsvpForm3.querySelector('input[name="rsvp"]:checked').nextElementSibling.textContent,
            events: events,
            guests: document.getElementById('guestCount3').textContent,
            message: inputs[2] ? inputs[2].value : '',
            time: new Date().toLocaleString('vi-VN')
        };
        
        const rsvps = JSON.parse(localStorage.getItem(RSVP_KEY)) || [];
        rsvps.unshift(data);
        localStorage.setItem(RSVP_KEY, JSON.stringify(rsvps));
        
        rsvpForm3.reset();
        document.getElementById('guestCount3').textContent = '1';
    });
}
