const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Drink = require('../models/drink');

//get all drinks
router.get('/', (req, res, next)=> {
    Drink.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

// get drink by id
router.get('/:drinkId', (req, res, next)=> {
    const id = req.params.drinkId;
    Drink.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json(doc);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.post('/', (req, res, next)=> {
    const drink = new Drink({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        size: req.body.size
    });
    drink
    .save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Klaar',
        aangemaakteDrink: drink
    })
});

router.delete('/:drinkId', (req, res, next)=> {
    const id = req.params.drinkId;
    Drink.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.delete('/', (req, res, next)=> {
    Drink.remove({})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    });
});

router.patch('/:drinkId', (req, res, next)=>{
    const id = req.params.drinkId;
    const updateOps = {};

    console.log(req.body);


    for (const key of Object.keys(req.body)) {
      updateOps[key] = req.body[key]
    }
    console.log(updateOps);    

    Drink.update({_id: id}, { $set: updateOps})
    .exec()
    .then(result =>{
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    });


});


module.exports = router;
