 document.addEventListener('DOMContentLoaded', function() {
            // Typing animation
            const typingText = document.getElementById('typing-text');
            const words = ["a Full-Stack Developer", "a UI/UX Enthusiast", "a Problem Solver", "a Tech Geek"];
            let wordIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            function type() {
                const currentWord = words[wordIndex];
                if (isDeleting) {
                    typingText.textContent = currentWord.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typingText.textContent = currentWord.substring(0, charIndex + 1);
                    charIndex++;
                }

                if (!isDeleting && charIndex === currentWord.length) {
                    setTimeout(() => isDeleting = true, 2000);
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                }
                
                const typeSpeed = isDeleting ? 100 : 200;
                setTimeout(type, typeSpeed);
            }

            type();

            // Smooth scrolling and active nav link
            const navLinks = document.querySelectorAll('.nav-link, #mobile-menu a');
            const sections = document.querySelectorAll('section');

            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (pageYOffset >= sectionTop - sectionHeight / 3) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === current) {
                        link.classList.add('active');
                    }
                });
            });

            navLinks.forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    document.querySelector(this.getAttribute('href')).scrollIntoView({
                        behavior: 'smooth'
                    });
                    // For mobile menu, close after click
                    if(document.getElementById('mobile-menu').classList.contains('open')) {
                        document.getElementById('mobile-menu').classList.remove('open');
                        document.getElementById('mobile-menu-button').querySelector('i').classList.replace('fa-times', 'fa-bars');
                    }
                });
            });

            // Project filter
            const filterBtns = document.querySelectorAll('.filter-btn');
            const projectItems = document.querySelectorAll('.project-card-item');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    filterBtns.forEach(b => {
                        b.classList.remove('bg-sky-500');
                        b.classList.add('bg-gray-700');
                    });
                    btn.classList.add('bg-sky-500');
                    btn.classList.remove('bg-gray-700');
                    
                    const filter = btn.dataset.filter;

                    projectItems.forEach(item => {
                        if (filter === 'all') {
                            item.style.display = 'block';
                        } else {
                            if (item.dataset.category.includes(filter)) {
                                item.style.display = 'block';
                            } else {
                                item.style.display = 'none';
                            }
                        }
                    });
                });
            });

            // Mobile menu toggle
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const menuIcon = mobileMenuButton.querySelector('i');

            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('open');
                if (mobileMenu.classList.contains('open')) {
                    menuIcon.classList.replace('fa-bars', 'fa-times');
                } else {
                    menuIcon.classList.replace('fa-times', 'fa-bars');
                }
            });

            // Change header background on scroll
            const header = document.getElementById('header');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 50) {
                    header.classList.add('bg-gray-900/80');
                } else {
                    header.classList.remove('bg-gray-900/80');
                }
            });
        });