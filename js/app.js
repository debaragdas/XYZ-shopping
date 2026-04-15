let products = [];
let visibleCount = 6;

fetch('data/products.json')
  .then(res => res.json())
  .then(data => {
    products = data;
    displayProducts();
    loadCategories();
  });

function displayProducts() {
  const container = document.getElementById('productContainer');
  container.innerHTML = '';

  products.slice(0, visibleCount).forEach(p => {
    container.innerHTML += `
      <div class="product-card" onclick="openProduct(${p.id})">
        <img src="${p.image}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
      </div>
    `;
  });
}

document.getElementById("loadMoreBtn").onclick = () => {
  visibleCount += 6;
  displayProducts();
};

function openProduct(id) {
  window.location.href = `product.html?id=${id}`;
}

function loadCategories() {
  const categories = [...new Set(products.map(p => p.category))];
  const select = document.getElementById("categoryFilter");

  categories.forEach(cat => {
    select.innerHTML += `<option value="${cat}">${cat}</option>`;
  });
}
