const doc = document;

const checkoutItems = JSON.parse(sessionStorage.getItem('userCart'));

const itemList = doc.getElementById('items-list');
const bill = doc.getElementById('checkout-list');
const total = doc.getElementById('total-amt');

let totalCost = 0;

function renderData(){
    for(let obj of checkoutItems){
        createData(obj);
    }

    total.innerHTML = `$${totalCost}/-`;
}

function createData(item){
    const div = doc.createElement('div');
    const billItem = doc.createElement('div');
    

    div.className = 'item';
    div.id = `item_${item.id}`
    div.innerHTML = `
        <div class="item-img">
            <img src="${item.image}" alt="${item.title}">
        </div>
        <div class="details">
            <div class="title">
                Title: ${item.title}
            </div>
            <div class="price">
                Price: $${item.price}
            </div>
        </div>
        <button type="button" onclick="removeItem(${item.id}, ${item.price})" id="remove-item">Remove From Cart</button>
    `

    billItem.className = 'checkout-item'
    billItem.id = `checkout_${item.id}`;
    billItem.innerHTML = `
        <div class="item-title">${item.title}</div>
        <div class="item-price">$${item.price}</div>
    `
    totalCost += item.price;
    bill.appendChild(billItem);
    itemList.appendChild(div);
}


function removeItem(id, price){
    const item = doc.getElementById(`item_${id}`);
    const checkoutItem = doc.getElementById(`checkout_${id}`);
    totalCost -= Number(price);
    total.innerHTML = `$${totalCost}/-`;
    item.remove();
    checkoutItem.remove();
}

renderData();