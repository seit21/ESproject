import { get, getStorageItems, removeItemFromStorage , addToCart} from "./utils.js";
import { header } from "./header.js";
header()
let likesDiv =get('#likesDiv')
let likes = getStorageItems('likes')
function displayLikes(productDiv){
        const fragment = document.createDocumentFragment();
        likes.map(product => {
            const { id, title, price, rating, image, discountPrice } = product;
            function formatPrice(price) {
                return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }
            function formatDiscountPrice(discountPrice) {
                return discountPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }   
            let random = parseInt(Math.random() * 2000);
            let productHTML = `
                <div class="product">
                    <button class="like_icon"></button>
                    <a href="./single.html?id=${id}">
                        <div class="product_image">
                            <img src="${image}" alt="">
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
                    <button class="cart_icon"><img src="../assets/icons/shopping-bag.png" alt=""></button>
                </div>
            `;
        
      // Create a temporary div to hold the product HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = productHTML;
    
      // Attach event listener to the like icon within the current product
      const likeIcon = tempDiv.querySelector('.like_icon');
      likeIcon.style.backgroundImage = "url('../assets/icons/red_like_icon.svg')";
      likeIcon.addEventListener('click', function(event) {
        let isliked = true
          event.stopPropagation();
          if(isliked){
            likeIcon.style.backgroundImage = "url('../assets/icons/like_icon.svg')";
            removeItemFromStorage(id, 'likes')
            window.location.reload()
            isliked = false
          }
      });
    
      // Append the product HTML from the temporary div to the Document Fragment
      fragment.appendChild(tempDiv.firstElementChild);
    });
    
    // Append the Document Fragment to the productDiv
    productDiv.appendChild(fragment);
}
displayLikes(likesDiv)
addToCart()