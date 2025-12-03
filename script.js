document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. MOBILE MENU TOGGLE
       ========================================= */
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.desktop-nav');
    const icon = mobileToggle.querySelector('i');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // Switch icon between 'bars' and 'X'
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    /* =========================================
       2. STICKY HEADER EFFECT
       ========================================= */
    const header = document.querySelector('.main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.1)";
            header.style.height = "70px"; // Slightly shrink header
        } else {
            header.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
            header.style.height = "80px"; // Default height
        }
    });

    /* =========================================
       3. SMOOTH SCROLL FOR ANCHOR LINKS
       ========================================= */
    // Select all links with hashes (e.g., #paints)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Ignore empty # or dropdown toggles
            if (targetId === '#' || targetId === '') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                // Calculate position minus header height
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close mobile menu if it's open (UX improvement)
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    });

    /* =========================================
       4. DROPDOWN FIX FOR MOBILE
       ========================================= */
    // On mobile, clicking "Applications" should toggle the dropdown
    const dropdownToggles = document.querySelectorAll('.has-dropdown > a');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault(); // Prevent going to page immediately
                const dropdown = toggle.nextElementSibling;

                // Toggle display
                if (dropdown.style.display === 'block') {
                    dropdown.style.display = 'none';
                } else {
                    dropdown.style.display = 'block';
                }
            }
        });
    });

});