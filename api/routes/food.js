const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Food = require('../models/food');

//get all drinks
router.get('/', (req, res, next)=> {
    Food.find()
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
router.get('/:foodId', (req, res, next)=> {
    const id = req.params.foodId;
    Food.findById(id)
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
    const food = new Food({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        size: req.body.size
    });
    food
    .save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Klaar',
        aangemaaktFood: food
    })
});

router.delete('/:foodId', (req, res, next)=> {
    const id = req.params.foodId;
    Food.remove({_id: id})
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
    Food.remove({})
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

router.patch('/:foodId', (req, res, next)=>{
    const id = req.params.foodId;
    const updateOps = {};

    console.log(req.body);


    for (const key of Object.keys(req.body)) {
      updateOps[key] = req.body[key]
    }
    console.log(updateOps);    

    Food.update({_id: id}, { $set: updateOps})
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
