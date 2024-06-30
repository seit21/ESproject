import { menuArray, get,addToCart, likeBg,} from "./utils.js";
export function main(){
    let discountDiv = document.querySelector(".discountDiv")
let electronicsDiv = document.querySelector(".electronicsDiv")
let technicDiv = document.querySelector(".technicDiv")
let clothesDiv = document.querySelector(".clothesDiv")
 function displayProducts(categoryOfProduct,productDiv,startIndex,productsNumber){

        let newArray = []
    menuArray.map(item =>{
        const {category} = item
        let productCategory, discountCategory, allCategory; // Declare variables outside the if statement blocks
    
        if (category.length === 2) {
            // If category is a string
            productCategory = category[0];
            allCategory = category[1]
        } else if (category.length === 3) {
            // If category is an array with two elements
            productCategory = category[0];
            discountCategory = category[1];
            allCategory = category[2];
        } else {
            console.log("Invalid category format");
        }
        if (discountCategory == categoryOfProduct || productCategory == categoryOfProduct || allCategory == categoryOfProduct) {
            newArray.push(item)
        }
    })
    // console.log(newArray);
        let endIndex = startIndex + productsNumber
        let productsPerPage =newArray.slice(startIndex, endIndex)
        const fragment = document.createDocumentFragment();
        productsPerPage.map(product => {
            const { id, title, price, rating, image, discountPrice } = product;
            function formatPrice(price) {
                return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }
            function formatDiscountPrice(discountPrice) {
                return discountPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }   
           
            let random = parseInt(Math.random() * 2000);
            let productHTML = `
                <div class="product" id="${id}">
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
      const cartIcon = tempDiv.querySelector('.cart_icon');
      let basketCount = get('.basket__count')
 


      // Append the product HTML from the temporary div to the Document Fragment
      fragment.appendChild(tempDiv.firstElementChild);
    });
    
    // Append the Document Fragment to the productDiv
    productDiv.appendChild(fragment);
        
    }
    displayProducts("Акция",discountDiv,0, 10)
    displayProducts("Электроника",electronicsDiv,0, 10)
    displayProducts("Бытовая техника",technicDiv,0, 5)
    displayProducts("Одежда",clothesDiv, 0, 5)
    // displayProducts("Хобби и творчество")
    // Attach event listener to the button after the DOM has fully loaded
    let showMoreButton = document.querySelector('.show_more_button')
    let linkButton = document.getElementById('linkButton')
    showMoreButton.addEventListener('click', function() {
         displayProducts("Акция", discountDiv, 10, 10);
         showMoreButton.style.display = 'none'
         linkButton.style.display = 'block'
     });
     linkButton.addEventListener('click', function(){
         window.location.href = 'https://uzum.uz/uz/category/arzon-narxlar--330'
     })
     likeBg()
     addToCart()
}