// Testimonials Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.testimonials-carousel');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 1; // Start with second card (index 1) as center for natural carousel view
    const totalCards = cards.length;
    
    // Update carousel display - show 3 items with center highlighted
    function updateCarousel() {
        const leftIndex = (currentIndex - 1 + totalCards) % totalCards;
        const centerIndex = currentIndex;
        const rightIndex = (currentIndex + 1) % totalCards;
        
        console.log('Current:', currentIndex, 'Left:', leftIndex, 'Center:', centerIndex, 'Right:', rightIndex);
        
        cards.forEach((card, index) => {
            card.classList.remove('active', 'prev', 'next');
            card.style.display = 'none';
            
            if (index === leftIndex) {
                // Left card
                card.classList.add('prev');
                card.style.display = 'flex';
                console.log(`Card ${index} → prev`);
            } else if (index === centerIndex) {
                // Center card - ALWAYS THIS BECOMES BIG
                card.classList.add('active');
                card.style.display = 'flex';
                console.log(`Card ${index} → ACTIVE (center)`);
            } else if (index === rightIndex) {
                // Right card
                card.classList.add('next');
                card.style.display = 'flex';
                console.log(`Card ${index} → next`);
            }
        });
    }
    
    // Next button - move to next item
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    });
    
    // Previous button - move to previous item
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextBtn.click();
        if (e.key === 'ArrowLeft') prevBtn.click();
    });
    
    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swiped left
            nextBtn.click();
        }
        if (touchEndX - touchStartX > swipeThreshold) {
            // Swiped right
            prevBtn.click();
        }
    }
    
    // Initialize carousel
    updateCarousel();
});
