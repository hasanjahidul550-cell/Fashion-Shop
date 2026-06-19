/* ═══════════════════════════════════════════════════
   LUXORA FASHION — script.js
   ═══════════════════════════════════════════════════ */

'use strict';

/* ──────────────────────────────────────────────────
   PRODUCT DATA
────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: 1,
    title: "Structured Wool Blazer",
    category: "Mens",
    filter: "mens",
    price: 289,
    oldPrice: null,
    badge: "new",
    stars: 5,
    img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4e1a?w=500&q=80&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Silk Slip Dress",
    category: "Womens",
    filter: "womens",
    price: 195,
    oldPrice: 260,
    badge: "sale",
    stars: 5,
    img: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&q=80&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Cashmere Turtleneck",
    category: "Mens",
    filter: "mens",
    price: 165,
    oldPrice: null,
    badge: null,
    stars: 4,
    img: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&q=80&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Wide Leg Trousers",
    category: "Womens",
    filter: "womens",
    price: 145,
    oldPrice: null,
    badge: "new",
    stars: 5,
    img: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&q=80&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Merino Crew Knit",
    category: "Mens",
    filter: "mens",
    price: 120,
    oldPrice: null,
    badge: null,
    stars: 4,
    img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=500&q=80&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Oversized Linen Shirt",
    category: "Womens",
    filter: "new",
    price: 98,
    oldPrice: null,
    badge: "new",
    stars: 5,
    img: "https://images.unsplash.com/photo-1485231183945-fffde7c4d9e6?w=500&q=80&auto=format&fit=crop"
  },
  {
    id: 7,
    title: "Tailored Chino Trousers",
    category: "Mens",
    filter: "mens",
    price: 135,
    oldPrice: 180,
    badge: "sale",
    stars: 4,
    img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80&auto=format&fit=crop"
  },
  {
    id: 8,
    title: "Evening Wrap Dress",
    category: "Womens",
    filter: "new",
    price: 245,
    oldPrice: null,
    badge: "new",
    stars: 5,
    img: "https://images.unsplash.com/photo-1550639525-c97d455acf70?w=500&q=80&auto=format&fit=crop"
  },
];

/* State */
let cart = [];
let wishlist = new Set();
let currentFilter = 'all';
let visibleCount = 8;

/* ──────────────────────────────────────────────────
   DOM REFERENCES
────────────────────────────────────────────────── */
const navbar        = document.getElementById('navbar');
const hamburger     = document.getElementById('hamburger');
const navLinks      = document.getElementById('nav-links');
const searchToggle  = document.getElementById('search-toggle');
const searchClose   = document.getElementById('search-close');
const searchBar     = document.getElementById('search-bar');
const searchInput   = document.getElementById('search-input');
const cartToggle    = document.getElementById('cart-toggle');
const cartSidebar   = document.getElementById('cart-sidebar');
const cartOverlay   = document.getElementById('cart-overlay');
const cartClose     = document.getElementById('cart-close');
const cartItemsEl   = document.getElementById('cart-items');
const cartFooterEl  = document.getElementById('cart-footer');
const cartCountEl   = document.getElementById('cart-count');
const cartTotalEl   = document.getElementById('cart-total');
const productGrid   = document.getElementById('product-grid');
const loadMoreBtn   = document.getElementById('load-more');
const reviewTrack   = document.getElementById('review-track');
const reviewPrev    = document.getElementById('review-prev');
const reviewNext    = document.getElementById('review-next');
const dotsContainer = document.getElementById('carousel-dots');
const newsletterForm= document.getElementById('newsletter-form');
const contactForm   = document.getElementById('contact-form');
const toast         = document.getElementById('toast');

/* ──────────────────────────────────────────────────
   NAVBAR — STICKY + SCROLL
────────────────────────────────────────────────── */
const onScroll = () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ──────────────────────────────────────────────────
   HAMBURGER MENU
────────────────────────────────────────────────── */
hamburger.addEventListener('click', () => {
  const isOpen = hamburger.classList.toggle('open');
  navLinks.classList.toggle('mobile-open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

navLinks.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    hamburger.classList.remove('open');
    navLinks.classList.remove('mobile-open');
    document.body.style.overflow = '';
  }
});

/* ──────────────────────────────────────────────────
   SEARCH
────────────────────────────────────────────────── */
searchToggle.addEventListener('click', () => {
  searchBar.classList.add('open');
  searchInput.focus();
});
searchClose.addEventListener('click', () => searchBar.classList.remove('open'));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') searchBar.classList.remove('open');
});

