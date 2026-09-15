const categories = [
    { id: 'smartphones', name: 'Смартфоны', emoji: '📱' },
    { id: 'laptops',     name: 'Ноутбуки',  emoji: '💻' },
    { id: 'tablets',     name: 'Планшеты',  emoji: '📲' },
    { id: 'audio',       name: 'Аудио',     emoji: '🎧' },
    { id: 'accessories', name: 'Аксессуары', emoji: '⌨️' },
    { id: 'gaming',      name: 'Гейминг',   emoji: '🎮' }
];

const products = [
    { id: 1, title: 'Apple iPhone 15 Pro 256GB',        category: 'smartphones', price: 119990, oldPrice: 129990, rating: 4.9, reviews: 214, emoji: '📱', badge: 'sale' },
    { id: 2, title: 'Samsung Galaxy S24 Ultra 512GB',   category: 'smartphones', price: 134990, oldPrice: null,   rating: 4.8, reviews: 176, emoji: '📱', badge: null },
    { id: 3, title: 'Xiaomi 14 12/256GB',               category: 'smartphones', price: 64990,  oldPrice: 74990,  rating: 4.7, reviews: 321, emoji: '📱', badge: 'sale' },
    { id: 4, title: 'MacBook Pro 14" M3 Pro 512GB',     category: 'laptops',     price: 219990, oldPrice: null,   rating: 5.0, reviews: 98,  emoji: '💻', badge: 'new' },
    { id: 5, title: 'ASUS ROG Zephyrus G14 RTX 4060',   category: 'laptops',     price: 149990, oldPrice: 169990, rating: 4.8, reviews: 145, emoji: '💻', badge: 'sale' },
    { id: 6, title: 'Lenovo IdeaPad Slim 5 16GB',       category: 'laptops',     price: 62990,  oldPrice: null,   rating: 4.6, reviews: 203, emoji: '💻', badge: null },
    { id: 7, title: 'iPad Pro 11" M4 256GB Wi-Fi',      category: 'tablets',     price: 99990,  oldPrice: null,   rating: 4.9, reviews: 87,  emoji: '📲', badge: 'new' },
    { id: 8, title: 'Samsung Galaxy Tab S9 FE 128GB',   category: 'tablets',     price: 44990,  oldPrice: 52990,  rating: 4.5, reviews: 134, emoji: '📲', badge: 'sale' },
    { id: 9, title: 'Sony WH-1000XM5 наушники',         category: 'audio',       price: 34990,  oldPrice: 39990,  rating: 4.9, reviews: 412, emoji: '🎧', badge: 'sale' },
    { id: 10, title: 'AirPods Pro 2 USB-C',             category: 'audio',       price: 24990,  oldPrice: null,   rating: 4.8, reviews: 528, emoji: '🎧', badge: null },
    { id: 11, title: 'JBL Flip 6 портативная колонка',  category: 'audio',       price: 11990,  oldPrice: 14990,  rating: 4.6, reviews: 267, emoji: '🔊', badge: 'sale' },
    { id: 12, title: 'Logitech MX Master 3S мышь',      category: 'accessories', price: 8990,   oldPrice: null,   rating: 4.9, reviews: 189, emoji: '🖱️', badge: null },
    { id: 13, title: 'Keychron K8 Pro клавиатура',      category: 'accessories', price: 12990,  oldPrice: 15990,  rating: 4.7, reviews: 96,  emoji: '⌨️', badge: 'sale' },
    { id: 14, title: 'PlayStation 5 Slim Digital',      category: 'gaming',      price: 59990,  oldPrice: null,   rating: 4.9, reviews: 341, emoji: '🎮', badge: 'new' },
    { id: 15, title: 'Xbox Series X 1TB',               category: 'gaming',      price: 54990,  oldPrice: 59990,  rating: 4.8, reviews: 218, emoji: '🎮', badge: 'sale' },
    { id: 16, title: 'Nintendo Switch OLED белый',      category: 'gaming',      price: 34990,  oldPrice: null,   rating: 4.9, reviews: 402, emoji: '🎮', badge: null }
];

