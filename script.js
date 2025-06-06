document.addEventListener("DOMContentLoaded", () => {
  // Typing Animation
  const typedTextEl = document.getElementById("typed-text");
  if (typedTextEl) {
    const text = "Happy Birthday, Kyriako! ❤️";
    let index = 0;
    typedTextEl.textContent = '';

    function typeWriter() {
      if (index < text.length) {
        typedTextEl.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100);
      }
    }
    typeWriter();
  }

  // Confetti Button
  const confettiBtn = document.getElementById("confetti-btn");
  if (confettiBtn && typeof JSConfetti !== 'undefined') {
    const jsConfetti = new JSConfetti();

    confettiBtn.addEventListener("click", () => {
      jsConfetti.addConfetti({
        emojis: ['🎂', '❤️', '🎉', '🥳'],
      });
    });
  }

  // Flip Memory Cards with keyboard support
  const memoryCards = document.querySelectorAll('.memory-card');
  memoryCards.forEach(card => {
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-pressed', 'false');

    card.addEventListener('click', () => {
      card.classList.toggle("flipped");
      toggleAriaPressed(card);
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle("flipped");
        toggleAriaPressed(card);
      }
    });
  });

  function toggleAriaPressed(card) {
    const pressed = card.getAttribute('aria-pressed') === 'true';
    card.setAttribute('aria-pressed', String(!pressed));
  }

  // Easter Egg
  const secret = document.getElementById("secret");
  if (secret) {
    secret.addEventListener("click", () => {
      alert("You found my secret message: I love you more than code! 💻❤️");
      // Optional: window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
    });
  }

  // Gallery Functionality
  const gallery = document.querySelector('.gallery');
  const images = document.querySelectorAll('.gallery img');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const dotsContainer = document.querySelector('.dots-container');

  let currentIndex = 0;

  if (images.length && dotsContainer && prevBtn && nextBtn) {
    // Create dots
    images.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => updateGallery(index));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateGallery(index) {
      if (index < 0 || index >= images.length) return;

      images.forEach(img => img.classList.remove('active'));
      images[index].classList.add('active');

      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');

      currentIndex = index;
    }

    // Navigation
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      updateGallery(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      updateGallery(currentIndex);
    });

    // Keyboard arrows
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prevBtn.click();
      if (e.key === 'ArrowRight') nextBtn.click();
    });

    // Touch Swiping
    let touchStartX = 0;
    let touchEndX = 0;

    if (gallery) {
      gallery.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      });

      gallery.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
      });
    }

    function handleSwipe() {
      if (touchEndX < touchStartX - 50) nextBtn.click(); // Swipe left
      if (touchEndX > touchStartX + 50) prevBtn.click(); // Swipe right
    }
  }

  // Reasons Widget Functionality
  const reasons = [
    "The way your eyes light up when you're happy",
    "How you always know how to make me smile",
    "Your incredible kindness to everyone around you",
    "The sound of your laugh that brightens my day",
    "Your passion for the things you love",
    "How you make even ordinary moments feel special",
    "Your strength and resilience that inspires me",
    "The way you understand me without words",
    "Your beautiful mind and creative spirit",
    "How you love me for exactly who I am"
  ];

  const reasonBtn = document.getElementById("reason-generator");
  const reasonDisplay = document.getElementById("reason-display");

  if (reasonBtn && reasonDisplay) {
    reasonBtn.addEventListener("click", () => {
      // Reset animation
      reasonDisplay.classList.remove("show");
      void reasonDisplay.offsetWidth; // Trigger reflow
      
      // Get random reason
      const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
      reasonDisplay.textContent = randomReason;
      
      // Show with animation
      setTimeout(() => {
        reasonDisplay.classList.add("show");
      }, 10);
    });
    
    // Show first reason automatically
    reasonDisplay.textContent = reasons[0];
    setTimeout(() => {
      reasonDisplay.classList.add("show");
    }, 1000);
  }

  // Floating Bubbles Background
  function createBubble() {
    const container = document.querySelector('.bubbles-container');
    if (!container) return;

    const bubble = document.createElement('div');
    bubble.classList.add('bubble');

    const size = (Math.random() * 20 + 10) + 'px';
    bubble.style.width = size;
    bubble.style.height = size;
    bubble.style.left = (Math.random() * 100) + 'vw';
    bubble.style.animationDuration = (Math.random() * 10 + 10) + 's';

    container.appendChild(bubble);

    // Remove bubble after animation
    setTimeout(() => {
      bubble.remove();
    }, 20000);
  }

  // Create bubbles every 300ms
  setInterval(createBubble, 300);

  // Add intersection observer
  const scrollElements = document.querySelectorAll('[data-scroll]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.setAttribute('data-scroll', 'in');
      } else {
        entry.target.removeAttribute('data-scroll');
      }
    });
  }, { threshold: 0.1 });

  scrollElements.forEach(el => observer.observe(el));
});
