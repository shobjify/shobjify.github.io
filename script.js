const products = [
    {
        id: 1,
        name: "Premium Black Hoodie",
        price: 600,
        image: "18730902853_693372066.jpeg",
        desc: "Premium quality black hoodie. Perfect for winter."
    },
    {
        id: 2,
        name: "Stylish Green Hoodie",
        price: 800,
        image: "O1CN01OkkvsG2EzKPKpLRQN_!!2218760308815-0-cib.jpeg",
        desc: "Awesome stylish green hoodie. Soft and comfortable."
    },
    {
        id: 3,
        name: "Color Wow Dream Coat",
        price: 2300,
        image: "51i84VRdudL._SL1000_.jpeg",
        desc: "Magical formula to make hair silky and glass-like shiny."
    }
];

const productGrid = document.getElementById('product-grid');
products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card reveal';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300?text=Image'">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc">${product.desc}</p>
            <div class="price-row">
                <span class="product-price">${product.price} ৳</span>
            </div>
            <button class="order-btn" onclick="openModal(${product.id})">Order Now <i class="fas fa-arrow-right"></i></button>
        </div>
    `;
    productGrid.appendChild(card);
});

function revealOnScroll() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        if (elementTop < windowHeight - 100) {
            reveals[i].classList.add('active');
        }
    }
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

function toggleMenu() {
    const menu = document.getElementById('side-menu');
    const overlay = document.getElementById('menu-overlay');
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
}

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
    
    document.getElementById('modal-body').style.display = 'block';
    document.getElementById('success-screen').style.display = 'none';
    document.getElementById('order-form').reset();
    
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

function updateQty(change) {
    let newQty = currentQty + change;
    if (newQty >= 1) { 
        currentQty = newQty;
        qtyInput.value = currentQty;
        totalPriceEl.innerText = currentProduct.price * currentQty;
    }
}

function processOrder(e) {
    e.preventDefault(); 
    
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    submitBtn.disabled = true;

    const orderData = {
        product_name: currentProduct.name,
        quantity: currentQty,
        total_price: currentProduct.price * currentQty,
        customer_name: document.getElementById('customer-name').value,
        customer_phone: document.getElementById('customer-phone').value,
        customer_address: document.getElementById('customer-address').value
    };

    // Correct Template ID updated here: template_9wea6c6
    emailjs.send('service_n9sopis', 'template_9wea6c6', orderData)
        .then(function(response) {
            showSuccessScreen();
        }, function(error) {
            alert("Error: " + JSON.stringify(error));
            submitBtn.innerHTML = '<span>Confirm Order</span> <i class="fas fa-check-circle"></i>';
            submitBtn.disabled = false;
        });
}

function showSuccessScreen() {
    document.getElementById('modal-body').style.display = 'none';
    document.getElementById('success-screen').style.display = 'block';
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.innerHTML = '<span>Confirm Order</span> <i class="fas fa-check-circle"></i>';
    submitBtn.disabled = false;
}
