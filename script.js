// Configuration
const SHOP_PHONE = "916003312085"; // International format without +
const SHOP_UPI = "yourname@upi";
const SHOP_NAME = "Luxe Shop";

let products = [];

// Fetch and Display Products
async function loadProducts() {
    try {
        const response = await fetch('products.json');
        products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

function displayProducts(items) {
    const grid = document.getElementById('productGrid');
    grid.innerHTML = items.map(product => `
        <div class="product-card glass reveal active">
            <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://via.placeholder.com/500x500?text=Product+Image'">
            <h3>${product.name}</h3>
            <p style="color: var(--text-dim); font-size: 0.9rem; margin-bottom: 10px;">${product.description}</p>
            <p class="price">₹${product.price}</p>
            <div class="btn-group">
                <a href="${generateWhatsAppLink(product)}" target="_blank" class="btn btn-wa">
                    <i class="fab fa-whatsapp"></i> Order
                </a>
                <a href="upi://pay?pa=${SHOP_UPI}&pn=${SHOP_NAME}&am=${product.price.replace(',', '')}&cu=INR" class="btn btn-upi">
                    <i class="fas fa-bolt"></i> Pay Now
                </a>
            </div>
        </div>
    `).join('');
}

// Generate WhatsApp Link
function generateWhatsAppLink(product) {
    const message = `Hello ${SHOP_NAME}, I'd like to order:
*Product:* ${product.name}
*Price:* ₹${product.price}

*My Details:*
Name: 
Address: 
Phone:`;
    return `https://wa.me/${SHOP_PHONE}?text=${encodeURIComponent(message)}`;
}

// Search Logic
document.getElementById('productSearch').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = products.filter(p => 
        p.name.toLowerCase().includes(term) || 
        p.description.toLowerCase().includes(term)
    );
    displayProducts(filtered);
});

// Scroll Reveal Logic
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);
window.onload = loadProducts;
