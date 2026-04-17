// 1. Product Data (Simulated Database)
const products = [
    { id: 1, name: "Premium Urban Hoodie", price: 89.99, image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400" },
    { id: 2, name: "Classic Leather Boots", price: 129.50, image: "https://images.unsplash.com/photo-1520639889410-d65c39fd697d?w=400" },
    { id: 3, name: "Minimalist Watch", price: 199.00, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400" },
    { id: 4, name: "Denim Jacket", price: 75.00, image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400" },
    { id: 5, name: "Linen Summer Shirt", price: 45.00, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400" },
    { id: 6, name: "Designer Sunglasses", price: 150.00, image: "https://images.unsplash.com/photo-1511499767390-91f19767000c?w=400" }
];

let cart = [];

// 2. Initialize Website
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
});

// 3. Render Products to Grid
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            <h3>${product.name}</h3>
            <p class="price">$${product.price.toFixed(2)}</p>
            <button class="btn-primary" onclick="addToCart(${product.id})">Add to Bag</button>
        </div>
    `).join('');
}

// 4. Cart Functionality
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    toggleCart(true); // Open cart sidebar when item added
}

function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    // Update Badge
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;

    // Render Items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <i class="fas fa-trash" onclick="removeFromCart(${item.id})" style="cursor:pointer; color:red;"></i>
        </div>
    `).join('');

    // Update Total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerText = total.toFixed(2);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// 5. UI Controls
function toggleCart(forceOpen = false) {
    const sidebar = document.getElementById('cart-sidebar');
    if (forceOpen) {
        sidebar.classList.add('active');
    } else {
        sidebar.classList.toggle('active');
    }
}

// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active-mobile');
    // Note: Add ".active-mobile { display: block; position: absolute; ... }" to CSS for this to show
});
