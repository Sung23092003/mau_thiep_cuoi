// Countdown Timer for Mẫu 4
const weddingDate4 = new Date('2027-01-20T11:00:00').getTime();

function updateCountdown4() {
  const now = new Date().getTime();
  const distance = weddingDate4 - now;

  if (distance < 0) {
    document.getElementById('days4').textContent = '00';
    document.getElementById('hours4').textContent = '00';
    document.getElementById('minutes4').textContent = '00';
    document.getElementById('seconds4').textContent = '00';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days4').textContent = days.toString().padStart(2, '0');
  document.getElementById('hours4').textContent = hours.toString().padStart(2, '0');
  document.getElementById('minutes4').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds4').textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown4, 1000);
updateCountdown4();
