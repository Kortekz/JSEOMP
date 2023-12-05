

let purchased = [];
let main = document.querySelector('main');
let items = JSON.parse(localStorage.getItem('items'));
let sortButton = document.querySelector('[sortBtn]')

function add(index) {
    purchased.push(items[index]);
    localStorage.setItem('purchased', JSON.stringify(purchased));
}

function renderProducts() {
    let productContainer = document.createElement('div');
    productContainer.classList.add('product-container', 'd-flex', 'justify-content-center', 'flex-wrap');

    items.forEach(function (item, index) {
        let productCard = document.createElement('div');
        productCard.classList.add('product-card', 'card', 'text-center', 'mx-2', 'my-3', 'p-3');
        productCard.innerHTML = `
            <img src="${item.url}" class="card-img-top product-image" alt="${item.name}">
            <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text">${item.description}</p>
                <p class="card-price">R${item.price}</p>
                <button class="btn1 btn-primary add-to-cart-btn" data-index="${index}">Add To Cart</button>
            </div>
        `;
        
        productCard.querySelector('.add-to-cart-btn').addEventListener('click', function () {
            add(index);
        });

        productContainer.appendChild(productCard);
    });

    main.appendChild(productContainer);
}
renderProducts();

// function to sort products
function sortProducts() {
    items.sort((a, b) => {
        let priceA = a.price
        let priceB = b.price

        if (priceA < priceB){
            return -1
        } 
        if (priceA > priceB) {
            return 1
        }
        return 0
    })
}
sortButton.addEventListener('click', ()=> {
    sortProducts()
    renderProducts()
})

