let products = [
  {id:1, name:"Basket", price:300},
  {id:2, name:"Diya", price:80},
  {id:3, name:"Bag", price:500}
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function showPage(page){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.getElementById(page).classList.add('active');
}

function renderProducts(){
  let html = products.map(p=>`
    <div class="card">
      <h3>${p.name}</h3>
      <p>₹${p.price}</p>
      <button onclick="addToCart(${p.id})">Buy</button>
    </div>
  `).join('');
  document.getElementById("product-list").innerHTML = html;
}

function addToCart(id){
  let item = products.find(p=>p.id===id);
  cart.push(item);
  saveCart();
  updateCartCount();
}

function saveCart(){
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount(){
  document.getElementById("cart-count").innerText = cart.length;
}

function showCart(){
  document.getElementById("cart-modal").style.display = "block";
  renderCart();
}

function closeCart(){
  document.getElementById("cart-modal").style.display = "none";
}

function renderCart(){
  let total = 0;
  let html = cart.map(item=>{
    total += item.price;
    return `<p>${item.name} - ₹${item.price}</p>`;
  }).join('');
  document.getElementById("cart-items").innerHTML = html;
  document.getElementById("total").innerText = total;
}

function checkout(){
  alert("Order placed successfully!");
  cart = [];
  saveCart();
  renderCart();
  updateCartCount();
}

renderProducts();
updateCartCount();