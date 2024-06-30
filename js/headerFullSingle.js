import { get, menuArray,removeItemFromStorage, addItemToStorage, getStorageItems, addToCart, likeBg } from "./utils.js";
import { header } from "./header.js";
header()

let cardBox = document.querySelector(".singlePage__main-box");
    // console.log(cardBox);

document.addEventListener('DOMContentLoaded', function () {
let categoryName = document.querySelector(".category_name");
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
         categoryName.textContent = category
         let count = 0
         const minPrice = parseInt(priceInput[0].value),
               maxPrice = parseInt(priceInput[1].value);
        // const productNames = get("#productNames"); 
    
        function formatPrice(price) {
            return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
    
        function formatDiscountPrice(discountPrice) {
            return discountPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
        }
    
        function displayProducts(category) {
        const fragment = document.createDocumentFragment();
            let displayProducts = menuArray.filter((data) => {
                    return (
                        (data.category === category) ||
                        (Array.isArray(data.category) && data.category.includes(category))
                    );
                })
                displayProducts.map((data) => {
                    const { id, title, price, rating, image, discountPrice } = data;
                               count++
                    let random = parseInt(Math.random() * 2000);
                    let productHTML = `
                        <div class="product" id="${id}">
                                         <button class="like_icon">
                                        </button>
                                        <a href="./single.html?id=${id}">
                                             <div class="product_image">
                                                 <img src="${image}"  alt="">
                                             </div>
                                             <div class="product_description">
                                                 <div class="product_desc">
                                                     <div class="product_title"><p class="product_title">${title}</p></div>
                                                     <div class="product_rating">
                                                         <span class="fa-solid fa-star star_rating fa-xs" style="color: #FFD43B;"></span>
                                                         <p>${rating}</p>
                                                         <p>(${random} отзывов)</p>
                                                     </div>
                                                 <div class="product_monthly_price">
                                                     <p>${parseInt(discountPrice * 1000 / 6)} сум/мес</p>
                                                 </div>
                                                 <div class="product_price">
                                                     <div class="product_price_desc">
                                                         <p class="first_price">${formatPrice(price * 1000)} сум</p>
                                                         <p class="discount_price">${formatDiscountPrice(discountPrice * 1000)} сум</p>
                                                        </div>
                                                    </div>
                                                </div>
                                             </div>
                                        </a>
                                        <button class="cart_icon" id="${id}"><img src="../assets/icons/shopping-bag.png" alt=""></button>
                                     </div>
                        </div>
                    `;
                
            const tempDiv = document.createElement('div');
      tempDiv.innerHTML = productHTML;
    
    
      fragment.appendChild(tempDiv.firstElementChild);
      cardBox.appendChild(fragment);
    })

    let productNumber = document.getElementById("productCountNumber")
     productNumber.textContent = count
    };
        displayProducts(category);
    

    // mainNavbar.innerHTML = `
    // <a href="../html/headerFullSingle.html?category=${category}">${category} <i class="fa-solid fa-chevron-right"></i></a> 
    // `;
    addToCart()
    likeBg()
})


const displayButtons = () => {
  const categories = ["Все","Акция",...new Set(menuArray.map((product) => product.category[0]))];
  
  companiesDOM.innerHTML = categories
    .filter(category => category !== 'all') 
    .map((category) => {
      return `<a href="headerFullSingle.html?category=${category}"><button class='company-btn'>${category}</button></a>`;
    })
    .join('');
}

displayButtons();



const rangeInput = document.querySelectorAll(".range-input input"),
      priceInput = document.querySelectorAll(".price-input input"),
      range = document.querySelector(".progress");
let priceGap = 10000;

function updateProgressBar() {
    const minVal = parseInt(rangeInput[0].value),
          maxVal = parseInt(rangeInput[1].value),
          rangeMax = parseInt(rangeInput[1].max);

    const progressWidth = ((maxVal - minVal) / rangeMax) * 100;
    const progressLeft = (minVal / rangeMax) * 100;

    range.style.width = progressWidth + "%";
    range.style.left = progressLeft + "%";
}

priceInput.forEach(input => {
    input.addEventListener("input", () => {
        const minPrice = parseInt(priceInput[0].value),
              maxPrice = parseInt(priceInput[1].value);

        if ((maxPrice - minPrice) >= priceGap && maxPrice <= rangeInput[1].max) {
            rangeInput[0].value = minPrice;
            rangeInput[1].value = maxPrice;
            updateProgressBar();
        } else if ((maxPrice - minPrice) < priceGap) {
            rangeInput[1].value = minPrice + priceGap;
            updateProgressBar();
        }
    });
});

rangeInput.forEach(input => {
    input.addEventListener("input", () => {
        const minVal = parseInt(rangeInput[0].value),
              maxVal = parseInt(rangeInput[1].value);

        if ((maxVal - minVal) >= priceGap && maxVal <= rangeInput[1].max) {
            priceInput[0].value = minVal;
            priceInput[1].value = maxVal;
            updateProgressBar();
        } else if ((maxVal - minVal) < priceGap) {
            rangeInput[1].value = minVal + priceGap;
            updateProgressBar();
        } else if (maxVal == rangeInput[1].max) {
            priceInput[1].value = maxVal;
            updateProgressBar();
        }
    });
});

// Initialize progress bar on page load
updateProgressBar();

