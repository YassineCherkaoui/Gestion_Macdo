const express = require('express')
let Category = require('../models/category.model');
const router = express.Router();

// show all category 


router.get('/', (req,res) =>{
  
  Category.find()
  .then((category) => res.json(category))
  .catch((err) => res.status(400).json("Error :" + err));
//   res.render('index', {
                  
    
//  });

});


// add category

router.route("/add").post((req, res) => {
  const nom = req.body.nom;
    const categoryPush = new Category({
      nom
    });
  
    categoryPush
      .save()
      .then(() => res.json("Category successfully added"))
      .catch((err) =>  res.status(400).json("Error :" + err));
      res.redirect('/category')
  });

// Remove categorie
router.delete('/delete/:id', async (req, res, next)=>{
  try {
      const deleteCategory = await Category.remove({_id:req.params._id});
      res.json(deleteCategory);
  } catch (err) {
      res.json({message:err});
  }
});
  
// Update categorie 
router.patch('/update/:id', async (req, res, next)=>{
  try {
      const updateCategorie = await Category.updateOne(
          {_id: req.params._id},
          {$set:{nom:req.body.categorie_name}});
      res.json(updateCategorie);
  } catch (err) {
      res.json({message:err});
  }
});


module.exports = router;