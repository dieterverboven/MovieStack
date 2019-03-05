const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user');

//get all users
router.get('/', (req, res, next)=> {
    User.find()
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

// get user by id
router.get('/:userId', (req, res, next)=> {
    const id = req.params.foodId;
    User.findById(id)
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
    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        role: req.body.role,
        email: req.body.email,
        password: req.body.password
    });
    user
    .save()
    .then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(201).json({
        message: 'Klaar',
        createdUser: user
    })
});

router.delete('/:userId', (req, res, next)=> {
    const id = req.params.userId;
    User.remove({_id: id})
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
    User.remove({})
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

router.patch('/:userId', (req, res, next)=>{
    const id = req.params.userId;
    const updateOps = {};

    console.log(req.body);


    for (const key of Object.keys(req.body)) {
      updateOps[key] = req.body[key]
    }
    console.log(updateOps);    

    User.update({_id: id}, { $set: updateOps})
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

router.post('/login', (req, res, next)=> {
        console.log(req.body);
        User.findOne({email: req.body.email, passwoord: req.body.passwoord})
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
        res.status(401).json({
            'reason':'unauthorized'
        });
    
});

module.exports = router;
