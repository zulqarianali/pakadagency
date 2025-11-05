
function initializeHeader() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    // Function to set the theme based on preference
    function setTheme(theme) {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            htmlElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    }

    // 1. Initial Load: Check local storage or default to dark mode
    let initialTheme = localStorage.theme;

    if (!initialTheme) {
        initialTheme = 'dark'; // Default to dark mode if no preference set
    }

    setTheme(initialTheme);

    // 2. Theme Toggle Listener
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
            // Re-initialize icons after theme change
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    }

    // 3. Mobile Menu Toggle Listeners
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.remove('hidden'); // Show the menu
                mobileMenu.classList.add('flex'); // Ensure it's a flex container
            }
        });
    }

    if (closeMenu) {
        closeMenu.addEventListener('click', () => {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Hide menu on link click (for smooth scrolling)
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }
}

// Define the WhatsApp number
const WHATSAPP_NUMBER = "923247107543";

/**
 * Sends a pre-filled message to WhatsApp with the video title.
 * @param {string} videoTitle The title of the video the user is interested in.
 */
function sendWhatsAppMessage(videoTitle) {
    const message = encodeURIComponent(`Hello, I am interested in discussing your video portfolio item: "${videoTitle}". Can you provide more details?`);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
    window.open(whatsappUrl, '_blank');
}

// 4. Scroll-triggered animations (Intersection Observer)
const scrollAnimatedElements = document.querySelectorAll('.scroll-animated');

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Check for animation delays and add them dynamically
            if (entry.target.classList.contains('animate-delay-200')) {
                entry.target.style.transitionDelay = '0.2s';
            } else if (entry.target.classList.contains('animate-delay-400')) {
                entry.target.style.transitionDelay = '0.4s';
            } else if (entry.target.classList.contains('animate-delay-600')) {
                entry.target.style.transitionDelay = '0.6s';
            } else if (entry.target.classList.contains('animate-delay-800')) {
                entry.target.style.transitionDelay = '0.8s';
            }
            observer.unobserve(entry.target); // Stop observing once visible
        }
    });
}, {
    threshold: 0.1, // Trigger when 10% of the element is visible
    rootMargin: '0px 0px -50px 0px' // Trigger slightly earlier
});

scrollAnimatedElements.forEach(element => {
    observer.observe(element);
});


// Initialize Lucide Icons after the DOM is loaded
document.addEventListener('DOMContentLoaded', (event) => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});
