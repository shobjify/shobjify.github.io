// আপনার প্রোডাক্টের লিস্ট এবং বিস্তারিত তথ্য
const products = [
    {
        id: 1,
        name: "Premium Black Hoodie",
        price: 600,
        image: "18730902853_693372066.jpeg",
        desc: "আকর্ষণীয় ডিজাইনের প্রিমিয়াম কোয়ালিটির ব্ল্যাক হুডি। শীতের আড্ডায় বা ক্যাজুয়াল স্টাইলের জন্য একদম পারফেক্ট। উন্নত ফেব্রিক যা আপনাকে দেবে আরামদায়ক অনুভূতি।"
    },
    {
        id: 2,
        name: "Stylish Green Hoodie",
        price: 800,
        image: "O1CN01OkkvsG2EzKPKpLRQN_!!2218760308815-0-cib.jpeg",
        desc: "দারুণ স্টাইলিশ গ্রিন হুডি। এর চোখ ধাঁধানো রং এবং নরম ফেব্রিক শীতের দিনে আপনাকে উষ্ণ রাখার পাশাপাশি ফ্যাশনেবল রাখবে।"
    },
    {
        id: 3,
        name: "Color Wow Dream Coat (Anti-Frizz)",
        price: 2300,
        image: "51i84VRdudL._SL1000_.jpeg",
        desc: "EXTRA STRENGTH ULTRA-MOISTURIZING ANTI-FRIZZ TREATMENT. চুল সোজা, সিল্কি এবং গ্লাসের মতো চকচকে করার জাদুকরী ফর্মুলা। এটি চুলে ময়েশ্চার লক করে চুলকে কয়েক দিনের জন্য ফ্রিজ-মুক্ত রাখে (50ml/1.7FLOZ)।"
    }
];

// ওয়েসবাইটে প্রোডাক্টগুলো জেনারেট করা
const productGrid = document.getElementById('product-grid');

products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300?text=Image+Not+Found'">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.desc}</p>
            <div class="product-price">${product.price} ৳</div>
            <button class="order-btn" onclick="openModal(${product.id})">Order Now <i class="fas fa-shopping-cart"></i></button>
        </div>
    `;
    productGrid.appendChild(card);
});

// অর্ডার ম্যানেজমেন্ট ভ্যারিয়েবল
let currentProduct = null;
let currentQty = 1;

// Modal Elements
const modal = document.getElementById('checkout-modal');
const qtyInput = document.getElementById('qty-input');
const totalPriceEl = document.getElementById('total-price');

function openModal(productId) {
    currentProduct = products.find(p => p.id === productId);
    currentQty = 1;
    
    // Update Modal UI
    document.getElementById('checkout-product-name').innerText = currentProduct.name;
    document.getElementById('checkout-product-price').innerText = currentProduct.price;
    qtyInput.value = currentQty;
    totalPriceEl.innerText = currentProduct.price;
    
    // Reset Views
    document.getElementById('modal-body').style.display = 'block';
    document.getElementById('success-screen').style.display = 'none';
    document.getElementById('order-form').reset();
    
    // Show Modal with Animation
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

// Plus/Minus Button Logic
function updateQty(change) {
    let newQty = currentQty + change;
    if (newQty >= 1) { // 1 এর নিচে নামতে পারবে না
        currentQty = newQty;
        qtyInput.value = currentQty;
        totalPriceEl.innerText = currentProduct.price * currentQty;
    }
}

// Order Submission Logic
function processOrder(e) {
    e.preventDefault(); // পেজ রিলোড বন্ধ করা
    
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;

    // ফর্মের ডাটা সংগ্রহ
    const customerName = document.getElementById('customer-name').value;
    const customerPhone = document.getElementById('customer-phone').value;
    const customerAddress = document.getElementById('customer-address').value;
    const totalBill = currentProduct.price * currentQty;

    const orderData = {
        to_email: 'a.tasin@icloud.com', // আপনার ইমেইল
        product_name: currentProduct.name,
        quantity: currentQty,
        total_price: totalBill,
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_address: customerAddress
    };

    // ১. ব্যাকগ্রাউন্ডে ইমেইল পাঠানো (EmailJS এর মাধ্যমে)
    // এর জন্য emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', orderData) ব্যবহার করতে হবে
    
    // ২. ব্যাকগ্রাউন্ডে হোয়াটসঅ্যাপ মেসেজ পাঠানো (UltraMsg/CallMeBot API এর মাধ্যমে)
    sendSilentWhatsAppNotification(orderData);

    // ৩. কাস্টমারকে সাকসেস মেসেজ দেখানো (২ সেকেন্ড পর)
    setTimeout(() => {
        document.getElementById('modal-body').style.display = 'none';
        document.getElementById('success-screen').style.display = 'block';
        submitBtn.innerHTML = '<span>কনফার্ম অর্ডার</span> <i class="fas fa-arrow-right"></i>';
        submitBtn.disabled = false;
    }, 1500);
}

// অটোমেটিক হোয়াটসঅ্যাপ মেসেজ API (উদাহরন)
function sendSilentWhatsAppNotification(data) {
    const textMessage = `*New Order Alert - Shobjify* 🛍️%0A%0A*Product:* ${data.product_name}%0A*Qty:* ${data.quantity}%0A*Total Bill:* ${data.total_price} ৳%0A%0A*Customer Info:*%0A👤 Name: ${data.customer_name}%0A📞 Phone: ${data.customer_phone}%0A🏠 Address: ${data.customer_address}`;
    
    // CallMeBot Free API or UltraMsg URL (এখানে আপনার API URL বসবে)
    // কাস্টমারের স্ক্রিনে কিছু হবে না, ব্যাকগ্রাউন্ড থেকে fetch হয়ে আপনার হোয়াটসঅ্যাপে মেসেজ চলে যাবে।
    const apiUrl = `https://api.callmebot.com/whatsapp.php?phone=+8801405141665&text=${textMessage}&apikey=YOUR_API_KEY`;
    
    fetch(apiUrl, { mode: 'no-cors' })
        .then(response => console.log('Silent WA Notification Triggered'))
        .catch(err => console.error('Notification Error', err));
}
