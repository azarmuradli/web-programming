let shop = document.getElementById("shop")


let basket = JSON.parse(localStorage.getItem("data")) || []

let generateShop =()=> {
    return (shop.innerHTML = shopItemsData.map((item)=>{
        let {id,name,price,desc,img} = item;
        let search = basket.find(x=>x.id==id) || []
        return `
        <div id="product-id=${id}" class="item">
            <img width="220" src="${img}" alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc} </p>
                <div class="price-quantity">
                    <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">${search.item==undefined ? 0 : search.item}</div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
    
        `
    }).join(""))
}
generateShop()

let decrement = (id) =>{
    const quantityElement = document.getElementById(id);
    let search = basket.find(x=>x.id==id);
    if(search==undefined) return;
    else if(search.item==0) return;
    else {
        search.item-=1;
    }
    basket = basket.filter(x=>x.item!==0)
    update(id)
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
}


let update = id => {
    let search = basket.find(x=>x.id==id);
    const quantityElement = document.getElementById(id);
    quantityElement.innerHTML = search==undefined?0:search.item;
    calculation()
}
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}

calculation()



