

// Declaring an empty array
let items = []

// Constructor function for creating product objects
function Constructor(id, name, description, price, url){
    this.id = id
    this.name = name
    this.description = description
    this.price = price
    this.url = url
    this.quantity = 1
}
// Adding products
let product1 = new Constructor(1, 'Xbox Series X Bundle', 'Xbox Series X 1TB + 3 Games + Controller', 11999, 'https://i.postimg.cc/gkqSwWj9/XBOX-SX-BNDL.jpg');
let product2 = new Constructor(2, 'PS5 Spider-Man Bundle', 'PS5 1TB + Spider-Man + Controller', 12999, 'https://i.postimg.cc/pXtcXT2Y/PS5-SPIDER.jpg');
let product3 = new Constructor(3, 'PS5 Slim COD Bundle', 'PS5 1TB + Call Of Duty Modern Warfare III + Controller', 12499, 'https://i.postimg.cc/Mp0FWSD9/Ps5SLim.jpg');
let product4 = new Constructor(4, 'Xbox Series S Bundle', 'Xbox Series S + 3 Games + Controller ', 8499, 'https://i.postimg.cc/xdB9NZqJ/XBOXBNDL2.jpg');
let product5 = new Constructor(5, 'PS5 Glacier White', 'PS5 Glacier White Disc Edition 1TB + Controller', 10999, 'https://i.postimg.cc/63z2GWVY/PS5-Glacier.jpg');
let product6 = new Constructor(6, 'Xbox Series X Bundle', 'Xbox Series X 1TB + Diablo V + Controller', 10499, 'https://i.postimg.cc/c4MM5rSc/XBXSX-bndly1.jpg');

// Pushing the products into the empty array
items.push(product1, product2, product3, product4, product5, product6)
localStorage.setItem('items', JSON.stringify(items))
items = JSON.parse(localStorage.getItem('items'))

let table = document.querySelector('table')

// Function to render the products in the table
function corne(){
    // Creating table header 
    let tableHead = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Image</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
    `
    // Creating table based on items information
    let tableBody = `
        <tbody>
            ${items.map(function (item, index) {
                return `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>R${item.price}</td>
                        <td>${item.description}</td>
                        <td><img src='${item.url}' class="adminImg"/></td>
                        <td><button class="edit">Edit</button></td>
                        <td><button class='delete' value='${index}'>Delete</button></td>
                    </tr>
                `;
            }).join('')}
        </tbody>
    `
    // Adding Add Products button 
    let addBtn = `
    <div class="btnAdd">
    <button class="addBtn" id="adminAdd"> Add Products </button>
    </div>
    `;
    table.innerHTML = tableHead + tableBody + addBtn
}
corne()

function favourite(){
    // sets the array in local storage
    localStorage.setItem('items',JSON.stringify(items))
    items = JSON.parse(localStorage.getItem('items'))
    // JSON.parse converts string to array
}

// Function to remove an item from the items array based on its position
function remove(position) {
    items.splice(position, 1) // Removes the item at the specified position from the items array
    favourite() // Updates the local storage with the modified 'items' array
    corne() // Renders the updated table after the item is removed
}

// Event listener for table clicks
table.addEventListener('click', function() {
    // Checks if the clicked element contains the class delete
    if (event.target.classList.contains('delete')) {
        remove(event.target.value) 
        // Calls the 'remove' function with the value (index) of the clicked delete button
        // Checks if all items are deleted (items.length === 0), then renders a spinner
        if (items.length === 0) {
            renderSpinner() 
            // Renders a spinner in the table when all items are deleted
        }
    }
})

// Function to render spinner when all items are deleted
function renderSpinner() {
    // HTML for the spinner component
    let spinnerHTML = `
        <div class="d-flex justify-content-center">
            <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    `
    // Replace the entire table content with the spinner
    table.innerHTML = spinnerHTML
    // Remove table border styling
    table.style.border = 'none'
}

// Event listener for 'Add Products' button click to display the modal
document.getElementById('adminAdd').addEventListener('click', function(){

    // Display the modal using innerHTML
    document.getElementById('modal').innerHTML = `
        <div id="addItemModal" class="modal fade" tabindex="-1" aria-labelledby="addItemModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="addItemModalLabel">Add New Item</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="addItemForm">
                        <label for="itemId">ID:</label>
                        <input type="number" id="itemId" required>
                        <label for="itemName">Name:</label>
                        <input type="text" id="itemName" required>
                        <label for="itemDescription">Description:</label>
                        <input type="text" id="itemDescription" required>
                        <label for="itemPrice">Price:</label>
                        <input type="number" id="itemPrice" required>
                        <input type="submit" value="Add Item">
                    </form>
                </div>
            </div>
        </div>
    </div>
    `;

    // Show the modal
    let addItemModal = new bootstrap.Modal(document.getElementById('addItemModal'));
    addItemModal.show();

    // Add an event listener to the form inside the modal to handle new item addition
    document.getElementById('addItemForm').addEventListener('submit', function (event) {
        event.preventDefault();
        // Get values from the form
        let newItemId = document.getElementById('itemId').value;
        let newItemName = document.getElementById('itemName').value;
        let newItemDescription = document.getElementById('itemDescription').value;
        let newItemPrice = document.getElementById('itemPrice').value;

        // Create a new item object
        let newItem = {
            id: parseInt(newItemId),
            name: newItemName,
            description: newItemDescription,
            price: parseInt(newItemPrice),
            url: 'https://i.postimg.cc/3rZ0H0D8/profile-Image.png',
            quantity: 1,
        };

        // Add the new item to the items array
        items.push(newItem);

        // Save the updated items array to local storage
        localStorage.setItem('items', JSON.stringify(items));

        // Refresh the table to display the new item
        corne();

        // Hide the modal
        addItemModal.hide();
    });
});

    