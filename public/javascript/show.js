
// Url= origin+ route
const origin = document.location.origin;
const id = document.location.search.split("=")[1];
const url = `${origin}/api/product/${id}`;

let qty = 1;
function selecttQty(e) {
    qty = e.value;
}



function addToCart(){
    fetch(url)
    .then(function(response){
    let promiseOfDb=response.json();// gives  the promise of db
    if(response.ok){
             promiseOfDb.then(function(data){
                const olderCartItemsArray=localStorage.getItem("cartItems")?
                     JSON.parse(localStorage.getItem("cartItems"))
                     :[];

                const filterCartItems=olderCartItemsArray.filter(function(item){
                    if(item._id!=data._id){
                          return item
                    }
                })

              localStorage.setItem("cartItems",
              JSON.stringify([...filterCartItems,{...data,selectedQty:qty}]));
              
              location.href="/cart";
         })
    }
    else{
            const msgBox=document.querySelector("#msgBox");
            promiseOfDb.then(function(err){
            msgBox.innerText=err.errMsg;
         })
    }
})
    
}
