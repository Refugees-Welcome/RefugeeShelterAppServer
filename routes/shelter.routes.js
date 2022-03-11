const router = require("express").Router();
const Shelter = require("../models/Shelter.model");
const mongoose = require("mongoose");
const User = require("../models/User.model")
const { isAuthenticated } = require("../middleware/jwt.middleware"); 
const isOwner = require("../middleware/isOwner")
// const {checkUser} =require("../middleware/jwt.middleware")
// create
router.post("/", (req, res) => {
  
  const shelterDetails = {
    name: req.body.name,
    languages: req.body.languages,
    contactInfo: req.body.contactInfo,
    description: req.body.description,
    available: req.body.available,
    author: req.body.author,
    address: req.body.address,
    location: {
      coordinates: req.body.location.coordinates,
      type: 'Point'
    }
  }
console.log("shelterDetails server")
console.log( shelterDetails);

  Shelter.create(shelterDetails)
    .then(shelterCreated => {
      res.status(201).json(shelterCreated)
    })
    .catch(err => {
      console.log("error creating a new shelter", err);
      res.status(500).json({
        message: "error creating a new shelter",
        error: err
      });
    })
})

// read
router.get('/', (req, res, next) => {
  Shelter.find()
    .populate('author')
    .then(allShelters => res.json(allShelters))
    .catch(err => res.json(err));
});


// update

router.get('/:shelterId',isAuthenticated, (req, res, next) => {
  const { shelterId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(shelterId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Shelter.findById(shelterId)
  .populate('author')
    .then(shelter => res.json(shelter))
    .catch(err => res.status(500).json(err));
});



router.put('/:shelterId',isAuthenticated, (req, res, next) => {
  const { shelterId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(shelterId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }


  const shelterDetails = {
    name: req.body.name,
    languages: req.body.languages,
    contactInfo: req.body.contactInfo,
    description: req.body.description,
    available: req.body.available,
    address: req.body.address,
    location: {
      type: 'Point',
      coordinates: []
    }
  }

  Shelter.findByIdAndUpdate(shelterId, shelterDetails, { new: true })
  .populate('author')
    .then((updatedShelter) => res.json(updatedShelter))
    .catch(error => res.status(500).json(error));
});


// delete
router.delete('/:shelterId',isAuthenticated , (req, res, next) => {
  const { shelterId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(shelterId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
 // if userId === author
//  console.log(payload)
//   if (!(payload._id === req.author._id)) {
//     res.status(400).json({ message: 'Specified id is not valid' });
//     return;
//   }

  Shelter.findByIdAndRemove(shelterId)
    .then( deteletedShelter => {
      return Shelter.deleteMany( { _id: { $in: deteletedShelter } } );
    })
    .then(() => res.json({ message: `Shelter with ${shelterId} is removed successfully.` }))
    .catch(error => res.status(500).json(error));
});


module.exports = router;
