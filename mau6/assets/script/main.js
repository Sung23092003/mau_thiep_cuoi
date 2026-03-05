/**
 * Wedding Invitation - Creative Editorial
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== Scroll Animation with Stagger ==========
    const scrollElements = document.querySelectorAll('[data-scroll]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const parent = entry.target.closest('.section');
                
                // Add visible class to section for polaroid animations
                if (parent) {
                    parent.classList.add('visible');
                    
                    // Add staggered delay for children within same section
                    const siblings = parent.querySelectorAll('[data-scroll]');
                    const index = Array.from(siblings).indexOf(entry.target);
                    const delay = index * 0.1;
                    entry.target.style.transitionDelay = `${delay}s`;
                }
                
                entry.target.classList.add('visible');
            }
        });
    }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });
    
    scrollElements.forEach(el => observer.observe(el));
    
    
    // ========== Scroll Top Button ==========
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    window.addEventListener('scroll', () => {
        scrollTopBtn?.classList.toggle('visible', window.scrollY > 500);
    });
    
    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    
    // ========== Music Toggle ==========
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    
    if (musicToggle && bgMusic) {
        bgMusic.play()
            .then(() => musicToggle.classList.add('playing'))
            .catch(() => musicToggle.classList.remove('playing'));
        
        musicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play();
                musicToggle.classList.add('playing');
            } else {
                bgMusic.pause();
                musicToggle.classList.remove('playing');
            }
        });
    }
    
    
    // ========== QR Modal ==========
    window.openQrModal = function() {
        document.getElementById('qrModal')?.classList.add('active');
    };
    
    window.closeQrModal = function() {
        document.getElementById('qrModal')?.classList.remove('active');
    };
    
    window.openFullQrModal = function() {
        document.getElementById('fullQrModal')?.classList.add('active');
    };
    
    window.closeFullQrModal = function() {
        document.getElementById('fullQrModal')?.classList.remove('active');
    };
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeQrModal();
            closeFullQrModal();
        }
    });
    
    document.getElementById('qrModal')?.addEventListener('click', function(e) {
        if (e.target === this) closeQrModal();
    });
    
    document.getElementById('fullQrModal')?.addEventListener('click', function(e) {
        if (e.target === this) closeFullQrModal();
    });
    
    
    // ========== Form Submit ==========
    window.handleSubmit = function(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        
        const data = {
            name: formData.get('name'),
            phone: formData.get('phone'),
            attendance: form.querySelector('input[name="attendance"]:checked')?.value,
            events: Array.from(form.querySelectorAll('input[name="event"]:checked')).map(el => el.value),
            guests: document.getElementById('guestCount')?.textContent || '1',
            message: formData.get('message')
        };
        
        console.log('RSVP Data:', data);
        form.reset();
        document.getElementById('guestCount').textContent = '1';
    };
    
    // ========== Guest Counter ==========
    window.changeGuests = function(delta) {
        const countEl = document.getElementById('guestCount');
        if (!countEl) return;
        
        let count = parseInt(countEl.textContent) || 1;
        count = Math.max(1, Math.min(100, count + delta));
        countEl.textContent = String(count);
    };
    
    // ========== Wish List - LocalStorage ==========
    const WISH_STORAGE_KEY = 'wedding_wishes_mau6';
    
    function getWishes() {
        const data = localStorage.getItem(WISH_STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    }
    
    function saveWish(wish) {
        const wishes = getWishes();
        wishes.unshift(wish);
        localStorage.setItem(WISH_STORAGE_KEY, JSON.stringify(wishes));
    }
    
    function renderWishes() {
        const container = document.getElementById('wishList');
        if (!container) return;
        
        const wishes = getWishes();
        
        if (wishes.length === 0) {
            container.innerHTML = '<p class="wish-empty">Chưa có lời chúc nào. Hãy là người đầu tiên!</p>';
            return;
        }
        
        let html = '<h3 class="wish-list-title">Lời Chúc (' + wishes.length + ')</h3>';
        
        wishes.forEach(wish => {
            const date = new Date(wish.date).toLocaleDateString('vi-VN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            html += `
                <div class="wish-item">
                    <div class="wish-item-name">${escapeHtml(wish.name)}</div>
                    <div class="wish-item-message">"${escapeHtml(wish.message)}"</div>
                    <div class="wish-item-date">${date}</div>
                </div>
            `;
        });
        
        container.innerHTML = html;
    }
    
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // Render wishes on page load
    renderWishes();
    
    // ========== Wish Submit ==========
    window.handleWishSubmit = function(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        
        const wish = {
            name: formData.get('wishName'),
            message: formData.get('wishMessage'),
            date: new Date().toISOString()
        };
        
        saveWish(wish);
        renderWishes();
        
        form.reset();
        
        // Scroll to wish list
        document.getElementById('wishList')?.scrollIntoView({ behavior: 'smooth' });
    };
    
    // ========== Draggable Polaroids (section-polaroid) ==========
    (function enablePolaroidDrag() {
        const wrap = document.querySelector('.section-polaroid .polaroid-wrap');
        if (!wrap) return;
        let zCounter = 10;
        // Allow drag for polaroids and charms
        const draggables = wrap.querySelectorAll('.polaroid, .polaroid-charms .charm');
        draggables.forEach(el => {
            el.style.touchAction = 'none'; // allow pointer events without browser panning
            el.addEventListener('pointerdown', onDown);
        });
        
        function onDown(e) {
            const el = e.currentTarget;
            e.preventDefault();
            try { el.setPointerCapture(e.pointerId); } catch {}
            const wrapRect = wrap.getBoundingClientRect();
            const elRect = el.getBoundingClientRect();
            
            // raise z-index so the grabbed photo is on top
            zCounter += 1;
            el.style.zIndex = String(zCounter);
            
            const startX = e.clientX;
            const startY = e.clientY;
            const startLeft = elRect.left - wrapRect.left;
            const startTop = elRect.top - wrapRect.top;
            
            el.classList.add('dragging');
            const prevTransition = el.style.transition;
            el.style.transition = 'none';
            // set current px so first move is smooth (no jump from % to px)
            el.style.left = `${startLeft}px`;
            el.style.top = `${startTop}px`;
            
            function onMove(ev) {
                ev.preventDefault();
                const dx = ev.clientX - startX;
                const dy = ev.clientY - startY;
                let nextLeft = startLeft + dx;
                let nextTop = startTop + dy;
                
                // constrain within wrapper
                const maxLeft = wrapRect.width - elRect.width;
                const maxTop = wrapRect.height - elRect.height;
                nextLeft = Math.max(0, Math.min(nextLeft, maxLeft));
                nextTop = Math.max(0, Math.min(nextTop, maxTop));
                
                el.style.left = `${nextLeft}px`;
                el.style.top = `${nextTop}px`;
                el.style.right = 'auto';
                el.style.bottom = 'auto';
            }
            
            function onUp() {
                el.classList.remove('dragging');
                // restore transition for smooth hover/release
                el.style.transition = prevTransition || '';
                document.removeEventListener('pointermove', onMove);
                document.removeEventListener('pointerup', onUp);
            }
            
            document.addEventListener('pointermove', onMove, { passive: false });
            document.addEventListener('pointerup', onUp, { once: true });
        }
    })();
    
    // ========== Gallery Lightbox ==========
    const galleryImages = [
        'assets/img/gallery/11.jpg',
        'assets/img/gallery/12.jpg',
        'assets/img/gallery/13.jpg',
        'assets/img/gallery/14.jpg',
        'assets/img/gallery/15.jpg',
        'assets/img/gallery/16.jpg'
    ];
    
    let currentImageIndex = 0;
    
    window.openGallery = function(index) {
        currentImageIndex = index;
        currentScale = 1;
        const lightbox = document.getElementById('galleryLightbox');
        const img = document.getElementById('lightboxImg');
        const totalSpan = document.getElementById('totalImages');
        const currentSpan = document.getElementById('currentIndex');
        
        img.src = galleryImages[currentImageIndex];
        img.style.transform = 'scale(1)';
        img.classList.remove('zoomed');
        img.style.cursor = 'zoom-in';
        
        totalSpan.textContent = galleryImages.length;
        currentSpan.textContent = currentImageIndex + 1;
        document.getElementById('zoomLevel').textContent = '100%';
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };
    
    window.closeGallery = function() {
        const lightbox = document.getElementById('galleryLightbox');
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        currentScale = 1;
        
        if (isSlideshow) {
            toggleSlideshow();
        }
    };
    
    window.nextImage = function() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightboxImage();
    };
    
    window.prevImage = function() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightboxImage();
    };
    
    function updateLightboxImage() {
        const img = document.getElementById('lightboxImg');
        const currentSpan = document.getElementById('currentIndex');
        
        img.style.animation = 'none';
        img.offsetHeight;
        img.style.animation = 'lightboxZoom 0.4s ease';
        
        img.src = galleryImages[currentImageIndex];
        currentSpan.textContent = currentImageIndex + 1;
    }
    
    // ========== Zoom Functionality ==========
    let currentScale = 1;
    const ZOOM_STEP = 0.25;
    const MAX_ZOOM = 3;
    const MIN_ZOOM = 0.5;
    
    window.zoomIn = function() {
        if (currentScale < MAX_ZOOM) {
            currentScale = Math.min(MAX_ZOOM, currentScale + ZOOM_STEP);
            updateZoom();
        }
    };
    
    window.zoomOut = function() {
        if (currentScale > MIN_ZOOM) {
            currentScale = Math.max(MIN_ZOOM, currentScale - ZOOM_STEP);
            updateZoom();
        }
    };
    
    function updateZoom() {
        const img = document.getElementById('lightboxImg');
        const zoomLevel = document.getElementById('zoomLevel');
        
        img.style.transform = `scale(${currentScale})`;
        zoomLevel.textContent = `${Math.round(currentScale * 100)}%`;
        
        if (currentScale > 1) {
            img.classList.add('zoomed');
            img.style.cursor = 'zoom-out';
        } else {
            img.classList.remove('zoomed');
            img.style.cursor = 'zoom-in';
        }
    }
    
    // Toggle zoom on image click
    document.getElementById('lightboxContent')?.addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            if (currentScale > 1) {
                currentScale = 1;
            } else {
                currentScale = 1.5;
            }
            updateZoom();
        }
    });
    
    // ========== Download Functionality ==========
    window.downloadImage = function() {
        const img = document.getElementById('lightboxImg');
        const link = document.createElement('a');
        link.href = img.src;
        link.download = 'wedding-photo.jpg';
        link.click();
    };
    
    // ========== Slideshow Functionality ==========
    let isSlideshow = false;
    let slideshowInterval = null;
    const SLIDESHOW_TIME = 3000;
    
    window.toggleSlideshow = function() {
        const btn = document.getElementById('slideshowBtn');
        const progress = document.getElementById('slideshowProgress');
        const progressBar = document.getElementById('progressBar');
        
        isSlideshow = !isSlideshow;
        
        if (isSlideshow) {
            btn.querySelector('.play-icon').style.display = 'none';
            btn.querySelector('.pause-icon').style.display = 'block';
            progress.classList.add('active');
            progressBar.style.width = '0%';
            
            let progressValue = 0;
            slideshowInterval = setInterval(() => {
                progressValue += 100 / (SLIDESHOW_TIME / 100);
                progressBar.style.width = `${progressValue}%`;
                
                if (progressValue >= 100) {
                    nextImage();
                    progressValue = 0;
                    progressBar.style.width = '0%';
                }
            }, 100);
        } else {
            btn.querySelector('.play-icon').style.display = 'block';
            btn.querySelector('.pause-icon').style.display = 'none';
            progress.classList.remove('active');
            progressBar.style.width = '0%';
            
            if (slideshowInterval) {
                clearInterval(slideshowInterval);
                slideshowInterval = null;
            }
        }
    };
    
    // Close lightbox on escape key
    document.addEventListener('keydown', function(e) {
        const lightbox = document.getElementById('galleryLightbox');
        if (lightbox.classList.contains('active')) {
            if (e.key === 'Escape') closeGallery();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === '+' || e.key === '=') zoomIn();
            if (e.key === '-') zoomOut();
        }
    });
    
    // Close lightbox on background click
    document.getElementById('galleryLightbox')?.addEventListener('click', function(e) {
        if (e.target.classList.contains('lightbox-content') || e.target.classList.contains('lightbox')) {
            closeGallery();
        }
    });
    
});
