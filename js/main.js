'use strict';

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const buttonAuth = document.querySelector('.button-auth');
const modalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const logInForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('gloDelivery');
let count = 0;

const getData = async function(url) { //асинхронная функция

   const response = await fetch(url); //асинхронный запрос данных(не останавливает выполнение приложения)

   if(!response.ok) {
      throw new Error(`Ошибка по адрессу ${url}, 
         статус ошибки ${response.status}!`);
   }

   return await response.json();  //ждём выполнение функции json и потом возвращаем объект

};

console.log(getData('./db/partners.json'));

function toggleModalAuth() {
   modalAuth.classList.toggle('is-open');
   loginInput.style.borderColor = '';
}

function toggleModal() {
   modal.classList.toggle("is-open");
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

      if(login == '') {

         loginInput.style.borderColor = 'tomato';

      } else {

         localStorage.setItem('gloDelivery',login);

         toggleModalAuth();

         buttonAuth.removeEventListener('click', toggleModalAuth);
         closeAuth.removeEventListener('click',toggleModalAuth);
         logInForm.removeEventListener('submit',logIn);
         logInForm.reset();

         checkAuth();
      }
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


function createCardRestaurant(restaurant) {

   const { 
      image,
      kitchen, 
      name, 
      price, 
      stars, 
      products, 
      time_of_delivery: timeOfDelivery
   } = restaurant;

   const card = `	
      <a class="card card-restaurant" data-products="${products}">
         <img src= ${image} alt="image" class="card-image"/>
         <div class="card-text">
            <div class="card-heading">
               <h3 class="card-title">${name}</h3>
               <span class="card-tag tag">${timeOfDelivery} минут</span>
            </div>
            <!-- /.card-heading -->
            <div class="card-info">
               <div class="rating">
                  ${stars}
               </div>
               <div class="price">От ${price} ₽</div>
               <div class="category">${kitchen}</div>
            </div>
         </div>
      </a>
   `;

   cardsRestaurants.insertAdjacentHTML('beforeend',card);

}

function createCardGood(goods) {

   const { description, id, image, name, price } = goods;


   const headInfo = `
         <div class="section-heading">
         <h2 class="section-title restaurant-title">Пицца Плюс</h2>
         <div class="card-info">
            <div class="rating">
               4.5
            </div>
            <div class="price">От 900 ₽</div>
            <div class="category">Пицца</div>
         </div>
         <!-- /.card-info -->
         </div>
   `

   const card = document.createElement('div');
   card.className = 'card';
   card.insertAdjacentHTML('beforeend', `
				<img src= ${image} alt="image" class="card-image"/>
				<div class="card-text">
					<div class="card-heading">
						<h3 class="card-title card-title-reg">${name}</h3>
					</div>
					<!-- /.card-heading -->
					<div class="card-info">
                  <div class="ingredients">
                     ${description}
						</div>
					</div>
					<!-- /.card-info -->
					<div class="card-buttons">
						<button class="button button-primary button-add-cart">
							<span class="button-card-text">В корзину</span>
							<span class="button-cart-svg"></span>
						</button>
						<strong class="card-price-bold">${price} ₽</strong>
               </div>
            </div>   
   `);

   if((count++) == 0) cardsMenu.insertAdjacentHTML('beforebegin',headInfo);
   cardsMenu.insertAdjacentElement('beforeend',card);
}

function openGoods(event) {

      if(!login) {
         toggleModalAuth();  
      } else {
         const target =  event.target;
      
         const restaurant = target.closest('.card-restaurant');

         if(restaurant) {
            cardsMenu.textContent = '';
            containerPromo.classList.add('hide');
            restaurants.classList.add('hide');
            menu.classList.remove('hide');
            getData(`./db/${restaurant.dataset.products}`).then(function(data){
               data.forEach(createCardGood);
            });


            window.scrollTo(0,0);
         }
      }
}


function init() {

   getData('./db/partners.json').then(function(data) {  //callback функция
      data.forEach(createCardRestaurant);
   });
   
   checkAuth();
   
   cardsRestaurants.addEventListener('click', openGoods);
   cartButton.addEventListener("click", toggleModal);
   close.addEventListener("click", toggleModal);
   
   logo.addEventListener('click',function() {
       window.scrollTo(0,0);
       containerPromo.classList.remove('hide');
       restaurants.classList.remove('hide');
       menu.classList.add('hide');
   });

}


init();



