const doc = document;
const base_url = "https://fakestoreapi.com/products?limit=20";

const mens = doc.querySelector('.mens');
const womens = doc.querySelector('.womens');
const jewellery = doc.querySelector('.jewelery');
const electronics = doc.querySelector('.electronics');

const allBtn = doc.getElementById('all');
const mensBtn = doc.getElementById('mens');
const womensBtn = doc.getElementById('womens');
const jewelleryBtn = doc.getElementById('jewelery');
const electronicsBtn = doc.getElementById('electronics');
let parsedData;

async function callAPI(){
    const rawData = await fetch(base_url);
    parsedData = await rawData.json();
    renderData(parsedData);
}

function renderData(data){
    data.forEach(obj => {
        createData(obj);
    })
}

function createData(item){
    const div = doc.createElement('div');
    div.className = 'item';
    div.innerHTML = `
    <div class="item-img">
        <img src="${item.image}" alt="${item.title}">
    </div>
    <div class="details">
        <div class="top">
            <div class="price-tag">$${item.price}</div>
            <div class="size">${getRandomSize()}</div>
        </div>
        <div class="colors">
            Colors: 
            <div class="color-list">
                ${getRandomColors()}
            </div>
        </div>
        <div class="rating">
            Rating: 
            <div class="rating-stars">
                ${generateStars(item.rating.rate)}
            </div>
        </div>
    </div>
    <button class="addBtn" onclick="addToCart(${item.id})">Add To Cart</button>
    `
    if(item.category === "men's clothing"){
        doc.querySelector('.mens > .item-list').appendChild(div);
    }
    else if(item.category === "women's clothing"){
        doc.querySelector('.womens > .item-list').appendChild(div);
    }
    else if(item.category === "jewelry"){
        doc.querySelector('.jewelery > .item-list').appendChild(div);
    }
    else{
        doc.querySelector(".electronics > .item-list").appendChild(div);
    }
}

function addToCart(item){
    let userCart = JSON.parse(sessionStorage.getItem('userCart'));
    if(userCart === null) userCart = [];
    userCart.push(parsedData[item]);
    sessionStorage.setItem('userCart', JSON.stringify(userCart));
}

function generateStars(rating){
    rating = Math.round(rating);
    let res = ``;
    for(let i=0; i<rating; i++){
        res += `<div class="star"><img src="resources/star.svg" alt="" srcset=""></div>`
    }
    return res;
}

function getRandomColors(){
    const colorArray = ['red', 'blue', 'green', 'black', 'white'];
    let res = [];
    for(let i=0; i<3; i++){
        const random = Math.floor(Math.random()*colorArray.length);
        if(res.includes(colorArray[random])) continue;
        res.push(colorArray[random]);
    }

    return res.reduce((list, color) => {
        return list + `<div class="color" style="background-color: ${color};"></div>`
    }, ``)
}

function getRandomSize(){
    const sizes = ['XS', 'S', 'M', 'L', 'XL'];

    let res = [];

    for(let i=0; i<3; i++){
        const random = Math.floor(Math.random()*sizes.length);
        if(res.includes(sizes[random])) continue;
        res.push(sizes[random]);
    }

    return res.join(',');
}

function showAll(){
    mens.style.display = 'block';
    womens.style.display = 'block';
    jewellery.style.display = 'block';
    electronics.style.display = 'block';
}

function showMenCategory(){
    mens.style.display = 'block';
    womens.style.display = 'none';
    jewellery.style.display = 'none';
    electronics.style.display = 'none';
}

function showWomenCategory(){
    mens.style.display = 'none';
    womens.style.display = 'block';
    jewellery.style.display = 'none';
    electronics.style.display = 'none';
}

function showJewelery(){
    mens.style.display = 'none';
    womens.style.display = 'none';
    jewellery.style.display = 'block';
    electronics.style.display = 'none';
}
function showElectronics(){
    mens.style.display = 'none';
    womens.style.display = 'none';
    jewellery.style.display = 'none';
    electronics.style.display = 'block';
}

callAPI();
