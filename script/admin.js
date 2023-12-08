



// Declaring an empty array
let items = []

// Constructor function for creating product objects
function Constructor(id, name, description, price, url) {
  this.id = id
  this.name = name
  this.description = description
  this.price = price
  this.url = url
  this.quantity = 1
}
// Adding products
let product1 = new Constructor(
  1,
  "Xbox Series X Bundle",
  "Xbox Series X 1TB + 3 Games + Controller",
  11999,
  "https://i.postimg.cc/gkqSwWj9/XBOX-SX-BNDL.jpg"
)

let product2 = new Constructor(
  2,
  "PS5 Spider-Man Bundle",
  "PS5 1TB + Spider-Man + Controller",
  12999,
  "https://i.postimg.cc/pXtcXT2Y/PS5-SPIDER.jpg"
)

let product3 = new Constructor(
  3,
  "PS5 Slim COD Bundle",
  "PS5 1TB + Call Of Duty Modern Warfare III + Controller",
  12499,
  "https://i.postimg.cc/Mp0FWSD9/Ps5SLim.jpg"
)

let product4 = new Constructor(
  4,
  "Xbox Series S Bundle",
  "Xbox Series S + 3 Games + Controller ",
  8499,
  "https://i.postimg.cc/xdB9NZqJ/XBOXBNDL2.jpg"
)

let product5 = new Constructor(
  5,
  "PS5 Glacier White",
  "PS5 Glacier White Disc Edition 1TB + Controller",
  10999,
  "https://i.postimg.cc/63z2GWVY/PS5-Glacier.jpg"
)

let product6 = new Constructor(
  6,
  "Xbox Series X Bundle",
  "Xbox Series X 1TB + Diablo V + Controller",
  10499,
  "https://i.postimg.cc/c4MM5rSc/XBXSX-bndly1.jpg"
)

// Pushing the products into the empty array
items.push(product1, product2, product3, product4, product5, product6)
localStorage.setItem("items", JSON.stringify(items))
items = JSON.parse(localStorage.getItem("items"))

let table = document.querySelector("table")

