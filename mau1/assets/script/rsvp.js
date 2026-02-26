// RSVP Form Functions
let currentGuests = 1;

function changeGuests(delta) {
  currentGuests += delta;
  if (currentGuests < 1) currentGuests = 1;
  if (currentGuests > 100) currentGuests = 100;
  updateGuestDisplay();
}

function setGuests(num) {
  currentGuests = num;
  updateGuestDisplay();
}

function updateGuestDisplay() {
  document.getElementById('guestCount').textContent = currentGuests;
  
  // Update active state on buttons
  document.querySelectorAll('.guest-num').forEach(btn => {
    btn.classList.remove('active');
    if (parseInt(btn.textContent) === currentGuests) {
      btn.classList.add('active');
    }
  });
}

// Set initial active state
document.addEventListener('DOMContentLoaded', function() {
  updateGuestDisplay();
});
