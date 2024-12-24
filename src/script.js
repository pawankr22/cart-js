let shop = document.getElementById('shop');

// Shop items data


let basket = JSON.parse(localStorage.getItem("data")) || [];  // Array to store the selected items

// Function to generate the shop items
let generateShop = () => {
    return (shop.innerHTML = shopItemsData.map((items) => {
        let { id, name, price, description, image } = items;
        let search = basket.find((item) => item.id === id) || [];
        return `
    <div id=product-id-${id} class="item">
            <img width="220" src=${image} alt="image">
            <div class="details">
                <h3>${name}</h3>
                <p>${description}</p>
                <div class="price-quantity">
                    <h2>₹${price}</h2>
                    <div class="button">
                        <i onclick="decrement(${id})" class="bi bi-dash"></i>
                        <div id=${id} class="quantity">
                        ${search.item === undefined ? 0 : search.item}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus"></i>
                    </div>
                </div>
            </div>
        </div>
    `;
    }).join("")); // join() method is used to join the array elements into a string
};

generateShop(); // calling the function

// Function to increment the quantity
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
    // console.log(basket);
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
    // console.log(basket);
    
    localStorage.setItem('data', JSON.stringify(basket));
};

// Function to update the quantity
let update = (id) => {
    let search = basket.find((item) => item.id === id);    // Searching the item
    console.log(search.item); // Quantity
    document.getElementById(id).innerHTML = search.item; // Updating the quantity
    calculateTotal();
};

// Function to calculate the total
let calculateTotal = () => {
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.reduce((acc, item) => {
        return acc + item.item;
    }, 0);
};

calculateTotal(); // calling the function