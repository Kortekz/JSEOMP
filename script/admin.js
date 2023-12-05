


let items = [];

// Constructor function
function Constructor(id, name, description, price, url){
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.url = url;
}

let product1 = new Constructor(1, 'Xbox Series X Bundle', 'Xbox Series X 1TB + 3 Games + Controller', 11999, 'https://i.postimg.cc/gkqSwWj9/XBOX-SX-BNDL.jpg');
let product2 = new Constructor(2, 'PS5 Spider-Man Bundle', 'PS5 1TB + Spider-Man + Controller', 12999, 'https://i.postimg.cc/pXtcXT2Y/PS5-SPIDER.jpg');
let product3 = new Constructor(3, 'PS5 Slim COD Bundle', 'PS5 1TB + Call Of Duty Modern Warfare III + Controller', 12499, 'https://i.postimg.cc/Mp0FWSD9/Ps5SLim.jpg');
let product4 = new Constructor(4, 'Xbox Series S Bundle', 'Xbox Series S + 3 Games + Controller ', 8499, 'https://i.postimg.cc/xdB9NZqJ/XBOXBNDL2.jpg');
let product5 = new Constructor(5, 'PS5 Glacier White', 'PS5 Glacier White Disc Edition 1TB + Controller', 10999, 'https://i.postimg.cc/63z2GWVY/PS5-Glacier.jpg');

items.push(product1, product2, product3, product4, product5);
localStorage.setItem('items', JSON.stringify(items));
items = JSON.parse(localStorage.getItem('items'));

let table = document.querySelector('table');

function corne(){
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
    `;

    let tableBody = `
        <tbody>
            ${items.map(function (item, index) {
                return `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                        <td>R${item.price}</td>
                        <td>${item.description}</td>
                        <td><img src='${item.url}' width="150px" height="150px"/></td>
                        <td><button class="edit">Edit</button></td>
                        <td><button class='delete' value='${index}'>Delete</button></td>
                    </tr>
                `;
            }).join('')}
        </tbody>
    `;

    table.innerHTML = tableHead + tableBody;
}

corne();


function favourite(){
    // sets the array in local storage
    localStorage.setItem('items',JSON.stringify(items))
    // sets the array from local storage to array(items) in code
    items = JSON.parse(localStorage.getItem('items'))
    // JSON.parse converts string to array
}

// function to remove items
// Nested function
function remove(position){
    items.splice(position, 1)
}
let deleteButton = document.querySelector('.delete')
// also another nested function
function remove(position){
    items.splice(position, 1)
    favourite()
    corne()
}
table.addEventListener('click', function(){
    if(event.target.classList.contains('delete')){
        remove(event.target.value)
        // alert(event.target.value)
    }
})


