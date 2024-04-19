$(document).ready(function() {
    // Function to render a single product into the Owl Carousel
    function renderProduct(product) {
        var productItem = `
            <div class="owl-item product_slider_item">
                <div class="product-item">
                    <div class="product">
                        <div class="product_image">
                            <img src="${product.imagePath}" alt="${product.name}">
                        </div>
                        ${product.discount ? `<div class="product_bubble product_bubble_right product_bubble_red d-flex flex-column align-items-center"><span>-${product.discount}%</span></div>` : ''}
                        <div class="product_info">
                        <h6 class="product_name"><a href="single.html?product=${encodeURIComponent(product.name)}">${product.name}</a></h6>
                            <div class="product_price">$${product.price.toFixed(2)}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        // Add new product item to the carousel and refresh
        $('.product_slider').owlCarousel('add', productItem).owlCarousel('update');
    }

    // Assuming `products` is an array containing product objects
    // Make sure the products array is defined or loaded before this script runs
    products.forEach(function(product) {
        renderProduct(product);
    });

    // Initialize Owl Carousel for the product slider
    $('.product_slider').owlCarousel({
        loop: true,
        margin: 10,
        nav: true,
        responsive: {
            0: { items: 1 },
            600: { items: 3 },
            1000: { items: 5 }
        }
    });

    // Optional: Refresh the carousel after all items have been added
    // This ensures the carousel is aware of all the new elements
    $('.product_slider').owlCarousel('refresh');
});
