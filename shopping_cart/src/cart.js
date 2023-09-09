let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart")


let basket = JSON.parse(localStorage.getItem("data")) || []

let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}
calculation()

let generateCartItems = () => {
    if(basket.length!==0) {
        return (ShoppingCart.innerHTML = basket
            .map((x) => {
              let { id, item } = x;
              let search = shopItemsData.find((y) => y.id === id) || [];
              return `
            <div class="cart-item">
              <img width="100" src=${search.img} alt="" />
              <div class="details">
      
                <div class="title-price-x">
                    <h4 class="title-price">
                      <p>${search.name}</p>
                      <p class="cart-item-price">$ ${search.price}</p>
                    </h4>
                    <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                </div>
      
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">${item}</div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
      
                <h3>$ ${item * search.price}</h3>
              </div>
            </div>
            `;
            })
            .join(""));
    }
    else {
        ShoppingCart.innerHTML = ``
        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="index.html">
            <button class="HomeBtn">Back to home</button>
        </a>
        `
    }
}
generateCartItems()

let decrement = (id) =>{
    const quantityElement = document.getElementById(id);
    let search = basket.find(x=>x.id==id);
    if(search==undefined) return;
    else if(search.item==0) return;
    else {
        search.item-=1;
    }
    update(id)
    basket = basket.filter(x=>x.item!==0)
    generateCartItems();
    localStorage.setItem("data",JSON.stringify(basket))
}
let increment = (id) =>{
    const quantityElement = document.getElementById(id);
    let search = basket.find(x=>x.id==id);
    if(search==undefined) {
        basket.push({id:id,item:1})
    }
    else {
        search.item+=1;
    }
    localStorage.setItem("data",JSON.stringify(basket))
    update(id)
    generateCartItems();
}


let removeItem = id => {
    const quantityElement = document.getElementById(id);
    basket = basket.filter(x=>x.id!==id);
    localStorage.setItem("data",JSON.stringify(basket))
    generateCartItems();
    TotalAmount()
}


let update = id => {
    let search = basket.find(x=>x.id==id);
    const quantityElement = document.getElementById(id);
    quantityElement.innerHTML = search==undefined?0:search.item;
    calculation()
    TotalAmount()
}

let TotalAmount = () => {
    if(basket.length!==0) {
        let amount = basket.map((x)=>{
            let {item,id} = x;
            let search = shopItemsData.find(y=>y.id==id) || [];
            return item*search.price;
        }).reduce((x,y)=>x+y,0)
        label.innerHTML = `
        <h2>Total Bill : $ ${amount}</h2>
        <button class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeAll">Clear Cart</button>
        `;
    }
}
let clearCart = () => {
    basket = [];
    localStorage.setItem("data",JSON.stringify(basket));
    generateCartItems();
    calculation()

}
TotalAmount()