const doc = document;

const email = doc.getElementById('email');
const password = doc.getElementById('password');
const form = doc.getElementById('form');
const loginBtn = doc.getElementById('login-btn');


form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const userEmail = email.value;
    const pass = password.value;
    
    const users = JSON.parse(localStorage.getItem('users'));
    console.log(users);
    if(users === null){
        alert("Email doesn't exists, Signup to continue!!");
        location.href = './signup.html';
        return;
    }
    for(let obj of users){
        if(obj.email === userEmail){
            if(obj.password === pass){
                alert('Successfully logged in');
                sessionStorage.setItem('loggedInUser', JSON.stringify(obj));
                sessionStorage.setItem('token', generateToken());
                location.href = './shop.html';
            }
            else{
                alert('Incorrect email or password');
                return;
            }
        }
    }
})

function generateToken(){
    let token = '';
    for(let i=0; i<12; i++){
        token += Math.floor(Math.random() * 10);
    }
    console.log(token);
    return token;
}