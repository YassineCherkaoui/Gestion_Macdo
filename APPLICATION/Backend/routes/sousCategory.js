const express = require('express')
let SousCategory = require('../models/sousCategory.model');
const router = express.Router();



// show all SousCategory 


router.get('/', (req,res) =>{
  // res.render('index');
  SousCategory.find()
  .populate('category')
  .then((SousCategory) => res.json(SousCategory))
  .catch((err) => res.status(400).json("Error :" + err));
});

router.get('/:idCtg', (req,res) =>{

  SousCategory.find({category: `${req.params.idCtg}`})
  .then((SousCategory) => res.json(SousCategory))
  .catch((err) => res.status(400).json("Error :" + err));
});


// add SousCategory 


router.route("/add").post((req, res) => {
    const nom = req.body.nom;
    const category = req.body.category;
  
  
    const sousCategoryPush = new SousCategory({
      nom,
      category
    });
  
    sousCategoryPush
      .save()
      .then(() => res.json("Sous Category successfully added"))
      .catch((err) =>  res.status(400).json("Error :" + err));
      res.redirect('/sousCategory')
  });


module.exports = router;