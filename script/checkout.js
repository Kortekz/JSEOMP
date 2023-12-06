

// Retrieving purchased items from localStorage
let purchased = JSON.parse(localStorage.getItem('purchased'));
let checkContain = document.querySelector('[data-Check]');

// Function to add an item to the cart
function addItemToCart(product) {
    // Retrieve existing cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('purchased')) || [];
    // Update the cart data in localStorage and update the display
    localStorage.setItem('purchased', JSON.stringify(cartItems));
    checkTable(); // Update the display of the cart table
    btnVisible(); // Toggle the visibility of the purchase button
}

// Function to merge duplicate items in the cart
function mergeDuplicates() {
    let uniqueItems = [];
    // Retrieve existing cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('purchased')) || [];

    cartItems.forEach(item => {
        let existingItem = uniqueItems.find(unique => unique.name === item.name);

        if (existingItem) {
            existingItem.quantity += item.quantity;
            existingItem.totalPrice += item.totalPrice;
        } else {
            uniqueItems.push({ ...item });
        }
    })
    purchased = uniqueItems; // Update the cart with unique items
}


function checkTable() {
    mergeDuplicates();
    let checkoutTable = '';
    let totalAmount = 0;
    let totalQuantity = 0;

    if (purchased && purchased.length > 0) {
        checkoutTable += `
            <table id="checkoutTable">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Product</th>
                        <th>Description</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
        `;

        purchased.forEach(function (product, index) {
            
            let itemAmount = product.quantity * product.price;
            totalAmount += itemAmount;
            totalQuantity += product.quantity;

            checkoutTable += `
                <tr>
                    <td> <p class="checkP"> ${product.id} </p> </td>
                    <td> <p > <img src="${product.url}" alt="${product.name}" style="max-width: 100px;"> </p> </td>
                    <td> <p class="checkP"> ${product.name} </p> </td>
                    <td> <p class="checkP"> ${product.description}</p> </td>
                    <td> <p class="checkP"> ${product.quantity} </p> </td>
                    <td> <p class="checkP"> R${itemAmount} </p> </td>
                    <td><button class='delete' value='${index}'>Delete</button></td>
                </tr>
            `;
        });
        // Add a row for the total quantity and total amount
        checkoutTable += `
                <tr>
                    <td colspan="4"> <p class="tableTotal"> Total:</p></td>
                    <td> <p class="tableTotal"> ${totalQuantity} </p></td>
                    <td> <p class="tableTotal"> R${totalAmount} </p></td>
                    <td></td>
                </tr>
            `;
        checkoutTable += `
                </tbody>
            </table>
        `;
    } else {
        checkoutTable = `<p class="checkText">Cart is empty</p>`;
    }
    document.querySelector('[data-Check]').innerHTML = checkoutTable;
}


// Call the function to render the checkout table
checkTable();
addItemToCart


// Function to remove an item from the purchased array based on its position
function removeItem(position) {
    purchased.splice(position, 1);
    localStorage.setItem('purchased', JSON.stringify(purchased));
    checkTable();
    btnVisible(); // Toggle the purchase button visibility
}

// Event listener for table clicks
document.querySelector('[data-Check]').addEventListener('click', function(event) {
    // Checks if the clicked element contains the class delete
    if (event.target.classList.contains('delete')) {
        removeItem(event.target.value);
        // Checks if all items are deleted, then render text
        if (!purchased || purchased.length === 0) {
            displayEmptyCart();
        }
    }
});

// Function to display text 
function displayEmptyCart() {
    let checkText = `<p class="checkText">Cart is empty</p>`;
    checkContain.innerHTML = checkText;
}

// Function to toggle visibility of the purchase button based on items in the checkout
function btnVisible() {
    let purchaseButton = document.getElementById('purchaseButton');
    if (purchased && purchased.length > 0) {
        purchaseButton.style.display = 'block';
    } else {
        purchaseButton.style.display = 'none';
    }
}

// Event listener for the purchase button click
document.getElementById('purchaseButton').addEventListener('click', purchaseAct);

// Call the function to set the button visibility
btnVisible();

// Adjust the removeItem function to call the visibility function after removing an item
function removeItem(position) {
    purchased.splice(position, 1);
    localStorage.setItem('purchased', JSON.stringify(purchased));
    checkTable();
    btnVisible(); 
    // Toggle the purchase button visibility
}

// Call the visibility toggle function initially after the page loads so that the button does not appear
window.addEventListener('load', btnVisible);

// Function to handle the purchase action
function purchaseAct() {
    let modalContent = `
    <div class="modal fade" id="purchaseModal" tabindex="-1" aria-labelledby="purchaseModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="purchaseModalLabel">Purchase Confirmation</h5>
                    <button type="button" class="btn-close" id="modalClose" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>Thank you for your purchase!</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="modalCloseButton" data-bs-dismiss="modal">OK</button>
                </div>
            </div>
        </div>
    </div>
        `;

    let modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalContent;

    document.body.appendChild(modalContainer);

    let purchaseModal = new bootstrap.Modal(document.getElementById('purchaseModal'));
    purchaseModal.show();

    // Clear checkout when OK is clicked on modal
    document.getElementById('modalCloseButton').addEventListener('click', function () {
        localStorage.removeItem('purchased');
        purchased = [];
        checkTable();
        btnVisible();
        modalContainer.remove();
    });
    // Clear checkout when X is clicked on modal
    document.getElementById('modalClose').addEventListener('click', function () {
        localStorage.removeItem('purchased');
        purchased = [];
        checkTable();
        btnVisible();
        modalContainer.remove();
    });
}
