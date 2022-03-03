const router = require("express").Router();
const Shelter = require("../models/Shelter.model");
const mongoose = require("mongoose");

// create
router.post("/", (req, res) => {
  
  const shelterDetails = {
    name: req.body.name,
    languages: req.body.languages,
    contactInfo: req.body.contactInfo,
    description: req.body.description,
    available: req.body.available,
    author: req.body.author,
    address: req.body.address
  }

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
    .populate('tasks')
    .then(allShelters => res.json(allShelters))
    .catch(err => res.json(err));
});


// update
router.get('/:shelterId', (req, res, next) => {
  const { shelterId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(shelterId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Shelter.findById(shelterId)
    .populate('tasks')
    .then(shelter => res.json(shelter))
    .catch(err => res.status(500).json(err));
});



router.put('/:shelterId', (req, res, next) => {
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
    address: req.body.address
  }

  Shelter.findByIdAndUpdate(shelterId, shelterDetails, { new: true })
    .then((updatedShelter) => res.json(updatedShelter))
    .catch(error => res.status(500).json(error));
});


// delete
router.delete('/:shelterId', (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(shelterId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Shelter.findByIdAndRemove(shelterId)
    .then( deteletedProject => {
      return Task.deleteMany( { _id: { $in: deteletedProject.tasks } } );
    })
    .then(() => res.json({ message: `Project with ${shelterId} is removed successfully.` }))
    .catch(error => res.status(500).json(error));
});


module.exports = router;
