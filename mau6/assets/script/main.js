/**
 * Wedding Invitation - Creative Editorial
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ========== Scroll Animation ==========
    const scrollElements = document.querySelectorAll('[data-scroll]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
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
    
    
    // ========== Gift Modal ==========
    window.openGiftModal = function() {
        document.getElementById('giftModal')?.classList.add('active');
    };
    
    window.closeGiftModal = function() {
        document.getElementById('giftModal')?.classList.remove('active');
    };
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeGiftModal();
    });
    
    document.getElementById('giftModal')?.addEventListener('click', function(e) {
        if (e.target === this) closeGiftModal();
    });
    
    
    // ========== Form Submit ==========
    window.handleSubmit = function(e) {
        e.preventDefault();
        alert('Cảm ơn bạn đã xác nhận tham dự! 💕');
        e.target.reset();
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
    
});
