const products = [
    { id: 1, name: "Premium Black Hoodie", price: 600, image: "18730902853_693372066.jpeg", desc: "প্রিমিয়াম কোয়ালিটির ব্ল্যাক হুডি। শীতের জন্য পারফেক্ট।" },
    { id: 2, name: "Stylish Green Hoodie", price: 800, image: "O1CN01OkkvsG2EzKPKpLRQN_!!2218760308815-0-cib.jpeg", desc: "স্টাইলিশ গ্রিন হুডি। নরম এবং আরামদায়ক।" },
    { id: 3, name: "Color Wow Dream Coat", price: 2300, image: "51i84VRdudL._SL1000_.jpeg", desc: "চুল সিল্কি ও গ্লাসের মতো চকচকে করার জাদুকরী ফর্মুলা।" }
];

// ... (বাকি কোড আগের মতোই, শুধু EmailJS এর অংশটি খেয়াল করুন)
function processOrder(e) {
    e.preventDefault();
    const orderData = {
        product_name: currentProduct.name,
        quantity: currentQty,
        total_price: currentProduct.price * currentQty,
        customer_name: document.getElementById('customer-name').value,
        customer_phone: document.getElementById('customer-phone').value,
        customer_address: document.getElementById('customer-address').value
    };

    // আপনার ID গুলো এখানে সেট করা আছে
    emailjs.send('service_n9sopis', 'template_8t9gx5f', orderData)
        .then(() => { showSuccessScreen(); })
        .catch(() => { alert("Error! Please try again."); });
}
// ...
