function loadProductByName(productName) {
    const product = products.find(p => p.name === productName);

    if (product) {
        // Update the HTML elements with product information
        document.getElementById('product_name').textContent = product.name;
        document.getElementById('product_description').textContent = product.description;
        document.getElementById('product_price').textContent = `$${product.price.toFixed(2)}`;
        const mainImageElement = document.getElementById('main_product_image');
        mainImageElement.style.backgroundImage = `url(${product.imagePath})`;
        mainImageElement.style.backgroundSize = 'cover';  // Ensure the image covers the div
        mainImageElement.style.backgroundPosition = 'center'; // Center the background image
    } else {
        // If no product is found with the given name, clear and display not found message
        document.getElementById('product_name').textContent = 'Product not found';
        document.getElementById('product_description').textContent = '';
        document.getElementById('product_price').textContent = '';
        document.getElementById('main_product_image').style.backgroundImage = '';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productName = urlParams.get('product');
    if (productName) {
        loadProductByName(productName);
    } else {
        // If no product name is found in the URL parameters, display a message or handle accordingly
        console.log('Product name not found in URL parameters');
    }
});
    