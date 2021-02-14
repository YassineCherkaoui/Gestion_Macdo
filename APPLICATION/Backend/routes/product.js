const express = require('express')
let Product = require('../models/product.model');
const router = express.Router();

// show all Product 


router.get('/', (req,res) =>{

  Product.find()
  .then((Product) => res.json(Product))
  .catch((err) => res.status(400).json("Error :" + err));
});

// add Product 


router.get('/showAll', (req,res) =>{
    res.send('hi this is when we show all product ')
});


router.get('/:idSousCtg', (req,res) =>{

  Product.find({sousCategory: `${req.params.idSousCtg}`})
  .then((Product) => res.json(Product))
  .catch((err) => res.status(400).json("Error :" + err));
});


router.route("/add").post((req, res) => {
    const nom = req.body.nom;
    const prix = req.body.prix;
    const picname = req.body.picname;
    const codePromo = req.body.codePromo;

    // calcule d pint de fidelite 

    let points = 0

    if (prix >= 7 && prix <= 20) {

      points = 5;
      
    } else if(prix >= 21 && prix <= 50) {

      points = 12;

    }else {
      points = 20;
    }
    const ingrediens = req.body.ingrediens;
    const sousCategory = req.body.sousCategory;


    // calucle point de fidelite 

    

  console.log(  nom,
    prix,
    ingrediens,
    picname,
    points,
    codePromo,
    sousCategory);
   
   
  
    const productPush = new Product({
       
      nom,
      prix,
      ingrediens,
      picname,
      points,
      codePromo,
      sousCategory

     
    });
  
    productPush
      .save()
      .then(() => res.json("Product successfully added"))
      .catch((err) =>  res.status(400).json("Error :" + err));
  });


module.exports = router;