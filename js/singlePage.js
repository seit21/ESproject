import { get, menuArray, isliked, removeItemFromStorage, addItemToStorage, getStorageItems } from "./utils.js";
import { header } from "./header.js";

// Call header function to set up header
header();
// Get references to DOM elements
const cardBox = get(".singleItem__main-box");
const mainNavbar = get(".main_navbar");

// Log cardBox to verify it's retrieved correctly
console.log(cardBox);

// Listen for DOMContentLoaded event to ensure all DOM elements are loaded before manipulation
document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    function displayProducts(id) {
        let categorySet = false; 

        

        menuArray.forEach((data) => {
            function formatPrice(price) {
                return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }
            function formatDiscountPrice(discountPrice) {
                return discountPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }
          
            if (data.id === id) {
                console.log(data.id, data.category, data.discountPercentage);
                const { id, title, price, rating, image, discountPrice } = data;

                if (!categorySet) {
                    mainNavbar.innerHTML = `
                        <a href="../html/headerFullSingle.html?category=${data.category[0]}">${data.category[0]} <i class="fa-solid fa-chevron-right"></i></a> 
                    `;
                    categorySet = true; 
                }

                let random = parseInt(Math.random() * 2000);
                let productHTML = `<div class="single__product" id="${id}">
 
                <div class="product_image">
                    <img src="${image}"  alt="item output">
                </div>
                <div class="product_description">
                    <div class="product_desc">
                      <div class="single__titleTop-box">
                        <div class="product_rating">
                          <span class="fa-solid fa-star star_rating fa-xs" style="color: #FFD43B;"></span>
                          <p>${rating}</p>
                          <p>(${random} отзывов)</p>
          
                      </div>
                        
                        
                       <div class="single__link">
                        <button class="like_icon"></button>
                        <p class="single__likedText"></p>
                       </div>
          
                      </div>
          
                        <div class="single__title-box">
                          
                          <p class="single_title">${title}</p>
                        <p>Доставка:   1 день, бесплатно </p>
                        </div>
                        
          
                        <div class="single__product-number">
                          <span>Количество:</span>
                          <div>
                            <div class="number-input">
                              <button class="minus-btn">-</button>
                              <input type="number" value="0" min="1" minlength="1" max="10"/>
                              <button class="plus-btn">+</button>
                            </div>
                            <p>В наличии 10</p>
                          </div>
                        </div>
          
                        <div class="single__price-box">
                          <span>Цена:</span>
                          <div>
                            <div class="product_price_desc">
                              <p class="first_price">${formatPrice(price * 1000)} сум</p>
                              <p class="discount_price">${formatDiscountPrice(discountPrice * 1000)} сум</p>
                             </div>
                            </div>
                          </div>
          
          
                          <div class="product_monthly_price">
                            <button>
                              <p>${parseInt(discountPrice * 1000 / 6)} сум/мес</p>
                              <span> в рассрочку</span>
                            </button>
                    </div>
          
          
                    <div class="single__basket-box">
                        <button>
                          Добавить в корзину
                        </button>
                        <button>
                          Купить в 1 клик
                        </button>
                       </div>
                   </div>
                  </div>
           <button class="cart_icon" id="${id}"></button>
          </div>`

                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = productHTML;

                const likeIcon = tempDiv.querySelector('.like_icon');
                const cartIcon = tempDiv.querySelector('.cart_icon');
                let likeCount = get('.likes__count');

                likeIcon.addEventListener('click', function(event) {
                    event.stopPropagation();
                    if (!isliked) {
                        likeIcon.style.backgroundImage = "url('../assets/icons/red_like_icon.svg')";
                        addItemToStorage(id, "likes");
                        let likes = getStorageItems('likes');
                        let count1 = likes.length;
                        likeCount.innerText = count1;
                    } else {
                        likeIcon.style.backgroundImage = "url('../assets/icons/like_icon.svg')";
                        removeItemFromStorage(id, 'likes');
                        let likes = getStorageItems('likes');
                        let count1 = likes.length;
                        likeCount.innerText = count1;
                    }
                });

                cardBox.appendChild(tempDiv);
            }

        });
    }

    // Call displayProducts function to show products based on id
    displayProducts(Number(id));



    document.addEventListener('DOMContentLoaded', function () {
        const input = document.querySelector('.number-input input');
        const plusBtn = document.querySelector('.plus-btn');
        const minusBtn = document.querySelector('.minus-btn');
      
        plusBtn.addEventListener('click', function() {
          input.value = parseInt(input.value) + 1;
        });
      
        minusBtn.addEventListener('click', function() {
          if (parseInt(input.value) > 0) {
            input.value = parseInt(input.value) - 1;
          }
        });
      });
      
});

