const doc = document;

const email = doc.getElementById('email');
const password = doc.getElementById('password');
const form = doc.getElementById('form');
const loginBtn = doc.getElementById('login-btn');

const users = JSON.parse(localStorage.getItem('users'));

form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const userEmail = email.value;
    const pass = password.value;

    for(let obj of users){
        if(obj.email === userEmail){
            if(obj.password === pass){
                alert('Successfully logged in');
                location.href = './shop.html';
            }
            else{
                alert('Incorrect email or password');
                return;
            }
        }
    }
})