function formatPrice(value) {
    return new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
}

function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating - full >= 0.5;
    return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(5 - full - (half ? 1 : 0));
}

const categoryGrid = document.getElementById('categoryGrid');

function renderCategories() {
    categoryGrid.innerHTML = categories.map(cat => `
    <button class="category-card" data-category="${cat.id}">
      <span class="category-emoji">${cat.emoji}</span>
      <span class="category-name">${cat.name}</span>
    </button>
  `).join('');

    categoryGrid.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            activateFilter(category);
            document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
        });
    });
}

const productGrid = document.getElementById('productGrid');
const emptyState = document.getElementById('emptyState');

let currentFilter = 'all';
let currentSearch = '';

function renderProducts() {
    const filtered = products.filter(p => {
        const matchCategory = currentFilter === 'all' || p.category === currentFilter;
        const matchSearch = !currentSearch ||
            p.title.toLowerCase().includes(currentSearch.toLowerCase());
        return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
        productGrid.innerHTML = '';
        emptyState.classList.add('show');
        return;
    }

    emptyState.classList.remove('show');

    productGrid.innerHTML = filtered.map(p => `
    <article class="product-card">
      <div class="product-image">
        ${p.badge === 'sale' ? '<span class="product-badge">Sale</span>' : ''}
        ${p.badge === 'new'  ? '<span class="product-badge new">New</span>'  : ''}
        <span>${p.emoji}</span>
      </div>
      <div class="product-body">
        <div class="product-category">${getCategoryName(p.category)}</div>
        <h3 class="product-title">${p.title}</h3>
        <div class="product-rating">
          <span class="stars">${renderStars(p.rating)}</span>
          <span>${p.rating} · ${p.reviews} отзывов</span>
        </div>
        <div class="product-footer">
          <div class="product-price">
            <span class="price-current">${formatPrice(p.price)}</span>
            ${p.oldPrice ? `<span class="price-old">${formatPrice(p.oldPrice)}</span>` : ''}
          </div>
          <button class="add-to-cart" data-id="${p.id}" aria-label="Добавить в корзину">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
        </div>
      </div>
    </article>
  `).join('');

    productGrid.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = Number(btn.dataset.id);
            const product = products.find(p => p.id === id);
            addToCart(product);
        });
    });
}

function getCategoryName(id) {
    const cat = categories.find(c => c.id === id);
    return cat ? cat.name : id;
}

const filterChips = document.querySelectorAll('.filter-chip');

function activateFilter(filter) {
    currentFilter = filter;
    filterChips.forEach(chip => {
        chip.classList.toggle('active', chip.dataset.filter === filter);
    });
    renderProducts();
}

filterChips.forEach(chip => {
    chip.addEventListener('click', () => activateFilter(chip.dataset.filter));
});

const searchInput = document.getElementById('searchInput');
let searchTimeout;

searchInput.addEventListener('input', () => {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        currentSearch = searchInput.value.trim();
        renderProducts();
    }, 200);
});

let cartCount = 0;
const cartBadge = document.getElementById('cartBadge');
const toast = document.getElementById('toast');
const toastText = document.getElementById('toastText');
let toastTimeout;

function addToCart(product) {
    cartCount++;
    cartBadge.textContent = cartCount.toString();

    toastText.textContent = `«${truncate(product.title, 40)}» в корзине`;
    showToast();
}

function truncate(str, n) {
    return str.length > n ? str.slice(0, n - 1) + '…' : str;
}

function showToast() {
    clearTimeout(toastTimeout);
    toast.classList.add('show');
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 2200);
}

document.getElementById('cartBtn').addEventListener('click', () => {
    if (cartCount === 0) return;
    toastText.textContent = `В корзине ${cartCount} товар${plural(cartCount)}`;
    showToast();
});

function plural(n) {
    const mod10 = n % 10;
    const mod100 = n % 100;
    if (mod10 === 1 && mod100 !== 11) return '';
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return 'а';
    return 'ов';
}

renderCategories();
renderProducts();