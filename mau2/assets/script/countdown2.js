// Countdown for Mau2
function updateCountdown2() {
    const weddingDate = new Date('2027-01-20T11:00:00').getTime();
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days2').textContent = String(days).padStart(2, '0');
        document.getElementById('hours2').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes2').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds2').textContent = String(seconds).padStart(2, '0');
    }
}

setInterval(updateCountdown2, 1000);
updateCountdown2();

// Guest counter
let guestCount2 = 1;

window.updateGuests2 = function(delta) {
    guestCount2 += delta;
    if (guestCount2 < 1) guestCount2 = 1;
    if (guestCount2 > 10) guestCount2 = 10;
    document.getElementById('guestCount2').textContent = guestCount2;
}
