const menuSelection = document.getElementsByName('menu-selection');
const selectedMenuItem = document.getElementById('selected-menu-item');
const foodList = document.getElementById('food-list');
const orderButton = document.getElementById('order-button');
const selectedItems = document.getElementById('selected-items');
const selectedItemsList = document.getElementById('selected-items-list');
const totalAmount = document.getElementById('total-amount');

const foodItems = {
    'starter': [
        { name: 'Masala Papad', price: 59.00 },
        { name: 'Tomato Basil Soup', price: 169.00 },
        { name: 'Veg Spring Roll', price: 269.00 }
    ],
    'main-course': [
        { name: 'Veg Toofani', price: 279.00 },
        { name: 'Veg Kolhapuri', price: 299.00 },
        { name: 'Veg Hydrabadi', price: 279.00 },
        { name: 'Butter Roti', price: 39.00 },
        { name: 'Butter Naan', price: 59.00 },
        { name: 'Plain Roti', price: 29.00 }
    ],
    'dessert': [
        { name: 'Mango Juice', price: 120.00 },
        { name: 'Cheesecake', price: 220.00 },
        { name: 'Tiramisu', price: 200.00 }
    ],
};

for (let i = 0; i < menuSelection.length; i++) {
    menuSelection[i].addEventListener('change', updateSelectedFood);
}

orderButton.addEventListener('click', function () {
    selectedItemsList.innerHTML = '';
    let total = 0.00;
    const selectedItemsArray = [];
    const foodListItems = document.querySelectorAll('.food-list-item');
    foodListItems.forEach(item => {
        const itemName = item.querySelector('label').textContent;
        const quantity = item.querySelector('.quantity-input').value;
        if (quantity > 0) {
            const price = parseFloat(item.querySelector('.price-label').textContent.replace('Rs.', ''));
            const itemTotal = price * quantity;
            total += itemTotal;
            selectedItemsArray.push(`${quantity} x ${itemName} - Rs.${itemTotal.toFixed(2)}`);
        }
    });

    if (selectedItemsArray.length > 0) {
        selectedItemsArray.forEach(itemText => {
            const listItem = document.createElement('li');
            listItem.textContent = itemText;
            selectedItemsList.appendChild(listItem);
        });

        selectedItems.style.display = 'block';
        totalAmount.textContent = total.toFixed(2);
    } else {
        selectedItems.style.display = 'none';
        totalAmount.textContent = '0.00';
    }
});

function updateSelectedFood() {
    const selectedFoodList = [];

    for (let i = 0; i < menuSelection.length; i++) {
        const selectedCategory = menuSelection[i].value;
        const categoryItems = foodItems[selectedCategory];
        if (menuSelection[i].checked && categoryItems) {
            selectedFoodList.push(...categoryItems);
        }
    }

    // Clear previous food list
    foodList.innerHTML = '';

    if (selectedFoodList.length > 0) {
        selectedFoodList.forEach(food => {
            const listItem = document.createElement('li');
            listItem.classList.add('food-list-item');

            const foodNameLabel = document.createElement('label');
            foodNameLabel.textContent = food.name;
            foodNameLabel.setAttribute('for', `${food.name}-quantity`);

            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.classList.add('quantity-input');
            quantityInput.id = `${food.name}-quantity`;

            const priceLabel = document.createElement('span');
            priceLabel.classList.add('price-label');
            priceLabel.textContent = `Rs.${food.price.toFixed(2)}`;

            listItem.appendChild(foodNameLabel);
            listItem.appendChild(quantityInput);
            listItem.appendChild(priceLabel);
            foodList.appendChild(listItem);
        });
        selectedMenuItem.style.display = 'block';
        orderButton.style.display = 'block';
    } else {
        selectedMenuItem.style.display = 'none';
        orderButton.style.display = 'none';
    }
}


