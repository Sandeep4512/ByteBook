
const ex = require('express'),
    port = process.env.PORT || 2023,
    jwt = require('jsonwebtoken'),
    verifyToken = require('./utils'),
    root = require('./helpers/root'),
    addProducts = require('./helpers/addProducts'),
    removeProducts = require('./helpers/removeProducts'),
    removeUsers = require('./helpers/removeUsers'),
    ourProducts = require('./helpers/ourProducts'),
    showPage = require('./helpers/showPage'),
    signIn = require('./helpers/signIn'),
    signInApi = require('./helpers/signInApi'),
    signUp = require('./helpers/signUp'),
    signUpApi = require('./helpers/signUpApi'),
    productIdApi = require('./helpers/productIdApi'),
    shipping = require('./helpers/shipping'),
    cart = require('./helpers/cart'),
    SliderImg = require('./data/sliderImages'),
    db = require('./models/index'),
    dotenv = require('dotenv');
    // To load the environment variables in server environment
    dotenv.config()
app = ex();
bcrypt = require('bcrypt'),
  app.use(ex.static("public"));      // static file use krne ke liye

app.use(ex.json());                //to parse the upcoming post request data       

app.get('/', ourProducts)
//app.get('/addproducts', addProducts)                          //   API To Add Products In Database
//app.get('/removeproducts', removeProducts)                  //   API To Remove Products In Database
//app.get('/removeUsers', removeUsers)
app.get('/products', ourProducts)
app.get('/product/:id', showPage)
app.get('/Contact', (req, res) => {res.render("Contact.ejs");});

//*******************************      authentication   ************************
app.get('/signin', signIn)
app.post('/signin', signInApi);
app.get('/signup', signUp)
app.post('/signup', signUpApi)
app.get('/cart', cart)
app.get('/wishlist', (req, res) => res.render('wishList.ejs'))
app.get('/api/product/:id', productIdApi)
// ************************************** Middleware function  *******************
app.get('/shipping/:token', verifyToken, shipping)
app.get('/orders/:token', verifyToken, (req, res) => {res.render('orders.ejs')})
app.get('/wishorders/:token', verifyToken, (req, res) => {res.render('wishOrder.ejs')})
app.get('/directOrders/:token', verifyToken, (req, res) => {res.render('directOrder.ejs')})

// **********************************    handle the 404 Error page       **********
app.get("*", (req, res) => {res.render("Error.ejs");})

// ************************************ start the server   **********************
app.listen(port, () => { console.log(`server is successfully running at port  ${port}`);})