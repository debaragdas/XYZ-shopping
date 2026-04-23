/**
 * Official Artist Portal - Application Logic
 * Handles Data Fetching, Cart System, and UI Interactions
 */

// --- STATE MANAGEMENT ---
let productsData = [];
let tourData = [];
let cart = JSON.parse(localStorage.getItem('artist_cart')) || [];

// --- DOM ELEMENTS ---
const elements = {
    loader: document.getElementById('loader'),
    tourContainer: document.getElementById('tourContainer'),
    productGrid: document.getElementById('productGrid'),
    cartIcon: document.getElementById('cartIcon'),
    closeCart: document.getElementById('closeCart'),
    cartSidebar: document.getElementById('cartSidebar'),
    cartOverlay: document.getElementById('cartOverlay'),
    cartItemsContainer: document.getElementById('cartItems'),
    cartBadge: document.getElementById('cartBadge'),
    cartTotal: document.getElementById('cartTotal'),
    checkoutBtn: document.getElementById('checkoutBtn'),
    filterBtns: document.querySelectorAll('.filter-btn'),
    toastContainer: document.getElementById('toastContainer'),
    currentYear: document.getElementById('currentYear')
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
    // Set current year in footer
    if (elements.currentYear) {
        elements.currentYear.textContent = new Date().getFullYear();
    }

    // Fetch Data
    await loadData();
    
    // Initialize UI
    updateCartUI();
    setupEventListeners();
    
    // Remove Loader
    setTimeout(() => {
        elements.loader.style.opacity = '0';
        setTimeout(() => elements.loader.style.display = 'none', 500);
    }, 800); // Slight delay for smooth aesthetic
});

// --- DATA FETCHING ---
async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error('Data failed to load');
        
        const data = await response.json();
        productsData = data.products;
        tourData = data.tours;

        renderTours(tourData);
        renderProducts(productsData, 'all');
    } catch (error) {
        console.error('Error loading data:', error);
        elements.tourContainer.innerHTML = '<p class="text-center">Stay tuned for upcoming dates.</p>';
        elements.productGrid.innerHTML = '<p class="text-center">Store is currently being updated.</p>';
    }
}

// --- RENDER FUNCTIONS ---
function renderTours(tours) {
    elements.tourContainer.innerHTML = '';
    
    if (tours.length === 0) {
        elements.tourContainer.innerHTML = '<p class="text-center" style="color: var(--text-secondary);">No upcoming dates at the moment.</p>';
        return;
    }

    tours.forEach(tour => {
        const div = document.createElement('div');
        div.className = 'tour-row';
        div.innerHTML = `
            <div class="tour-date">${tour.date}</div>
            <div class="tour-venue">${tour.venue}</div>
            <div class="tour-location"><i class="fa-solid fa-location-dot"></i> ${tour.location}</div>
            <a href="${tour.ticketLink}" class="btn ${tour.soldOut ? 'btn-outline' : 'btn-primary'}" ${tour.soldOut ? 'onclick="return false;" style="opacity:0.5; cursor:not-allowed;"' : 'target="_blank"'}>
                ${tour.soldOut ? 'SOLD OUT' : 'GET TICKETS'}
            </a>
        `;
        elements.tourContainer.appendChild(div);
    });
}

function renderProducts(products, filterType) {
    elements.productGrid.innerHTML = '';
    
    const filtered = filterType === 'all' 
        ? products 
        : products.filter(p => p.category === filterType);

    filtered.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
            <div class="product-img-wrapper">
                <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
            </div>
            <div class="product-info">
                <span class="product-category">${product.category}</span>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-bottom">
                    <span class="product-price">₹${product.price.toLocaleString('en-IN')}</span>
                    <button class="add-to-cart" onclick="addToCart('${product.id}')" aria-label="Add to Cart">
                        <i class="fa-solid fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        elements.productGrid.appendChild(div);
    });
}

// --- CART LOGIC ---
window.addToCart = (productId) => { // Made global to use in inline onclick
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    saveCart();
    updateCartUI();
    showToast(`Added ${product.name} to cart`);
};

