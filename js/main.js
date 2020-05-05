const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");


cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

function toggleModal() {
   modal.classList.toggle("is-open");
}


//day 1

const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');


let login = localStorage.getItem('gloDelivery');

function toggleModalAuth() {
   modalAuth.classList.toggle('is-open');
}

function checkLogin(login) {

   if(login == '') {
      alert('Please,input login');
      return false;
   }
   return true;
}


function autorized() {
   
   function logOut() {
      login = null;
      localStorage.removeItem('gloDelivery');
      userName.style.display = '';
      buttonOut.style.display = '';
      buttonAuth.style.display = '';

      buttonOut.removeEventListener('click', logOut);

      checkAuth();
   }

   userName.textContent = login;

   buttonAuth.style.display = 'none';
   userName.style.display = 'inline';
   buttonOut.style.display = 'block';

   buttonOut.addEventListener('click', logOut);
}

function notAuthorized() {

   function logIn(event) {
      event.preventDefault();
      login = loginInput.value;

      while(!checkLogin(login))
      {
         login = null;
         toggleModalAuth();
      }

      localStorage.setItem('gloDelivery',login);

      toggleModalAuth();
      buttonAuth.removeEventListener('click', toggleModalAuth);
      closeAuth.removeEventListener('click',toggleModalAuth);
      logInForm.removeEventListener('submit',logIn);
      logInForm.reset();
      checkAuth();
   }

   buttonAuth.addEventListener('click', toggleModalAuth);
   closeAuth.addEventListener('click',toggleModalAuth);
   logInForm.addEventListener('submit',logIn);
}

function checkAuth() {
   if(login) {
      autorized();
   } else {
      notAuthorized();
   }
}

checkAuth();