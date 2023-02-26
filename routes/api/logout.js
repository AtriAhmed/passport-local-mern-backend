const router = require('express').Router()

// Matches with "api/logout"
router.route('/').get((req, res,next) => {
  req.session.destroy(err => {
    if (err) {
      console.log(err)
    }
    res.status(200).json({
      user: {
        accessId: 0,
        type: 'visitor',
        userId: 0,
        username: ''
      }
    })
  })
  req.logout(function(err) {
    if (err) { return next(err); }
  })
})

module.exports = router
