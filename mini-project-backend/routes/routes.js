const router = require('express').Router();

// needs filling with correct import
const { Beer } = require('../persistence/schema');

router.post('/create', (req, res, next) => {
  const beer = new Beer(req.body);
  beer
    .save()
    .then((result) => {
      res.status(201).send(`Created Beer : ${result.name}`);
    })
    .catch((error) => {
      next(error);
    });
});

router.get('/getAll', (req, res, next) => {
  Beer.find((error, beers, next) => {
    if (error) {
      console.log(`error : ${error}`);
      res.status(500).send(error);
    } else {
      res.status(206).send(beers);
    }
  });
});

router.delete('/delete/:id', (req, res) => {
  console.log(req.params.id);
  Beer.findByIdAndDelete(req.params.id, (error) => {
    if (error) {
      console.log(`error : ${error}`);
      res.status(500).send(error);
    }
    res.status(202).send(`Deleted`);
  });
});
router.put('/update/:id', (req, res) => {
  Beer.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(202).send(doc);
  });
});
router.get('/getById/:id', (req, res) => {
  Beer.findById(req.params.id, (error, result) => {
    if (error) {
      console.log(`error : ${error}`);
      res.status(500).send(error);
    }
    res.status(206).send(result);
  });
});

router.get('/getByName/:name', (req, res) => {
  const name = req.params.name;
  Beer.find({ name: name }, (err, doc) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(206).send(doc);
  });
});

module.exports = router;
