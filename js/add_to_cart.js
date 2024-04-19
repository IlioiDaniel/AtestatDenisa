document.addEventListener('DOMContentLoaded', function() {
    // Function to handle adding the product to cart
    function addToCart() {
        // Retrieve the cart items from local storage or initialize an empty array if it doesn't exist
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Get the product details
        const productName = document.getElementById('product_name').textContent;
        const productPrice = document.getElementById('product_price').textContent;

        // Add the product to the cart
        cartItems.push({ name: productName, price: productPrice });

        // Save the updated cart items back to local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Update the cart icon or count if necessary
        updateCartIconOrCount(cartItems.length);
    }

    // Function to update the cart icon or count
    function updateCartIconOrCount(count) {
        // You can implement code here to update the cart icon or count in your UI
        // For example:
        // document.getElementById('checkout_items').textContent = count;
    }

    // Add event listener to the "Add to Cart" button
    const addToCartButton = document.getElementById('add_to_cart_button');
    if (addToCartButton) {
        addToCartButton.addEventListener('click', addToCart);
    }
});
