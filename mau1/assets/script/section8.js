     /* ===== TIM BAY ===== */
        const heartContainer = document.querySelector('.floating-hearts');

        setInterval(() => {
            const heart = document.createElement('span');
            heart.innerHTML = '❤';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (4 + Math.random() * 3) + 's';
            heart.style.color = ['#d6bfa7', '#e8cfc2', '#c9a98b'][Math.floor(Math.random() * 3)];
            heartContainer.appendChild(heart);
            setTimeout(() => heart.remove(), 7000);
        }, 600);

        /* ===== LƯU LỜI CHÚC ===== */
        const form = document.querySelector('.wish-form');
        const nameInput = form.querySelector('input');
        const messageInput = form.querySelector('textarea');

        const STORAGE_KEY = 'wedding_wishes';

        function getWishes() {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        }

        function saveWish(wish) {
            const wishes = getWishes();
            wishes.unshift(wish);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(wishes));
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = nameInput.value.trim();
            const message = messageInput.value.trim();
            if (!name || !message) return;

            saveWish({
                name,
                message,
                time: new Date().toLocaleString('vi-VN')
            });

            nameInput.value = '';
            messageInput.value = '';

            renderWishes();
        });

        /* ===== HIỂN THỊ LỜI CHÚC ===== */
        const wishList = document.createElement('div');
        wishList.className = 'wish-list';
        document.querySelector('.wish-section').appendChild(wishList);

        function renderWishes() {
            const wishes = getWishes();
            wishList.innerHTML = '';

            wishes.forEach(wish => {
                const item = document.createElement('div');
                item.className = 'wish-item';
                item.innerHTML = `
        <p class="wish-text">“${wish.message}”</p>
        <div class="wish-author">— ${wish.name}</div>
      `;
                wishList.appendChild(item);
            });
        }

        renderWishes();