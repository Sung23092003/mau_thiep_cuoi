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

// QR Modal Functions
function openQrModal() {
  const modal = document.getElementById('qrModal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeQrModal() {
  const modal = document.getElementById('qrModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Full QR Modal Functions
function openFullQrModal() {
  closeQrModal();
  const modal = document.getElementById('fullQrModal');
  if (modal) {
    modal.classList.add('active');
  }
}

function closeFullQrModal() {
  const modal = document.getElementById('fullQrModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Close modal on ESC key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeQrModal();
    closeFullQrModal();
  }
});

// Set initial active state
document.addEventListener('DOMContentLoaded', function() {
  updateGuestDisplay();
});
