const router = require("express").Router();
const Refugee = require("../models/Refugee.model");
const mongoose = require("mongoose");

// create
router.post("/", (req, res) => {

  const refugeeDetails = {
    name: req.body.name,
    languages: req.body.languages,
    contactInfo: req.body.contactInfo,
    description: req.body.description,
    onSearch: req.body.onSearch,
    author: req.body.author,
    currentlyBasedIn: req.body.currentlyBasedIn
  }

  Refugee.create(refugeeDetails)
    .then(refugeeCreated => {
      res.status(201).json(refugeeCreated)
    })
    .catch(err => {
      console.log("error creating a new refugee", err);
      res.status(500).json({
        message: "error creating a new refugee",
        error: err
      });
    })
})

// read
router.get('/', (req, res, next) => {
  Refugee.find()
    // .populate('tasks')
    .then(allRefugees => res.json(allRefugees))
    .catch(err => res.json(err));
});

// update
router.get('/:refugeeId', (req, res, next) => {
  const { refugeeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(refugeeId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Refugee.findById(refugeeId)
    // .populate('tasks')
    .then(refugee => res.json(refugee))
    .catch(err => res.status(500).json(err));
});

router.put('/:refugeeId', (req, res, next) => {
  const { refugeeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(refugeeId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }
// if userId === author
  const refugeeDetails = {
    name: req.body.name,
    languages: req.body.languages,
    contactInfo: req.body.contactInfo,
    description: req.body.description,
    onSearch: req.body.onSearch,
    currentlyBasedIn: req.body.currentlyBasedIn
  }

  Refugee.findByIdAndUpdate(refugeeId, refugeeDetails, { new: true })
    .then((updatedProject) => res.json(updatedProject))
    .catch(error => res.status(500).json(error));
});

// delete
router.delete('/:refugeeId', (req, res, next) => {
  const { refugeeId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(refugeeId)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  Refugee.findByIdAndRemove(refugeeId)
    .then( deletedRefugee => {
      return Task.deleteMany( { _id: { $in: deletedRefugee } } );
    })
    .then(() => res.json({ message: `Refugee with ${refugeeId} is removed successfully.` }))
    .catch(error => res.status(500).json(error));
});

module.exports = router;