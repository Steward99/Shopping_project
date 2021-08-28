if(document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded', ready)
} else{
    ready()
}

function ready(){
    var removeButton = document.getElementsByClassName('btn-danger')
    for(var i = 0; i < removeButton.length; i++){
        var button = removeButton[i]
            button.addEventListener('click', removeCartItems)
        }
    var quantityInput = document.getElementsByClassName('cart-quantity-input')
    for(var i = 0; i < quantityInput.length; i++){
        var input = quantityInput[i]
        input.addEventListener('change',quantityChanged)
        }
    var addToCartButton = document.getElementsByClassName('btn-add')
    for(var i = 0; i < addToCartButton.length; i++){
        var addToCart = addToCartButton[i]
        addToCart.addEventListener('click',addToCartClicked)
        }
    document.getElementsByClassName('purchase-btn')[0].addEventListener('click',purchaseButton)
}

function purchaseButton(){
    alert('Thank You for the purchase !')
    var itemS = document.getElementsByClassName('cart-items')[0]
    while (itemS.hasChildNodes()){
        itemS.removeChild(itemS.firstChild)
    }
    updateTotal()
}




function removeCartItems(event){
    var clickingBtn = event.target
    clickingBtn.parentElement.parentElement.remove()
    updateTotal()
}

function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <=0){
        input.value = 1
    }
    updateTotal()
}

function addToCartClicked(event){
    var addToCart = event.target
    var shopItem = addToCart.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-brand')[0].innerText
    var addPrice = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var image = shopItem.getElementsByClassName('shop-item-image')[0].src
    addItemToCart(title,addPrice,image)
    updateTotal()
}

function addItemToCart(title,addPrice,image){
    var addToCartRow = document.createElement('div')
    addToCartRow.classList.add('cart-row')
    var addToCardItem = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = document.getElementsByClassName('cart-item-title')
        for( var i = 0 ; i < cartItemNames.length; i++){
            if(cartItemNames[i].innerText == title){
                alert('This item ia already added to the cart')
                return
            }
        }
    var addToCardRowContent = `
        <div class="cart-item cart-colomn">
            <img class="cart-item-image" src="${image}">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-colomn">${addPrice}</span>
        <div class="cart-quantity cart-colomn">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger cart-quantity-button">REMOVE</button>
        </div>`
        addToCartRow.innerHTML = addToCardRowContent
    addToCardItem.append(addToCartRow)
    addToCartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItems)
    addToCartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
}



function updateTotal(){
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItems.getElementsByClassName('cart-row')
    var total = 0 
    for( var i = 0 ; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var cartPrice = cartRow.getElementsByClassName('cart-price')[0]
        var cartQuantity = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(cartPrice.innerText.replace('$',''))
        var quantity = cartQuantity.value
        console.log(price*quantity)
        total += price*quantity
    }
    total = Math.round(total*100) / 100
    document.getElementsByClassName('cart-total-price')[0].innerText = '$' + total
}