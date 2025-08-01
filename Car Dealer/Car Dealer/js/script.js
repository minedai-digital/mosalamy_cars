// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.hamburger') && !event.target.closest('.nav-links')) {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });

    // Sticky Header
    const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.classList.add('sticky');
            
            if (scrollTop > lastScrollTop) {
                // Scrolling down
                header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling up
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('sticky');
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Car Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const carCards = document.querySelectorAll('.car-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active class from all buttons
                filterBtns.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                carCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else {
                        if (card.getAttribute('data-category').includes(filterValue)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.testimonial-prev');
    const nextButton = document.querySelector('.testimonial-next');
    let currentSlide = 0;

    function showSlide(n) {
        // Hide all slides
        testimonialSlides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show the current slide and activate the corresponding dot
        testimonialSlides[n].classList.add('active');
        dots[n].classList.add('active');
    }

    function nextSlide() {
        currentSlide++;
        if (currentSlide >= testimonialSlides.length) {
            currentSlide = 0;
        }
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide--;
        if (currentSlide < 0) {
            currentSlide = testimonialSlides.length - 1;
        }
        showSlide(currentSlide);
    }

    // Event listeners for testimonial navigation
    if (prevButton && nextButton) {
        prevButton.addEventListener('click', prevSlide);
        nextButton.addEventListener('click', nextSlide);
    }

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });

    // Auto-advance testimonials every 5 seconds
    setInterval(nextSlide, 5000);

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    if (navLinks && navLinks.classList.contains('active')) {
                        navLinks.classList.remove('active');
                        hamburger.classList.remove('active');
                    }
                }
            }
        });
    });

    // Form Validation
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // Simple validation
            if (nameInput.value.trim() === '') {
                isValid = false;
                showError(nameInput, 'Name is required');
            } else {
                removeError(nameInput);
            }
            
            if (emailInput.value.trim() === '') {
                isValid = false;
                showError(emailInput, 'Email is required');
            } else if (!isValidEmail(emailInput.value)) {
                isValid = false;
                showError(emailInput, 'Please enter a valid email');
            } else {
                removeError(emailInput);
            }
            
            if (messageInput.value.trim() === '') {
                isValid = false;
                showError(messageInput, 'Message is required');
            } else {
                removeError(messageInput);
            }
            
            if (isValid) {
                // In a real application, you would send the form data to a server
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            }
        });
    }
    
    function showError(input, message) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (!formControl.querySelector('.error-message')) {
            formControl.appendChild(errorElement);
        }
        
        formControl.className = 'form-control error';
    }
    
    function removeError(input) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message');
        
        if (errorElement) {
            formControl.removeChild(errorElement);
        }
        
        formControl.className = 'form-control';
    }
    
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Inventory Page Filters
    const makeFilter = document.getElementById('make-filter');
    const typeFilter = document.getElementById('type-filter');
    const priceFilter = document.getElementById('price-filter');
    const filterButton = document.querySelector('.filter-button');
    
    if (filterButton) {
        filterButton.addEventListener('click', function() {
            const selectedMake = makeFilter.value;
            const selectedType = typeFilter.value;
            const selectedPrice = priceFilter.value;
            
            const inventoryCards = document.querySelectorAll('.inventory-grid .car-card');
            
            inventoryCards.forEach(card => {
                let makeMatch = selectedMake === 'all' || card.getAttribute('data-make') === selectedMake;
                let typeMatch = selectedType === 'all' || card.getAttribute('data-category').includes(selectedType);
                let priceMatch = true; // Default to true
                
                const priceText = card.querySelector('.price').textContent;
                const price = parseInt(priceText.replace(/[^0-9]/g, ''));
                
                if (selectedPrice !== 'all') {
                    const [min, max] = selectedPrice.split('-').map(val => val === '+' ? Infinity : parseInt(val));
                    priceMatch = price >= min * 1000 && (max === Infinity || price <= max * 1000);
                }
                
                if (makeMatch && typeMatch && priceMatch) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Car Data
    const carData = {
        '1': {
            title: "Rolls-Royce Cullinan Black Badge",
            price: "£495,000",
            year: "2023",
            mileage: "1,200 mi",
            fuel: "Petrol",
            description: "The Rolls-Royce Cullinan Black Badge is the most luxurious SUV in the world. With its powerful 6.75L V12 engine and exquisite craftsmanship, it represents the pinnacle of automotive luxury.",
            features: [
                "6.75L V12 Engine",
                "592 Horsepower",
                "All-Wheel Drive",
                "Starlight Headliner",
                "Bespoke Audio System",
                "Rear Theatre Configuration",
                "Night Vision with Wildlife & Pedestrian Detection",
                "Panoramic Sky Lounge LED Roof"
            ],
            images: [
                "images/cars/rolls-royce-cullinan-black-badge/image 1.webp",
                "images/cars/rolls-royce-cullinan-black-badge/image 2.webp",
                "images/cars/rolls-royce-cullinan-black-badge/image 3.webp",
                "images/cars/rolls-royce-cullinan-black-badge/image 4.webp"
            ]
        },
        '2': {
            title: "Ferrari SF90 Stradale",
            price: "£675,000",
            year: "2022",
            mileage: "950 mi",
            fuel: "Hybrid",
            description: "The Ferrari SF90 Stradale is Ferrari's first plug-in hybrid electric vehicle (PHEV) and the most powerful Ferrari road car to date, with a combined output of 986 horsepower.",
            features: [
                "4.0L V8 Twin-Turbo + 3 Electric Motors",
                "986 Combined Horsepower",
                "0-60 mph in 2.5 seconds",
                "eManettino Drive Modes",
                "Carbon Fiber Body",
                "Digital Dashboard",
                "Track Telemetry",
                "Assetto Fiorano Package Available"
            ],
            images: [
                "images/cars/ferrari-sf90-stradale/image 1.webp",
                "images/cars/ferrari-sf90-stradale/image 2.webp",
                "images/cars/ferrari-sf90-stradale/image 3.webp",
                "images/cars/ferrari-sf90-stradale/image 4.webp"
            ]
        },
        '3': {
            title: "Lamborghini Aventador LP780-4 Ultimae Roadster",
            price: "£825,000",
            year: "2022",
            mileage: "500 mi",
            fuel: "Petrol",
            description: "The Lamborghini Aventador LP780-4 Ultimae Roadster represents the pinnacle of Lamborghini's naturally aspirated V12 legacy. As the final edition of the iconic Aventador, it combines raw power with unmatched exclusivity.",
            features: [
                "6.5L Naturally Aspirated V12",
                "780 Horsepower",
                "All-Wheel Drive",
                "Carbon Fiber Monocoque",
                "Removable Hardtop",
                "Active Aerodynamics",
                "Magnetic Push-Rod Suspension",
                "Limited Edition Status"
            ],
            images: [
                "images/cars/lamborghini-aventador-lp780-4-ultimae-roadster/image 1.webp",
                "images/cars/lamborghini-aventador-lp780-4-ultimae-roadster/image 2.webp",
                "images/cars/lamborghini-aventador-lp780-4-ultimae-roadster/image 3.webp",
                "images/cars/lamborghini-aventador-lp780-4-ultimae-roadster/image 4.webp"
            ]
        },
        '4': {
            title: "Lamborghini Huracan Tecnica",
            price: "£245,000",
            year: "2023",
            mileage: "800 mi",
            fuel: "Petrol",
            description: "The Lamborghini Huracan Tecnica bridges the gap between the standard Huracan EVO and the track-focused STO. It offers the perfect balance of performance and everyday usability.",
            features: [
                "5.2L Naturally Aspirated V10",
                "631 Horsepower",
                "Rear-Wheel Drive",
                "Carbon Ceramic Brakes",
                "LDVI Driving Dynamics System",
                "Lightweight Design",
                "Rear-Wheel Steering",
                "Aerodynamic Enhancements"
            ],
            images: [
                "images/cars/lamborghini-huracan-tecnica/image 1.webp",
                "images/cars/lamborghini-huracan-tecnica/image 2.webp",
                "images/cars/lamborghini-huracan-tecnica/image 3.webp",
                "images/cars/lamborghini-huracan-tecnica/image 4.webp"
            ]
        },
        '5': {
            title: "Mercedes-Benz AMG G63",
            price: "£225,000",
            year: "2023",
            mileage: "1,500 mi",
            fuel: "Petrol",
            description: "The Mercedes-Benz AMG G63 combines legendary off-road capability with AMG performance. This hand-crafted luxury SUV offers unmatched presence and versatility.",
            features: [
                "4.0L Bi-Turbo V8",
                "577 Horsepower",
                "AMG SPEEDSHIFT TCT 9G",
                "Three Differential Locks",
                "AMG RIDE CONTROL Suspension",
                "Multicontour Seats with Massage",
                "Burmester Surround Sound",
                "G Mode Off-Road System"
            ],
            images: [
                "images/cars/mercedes-benz-amg-g63/image 1.webp",
                "images/cars/mercedes-benz-amg-g63/image 2.webp",
                "images/cars/mercedes-benz-amg-g63/image 3.webp",
                "images/cars/mercedes-benz-amg-g63/image 4.webp"
            ]
        },
        '6': {
            title: "Ferrari 488 GTB",
            price: "£395,000",
            year: "2022",
            mileage: "750 mi",
            fuel: "Petrol",
            description: "The Ferrari 488 GTB sets new benchmarks for turbo-charged performance. This mid-engine masterpiece delivers breathtaking acceleration and handling.",
            features: [
                "3.9L Twin-Turbo V8",
                "661 Horsepower",
                "7-Speed F1 Dual-Clutch",
                "Side Slip Control 2",
                "Carbon Fiber Components",
                "Magnetorheological Suspension",
                "Ferrari Power Warranty",
                "Telemetry System"
            ],
            images: [
                "images/cars/ferrari-488-gtb/image 1.webp",
                "images/cars/ferrari-488-gtb/image 2.webp",
                "images/cars/ferrari-488-gtb/image 3.webp",
                "images/cars/ferrari-488-gtb/image 4.webp"
            ]
        },
        '7': {
            title: "Porsche 911 992 Turbo S",
            price: "£195,000",
            year: "2022",
            mileage: "1,200 mi",
            fuel: "Petrol",
            description: "The Porsche 911 992 Turbo S represents the pinnacle of the 911 lineup. It combines everyday usability with supercar performance and legendary Porsche reliability.",
            features: [
                "3.8L Twin-Turbo Flat-Six",
                "640 Horsepower",
                "8-Speed PDK",
                "All-Wheel Drive",
                "PASM Sport Suspension",
                "Carbon Ceramic Brakes",
                "Sport Chrono Package",
                "18-Way Adaptive Sport Seats"
            ],
            images: [
                "images/cars/porsche-911-992-turbo-s/image 1.webp",
                "images/cars/porsche-911-992-turbo-s/image 2.webp",
                "images/cars/porsche-911-992-turbo-s/image 3.webp",
                "images/cars/porsche-911-992-turbo-s/image 4.webp"
            ]
        },
        '8': {
            title: "Land Rover Range Rover SV 4.4 P530 V8",
            price: "£215,000",
            year: "2023",
            mileage: "500 mi",
            fuel: "Petrol",
            description: "The Range Rover SV represents the ultimate expression of luxury and capability. This bespoke creation from Special Vehicle Operations offers unmatched refinement.",
            features: [
                "4.4L Twin-Turbo V8",
                "523 Horsepower",
                "8-Speed Automatic",
                "Electronic Air Suspension",
                "SV Signature Suite",
                "Semi-Aniline Leather",
                "Meridian Signature Sound",
                "Executive Class Comfort Plus Seats"
            ],
            images: [
                "images/cars/land-rover-range-rover-sv-p530-v8/image 1.webp",
                "images/cars/land-rover-range-rover-sv-p530-v8/image 2.webp",
                "images/cars/land-rover-range-rover-sv-p530-v8/image 3.webp",
                "images/cars/land-rover-range-rover-sv-p530-v8/image 4.webp"
            ]
        }
    };

    // Car Detail Page Functionality
    if (window.location.pathname.includes('car-detail.html')) {
        // Get the car ID from the URL
        const urlParams = new URLSearchParams(window.location.search);
        const carId = urlParams.get('id');
        
        if (carId && carData[carId]) {
            const car = carData[carId];
            
            // Update car details
            document.getElementById('car-title').textContent = car.title;
            document.getElementById('car-price').textContent = car.price;
            document.getElementById('car-year').textContent = car.year;
            document.getElementById('car-mileage').textContent = car.mileage;
            document.getElementById('car-fuel').textContent = car.fuel;
            document.getElementById('car-description').textContent = car.description;
            
            // Update features list
            const featuresList = document.getElementById('car-features');
            featuresList.innerHTML = car.features.map(feature => `<li><i class="fas fa-check"></i>${feature}</li>`).join('');
            
            // Initialize Swiper for thumbnails first
            const thumbsGallery = new Swiper('.gallery-thumbs', {
                spaceBetween: 10,
                slidesPerView: 4,
                freeMode: true,
                watchSlidesProgress: true,
            });
            
            // Initialize Swiper for main gallery
            const mainGallery = new Swiper('.gallery-main', {
                spaceBetween: 10,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                thumbs: {
                    swiper: thumbsGallery
                }
            });
            
            // Load images into galleries
            const mainWrapper = document.querySelector('.gallery-main .swiper-wrapper');
            const thumbsWrapper = document.querySelector('.gallery-thumbs .swiper-wrapper');
            const fullscreenWrapper = document.querySelector('.fullscreen-swiper .swiper-wrapper');
            
            car.images.forEach(image => {
                // Main gallery
                mainWrapper.innerHTML += `
                    <div class="swiper-slide">
                        <img src="${image}" alt="${car.title}">
                    </div>
                `;
                
                // Thumbs gallery
                thumbsWrapper.innerHTML += `
                    <div class="swiper-slide">
                        <img src="${image}" alt="${car.title}">
                    </div>
                `;
                
                // Fullscreen gallery
                fullscreenWrapper.innerHTML += `
                    <div class="swiper-slide">
                        <img src="${image}" alt="${car.title}">
                    </div>
                `;
            });
            
            // Update total slides counter
            document.getElementById('total-slides').textContent = car.images.length;
            
            // Gallery Controls
            document.querySelector('.gallery-prev').addEventListener('click', () => {
                mainGallery.slidePrev();
            });
            
            document.querySelector('.gallery-next').addEventListener('click', () => {
                mainGallery.slideNext();
            });
            
            // Fullscreen functionality
            const fullscreenGallery = document.querySelector('.fullscreen-gallery');
            
            document.querySelector('.gallery-fullscreen').addEventListener('click', () => {
                fullscreenGallery.style.display = 'block';
                document.body.style.overflow = 'hidden';
                
                // Initialize fullscreen Swiper
                const fullscreenSwiper = new Swiper('.fullscreen-swiper', {
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    }
                });
            });
            
            document.querySelector('.close-fullscreen').addEventListener('click', () => {
                fullscreenGallery.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        } else {
            // Handle invalid car ID
            document.getElementById('car-title').textContent = 'Car Not Found';
            document.getElementById('car-description').textContent = 'The requested car could not be found.';
        }
    }

    // Animation on scroll
    const animateElements = document.querySelectorAll('.car-card, .service-card, .about-content, .testimonial-slider');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    window.addEventListener('scroll', checkIfInView);
    checkIfInView(); // Check on page load
});

// Add CSS for animations
document.head.insertAdjacentHTML('beforeend', `
<style>
.car-card, .service-card, .about-content, .testimonial-slider {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
}

.car-card.animate, .service-card.animate, .about-content.animate, .testimonial-slider.animate {
    opacity: 1;
    transform: translateY(0);
}

.error-message {
    color: #d32f2f;
    font-size: 0.85rem;
    margin-top: 5px;
}

.error-input {
    border-color: #d32f2f !important;
}
</style>
`); 