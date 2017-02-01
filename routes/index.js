var express = require('express');
var router = express.Router();
const db = require('monk')('localhost/mydb')
const users = db.get('users')

router.get('/', function(req, res, next) {
  users.find({}).then(function(users) {
    res.json(users)
  })
})
/* GET home page. */
router.post('/', function(req, res, next) {
  users.insert(req.body).then(function(result) {
    res.json(result)
  })
});

router.delete('/:id', function(req, res, next) {
  const id = req.params.id;
  users.findOneAndDelete({ '_id': req.params.id})
    .then(function() {
      res.redirect('/')
    })
})
// 
// router.put('/:id', function(req, res, next) {
//   const id = req.params.id;
//   users.findOneAndUpdate({name: 'foo'}, {name: 'bar'})
//     .then(function() {
//       res.redirect('/')
//     })
// })

module.exports = router;
