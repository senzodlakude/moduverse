// ModuVerse ZA - Interactive Functionality
document.addEventListener('DOMContentLoaded', function() {
    console.log("ModuVerse ZA - Learn. Build. Empower.");
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all cards and products for animation
    document.querySelectorAll('.card, .product').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Simple cart functionality
    let cart = [];
    
    document.querySelectorAll('.product button').forEach(button => {
        button.addEventListener('click', function() {
            const product = this.closest('.product');
            const productName = product.querySelector('h3').textContent;
            const productDesc = product.querySelector('p').textContent;
            
            cart.push({
                name: productName,
                description: productDesc,
                price: 49.99 // Default price - you can make this dynamic
            });
            
            // Show confirmation
            showNotification(`${productName} added to cart!`);
            updateCartCounter();
        });
    });

    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff6f00;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    function updateCartCounter() {
        // You can implement a cart counter in the header
        let cartCounter = document.getElementById('cart-counter');
        if (!cartCounter) {
            cartCounter = document.createElement('span');
            cartCounter.id = 'cart-counter';
            cartCounter.style.cssText = `
                background: #ff6f00;
                color: white;
                border-radius: 50%;
                padding: 2px 8px;
                font-size: 0.8rem;
                margin-left: 5px;
            `;
            const shopLink = document.querySelector('nav a[href="#shop"]');
            shopLink.appendChild(cartCounter);
        }
        cartCounter.textContent = cart.length;
    }

    // Add search functionality placeholder
    const searchHTML = `
        <div style="margin: 1rem auto; max-width: 500px; padding: 0 2rem;">
            <input type="text" id="searchInput" placeholder="Search subjects and study packs..." 
                   style="width: 100%; padding: 0.8rem; border-radius: 8px; border: 1px solid #122b4f; background: #0a1f3d; color: white;">
        </div>
    `;
    
    document.querySelector('.hero').insertAdjacentHTML('afterend', searchHTML);

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterContent(searchTerm);
        });
    }

    function filterContent(term) {
        const cards = document.querySelectorAll('.card, .product');
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(term)) {
                card.style.display = 'block';
                card.classList.add('visible');
            } else {
                card.style.display = 'none';
            }
        });
    }
});

// Future enhancements:
// - Payment integration (PayFast, PayPal)
// - User accounts and progress tracking
// - Video preview functionality
// - Download management system