// Function to render the products in the table
function tableDisplay() {
  // Sort Button
  let sortBtn = `
     <div class="sorts">
     <button class="sortBtn1" id="sorting" data-sort> Sort Products </button>
     </div>
     `
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
            ${items
              .map(function (item, index) {
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
                `
              })
              .join("")}
        </tbody>
    `
  // Adding Add Products button
  let addBtn = `
    <div class="btnAdd">
    <button class="addBtn" id="adminAdd"> Add Products </button>
    </div>
    `

  table.innerHTML = sortBtn + tableHead + tableBody + addBtn

  // Iterate through each 'Edit' button and add event listeners
  document.querySelectorAll(".edit").forEach((editButton, index) => {
    editButton.addEventListener("click", () => {
      displayEditModal(items[index], index)
      // Pass the item and its index for editing
    })
    
  })
}
tableDisplay()

function modified() {
  // sets the array in local storage
  localStorage.setItem("items", JSON.stringify(items))
  items = JSON.parse(localStorage.getItem("items"))
  // JSON.parse converts string to array
}

// Function to remove an item from the items array based on its position
function remove(position) {
  items.splice(position, 1) 
  // Removes the item at the specified position from the items array
  modified()
  // Updates the local storage with the modified 'items' array
  tableDisplay()
  // Renders the updated table after the item is removed
}

// Sort button
// Function to sort products by price
function sortProducts() {
  items.sort((a, b) => {
    let priceA = a.price
    let priceB = b.price
    if (priceA < priceB) {
      return -1
    }
    if (priceA > priceB) {
      return 1
    }
    return 0
  })
}
// declaring the sort button to a variable with DOM
let sortBtn = document.querySelector("[data-sort]")
sortBtn.addEventListener("click", () => {
  sortProducts()
  tableDisplay()
  addProducts()
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
  table.style.border = "none"
}

// Event listener for table clicks
table.addEventListener("click", function () {
  // Checks if the clicked element contains the class delete
  if (event.target.classList.contains("delete")) {
    remove(event.target.value)
    // Calls the 'remove' function with the value (index) of the clicked delete button
    // Checks if all items are deleted (items.length === 0), then renders a spinner
    if (items.length === 0) {
      renderSpinner()
      // Renders a spinner in the table when all items are deleted
    }
  }
})

// Function for the add products
function addProducts() {
  // Event listener for Add Products button click to display the modal
  document.getElementById("adminAdd").addEventListener("click", function () {
    try {
      // Displaying the modal using innerHTML
      document.getElementById("modal").innerHTML = `
        <div id="showModal" class="modal fade" tabindex="-1" aria-labelledby="showModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="showModalLabel">Add New Item</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"> X </button>
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
      let showModal = new bootstrap.Modal(
        document.getElementById("showModal")
      )
      showModal.show()

      // Add an event listener to the form inside the modal to handle new item addition
      document
        .getElementById("addItemForm")
        .addEventListener("submit", function (event) {
          event.preventDefault()
          // Get values from the form
          let newId = document.getElementById("itemId").value
          let newName = document.getElementById("itemName").value
          let newDescription = document.getElementById("itemDescription").value
          let newPrice = document.getElementById("itemPrice").value

          // Create a new item object
          let newItem = {
            id: parseInt(newId),
            name: newName,
            description: newDescription,
            price: parseInt(newPrice),
            url: "https://i.postimg.cc/3rZ0H0D8/profile-Image.png",
            quantity: 1,
          }

          // Add the new item to the items array
          items.push(newItem)

          // Save the updated items array to local storage
          localStorage.setItem("items", JSON.stringify(items))

          // Refresh the table to display the new item
          tableDisplay()

          // Hide the modal
          showModal.hide()
          addProducts()
        })
    } catch (error) {
      console.error("An error occurred while adding products:", error)
      // Handle the error condition, show a message to the user, or perform necessary actions
    }
  })
}
addProducts()

// This is the logic for the edit button/modal
// Function to display the edit modal with the selected item's details
function displayEditModal(item, index) {
  document.getElementById("modal").innerHTML = `
    <div id="editItemModal" class="modal fade" tabindex="-1" aria-labelledby="editItemModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editItemModalLabel">Edit Item</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"> X </button>
          </div>
          <div class="modal-body">
            <form id="editItemForm">
              <input type="hidden" id="editItemIndex" value="${index}"> <!-- Store the index -->
              <label for="editItemId">ID:</label>
              <input type="number" id="editItemId" value="${item.id}" required>
              <label for="editItemName">Name:</label>
              <input type="text" id="editItemName" value="${item.name}" required>
              <label for="editItemDescription">Description:</label>
              <input type="text" id="editItemDescription" value="${item.description}" required>
              <label for="editItemPrice">Price:</label>
              <input type="number" id="editItemPrice" value="${item.price}" required>
              <input type="submit" value="Save Changes">
            </form>
          </div>
        </div>
      </div>
    </div>
  `

  let editItemModal = new bootstrap.Modal(
    document.getElementById("editItemModal")
  )
  editItemModal.show()

  document
    .getElementById("editItemForm")
    .addEventListener("submit", function (event) {
      event.preventDefault()
      // Retrieve updated values from the form
      let editedItemIndex = parseInt(
        document.getElementById("editItemIndex").value
      )
      items[editedItemIndex].id = parseInt(
        document.getElementById("editItemId").value
      )
      items[editedItemIndex].name =
        document.getElementById("editItemName").value
      items[editedItemIndex].description = document.getElementById(
        "editItemDescription"
      ).value
      items[editedItemIndex].price = parseInt(
        document.getElementById("editItemPrice").value
      )

      localStorage.setItem("items", JSON.stringify(items))
      tableDisplay()
      editItemModal.hide()
      addProducts()
    })
}
