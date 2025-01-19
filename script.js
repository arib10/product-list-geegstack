
const origin = window.location.origin;
const productContainerDiv  = document.querySelector(".products-container");
const startNewOrderBtn = document.querySelector("#modal #order-confirmed > button");
const confirmModal = document.getElementById("modal");
const confirmOrderBtn = document.getElementById("confirm-order-btn");

// Fetch all products data on page load
fetch(`${origin}/data.json`)
.then(res => res.json())
.then(response => {
    const allProducts = response;
    productContainerDiv.innerHTML = null;

    for (let i = 0; i < allProducts.length; i++) {
        const product = allProducts[i];
            
        const article = document.createElement("article");
        const picture = document.createElement("picture");
        const sourceTablet = document.createElement("source");
        const sourceDesktop = document.createElement("source");
        const img = document.createElement("img");
        const button = document.createElement("button");
        const addToCartImg = document.createElement("img");
        const descriptionDiv = document.createElement("div");
        const categoryPar = document.createElement("p");
        const productNamePar = document.createElement("p");
        const pricePar = document.createElement("p");
        const cartQuantityButton = document.createElement("div");
        const decrementSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const decrementPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const incrementSVG = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const incrementPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        const cartQuantitySpan = document.createElement("span");
        
        sourceTablet.setAttribute("srcset", product.image.tablet);
        sourceTablet.setAttribute("media", '(min-width: 700px)');
        sourceDesktop.setAttribute("srcset", product.image.desktop);
        sourceDesktop.setAttribute("media", '(min-width: 900px)');
        img.setAttribute("src", product.image.mobile);
        img.setAttribute("alt", product.name);
        picture.append(sourceTablet, sourceDesktop, img);

        addToCartImg.setAttribute("src", "./assets/images/icon-add-to-cart.svg");
        button.className = "add-to-cart";
        button.append(addToCartImg, "Add to Cart");

        cartQuantityButton.className = "cart-quantity-button flex";
        decrementSVG.setAttribute("width", 10);
        decrementSVG.setAttribute("height", 2);
        decrementSVG.setAttribute("fill", "none");
        decrementSVG.setAttribute("viewBox", "0 0 10 2");
        decrementPath.setAttribute("fill", "#fff");
        decrementPath.setAttribute("d", "M0 .375h10v1.25H0V.375Z");
        decrementSVG.classList.add("decrement-svg");
        decrementPath.classList.add("decrement-path");
        decrementSVG.appendChild(decrementPath);

        cartQuantitySpan.innerHTML = 0;

        incrementSVG.setAttribute("width", 10);
        incrementSVG.setAttribute("height", 10);
        incrementSVG.setAttribute("fill", "none");
        incrementSVG.setAttribute("viewBox", "0 0 10 10");
        incrementPath.setAttribute("fill", "#fff");
        incrementPath.setAttribute("d", "M10 4.375H5.625V0h-1.25v4.375H0v1.25h4.375V10h1.25V5.625H10v-1.25Z");
        incrementSVG.classList.add("increment-svg");
        incrementPath.classList.add("increment-path");
        incrementSVG.appendChild(incrementPath);
        cartQuantityButton.append(decrementSVG, cartQuantitySpan, incrementSVG);


        descriptionDiv.className = "product-description";
        categoryPar.innerHTML = product.category;
        categoryPar.className = "product-category";
        productNamePar.innerHTML = product.name;
        productNamePar.className = "product-name";
        pricePar.innerHTML = '$' + product.price;
        pricePar.className = 'price';
        descriptionDiv.append(categoryPar, productNamePar, pricePar);

        article.className = "product";
        article.id = product.name;
        article.append(picture, cartQuantityButton, button, descriptionDiv);

        productContainerDiv.appendChild(article);
    }

})

let cartItems = [];
let allProducts = [];

async function  getAllProducts() {
    const resp = await fetch(`${origin}/data.json`);
    const response = await resp.json();
    allProducts.push(...response);
}

getAllProducts();
const displayCartItems = () => {
    const cartContainerSection = document.querySelector("#cart-container section");
    const cartContainer = document.querySelector("#cart-container");
    const emptyCart = document.getElementById("empty-cart");
    const totalItemSpan = document.querySelector(".carts > h1 span");
    const orderTotalH2 = document.querySelector(".carts div#order-total h2");

    cartContainerSection.innerHTML = null;

    if (cartItems.length < 1) {
        emptyCart.style.display = "block";
        cartContainer.style.display = "none";
        totalItemSpan.innerHTML = 0;
    }

    let totalItems = 0;
    let totalPriceOfItems = 0;
    for (let i = 0; i < cartItems.length; i++) {
        const cart = cartItems[i];
        totalItems += cart.quantity;
        totalPriceOfItems += cart.quantity * cart.price;

        const article = document.createElement("article");
        const div = document.createElement("div");
        const productNamePar = document.createElement("p");
        const pricePar = document.createElement("p");
        const quantitySpan = document.createElement("span");
        const actualPriceSpan = document.createElement("span");
        const totalPriceSpan = document.createElement("span");
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

        productNamePar.className = "cart-item-name";
        productNamePar.innerHTML = cart.name;

        quantitySpan.className = "quantity";
        quantitySpan.innerText = cart.quantity + "x";
        actualPriceSpan.className = "actual-price";
        actualPriceSpan.innerText = "@ $" + cart.price.toFixed(2);
        totalPriceSpan.className = "total-price";
        totalPriceSpan.innerHTML = "@ $" + (cart.quantity * cart.price).toFixed(2)
        pricePar.append(quantitySpan, actualPriceSpan, totalPriceSpan);

        div.append(productNamePar, pricePar);

        svg.setAttribute("width", 10);
        svg.setAttribute("height", 10);
        svg.setAttribute("fill", "none");
        svg.setAttribute("viewBox", "0 0 10 10");
        path.setAttribute("fill", "#CAAFA7");
        path.setAttribute("d", "M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z")
        svg.classList.add("remove-icon");
        path.classList.add("remove-svg-path");
        svg.append(path);

        article.className = "cart-item flex";
        article.append(div, svg);
        emptyCart.style.display = "none";
        cartContainer.style.display = "block";
        cartContainerSection.appendChild(article);
    }

    totalItemSpan.innerHTML = totalItems;
    orderTotalH2.innerHTML = "$" + totalPriceOfItems.toFixed(2);
}