function updateCartQty(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        cart[itemIndex].qty += change;
        if (cart[itemIndex].qty <= 0) {
            cart.splice(itemIndex, 1);
        }
        saveCart();
        updateCartUI();
    }
}

function saveCart() {
    localStorage.setItem('artist_cart', JSON.stringify(cart));
}

function updateCartUI() {
    // Update Badge
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    elements.cartBadge.textContent = totalItems;
    if(totalItems > 0) {
        elements.cartBadge.style.transform = 'scale(1.2)';
        setTimeout(() => elements.cartBadge.style.transform = 'scale(1)', 200);
    }

    // Render Items
    elements.cartItemsContainer.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        elements.cartItemsContainer.innerHTML = '<p style="text-align:center; color: var(--text-secondary); margin-top: 2rem;">Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            total += item.price * item.qty;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <div class="cart-item-title">${item.name}</div>
                    <div class="cart-item-price">₹${item.price.toLocaleString('en-IN')}</div>
                    <div class="cart-qty-ctrl">
                        <button class="qty-btn" onclick="updateCartQty('${item.id}', -1)">-</button>
                        <span>${item.qty}</span>
                        <button class="qty-btn" onclick="updateCartQty('${item.id}', 1)">+</button>
                    </div>
                </div>
            `;
            elements.cartItemsContainer.appendChild(div);
        });
    }

    elements.cartTotal.textContent = `₹${total.toLocaleString('en-IN')}`;
}

// --- WHATSAPP CHECKOUT ---
function processCheckout() {
    if (cart.length === 0) {
        showToast("Your cart is empty!");
        return;
    }

    // Replace with your actual WhatsApp business number (include country code, no +, no spaces)
    const WA_NUMBER = "919876543210"; 
    
    let message = `*New Order Inquiry* 🎵\n\n`;
    let totalAmt = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        totalAmt += itemTotal;
        message += `▫️ ${item.name}\n   Qty: ${item.qty} x ₹${item.price} = ₹${itemTotal}\n`;
    });

    message += `\n*Total Amount: ₹${totalAmt}*\n\nHi, I would like to place an order for the above items.`;

    const encodedMessage = encodeURIComponent(message);
    const waURL = `https://wa.me/${WA_NUMBER}?text=${encodedMessage}`;
    
    // Clear cart after checkout initiation (optional)
    // cart = []; saveCart(); updateCartUI();
    
    window.open(waURL, '_blank');
}

// --- UTILITIES & EVENT LISTENERS ---
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-check-circle" style="color: var(--neon-accent); margin-right: 8px;"></i> ${message}`;
    
    elements.toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideInUp 0.3s backwards reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function setupEventListeners() {
    // Cart Sidebar Toggles
    elements.cartIcon.addEventListener('click', () => {
        elements.cartSidebar.classList.add('active');
        elements.cartOverlay.classList.add('active');
    });

    const closeCart = () => {
        elements.cartSidebar.classList.remove('active');
        elements.cartOverlay.classList.remove('active');
    };

    elements.closeCart.addEventListener('click', closeCart);
    elements.cartOverlay.addEventListener('click', closeCart);

    // Checkout Button
    elements.checkoutBtn.addEventListener('click', processCheckout);

    // Store Filters
    elements.filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Remove active class from all
            elements.filterBtns.forEach(b => b.classList.remove('active'));
            // Add to clicked
            e.target.classList.add('active');
            // Re-render products
            const filter = e.target.getAttribute('data-filter');
            renderProducts(productsData, filter);
        });
    });

    // Glass Nav Scroll Effect
    window.addEventListener('scroll', () => {
        const nav = document.querySelector('.glass-nav');
        if (window.scrollY > 50) {
            nav.style.background = 'rgba(5, 5, 7, 0.95)';
            nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            nav.style.background = 'rgba(5, 5, 7, 0.7)';
            nav.style.boxShadow = 'none';
        }
    });
}
