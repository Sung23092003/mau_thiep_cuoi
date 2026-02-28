document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('.gallery-img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxContent = document.getElementById('lightboxContent');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxIndex = document.getElementById('lightboxIndex');
    const lightboxTotal = document.getElementById('lightboxTotal');
    const lightboxCaption = document.getElementById('lightboxCaption');
    
    const zoomInBtn = document.getElementById('zoomIn');
    const zoomOutBtn = document.getElementById('zoomOut');
    const zoomLevel = document.getElementById('zoomLevel');
    const downloadBtn = document.getElementById('downloadBtn');
    const slideshowBtn = document.getElementById('slideshowBtn');
    const progressBar = document.getElementById('progressBar');
    const slideshowProgress = document.getElementById('slideshowProgress');

    let currentIndex = 0;
    const images = [];
    
    let scale = 1;
    let isPanning = false;
    let startX = 0;
    let startY = 0;
    let translateX = 0;
    let translateY = 0;
    
    let slideshowInterval = null;
    let progressInterval = null;
    let progress = 0;
    const SLIDE_DURATION = 5000; 
    const PROGRESS_STEP = 10; 

    galleryImages.forEach((img, index) => {
        if (img.src) {
            images.push({
                src: img.src,
                alt: img.alt || `Ảnh cưới ${index + 1}`
            });
            img.addEventListener('click', () => openLightbox(index));
        }
    });

    if (lightboxTotal) lightboxTotal.textContent = images.length;

    function openLightbox(index) {
        currentIndex = index;
        resetZoom();
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        stopSlideshow();
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(resetZoom, 400);
    }

    function updateLightboxImage() {
        if (!images[currentIndex]) return;
        
        lightboxImg.style.opacity = '0';
        
        setTimeout(() => {
            lightboxImg.src = images[currentIndex].src;
            lightboxImg.alt = images[currentIndex].alt;
            if (lightboxIndex) lightboxIndex.textContent = currentIndex + 1;
            if (lightboxCaption) lightboxCaption.textContent = images[currentIndex].alt;
            
            lightboxImg.onload = () => {
                lightboxImg.style.opacity = '1';
                resetZoom();
            };
        }, 200);
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        updateLightboxImage();
        if (slideshowInterval) resetSlideshowTimer();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightboxImage();
        if (slideshowInterval) resetSlideshowTimer();
    }

    function updateZoom() {
        lightboxImg.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
        zoomLevel.textContent = `${Math.round(scale * 100)}%`;
        
        if (scale > 1) {
            lightboxImg.classList.add('zoomed');
            lightboxContent.style.cursor = 'grab';
        } else {
            lightboxImg.classList.remove('zoomed');
            lightboxContent.style.cursor = 'zoom-in';
        }
    }

    function resetZoom() {
        scale = 1;
        translateX = 0;
        translateY = 0;
        updateZoom();
    }

    zoomInBtn.addEventListener('click', () => {
        scale = Math.min(scale + 0.25, 4);
        updateZoom();
    });

    zoomOutBtn.addEventListener('click', () => {
        scale = Math.max(scale - 0.25, 0.5);
        if (scale <= 1) {
            translateX = 0;
            translateY = 0;
        }
        updateZoom();
    });

    lightboxContent.addEventListener('mousedown', (e) => {
        if (scale <= 1) return;
        isPanning = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        lightboxImg.style.transition = 'none';
        lightboxImg.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isPanning) return;
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateZoom();
    });

    window.addEventListener('mouseup', () => {
        if (!isPanning) return;
        isPanning = false;
        lightboxImg.style.transition = 'transform 0.3s ease';
        lightboxImg.style.cursor = 'grab';
    });

    lightboxContent.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        scale = Math.min(Math.max(scale + delta, 0.5), 4);
        if (scale <= 1) {
            translateX = 0;
            translateY = 0;
        }
        updateZoom();
    }, { passive: false });

    lightboxContent.addEventListener('dblclick', () => {
        if (scale > 1) resetZoom();
        else {
            scale = 2;
            updateZoom();
        }
    });

    // --- Download Logic ---
    downloadBtn.addEventListener('click', () => {
        const link = document.createElement('a');
        link.href = images[currentIndex].src;
        link.download = `Wedding_Photo_${currentIndex + 1}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // --- Slideshow Logic ---
    function startSlideshow() {
        slideshowBtn.classList.add('active');
        slideshowBtn.querySelector('.play-icon').style.display = 'none';
        slideshowBtn.querySelector('.pause-icon').style.display = 'block';
        slideshowProgress.classList.add('active');
        
        resetSlideshowTimer();
    }

    function stopSlideshow() {
        clearInterval(slideshowInterval);
        clearInterval(progressInterval);
        slideshowInterval = null;
        progressInterval = null;
        
        slideshowBtn.classList.remove('active');
        slideshowBtn.querySelector('.play-icon').style.display = 'block';
        slideshowBtn.querySelector('.pause-icon').style.display = 'none';
        slideshowProgress.classList.remove('active');
        progressBar.style.width = '0%';
    }

    function resetSlideshowTimer() {
        clearInterval(slideshowInterval);
        clearInterval(progressInterval);
        
        progress = 0;
        progressBar.style.width = '0%';
        
        progressInterval = setInterval(() => {
            progress += (PROGRESS_STEP / SLIDE_DURATION) * 100;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
            if (progress >= 100) {
                progress = 0;
            }
        }, PROGRESS_STEP);

        slideshowInterval = setInterval(nextImage, SLIDE_DURATION);
    }

    slideshowBtn.addEventListener('click', () => {
        if (slideshowInterval) {
            stopSlideshow();
        } else {
            startSlideshow();
        }
    });

    // --- Navigation ---
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        nextImage();
    });
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        prevImage();
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightboxContent) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === '+') zoomInBtn.click();
        if (e.key === '-') zoomOutBtn.click();
    });
});
