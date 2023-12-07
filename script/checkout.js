
// DOM MANIPULATION

// Retrieving purchased items from localStorage
let purchased = JSON.parse(localStorage.getItem('purchased'));
let checkContain = document.querySelector('[data-Check]');
let purchaseButton = document.getElementById('purchaseButton')

// Function to add an item to the cart
function addItemToCart(product) {
    // Retrieve existing cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('purchased')) || [];
    // Update the cart data in localStorage and update the display
    localStorage.setItem('purchased', JSON.stringify(cartItems));
    checkTable(); 
    // Update the display of the cart table
    btnVisible(); 
    // Toggle the visibility of the purchase button
}

// Function to merge duplicate items in the cart
function mergeDuplicates() {
    let uniqueItems = []; // Array to hold unique items
    // Retrieve existing cart items from localStorage or initialize an empty array
    let cartItems = JSON.parse(localStorage.getItem('purchased')) || [];

    // Loop through each item in the cart
    cartItems.forEach(item => {
        // Check if theres an existing item in the uniqueItems array with the same name
        let existingItem = uniqueItems.find(unique => unique.name === item.name);

        // If the item exists in uniqueItems, merge quantities and update totalPrice
        if (existingItem) {
            existingItem.quantity += item.quantity;
            existingItem.totalPrice += item.totalPrice;
        } else {
            // If it's a new item, add a copy to the uniqueItems array
            uniqueItems.push({ ...item });
        }
    });
    purchased = uniqueItems; // Update the purchased array with unique items
}

function checkTable() {
    // Merge duplicate items in the cart
    mergeDuplicates();

    let checkoutTable = ''; // Variable to store the HTML for the checkout table
    let totalAmount = 0; // calculate total amount in the cart
    let totalQuantity = 0; // calculate total quantity of items in the cart

    if (purchased && purchased.length > 0) { // Checking if there are items in the 'purchased' array
        // Creating the table structure if there are items in the cart
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
        // Looping through each product in the purchased array to create table rows
        purchased.forEach(function (product, index) {
            // Calculation for total price and Total Quantity for each item
            let itemAmount = product.quantity * product.price;
            totalAmount += itemAmount;
            totalQuantity += product.quantity;

            // Creating table rows for each product in the cart
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
        // Adding a row at the end for the total quantity and total amount in the cart
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
        // If the cart is empty, display this message
        checkoutTable = `<p class="checkText">Cart is empty</p>`;
    }
    // Displaying the generated checkout table in the HTML element
    document.querySelector('[data-Check]').innerHTML = checkoutTable;
}

// Call the function to render the checkout table
checkTable();
addItemToCart

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
    if (purchased && purchased.length > 0) {
        purchaseButton.style.display = 'block';
    } else {
        purchaseButton.style.display = 'none';
    }
}

// Function to remove an item from the purchased array based on its position
function removeItem(position) {
    purchased.splice(position, 1);
    localStorage.setItem('purchased', JSON.stringify(purchased));
    checkTable();
    btnVisible(); 
    // Toggle the purchase button visibility
}
// Call the function to set the button visibility
btnVisible();

// Function to handle the purchase action
function purchaseAct() {
    let modalContent = `
    <div class="modal fade" id="purchaseModal" tabindex="-1" aria-labelledby="purchaseModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="purchaseModalLabel">Purchase Confirmation</h5>
                    <button type="button" class="btn-close" id="modalClose" data-bs-dismiss="modal" aria-label="Close"> X </button>
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

    // Create a container for the modal and set its HTML content
let modalContainer = document.createElement('div');
modalContainer.innerHTML = modalContent;

// Append the modal container to the body of the document
document.body.appendChild(modalContainer);

// creating a Bootstrap Modal using the modal element and display it
let purchaseModal = new bootstrap.Modal(document.getElementById('purchaseModal'));
purchaseModal.show();

// Event listener for the OK button in the modal to clear checkout
document.getElementById('modalCloseButton').addEventListener('click', function () {
    // Remove 'purchased' data from local storage
    localStorage.removeItem('purchased');
    // Reset the 'purchased' array to an empty array
    purchased = [];
    // Call functions to update the checkout table and buttons
    checkTable();
    btnVisible();
    // Remove the modal container from the DOM
    modalContainer.remove();
});
// Event listener for the 'X' button in the modal to clear checkout
document.getElementById('modalClose').addEventListener('click', function () {
    // Remove 'purchased' data from local storage
    localStorage.removeItem('purchased');
    // Reset the 'purchased' array to an empty array
    purchased = [];
    // Call functions to update the checkout table and buttons
    checkTable();
    btnVisible();
    // Remove the modal container from the DOM
    modalContainer.remove();
});

}
// Event listener for the purchase button click
document.getElementById('purchaseButton').addEventListener('click', purchaseAct);
// Call the visibility toggle function initially after the page loads so that the button does not appear
window.addEventListener('load', btnVisible);
