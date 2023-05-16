let cartIcon=document.querySelector('#cart-icon');
let cart= document.querySelector('.cart');
let closeCart =document.querySelector('#close-cart');

cartIcon.onclick = () =>{
    cart.classList.add("active");
}

closeCart.onclick = () =>{
    cart.classList.remove("active");
}


if(document.readyState =='loading'){
    document.addEventListener("DOMContentLoaded",ready);
}
else{
    ready();
}

function ready(){
    //remove function
    var removeCartButton =document.getElementsByClassName('cart-remove');
    for(var i=0;i<removeCartButton.length ;i++)
    {
        var button=removeCartButton[i];
        button.addEventListener("click",removeItem);
    } 

    // Quantity update
    var quan = document.getElementsByClassName('cart-quantity');
    for(var i=0;i<quan.length ;i++)
    {
       var input = quan[i]; 
       input.addEventListener("change",quantityChanged());
    }

    // add item 
    var addI = document.getElementsByClassName("add-cart");
    for(var i=0;i<addI.length ;i++)
    {
       var input = addI[i]; 
       input.addEventListener("click",addItem);
    }

    document.getElementsByClassName('buy-button')[0].addEventListener("click",buttonfunc);
}

//buy button clicked
function buttonfunc(){
    alert("Order is Placed ");
    var cartContent = document.getElementsByClassName("cart-content")[0]
    while(cartContent.hasChildNodes())
    {
        cartContent.removeChild(cartContent.firstChild);
    }
    TotalCost();
}

//update total
function TotalCost(){
    var cartContent= document.getElementsByClassName("cart-content")[0];
    var total =0;
    var cartbox = cartContent.getElementsByClassName("cart-box");
    for(let i=0;i<cartbox.length;i++)
    {
        var cartBoxxx = cartbox[i];

        var price = cartBoxxx.getElementsByClassName("cart-price")[0];
        var processed_price= parseFloat(price.innerText);
        console.log('price',processed_price);

        var quantity = cartBoxxx.getElementsByClassName("cart-quantity")[0];
        var processed_quantity=quantity.value;
        console.log('1quantity',processed_quantity);

        total=total+processed_price*processed_quantity;
        console.log('total',total);
    }
        document.getElementsByClassName('total-price')[0].innerText = "Rs: " + total;
}

// remove item
function removeItem(variable){
    var buttonclicked = variable.target;
    alert("Few items from the cart are removed");
    buttonclicked.parentElement.remove();
    TotalCost();
}

//quantity changes 
function quantityChanged(variable){
    var temp = variable.target;
    if(isNaN(temp.value) || temp.value<0)
    {
        temp.value=0;
    }
    TotalCost();
}

//fetch item
function addItem(variable){
    var button = variable.target;
    var shopProduct = button.parentElement;
    var title = shopProduct.getElementsByClassName("item-brand")[0].innerText;
    var price = shopProduct.getElementsByClassName("item-price")[0].innerText;
    var proImg = shopProduct.getElementsByClassName("item-image")[0].src;
    addItemtoCart(title,price,proImg);
    TotalCost();
}
        

// add fetched Item to cart 
function addItemtoCart(title,price,proImg)
{
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("cart-box");
    var cartItem = document.getElementsByClassName("cart-content")[0];
    var names = cartItem.getElementsByClassName("cart-product-brand");
    for(let i=0;i< cartItem.length;i++)
    {
        if(names[i].innerText==title)
            alert('ALready Added');
            return;
    }
    var cartbox = `<img src="${proImg}" alt="" class="cart-image"/>
                <div class="details-box">
                    <div class="cart-product-brand">${title}</div>
                    <div class="cart-price">${price}</div>
                    <input type="number" value="1" class="cart-quantity"/>
                </div>
                <i class='bx bxs-trash cart-remove'></i>`;
    cartShopBox.innerHTML = cartbox ;
    cartItem.append(cartShopBox);
    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener("click",removeItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener("change",quantityChanged);
}


