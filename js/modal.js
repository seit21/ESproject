import { menuArray, addItemToStorage } from "./utils.js";

export default function displayModal(productId){
    const product = menuArray.find(item => item.id == productId);
    let modalElement = document.querySelector(".modal");
    let modalImg = document.querySelector(".modal-img");
    let modalTitle = document.querySelector(".modal-title");
    let modalPrice = document.querySelector(".modal-price");
    let modalColorImg = document.querySelector(".modal-color-img");
    let modalProductAmt = document.querySelector(".modal-amt-product");
    let modalProductRemove = document.querySelector(".modal-amt-minus");
    let modalProductAdd = document.querySelector(".modal-amt-plus");
    let currency = document.querySelector(".currency");
    let informationBtn = document.querySelector(".information-btn");
    let basketButton = document.querySelector('.basket-btn')
    basketButton.addEventListener('click', function(){
        addItemToStorage(productId, 'korzina')
        // console.log(productId);
        modalElement.style.display = 'none';
        window.location.reload()
    })

    modalElement.style.display = "block";
    modalImg.src = product.image;
    modalTitle.textContent = product.title;
    modalColorImg.src = product.image;
    modalPrice.textContent = formatPrice(product.price * 1000) + " сум";
    modalProductAmt.value = 1;
    currency.textContent = parseInt(product.discountPrice * 1000 / 6)

    modalProductRemove.addEventListener('click', function(){
        let currentValue = parseInt(modalProductAmt.value);
        if (currentValue > 1) {
            currentValue -= 1;
            modalPrice.textContent = formatPrice(product.price * 1000 * currentValue) + " сум";
            modalProductAmt.value = currentValue;
        }
    });
    
    modalProductAdd.addEventListener('click', function(){
        let currentValue = parseInt(modalProductAmt.value);
        currentValue += 1;
        modalPrice.textContent = formatPrice(product.price * 1000 * currentValue) + " сум";
        modalProductAmt.value = currentValue;
    });

    informationBtn.addEventListener('click', function(){
        location.href = "singlePage.html";
    })
    
    function formatPrice(price) {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    

    let close = document.querySelector(".close");
    close.addEventListener('click', function(){
        modalElement.style.display = 'none';
    })
}