const body = document.body;
const logo = document.querySelector(".logo img");
const toggle = document.querySelector(".mode-toggle");

toggle.addEventListener("click", () => {
    body.classList.toggle("dark");

    toggle.src = body.classList.contains("dark")
        ? "resources/light-mode.png"
        : "resources/dark-mode.png";

    logo.classList.add("pop");
    setTimeout(() => logo.classList.remove("pop"), 400);
});

logo.addEventListener("mousemove", (e) => {
    const rect = logo.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const centerX = rect.width / 2;

    const angle = ((centerX - x) / centerX) * 15;

    logo.style.transform = `rotate(${angle}deg) scale(1.1)`;
});

logo.addEventListener("mouseleave", () => {
    logo.style.transform = "rotate(0deg) scale(1)";
});

// Splash Screen
window.addEventListener('load', () => {
    const splash = document.querySelector('.splash-screen');
    
    setTimeout(() => {
        splash.classList.add('glass-transition');
        splash.classList.add('fade-out');
        
        setTimeout(() => {
            splash.style.display = 'none';
        }, 1000);
    }, 2500);
});

// Smooth scrolling to sections
const navLinks = document.querySelectorAll('.nav a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only handle hash links (section navigation)
        if (href.startsWith('#')) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            link.classList.add('active');
            
            // Scroll to section
            const targetId = href.substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// On page reload, always scroll to top (home section)
window.addEventListener('beforeunload', () => {
    window.scrollTo(0, 0);
});

// Force scroll to top on page load
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// Update active nav link based on scroll position
window.addEventListener('scroll', () => {
    let current = 'home';
    
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});