// Testimonials Carousel - Simple Prev/Next Navigation
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.testimonials-carousel');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!carousel || !prevBtn || !nextBtn) return;
    
    const cards = Array.from(carousel.querySelectorAll('.testimonial-card'));
    if (cards.length === 0) return;
    
    let currentIndex = 0;
    const totalCards = cards.length;
    
    // Show/hide cards based on current index
    function updateCarousel() {
        const cardWidth = cards[0].offsetWidth;
        const gap = parseInt(window.getComputedStyle(carousel).gap) || 24;
        const scrollPos = currentIndex * (cardWidth + gap);
        
        carousel.scrollLeft = scrollPos;
    }
    
    // Next button
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    });
    
    // Previous button
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'ArrowLeft') prevBtn.click();
    });
    
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left = next
                nextBtn.click();
            } else {
                // Swiped right = prev
                prevBtn.click();
            }
        }
    }, false);
    
    // Initialize
    updateCarousel();
});
