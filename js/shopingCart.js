document.addEventListener('DOMContentLoaded', function() {
    // Function to populate the cart HTML
    function populateCart() {
        var cartContainer = document.querySelector('.cart');

        // Clear the existing content
        cartContainer.innerHTML = '';

        // Retrieve cartItems from local storage
        var cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

        // Loop through each item in the cartItems
        cartItems.forEach(function(item, index) {
            // Find the corresponding product in the products array
            var product = products.find(function(prod) {
                return prod.name === item.name;
            });

            // If product is found, create HTML elements for the item
            if (product) {
                var cartRow = document.createElement('div');
                cartRow.classList.add('row', 'border-top', 'border-bottom', 'main', 'align-items-center');

                cartRow.innerHTML = `
                    <div class="col-2"><img class="img-fluid" src="${product.imagePath}"></div>
                    <div class="col">
                        <div class="row text-muted">${product.category}</div>
                        <div class="row">${product.name}</div>
                    </div>
                    <div class="col">&euro; ${parseFloat(product.price).toFixed(2)} <span class="close" data-index="${index}">&#10005;</span></div>
                `;

                cartContainer.appendChild(cartRow);
            }
        });

        // Add event listener to close buttons
        var closeButtons = document.querySelectorAll('.close');
        closeButtons.forEach(function(button) {
            button.addEventListener('click', function(event) {
                var indexToRemove = event.target.getAttribute('data-index');
                // Remove item from cartItems array
                cartItems.splice(indexToRemove, 1);
                // Update local storage
                localStorage.setItem('cartItems', JSON.stringify(cartItems));
                // Repopulate the cart
                populateCart();
            });
        });

        // Update summary details
        var summaryContainer = document.querySelector('.summary');
        summaryContainer.innerHTML = `
            <div>
                <h5><b>Summary</b></h5>
                <hr>
                <div class="row">
                    <div class="col" style="padding-left:0;">ITEMS ${cartItems.length}</div>
                    <div class="col text-right">&euro; ${calculateTotalPrice(cartItems).toFixed(2)}</div>
                </div>
                <form>
                    <p>SHIPPING</p>
                    <select><option class="text-muted">Standard-Delivery- &euro;5.00</option></select>
                    <p>GIVE CODE</p>
                    <input id="code" placeholder="Enter your code">
                </form>
                <div class="row" style="border-top: 1px solid rgba(0,0,0,.1); padding: 2vh 0;">
                    <div class="col">TOTAL PRICE</div>
                    <div class="col text-right">&euro; ${calculateTotalPrice(cartItems).toFixed(2)}</div>
                </div>
                <button class="btn">CHECKOUT</button>
            </div>
        `;
    }

    // Function to calculate total price
    function calculateTotalPrice(cartItems) {
        return cartItems.reduce(function(total, item) {
            // Remove the currency symbol and parse the price as a float
            var price = parseFloat(item.price.replace(/[^\d.-]/g, ''));
            return total + price;
        }, 0);
    }

    // Call the function to populate the cart
    populateCart();
});
