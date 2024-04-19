document.addEventListener('DOMContentLoaded', function() {
    const productGrid = document.getElementById('productGrid');
    const sidebarCategories = document.querySelectorAll('.sidebar_categories li');

    function filterProductsByCategory(category) {
        // Clear the product grid before adding filtered products
        while (productGrid.firstChild) {
            productGrid.removeChild(productGrid.firstChild);
        }

        if (category === '') {
            // If the category is empty, show all products
            products.forEach(product => {
                renderProduct(product);
            });
        } else {
            // Show products with the selected category
            products.forEach(product => {
                if (product.category.toLowerCase() === category.toLowerCase()) {
                    renderProduct(product);
                }
            });
        }

        // Reload CSS by forcing a reflow
        productGrid.classList.add('force-reflow');
        void productGrid.offsetWidth; // Trigger reflow
        productGrid.classList.remove('force-reflow');
    }

    function renderProduct(product) {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item', 'col-4', 'col-md-3');
        productItem.style.position = 'absolute';
        const index = productGrid.childElementCount;
        productItem.style.left = `${(index % 4) * 174}px`;
        productItem.style.top = `${Math.floor(index / 4) * 360}px`;

        const borderStyle = (index + 1) % 4 === 0 ? 'none' : '1px solid rgb(233, 233, 233)';
        productItem.innerHTML = `
            <div class="product product_filter" style="border-right: ${borderStyle};">
                <div class="product_image">
                    <img src="${product.imagePath}" alt="${product.name}">
                </div>
                ${product.discount ? `<div class="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>-${product.discount}</span></div>` : ''}
                <div class="favorite"></div>
                <div class="product_info">
                    <h6 class="product_name"><a href="single.html?product=${encodeURIComponent(product.name)}">${product.name}</a></h6>
                    <div class="product_price">${product.price}</div>
                </div>
            </div>
            <div class="red_button add_to_cart_button"><a href="#" class="add_to_cart_button">add to cart</a></div>
        `;
        productGrid.appendChild(productItem);

        // Add event listener to "Add to Cart" button
        const addToCartButton = productItem.querySelector('.add_to_cart_button');
        addToCartButton.addEventListener('click', function(event) {
            event.preventDefault();
            const productName = productItem.querySelector('.product_name a').textContent;
            const productPrice = productItem.querySelector('.product_price').textContent;
            addToCart(productName, productPrice);
        });
    }

    function addToCart(productName, productPrice) {
        // Retrieve the cart items from local storage or initialize an empty array if it doesn't exist
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Add the product to the cart
        cartItems.push({ name: productName, price: productPrice });

        // Save the updated cart items back to local storage
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Update the cart icon or count if necessary
        // You can implement code here to update the cart icon or count in your UI
        // For example:
        // updateCartIconOrCount(cartItems.length);
    }

    // Initially filter products by 'All'
    filterProductsByCategory('');

    // Add click event listeners to sidebar categories
    sidebarCategories.forEach(item => {
        item.addEventListener('click', () => {
            const categoryValue = item.getAttribute('value');
            filterProductsByCategory(categoryValue);

            // Remove 'active' class from all list items
            sidebarCategories.forEach(li => {
                li.classList.remove('active');
            });

            // Add 'active' class to clicked list item
            item.classList.add('active');
        });
    });
});
