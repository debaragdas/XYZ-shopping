let products = [];
let visible = 6;

fetch('data/products.json')
.then(res => res.json())
.then(data => {
  products = data;
  displayProducts();
  loadFeed();
});

function displayProducts() {
  const box = document.getElementById("productContainer");
  box.innerHTML = "";

  products.slice(0, visible).forEach(p => {
    box.innerHTML += `
      <div class="product-card" onclick="openProduct(${p.id})">
        <img src="${p.image}">
        <h4>${p.name}</h4>
        <p>₹${p.price}</p>
      </div>
    `;
  });
}

document.getElementById("loadMoreBtn").onclick = () => {
  visible += 6;
  displayProducts();
};

function openProduct(id){
  location.href = "product.html?id="+id;
}

function loadFeed(){
  const feed = document.getElementById("instaFeed");

  products.slice(0,10).forEach(p=>{
    feed.innerHTML += `
      <div class="insta-card" onclick="openProduct(${p.id})">
        <img src="${p.image}">
      </div>
    `;
  });
}
