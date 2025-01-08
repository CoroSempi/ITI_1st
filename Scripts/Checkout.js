document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const totalPriceElement = document.getElementById("total-price");

    // استرداد بيانات السلة من localStorage
    const cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    
    let totalPrice = 0;

    // عرض المنتجات
    cartProducts.forEach((product) => {
        // إنشاء عنصر لتمثيل المنتج
        const productCard = document.createElement("div");
        productCard.classList.add("cart-item");

        productCard.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}" class="cart-item-img">
            <div class="cart-item-info">
                <h3>${product.title}</h3>
                <p>Price: $${product.price}</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${product.id}, -1)">-</button>
                    <span id="quantity-${product.id}">${product.quantity || 1}</span>
                    <button onclick="updateQuantity(${product.id}, 1)">+</button>
                </div>
                <button class="remove" onclick="removeFromCart(${product.id})">Remove</button>
            </div>
        `;

        // إضافة المنتج إلى القائمة
        cartItemsContainer.appendChild(productCard);

        // تحديث إجمالي السعر
        totalPrice += product.price * (product.quantity || 1);
    });

    // تحديث السعر الإجمالي
    totalPriceElement.textContent = `Total: $${totalPrice}`;
});

// تحديث الكمية
function updateQuantity(productId, change) {
    let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    const product = cartProducts.find(product => product.id === productId);

    if (product) {
        product.quantity = (product.quantity || 1) + change;
        if (product.quantity < 1) product.quantity = 1; // منع الكمية السلبية
        localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
        location.reload(); // إعادة تحميل الصفحة لتحديث العرض
    }
}

// إزالة عنصر من السلة
function removeFromCart(productId) {
    let cartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    cartProducts = cartProducts.filter(product => product.id !== productId);
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    location.reload(); // إعادة تحميل الصفحة لتحديث العرض
}

// تنفيذ الدفع
function checkout() {
    alert("Checkout process initiated!");
    localStorage.removeItem("cartProducts");
    location.reload(); // إعادة تحميل الصفحة لتفريغ السلة
}