/* ──────────────────────────────────────────────────
   CART
────────────────────────────────────────────────── */
const openCart = () => {
  cartSidebar.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
};
const closeCart = () => {
  cartSidebar.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
};
cartToggle.addEventListener('click', openCart);
cartClose.addEventListener('click', closeCart);
cartOverlay.addEventListener('click', closeCart);

const renderCart = () => {
  const total = cart.reduce((s, i) => s + i.price, 0);
  cartTotalEl.textContent = `$${total.toFixed(2)}`;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `
      <div class="cart-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
        <p>Your cart is empty</p>
      </div>`;
    cartFooterEl.style.display = 'none';
    return;
  }

  cartItemsEl.innerHTML = cart.map((item, idx) => `
    <div class="cart-item">
      <div class="cart-item-img">
        <img src="${item.img}" alt="${item.title}" />
      </div>
      <div class="cart-item-info">
        <div class="cart-item-title">${item.title}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
        <button class="cart-item-remove" data-idx="${idx}">Remove</button>
      </div>
    </div>`).join('');

  cartItemsEl.querySelectorAll('.cart-item-remove').forEach(btn => {
    btn.addEventListener('click', e => {
      const i = parseInt(e.currentTarget.dataset.idx, 10);
      cart.splice(i, 1);
      updateCartBadge();
      renderCart();
    });
  });
  cartFooterEl.style.display = 'block';
};

const updateCartBadge = () => {
  cartCountEl.textContent = cart.length;
  cartCountEl.classList.toggle('visible', cart.length > 0);
};

const addToCart = (id, btn) => {
  const product = PRODUCTS.find(p => p.id === id);
  if (!product) return;
  cart.push({ ...product });
  updateCartBadge();
  renderCart();
  btn.classList.add('adding');
  setTimeout(() => btn.classList.remove('adding'), 400);
  showToast(`"${product.title}" added to cart`);
};

/* ──────────────────────────────────────────────────
   PRODUCTS — RENDER
────────────────────────────────────────────────── */
const starString = n => '★'.repeat(n) + '☆'.repeat(5 - n);

const renderProducts = () => {
  const filtered = currentFilter === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.filter === currentFilter);

  const slice = filtered.slice(0, visibleCount);

  productGrid.innerHTML = slice.map(p => `
    <div class="product-card reveal-up" data-id="${p.id}">
      <div class="product-img-wrap">
        ${p.badge ? `<span class="product-badge badge-${p.badge}">${p.badge === 'new' ? 'New' : 'Sale'}</span>` : ''}
        <button class="product-wishlist ${wishlist.has(p.id) ? 'wishlisted' : ''}" data-wid="${p.id}" aria-label="Wishlist">
          ${wishlist.has(p.id) ? '♥' : '♡'}
        </button>
        <img src="${p.img}" alt="${p.title}" loading="lazy" />
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <h3 class="product-title">${p.title}</h3>
        <div class="product-price-row">
          <div class="product-price">
            $${p.price.toFixed(2)}
            ${p.oldPrice ? `<span class="old-price">$${p.oldPrice.toFixed(2)}</span>` : ''}
          </div>
          <div class="product-stars">${starString(p.stars)}</div>
        </div>
        <button class="add-to-cart" data-cid="${p.id}"><span>Add to Cart</span></button>
      </div>
    </div>`).join('');

  // Bind events
  productGrid.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => addToCart(parseInt(btn.dataset.cid, 10), btn));
  });

  productGrid.querySelectorAll('.product-wishlist').forEach(btn => {
    btn.addEventListener('click', () => {
      const wid = parseInt(btn.dataset.wid, 10);
      if (wishlist.has(wid)) {
        wishlist.delete(wid);
        btn.textContent = '♡';
        btn.classList.remove('wishlisted');
        showToast('Removed from wishlist');
      } else {
        wishlist.add(wid);
        btn.textContent = '♥';
        btn.classList.add('wishlisted');
        showToast('Added to wishlist ♥');
      }
    });
  });

  // Re-observe for reveal
  observeReveal();

  // Load more
  loadMoreBtn.style.display =
    filtered.length > visibleCount ? 'inline-flex' : 'none';
};

/* Filter Tabs */
document.querySelectorAll('.filter-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelector('.filter-tab.active').classList.remove('active');
    tab.classList.add('active');
    currentFilter = tab.dataset.filter;
    visibleCount = 8;
    renderProducts();
  });
});

/* Load More */
loadMoreBtn.addEventListener('click', () => {
  visibleCount += 4;
  renderProducts();
});

