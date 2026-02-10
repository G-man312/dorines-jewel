gsap.registerPlugin(ScrollTrigger);

// Particle Background
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';

let width, height;
let particles = [];

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = Math.random() * 0.5 - 0.25;
        this.vy = Math.random() * 0.5 - 0.25;
        this.size = Math.random() * 2;
        this.alpha = Math.random() * 0.5 + 0.1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
    }

    draw() {
        ctx.fillStyle = `rgba(212, 175, 55, ${this.alpha})`; // Gold particles
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Custom Cursor
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0, ease: 'power2.out' });
    gsap.to(follower, { x: e.clientX, y: e.clientY, duration: 0.2, ease: 'power2.out' });
});

// Hover effects for cursor
const links = document.querySelectorAll('a, .product-card');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(cursor, { scale: 1.5, borderColor: 'transparent', backgroundColor: 'var(--color-gold)', duration: 0.3 });
        gsap.to(follower, { scale: 1.5, duration: 0.3 });
    });
    link.addEventListener('mouseleave', () => {
        gsap.to(cursor, { scale: 1, borderColor: 'var(--color-gold)', backgroundColor: 'transparent', duration: 0.3 });
        gsap.to(follower, { scale: 1, duration: 0.3 });
    });
});

// Hero Animations
const tl = gsap.timeline();

tl.from('.logo', {
    y: -50,
    opacity: 0,
    duration: 1,
    ease: 'power3.out'
})
    .from('.nav-links li', {
        y: -50,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
    }, '-=0.5')
    .from('.hero-title span', {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power4.out'
    }, '-=0.5')
    .from('.hero-subtitle', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    }, '-=1')
    .from('.cta-button', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.8');

// Scroll Animations for Product Cards
const cards = document.querySelectorAll('.product-card');

cards.forEach((card, index) => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        delay: index * 0.1
    });
});

// Parallax for Hero Background
gsap.to('.hero-bg', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
    },
    yPercent: 30,
    scale: 1.2
});

// Parallax for Section Title
gsap.utils.toArray('.section-title').forEach(title => {
    gsap.from(title, {
        scrollTrigger: {
            trigger: title,
            start: 'top 80%',
        },
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'power4.out'
    });
});

// 3D Tilt Effect for Product Cards
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10deg rotation
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(card, {
            rotationX: rotateX,
            rotationY: rotateY,
            scale: 1.05,
            duration: 0.5,
            ease: 'power2.out',
            transformPerspective: 1000,
            transformOrigin: "center"
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            duration: 0.5,
            ease: 'power2.out'
        });
    });
});
