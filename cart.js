
document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".add-to-cart");

  buttons.forEach(btn => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const name = this.getAttribute("data-name");
      const price = parseFloat(this.getAttribute("data-price"));

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push({ name, price });
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(name + " added to cart!");
    });
  });

  const cartContainer = document.getElementById("cart-items");
  if (cartContainer) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    cart.forEach(item => {
      const row = document.createElement("div");
      row.textContent = `${item.name} - $${item.price.toFixed(2)}`;
      cartContainer.appendChild(row);
      total += item.price;
    });

    const totalRow = document.createElement("div");
    totalRow.style.marginTop = "1rem";
    totalRow.innerHTML = "<strong>Total: $" + total.toFixed(2) + "</strong>";
    cartContainer.appendChild(totalRow);
  }
});
