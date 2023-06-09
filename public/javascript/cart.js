
        let totalAmount = 0;
        const itemInCart = localStorage.getItem("cartItems") ?
            JSON.parse(localStorage.getItem("cartItems"))
            : [];
        console.log(itemInCart);

        function createcartItem(item) {
            return `<div style="display:flex; flex-direction:column; align-item:center; padding:8px; justify-content:center;">
            <img  width="80px" height="80px"   src=${item.img} />
                <a href="/product/${item._id}">${item.name}</a>
                </div>
                <span > ${item.selectedQty} x ${item.price}  = &#8377;${item.price*item.selectedQty}  </span>
                <button id=${item._id} onclick="deleteItem(this)">Delete</button> `;
        }
        for (i = 0; i < itemInCart.length; i++) {
            const cartItemHolder = document.createElement('div');
            cartItemHolder.className = ('cartitem');
            cartItemHolder.innerHTML = createcartItem(itemInCart[i]);
            const col2 = document.querySelector(".col2");
            col2.appendChild(cartItemHolder);
        }
        function deleteItem(e) {
            
            if(itemInCart.length==1){
                const filtercartItem= itemInCart.filter(function (item) {
                    if (item._id != e.id) {
                        return item;
                    }
                })
                localStorage.setItem("cartItems", JSON.stringify(filtercartItem));   //update 
                location.href='/products'
            }
         else{
             const filtercartItem= itemInCart.filter(function (item) {
                 if (item._id != e.id) {
                     return item;
                 }
             })
             localStorage.setItem("cartItems", JSON.stringify(filtercartItem));   //update 
             location.reload();   //reload page
         }

        }
        if (itemInCart.length == 0) {
            const msgBox = document.querySelector('.msgBox');
            msgBox.innerHTML = `
          <div class="blankCart">
              <h3> Nothing in Cart</h3>
              <a href="/products"><button>Shop Now </button></a>
            </div>
           `;
        }
        if (itemInCart.length != 0) {
            itemInCart.forEach(function (item) {
                totalAmount = totalAmount + (Number(item.selectedQty) * item.price);
            });
            const user = localStorage.getItem("userInfo") ?     // condition 
            JSON.parse(localStorage.getItem("userInfo"))
            : null;
            const shippingInfo = localStorage.getItem("shippingInfo") ?     // condition 
            JSON.parse(localStorage.getItem("shippingInfo"))
            : null;


            const action = document.querySelector('.action');
            action.innerHTML = `
            <div class="actionsty" >
                 <div style="display:flex; justify-content:space-between;">
                   <p>Total Items </p>
                   <p>${itemInCart.length}</p>
               </div>
                <div style="display:flex; justify-content:space-between;">
                     <p> Total Price</p>
                    <p> &#8377; ${totalAmount}</p>
                 </div>
                
             ${user?
                    `
                    ${shippingInfo?`<a href="/orders/${user.token}">
                    <button> Proceed to checkout </button>
                 </a>`:`<a href="/shipping/${user.token}">
                 <button> Proceed to checkout </button>
              </a>`}
                    `:
                    `<a href="/signin?redirect=shipping">
                        <button> Proceed to checkout </button>
                     </a>`

                }
               
            </div>
             `
        }

    
