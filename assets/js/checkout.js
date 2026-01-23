function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

function calculateTotal() {
    const cart = getCart();
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("checkout-total").textContent =
        calculateTotal().toFixed(2);

    document.getElementById("checkout-form").addEventListener("submit", e => {
        e.preventDefault();

        alert("Order placed successfully 🎉");

        localStorage.removeItem("cart");
        window.location.href = "../index.html";
    });
});