/* ──────────────────────────────────────────────────
   REVIEW CAROUSEL
────────────────────────────────────────────────── */
let reviewIndex = 0;
const REVIEW_CARDS = document.querySelectorAll('.review-card').length;

const getVisibleCards = () => {
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
};

const buildDots = () => {
  const count = Math.ceil(REVIEW_CARDS / getVisibleCards());
  dotsContainer.innerHTML = Array.from({ length: count }, (_, i) =>
    `<button class="carousel-dot${i === 0 ? ' active' : ''}" data-i="${i}"></button>`
  ).join('');

  dotsContainer.querySelectorAll('.carousel-dot').forEach(dot => {
    dot.addEventListener('click', () => goToReview(parseInt(dot.dataset.i, 10)));
  });
};

const goToReview = (idx) => {
  const count  = Math.ceil(REVIEW_CARDS / getVisibleCards());
  reviewIndex  = Math.max(0, Math.min(idx, count - 1));
  const offset = reviewIndex * (100 / getVisibleCards()) * getVisibleCards();
  reviewTrack.style.transform = `translateX(-${reviewIndex * (100 / getVisibleCards()) * getVisibleCards()}%)`;

  // Simpler: translate by card percentage
  const cardPct = 100 / REVIEW_CARDS;
  reviewTrack.style.transform = `translateX(-${reviewIndex * getVisibleCards() * (100 / REVIEW_CARDS)}%)`;

  dotsContainer.querySelectorAll('.carousel-dot').forEach((d, i) =>
    d.classList.toggle('active', i === reviewIndex));
};

reviewPrev.addEventListener('click', () => goToReview(reviewIndex - 1));
reviewNext.addEventListener('click', () => goToReview(reviewIndex + 1));

// Auto-advance
let reviewTimer = setInterval(() => goToReview(reviewIndex + 1 < Math.ceil(REVIEW_CARDS / getVisibleCards()) ? reviewIndex + 1 : 0), 5000);
reviewTrack.addEventListener('mouseenter', () => clearInterval(reviewTimer));
reviewTrack.addEventListener('mouseleave', () => {
  reviewTimer = setInterval(() => goToReview(reviewIndex + 1 < Math.ceil(REVIEW_CARDS / getVisibleCards()) ? reviewIndex + 1 : 0), 5000);
});

// Touch swipe
let touchStartX = 0;
reviewTrack.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
reviewTrack.addEventListener('touchend', e => {
  const dx = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(dx) > 50) goToReview(dx > 0 ? reviewIndex + 1 : reviewIndex - 1);
});

/* ──────────────────────────────────────────────────
   INTERSECTION OBSERVER — REVEAL ANIMATIONS
────────────────────────────────────────────────── */
const observeReveal = () => {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-up').forEach(el => io.observe(el));
};

/* ──────────────────────────────────────────────────
   SMOOTH SCROLL FOR NAV LINKS
────────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ──────────────────────────────────────────────────
   NEWSLETTER FORM
────────────────────────────────────────────────── */
newsletterForm.addEventListener('submit', e => {
  e.preventDefault();
  const input = newsletterForm.querySelector('input[type="email"]');
  if (!input.value) return;
  showToast(`🎉 Subscribed! Check your inbox for 15% off.`);
  input.value = '';
});

/* ──────────────────────────────────────────────────
   CONTACT FORM
────────────────────────────────────────────────── */
contactForm.addEventListener('submit', e => {
  e.preventDefault();
  showToast('Message sent! We\'ll be in touch within 24 hours.');
  contactForm.reset();
});

/* ──────────────────────────────────────────────────
   TOAST NOTIFICATION
────────────────────────────────────────────────── */
let toastTimer;
const showToast = (msg) => {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
};

/* ──────────────────────────────────────────────────
   PARALLAX HERO (subtle)
────────────────────────────────────────────────── */
const heroImg = document.querySelector('.hero-img');
if (heroImg && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      heroImg.style.transform = `scale(1) translateY(${y * 0.22}px)`;
    }
  }, { passive: true });
}

/* ──────────────────────────────────────────────────
   WINDOW RESIZE — rebuild carousel dots
────────────────────────────────────────────────── */
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    buildDots();
    goToReview(0);
  }, 250);
});

/* ──────────────────────────────────────────────────
   INIT
────────────────────────────────────────────────── */
const init = () => {
  renderProducts();
  buildDots();
  observeReveal();
  renderCart();

  // Stagger hero reveals on load
  setTimeout(() => {
    document.querySelectorAll('.hero-content .reveal').forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 150);
    });
  }, 200);
};

document.addEventListener('DOMContentLoaded', init);
