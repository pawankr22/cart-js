let label = document.getElementById('label');
let shoppingCart = document.getElementById('shopping-cart');

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculateTotal = () => {
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.reduce((acc, item) => {
        return acc + item.item;
    }, 0);
};

calculateTotal(); // calling the function

let generateCartItems = () => {
    if (basket.length !== 0) {
        return shoppingCart.innerHTML = basket.map((items) => {
            let { id, item } = items;
            let search = shopItemsData.find((product) => product.id === id) || [];
            let { name, price, image } = search;
            return `
            <div class="cart-item">
                <img width="100" src=${image} alt="" />
                <div class="details">

                    <div class="title-price-x">
                        <h4 class = "title-price">
                            <p>${name}</p>
                            <p class="cart-item-price">₹ ${price}</p>
                        </h4>
                        <i onclick="clearCart(${id})" class="bi bi-trash"></i>
                    </div>

                    <div class="button">
                        <i onclick="decrement(${id})" class="bi bi-dash"></i>
                        <div id=${id} class="quantity">${item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus"></i>
                    </div>

                    <h3>₹ ${item * search.price}</h3>

                </div>
            </div>
            `;
        })
            .join("");
    } else {
        shoppingCart.innerHTML = `<h1>Your cart is empty</h1>`;
        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="index.html">
            <button class="HomeBtn">Back to home</button>
        </a>
        `;
    }
};

generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((item) => item.id === selectedItem.id);

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    localStorage.setItem('data', JSON.stringify(basket));
    generateCartItems();
    update(selectedItem.id);
};

// Function to decrement the quantity
let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((item) => item.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((item) => item.item !== 0);
    generateCartItems()

    localStorage.setItem('data', JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((item) => item.id === id);    // Searching the item
    console.log(search.item); // Quantity
    document.getElementById(id).innerHTML = search.item; // Updating the quantity
    calculateTotal();
    calculateTotalPrice();
};

let clearCart = (id) => {
    let selectedItem = id;
    basket = basket.filter((items) => items.id !== selectedItem.id);
    generateCartItems();
    calculateTotalPrice();
    calculateTotal();

    localStorage.setItem('data', JSON.stringify(basket));
};

let clear = ()=> {
    basket = [];
    generateCartItems();
    calculateTotalPrice();
    calculateTotal();
    localStorage.setItem('data', JSON.stringify(basket));
}


let calculateTotalPrice = () => {
    if(basket.length !== 0) {
        let totalPrice = basket.map((items) => {
            let { id, item } = items;
            let search = shopItemsData.find((product) => product.id === id) || [];
            return item * search.price;
        }).reduce((acc, item) => acc + item, 0);
        label.innerHTML = `
        <h2>Total: ₹ ${totalPrice}</h2>
        <button class="checkoutBtn">Checkout</button>
        <button onclick="clear()" class="removeBtn">Cancel</button>
        `;

    }
};

calculateTotalPrice();
