

// Declaring an empty array
let purchased = []

// Decalring necessary DOM elements
let main = document.querySelector('main')
let items = JSON.parse(localStorage.getItem('items'))
let sortButton = document.querySelector('[data-sort]')
let searchInput = document.querySelector('.textSearch')
let searchButton = document.querySelector('.searchBtn')
let productContainer = document.querySelector('[data-Products]')

// Function to add a product to the purchased array
function add(index) {
    purchased.push(items[index]);
    localStorage.setItem('purchased', JSON.stringify(purchased))
}
// Function to render products
function renderProducts(products) {
    productContainer.innerHTML = ''
    products.forEach(function (item, index) {
        let productCard = document.createElement('div')
        productCard.className = 'product-card card text-center mx-2 my-3 p-3'
        productCard.innerHTML = `
            <img src="${item.url}" class="card-img-top product-image" alt="${item.name}">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
                <p class="card-price">R${item.price}</p>
                <button class="btn1 btn-primary add-to-cart-btn" data-index="${index}">Add To Cart</button>
            </div>
        `
        // Adding event listener to Add To Cart button
        productCard.querySelector('.add-to-cart-btn').addEventListener('click', function () {
            add(index)
        })
        // Attach product card to the product container
        productContainer.appendChild(productCard);
    })
}
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
    renderProducts(items)
}
// Function to filter products based on search text
function filterProducts(searchText) {
    let searchItems = items.filter(
        (item) =>
            item.name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.description.toLowerCase().includes(searchText.toLowerCase())
    )
    if (searchItems.length === 0) {
        productContainer.innerHTML = '<p class="footP"> The Item(s) were not Found. </p>'
    } else {
        renderProducts(searchItems)
    }
}
    // Event listener for Sort button click
    sortButton.addEventListener('click', sortProducts)
    // Event listener for search button click
    searchButton.addEventListener('click', function () {
        let searchText = searchInput.value.trim()
        filterProducts(searchText)
    })

// rendering of products
renderProducts(items)