const updateProductsList = () => {
    const productsArticle = document.querySelectorAll("article.product");
    for (let i = 0; i < productsArticle.length; i++) {
        const article = productsArticle[i];
        if (cartItems.some(item => item.name === article.id)) {
            const articleCartItem = cartItems.find(item => item.name === article.id);
            const articleQuantitySpan = article.querySelector(".cart-quantity-button span");
            articleQuantitySpan.innerHTML = articleCartItem.quantity;
            article.classList.add("selected");
        } else {
            article.classList.remove("selected");
        }
    }
}


window.onclick = (e) => {
    //Add Item to cart
    if (e.target.className === "add-to-cart") {
        const productName = e.target.nextElementSibling.querySelector(".product-name").innerText;
        const product = allProducts.find(product => product.name === productName);
        const cartItem = { name: product.name, price: product.price, quantity: 1, totalPrice: product.price, thumbnail: product.image.thumbnail };
        cartItems.push(cartItem);
        displayCartItems();
        updateProductsList();
        
    }


    //Remove Item from cart
    if(e.target.classList.contains("remove-icon") || e.target.classList.contains("remove-svg-path")) {
        const productArticle = (e.target.tagName === "path") ? e.target.parentElement.parentElement : e.target.parentElement;
        const productName = productArticle.querySelector(".cart-item-name").innerHTML;
        const otherProducts = cartItems.filter(cart => cart.name !== productName);
        cartItems = otherProducts;
        displayCartItems();
        updateProductsList();
    }

    //Increase cart item 
    if (e.target.classList.contains("increment-svg") || e.target.classList.contains("increment-path")) {
        const parentDiv = (e.target.tagName === "path") ? e.target.parentElement.parentElement : e.target.parentElement;
        const productName = parentDiv.nextElementSibling.nextElementSibling.querySelector(".product-name").innerText;
        const product = cartItems.find(cart => cart.name === productName);
        product.quantity += 1;
        displayCartItems();
        updateProductsList();
    }

    //Decrease cart item 
    if (e.target.classList.contains("decrement-svg") || e.target.classList.contains("decrement-path")) {
        const parentDiv = (e.target.tagName === "path") ? e.target.parentElement.parentElement : e.target.parentElement;
        const productName = parentDiv.nextElementSibling.nextElementSibling.querySelector(".product-name").innerText;
        const product = cartItems.find(cart => cart.name === productName);
        if (product.quantity === 1) {
            const otherProducts = cartItems.filter(cart => cart.name !== productName);
            cartItems = otherProducts;
        } else {
            product.quantity -= 1;
        }
        displayCartItems();
        updateProductsList();
    }
    
}

confirmOrderBtn.onclick = function() {
    const section = confirmModal.querySelector("section");
    const totalPriceH2 = confirmModal.querySelector("#modal-total-price");
    const totalPriceContainer = confirmModal.querySelector("section > div.flex");
    section.innerHTML = null;

    let totalPrice = 0;
    for (let i = 0; i  < cartItems.length; i++) {
        const item = cartItems[i];
        totalPrice += item.price * item.quantity;
        
        const article = document.createElement("article");
        const parentDiv = document.createElement("div");
        const div = document.createElement("div");
        const productPar = document.createElement("p");
        const quantityPar = document.createElement("p");
        const pricePar = document.createElement("p");
        const quantitySpan = document.createElement("span");
        const img = document.createElement("img")

        article.className = "flex";
        parentDiv.className = "flex";
        pricePar.className = "price";
        productPar.className = "product-name";
        quantityPar.className = "quantity";
        img.setAttribute("src", item.thumbnail);
        img.setAttribute("alt", item.name);

        productPar.innerHTML = item.name;
        quantitySpan.innerText = item.quantity + "x";
        const pricTextNode = document.createTextNode("@ $" + item.price.toFixed(2));
        quantityPar.append(quantitySpan, pricTextNode);
        div.append(productPar, quantityPar);
        parentDiv.append(img, div);
        pricePar.innerHTML = "$" + (item.price * item.quantity).toFixed(2);
        article.append(parentDiv, pricePar);

        section.appendChild(article);
    }
    totalPriceH2.innerHTML = "$" + totalPrice.toFixed(2);
    section.appendChild(totalPriceContainer);
    confirmModal.style.display = "block";
}

startNewOrderBtn.onclick = function() {
    cartItems = [];
    displayCartItems();
    updateProductsList();
    confirmModal.style.display = "none";
}