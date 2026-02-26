/* ===== TIM ĐỎ KHI HOVER SECTION ===== */
const wishSection = document.querySelector('.main');

wishSection.addEventListener('mousemove', (e) => {
    // hạn chế spam quá nhiều
    if (Math.random() > 0.85) {
        const heart = document.createElement('span');
        heart.className = 'hover-heart';
        heart.innerHTML = '❤';

        const rect = wishSection.getBoundingClientRect();
        heart.style.left = e.clientX - rect.left + 'px';
        heart.style.top = e.clientY - rect.top + 'px';

        wishSection.appendChild(heart);

        setTimeout(() => heart.remove(), 1600);
    }
});