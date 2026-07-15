/* ============================================
   PORTFOLIO — SYIFA NURUL ALFIAH
   Interactive JavaScript
   ============================================ */

// ── Particle Background ──
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let particles = [];
  const PARTICLE_COUNT = 60;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.4 + 0.1,
      color: Math.random() > 0.5
        ? `rgba(168, 85, 247, ${Math.random() * 0.3 + 0.1})`
        : `rgba(192, 132, 252, ${Math.random() * 0.2 + 0.05})`,
    };
  }

  function initializeParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle());
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, i) => {
      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const dx = p.x - particles[j].x;
        const dy = p.y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 150) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(168, 85, 247, ${0.05 * (1 - dist / 150)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(drawParticles);
  }

  resize();
  initializeParticles();
  drawParticles();

  window.addEventListener('resize', () => {
    resize();
  });
}

// ── Navbar Scroll ──
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

// ── Mobile Nav Toggle ──
function toggleMobileNav() {
  const navLinks = document.getElementById('nav-links');
  if (navLinks) {
    navLinks.classList.toggle('active');
  }
}

// Close mobile nav on link click
function initMobileNavClose() {
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const nav = document.getElementById('nav-links');
      if (nav) nav.classList.remove('active');
    });
  });
}

// ── Scroll Reveal ──
function initRevealAnimations() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

// ── Smooth Scroll ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

// ── Interactive UI/UX Carousel Gallery ──
function updateMainImg(mainImgId, src, clickedSlide) {
  const mainImg = document.getElementById(mainImgId);
  if (!mainImg) return;
  
  mainImg.src = src;
  
  const track = clickedSlide.parentElement;
  const slides = track.querySelectorAll('.carousel-slide');
  slides.forEach(slide => slide.classList.remove('active'));
  clickedSlide.classList.add('active');
  
  const trackWidth = track.clientWidth;
  const slideLeft = clickedSlide.offsetLeft;
  const slideWidth = clickedSlide.clientWidth;
  track.scrollTo({
    left: slideLeft - (trackWidth / 2) + (slideWidth / 2),
    behavior: 'smooth'
  });
}

function slideCarousel(trackId, direction) {
  const track = document.getElementById(trackId);
  if (!track) return;
  
  const slides = Array.from(track.querySelectorAll('.carousel-slide'));
  if (slides.length === 0) return;
  
  const activeIndex = slides.findIndex(slide => slide.classList.contains('active'));
  if (activeIndex === -1) return;
  
  let newIndex = activeIndex + direction;
  if (newIndex >= slides.length) newIndex = 0;
  if (newIndex < 0) newIndex = slides.length - 1;
  
  const targetSlide = slides[newIndex];
  if (targetSlide) {
    targetSlide.click();
  }
}

// ── Lightbox Zoom Modal ──
let activeLightboxGallery = null;

function initLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const modalImg = document.getElementById('lightbox-img');
  const captionText = document.getElementById('lightbox-caption');
  
  if (!modal || !modalImg) return;
  
  const targetClasses = ['.phone-mockup img', '.browser-mockup img', '.project-image img'];
  targetClasses.forEach(sel => {
    document.querySelectorAll(sel).forEach(img => {
      if (img.closest('.carousel-slide')) return;
      
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        activeLightboxGallery = img.closest('.project-image') || img.closest('.uiux-detail-visual');
        
        modal.classList.add('active');
        modalImg.src = img.src;
        captionText.innerHTML = img.alt || 'Screenshot View';
      });
    });
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      e.preventDefault();
      navigateLightbox(e.key === 'ArrowRight' ? 1 : -1);
    }
  });
}

function navigateLightbox(direction) {
  if (!activeLightboxGallery) return;
  
  const slides = Array.from(activeLightboxGallery.querySelectorAll('.carousel-slide'));
  if (slides.length === 0) return;
  
  const activeIndex = slides.findIndex(slide => slide.classList.contains('active'));
  if (activeIndex === -1) return;
  
  let newIndex = activeIndex + direction;
  if (newIndex >= slides.length) newIndex = 0;
  if (newIndex < 0) newIndex = slides.length - 1;
  
  const targetSlide = slides[newIndex];
  if (targetSlide) {
    targetSlide.click();
    
    const modalImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('lightbox-caption');
    const mainImg = activeLightboxGallery.querySelector('.phone-mockup img, .browser-mockup img, img[id$="-main-img"], img');
    
    if (modalImg && mainImg) {
      modalImg.src = mainImg.src;
      captionText.innerHTML = mainImg.alt || 'Screenshot View';
    }
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.remove('active');
    activeLightboxGallery = null;
  }
}

// ── Initialize ──
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initNavbar();
  initMobileNavClose();
  initRevealAnimations();
  initSmoothScroll();
  initLightbox();
});
