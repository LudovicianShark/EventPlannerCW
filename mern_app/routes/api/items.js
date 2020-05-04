const express = require('express');
const router = express.Router();

//Item Model
const Item = require('../../models/Item');

// @route   GET api/items
// @desc    Get All Items
// @access  Public
router.get('/', (req, res) => {
    Item.find()
    .sort({dateRecorded: -1 })
    .then(items => res.json(items))
});

// @route   POST api/items
// @desc    Create An Item
// @access  Public
router.post('/', (req, res) => {
    const newItem = new Item({
        name:       req.body.name,
        type:       req.body.type,
        eventDate:  req.body.eventDate,
        startTime:  req.body.startTime,
        endTime:    req.body.endTime
    });
    newItem.save().then(item => res.json(item));
});


// @route   DELETE api/items/:id
// @desc    DELETE An Item
// @access  Public
router.delete('/:id', (req, res) => {
Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}))
});

module.exports = router;