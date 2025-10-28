let slideIndex = 0;
showSlides();

function moveSlide(n) {
  showSlides(slideIndex += n);
}

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("testimonial-slide");
    if (slides.length === 0) return;
    if (slideIndex >= slides.length) {slideIndex = 0}
    if (slideIndex < 0) {slideIndex = slides.length - 1}
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
}

// Portfolio filter
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Video lightbox
const videoContainer = document.querySelector('.video-container');
const lightbox = document.getElementById('lightbox');
const lightboxIframe = document.getElementById('lightbox-iframe');
const closeLightbox = document.querySelector('.close-lightbox');

if (videoContainer) {
    videoContainer.addEventListener('click', () => {
        const iframeSrc = videoContainer.querySelector('iframe').src;
        lightboxIframe.src = iframeSrc;
        lightbox.style.display = 'block';
    });
}

if (closeLightbox) {
    closeLightbox.addEventListener('click', () => {
        lightbox.style.display = 'none';
        lightboxIframe.src = '';
    });
}

window.addEventListener('click', (event) => {
    if (event.target == lightbox) {
        lightbox.style.display = 'none';
        lightboxIframe.src = '';
    }
});

// Lazy loading images
const lazyImages = document.querySelectorAll('.lazy');

const lazyLoad = (target) => {
    const io = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                const src = img.getAttribute('data-src');

                img.setAttribute('src', src);
                img.classList.remove('lazy');

                observer.disconnect();
            }
        });
    });

    io.observe(target);
};

lazyImages.forEach(lazyLoad);

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        const filter = button.dataset.filter;

        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.classList.contains(filter)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});
