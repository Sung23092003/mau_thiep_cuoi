// Countdown for Mẫu 5 - Wedding Date: January 20, 2027
function updateCountdown() {
  const weddingDate = new Date('2027-01-20T11:00:00').getTime();
  const now = new Date().getTime();
  const distance = weddingDate - now;

  if (distance < 0) {
    document.getElementById('days5').textContent = '00';
    document.getElementById('hours5').textContent = '00';
    document.getElementById('minutes5').textContent = '00';
    document.getElementById('seconds5').textContent = '00';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById('days5').textContent = days.toString().padStart(2, '0');
  document.getElementById('hours5').textContent = hours.toString().padStart(2, '0');
  document.getElementById('minutes5').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds5').textContent = seconds.toString().padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();
