// --- Product Data ---
const products = [
    { id: 1, name: "Premium Black Hoodie", price: 600, image: "18730902853_693372066.jpeg", desc: "প্রিমিয়াম কোয়ালিটির ব্ল্যাক হুডি।" },
    { id: 2, name: "Stylish Green Hoodie", price: 800, image: "O1CN01OkkvsG2EzKPKpLRQN_!!2218760308815-0-cib.jpeg", desc: "দারুণ স্টাইলিশ গ্রিন হুডি।" },
    { id: 3, name: "Color Wow Dream Coat", price: 2300, image: "51i84VRdudL._SL1000_.jpeg", desc: "চুল সিল্কি করার জাদুকরী ফর্মুলা।" }
];

// --- Initialize Page ---
const productGrid = document.getElementById('product-grid');
products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card reveal';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300?text=Image'">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.desc}</p>
            <div class="price-row"><span class="product-price">${product.price} ৳</span></div>
            <button class="order-btn" onclick="openModal(${product.id})">Order Now</button>
        </div>
    `;
    productGrid.appendChild(card);
});

// --- Modal Logic ---
let currentProduct = null;
let currentQty = 1;
const modal = document.getElementById('checkout-modal');
const qtyInput = document.getElementById('qty-input');
const totalPriceEl = document.getElementById('total-price');

function openModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    currentQty = 1;
    document.getElementById('checkout-product-name').innerText = currentProduct.name;
    document.getElementById('checkout-product-price').innerText = currentProduct.price;
    qtyInput.value = currentQty;
    totalPriceEl.innerText = currentProduct.price;
    modal.classList.add('active');
}

function closeModal() { modal.classList.remove('active'); }

function updateQty(change) {
    if (currentQty + change >= 1) {
        currentQty += change;
        qtyInput.value = currentQty;
        totalPriceEl.innerText = currentProduct.price * currentQty;
    }
}

// --- Order Submission ---
function processOrder(e) {
    e.preventDefault();
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.innerText = 'Processing...';
    submitBtn.disabled = true;

    const templateParams = {
        product_name: currentProduct.name,
        quantity: currentQty,
        total_price: currentProduct.price * currentQty,
        customer_name: document.getElementById('customer-name').value,
        customer_phone: document.getElementById('customer-phone').value,
        customer_address: document.getElementById('customer-address').value
    };

    emailjs.send('service_n9sopis', 'template_8t9gx5f', templateParams)
        .then(() => {
            document.getElementById('modal-body').style.display = 'none';
            document.getElementById('success-screen').style.display = 'block';
            submitBtn.innerText = 'Confirm Order';
            submitBtn.disabled = false;
        }, (error) => {
            alert("অর্ডারটি যায়নি। সমস্যাটি হলো: " + JSON.stringify(error));
            submitBtn.innerText = 'Confirm Order';
            submitBtn.disabled = false;
        });
}
