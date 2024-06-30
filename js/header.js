import { menuArray, get, getStorageItems, likeBg, addToCart} from "./utils.js";
export function header(){
    window.addEventListener("DOMContentLoaded", (e) => {
        e.preventDefault();
    
        let mainBox = get(".header__bottom-links");
        let otherProducts = get(".header__other-btn");
        let otherXArrow = get(".arrow__up");
        let likesButton = get(".header__like-button");
        let basketButton = get(".header__basket-button");
        let productNames = get(".header__bottom-secInner");
        let headerSelect = get(".header__select")
        let otherDownArrow = get(".arrow__down");
        let otherText = get(".header__other-text");
        let headerBottomLinks = get(".header__bottom-wrapper");
        let headerShadow = get(".header__shadow")
        let selectDefault = get(".product__default")
        let selectX = get(".selectX")
        let headerUser = get(".header__user-name")
        let srchInp = get("#srchInp")
       let srchBtn = get(".srchBtn")
       const resultContainer = document.getElementById("resultContainer");
      let likeCount = get('.likes__count')
      let basketCount = get('.basket__count')
       let likes = getStorageItems('likes')
       let baskets = getStorageItems('korzina')
       let count1 = likes.length
       let count2 = baskets.length
       likeCount.innerText = count1 
       basketCount.innerText = count2
    srchBtn.addEventListener("click", (e) => {
        e.preventDefault();
    
        // Get the value from the input field
        const searchTerm = srchInp.value.toLowerCase().trim();
    
        // Filter menuArray based on the first word of the title
        const filteredItems = menuArray.filter((item) => {
            const firstWord = item.title.split(" ")[0].toLowerCase();
            return firstWord.includes(searchTerm);
        });
    
        // Display the filtered items
        displayResults(filteredItems);
    });
    
    function displayResults(items) {
        resultContainer.innerHTML = "";
    
        items.forEach((item) => {
            function formatPrice(price) {
                return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }
    
            function formatDiscountPrice(discountPrice) {
                return discountPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }
    
            const { id, title, price, rating, image, discountPrice } = item;
    
            let random = parseInt(Math.random() * 2000);
    
            const itemElement = document.createElement("div");
            itemElement.innerHTML = `
                <div class="product" id="${id}">
                    <button class="like_icon">
                    </button>
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
    
            resultContainer.appendChild(itemElement);
        });
    }
    
    
    
        let display = menuArray.map((item, index) => {
            let { category } = item;
            
           
           
                if (index < 8) {
                    return `
                    <ul class="header__link-list">
                        <li class="header__list-item">
                            <div>
                                <i class="product__icon fa-solid fa-shop"></i>
                                <a class="header__link" href="./headerFullSingle.html?category=${category[0]}">
                                    ${category[0]}
                                </a>
                            </div>
                            <i class="right__arrow fa-solid fa-chevron-right"></i>
                        </li>
                    </ul>`;
                }
            
        }).join("");
        
        
    
        mainBox.innerHTML += display;
    
        likesButton.addEventListener("click", (e) => {
          e.preventDefault();
          location.href = "../html/likes.html";
      });
    
      basketButton.addEventListener("click", (e) => {
          e.preventDefault();
          location.href = "../html/basket.html";
      });
    
        let headerListItems = document.querySelectorAll(".header__list-item");
    
        let mouseOverTimeout = null;
        let currentClickedItem = null;
    
        function toggleMenu() {
           
          
            
            if (otherDownArrow.classList.contains("open")) {
                otherDownArrow.classList.remove("open");
                otherDownArrow.classList.add("hidden");
          
                selectDefault.classList.remove("open");
                selectDefault.classList.add("hidden");
    
          
                headerBottomLinks.classList.add("open");
                otherText.style.display = "none";
                otherXArrow.classList.remove("hidden");
                otherXArrow.classList.add("open");
                
                selectX.classList.remove("hidden");
                selectX.classList.add("open");
          
                headerShadow.style.boxShadow = "0px 12px 22px 9px rgba(34, 60, 80, 0.2)";
                updateEventListeners();
            } else {
                otherXArrow.classList.remove("open");
                otherXArrow.classList.add("hidden");
          
                selectX.classList.remove("open");
                selectX.classList.add("hidden");
          
                otherDownArrow.classList.remove("hidden");
                otherDownArrow.classList.add("open");
          
                selectDefault.classList.remove("hidden");
                selectDefault.classList.add("open");
          
                headerBottomLinks.classList.remove("open");
                otherText.style.display = "inline-block";
                headerShadow.style.boxShadow = "none";
            }
          }
        
        
        headerSelect.addEventListener("click", (e) => {
            e.preventDefault();
            
           
            toggleMenu();
    
            otherXArrow.classList.add("hidden");
    
        });
        
        otherProducts.addEventListener("click", (e) => {
            e.preventDefault();
            toggleMenu();
        });
    
    function updateEventListeners() {
        headerListItems.forEach((item) => {
            item.addEventListener("click", () => handleItemClick(item));
            item.addEventListener("mouseover", () => handleMouseOver(item));
        });
    }
    
    function handleItemClick(item) {
        clearTimeout(mouseOverTimeout);
        
        if (currentClickedItem) {
            currentClickedItem.classList.remove("clicked");
        }
    
        currentClickedItem = item;
        item.classList.add("clicked");
    
        displayProducts(item.textContent.trim());
    }
    
    function handleMouseOver(item) {
        clearTimeout(mouseOverTimeout);
    
        if (!currentClickedItem) {
            mouseOverTimeout = setTimeout(() => {
                displayProducts(item.textContent.trim());
            }, 2000);
        }
    }
    
    function displayProducts(category) {
        let displayProducts = menuArray
            .filter((data) => {
                return (
                    data.category === category ||
                    (Array.isArray(data.category) && data.category[0] === category)
                );
            })
            .map((data) => {
                return `
                    <li>
                        <a class="bottom__hover-link" href="./single.html?id=${data.id}">${data.title.split(" ")[0]} ${data.title.split(" ")[1]}</a>
                    </li>
                `;
            })
            .join("");
    
        productNames.innerHTML = `
            <div>
                <a href="headerFullSingle.html?category=${category}" class="hover__title"><h3>${category}</h3><i class="left__hover fa-solid fa-chevron-right" "></i></a>
                <ul class="hover__list">${displayProducts}</ul>
            </div>
        `;
    }
    
    updateEventListeners();
    displayProducts(headerListItems[0].textContent.trim());
    
    
    let localKey = "user"
    
    let  localStore = getStorageItems(localKey)
    
    if(localStore.length == 0){
    headerUser.textContent = "Войти"
    console.log('localStore');
    headerUser.addEventListener('click', function(){
        window.location.href = './login.html'
    })
  }else{
    console.log(localStore);
    headerUser.textContent = localStore.username
  }
    
    
    
    
    
  addToCart()
  likeBg()
    });
}