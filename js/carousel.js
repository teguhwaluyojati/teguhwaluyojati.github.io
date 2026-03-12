// Testimonials Carousel - Infinite Looping with Cloned Cards
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.testimonials-carousel');
    if (!carousel) return;
    
    const cards = Array.from(carousel.querySelectorAll('.testimonial-card'));
    if (cards.length === 0) return;
    
    // Clone first and last cards for infinite loop
    const firstCard = cards[0].cloneNode(true);
    const lastCard = cards[cards.length - 1].cloneNode(true);
    
    // Insert clones
    carousel.appendChild(firstCard);
    carousel.insertBefore(lastCard, cards[0]);
    
    // Get actual card width + gap from first real card
    const allCards = carousel.querySelectorAll('.testimonial-card');
    const firstRealIndex = 1; // Skip the cloned last card at start
    const cardWidth = allCards[firstRealIndex].offsetWidth;
    
    // Calculate gap from computed style
    const gap = parseInt(window.getComputedStyle(carousel).gap) || 24;
    const step = cardWidth + gap;
    
    // Start position at first REAL card (skip the cloned last card at beginning)
    carousel.scrollLeft = step;
    
    let touchStartX = 0;
    let touchEndX = 0;
    const swipeThreshold = 50;
    let isLooping = false;
    
    // Infinite loop handler
    carousel.addEventListener('scroll', () => {
        if (isLooping) return;
        
        const scrollLeft = carousel.scrollLeft;
        const maxScroll = carousel.scrollWidth - carousel.clientWidth;
        
        // Near end? Jump to first real card
        if (scrollLeft >= maxScroll - step) {
            isLooping = true;
            carousel.scrollLeft = step;
            setTimeout(() => { isLooping = false; }, 50);
        }
        
        // Near start? Jump to last real card  
        if (scrollLeft < step / 2) {
            isLooping = true;
            carousel.scrollLeft = maxScroll - step;
            setTimeout(() => { isLooping = false; }, 50);
        }
    });
    
    // Touch swipe handler
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swiped left - scroll right (forward)
                carousel.scrollBy({ left: step, behavior: 'smooth' });
            } else {
                // Swiped right - scroll left (backward)
                carousel.scrollBy({ left: -step, behavior: 'smooth' });
            }
        }
    }
    
    // Mouse drag support (optional, for desktop)
    let isDown = false;
    let startX;
    let scrollLeft;
    
    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });
    
    carousel.addEventListener('mouseleave', () => {
        isDown = false;
    });
    
    carousel.addEventListener('mouseup', () => {
        isDown = false;
    });
    
    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1;
        carousel.scrollLeft = scrollLeft - walk;
    });
});
