// Countdown Mau3
function updateCountdown3() {
    const weddingDate = new Date('2027-01-20T11:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days3').textContent = String(days).padStart(2, '0');
        document.getElementById('hours3').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes3').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds3').textContent = String(seconds).padStart(2, '0');
    }
}

setInterval(updateCountdown3, 1000);
updateCountdown3();

// Guest counter
let guestCount3 = 1;

window.updateGuests3 = function(delta) {
    guestCount3 += delta;
    if (guestCount3 < 1) guestCount3 = 1;
    if (guestCount3 > 100) guestCount3 = 100;
    document.getElementById('guestCount3').textContent = guestCount3;
}
