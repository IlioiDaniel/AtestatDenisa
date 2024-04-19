document.addEventListener('DOMContentLoaded', function() {
    const productGrid = document.querySelector('.product-grid');
    const sortingButtons = document.querySelectorAll('.grid_sorting_button');

    // Initialize Isotope
    let iso;
    if (productGrid) {
        iso = new Isotope(productGrid, {
            itemSelector: '.product-item',
            layoutMode: 'fitRows'
        });
    } else {
        console.error("Product grid element not found.");
        return;
    }

    function renderProduct(product) {
        const productItem = document.createElement('div');
        productItem.className = `product-item ${product.category.toLowerCase().replace(/\s+/g, '')}`; // Ensure class names are consistent

        let discountBubble = '';
        if (product.discount) {
            discountBubble = `<div class="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>-${product.discount}</span></div>`;
        }

        productItem.innerHTML = `
            <div class="product ${product.discount ? 'discount' : ''} product_filter">
                <div class="product_image">
                    <img src="${product.imagePath}" alt="${product.name}">
                </div>
                ${discountBubble}
                <div class="favorite"></div>
                <div class="product_info">
                    <h6 class="product_name"><a href="single.html?product=${encodeURIComponent(product.name)}">${product.name}</a></h6>
                    <div class="product_price">$${product.price.toFixed(2)}</div>
                </div>
            </div>
        `;

        productGrid.appendChild(productItem);
        iso.appended(productItem);
    }

    // Render only the first 10 products
    const limitedProducts = products.slice(0, 10);
    limitedProducts.forEach(renderProduct);

    // Handle sorting
    sortingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filterValue = button.getAttribute('data-filter');
            iso.arrange({ filter: filterValue });

            // Update active class on buttons
            sortingButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });

    // Ensure layout is correct after all images have loaded
    imagesLoaded(productGrid, function() {
        iso.layout();
    });
});
