let cart = [];
let current = {name:"", price:0, qty:1, payment:"reception", note:""};

function openModal(name, price){
  current = {name, price, qty:1, payment:"reception", note:""};
  document.getElementById("modalName").innerText = name;
  document.getElementById("qty").innerText = 1;
  document.getElementById("price").innerText = price;
  document.getElementById("paymentMethod").value = "reception";
  document.getElementById("note").value = "";
  document.getElementById("modal").style.display = "flex";
}

function closeModal(){
  document.getElementById("modal").style.display = "none";
}

function changeQty(val){
  if(current.qty === 1 && val === -1){
    closeModal();
    return;
  }
  current.qty += val;
  document.getElementById("qty").innerText = current.qty;
  document.getElementById("price").innerText = current.qty * current.price;
}

function addToCart(){
  current.note = document.getElementById("note").value;
  current.payment = document.getElementById("paymentMethod").value;
  cart.push({...current});
  closeModal();
  updateCart();
}

function updateCart(){
  document.getElementById("cartBtn").style.display = cart.length ? "block" : "none";
  document.getElementById("cartBadge").innerText = cart.length;

  let html = "";
  let total = 0;
  cart.forEach(i=>{
    total += i.qty * i.price;
    html += `<p>${i.name} x ${i.qty} — ₹${i.qty*i.price} [${i.payment}]</p>`;
  });

  document.getElementById("cartItems").innerHTML = html;
  document.getElementById("total").innerText = total;
}

document.getElementById("cartBtn").onclick = ()=>{
  document.getElementById("cart").style.display = "block";
};

function placeOrder(){
  if(cart.length === 0) return;

  const receptionItems = cart.filter(i => i.payment === "reception");
  const upiItems = cart.filter(i => i.payment === "upi");

  if(receptionItems.length) sendWhatsApp(receptionItems);
  if(upiItems.length) payUPI(upiItems);

  alert("Order sent!");
  cart = [];
  updateCart();
  document.getElementById("cart").style.display = "none";
}

function sendWhatsApp(items){
  const phone = "91XXXXXXXXXX"; // Manager WhatsApp number
  let message = "New Order 🍽️\nPayment: Pay at Reception\n\n";

  items.forEach(i=>{
    message += `• ${i.name} x ${i.qty} — ₹${i.qty*i.price}\n`;
    if(i.note) message += `  Note: ${i.note}\n`;
  });

  const total = items.reduce((sum,i)=>sum+i.price*i.qty,0);
  message += `\nTotal: ₹${total}`;

  window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, "_blank");
}

function payUPI(items){
  const upiId = "cafe@upi"; // Replace with café UPI ID
  const name = "Cafe Name";
  const total = items.reduce((sum,i)=>sum+i.price*i.qty,0);
  const notes = items.map(i=>`${i.name} x${i.qty}`).join(", ");

  const upiURL = `upi://pay?pa=${upiId}&pn=${encodeURIComponent(name)}&am=${total}&cu=INR&tn=${encodeURIComponent(notes)}`;
  window.location.href = upiURL;
}
