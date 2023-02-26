const bcrypt = require('bcrypt')
const saltRounds = 10
const connection = require('../config/connection');
const User = connection.models.User;

module.exports = {
  createNewUser: (req, res) => {
    if (req.isAuthenticated()) {
      const body = req.body
      bcrypt.hash(body.password, saltRounds, (err, hash) => {
        if (err) {
          console.error(err)
        }
        // use the index of the password value to pass to bcrypt
        // Store hash in your password DB.
        // replace plain text password with hash

        const user = new User ({
          username: body.username,
          password: hash,
          accessId: body.accessId
        })
        // console.log(userData)
        user.save().then(result => {
          // save new user with hashed password to database
          res.status(200).json({ id: result })
        }).catch(err=>{
          res.status(400).send(err)
        })
      })
    } else {
      
      res.status(400).send("not authenticated")
    }
  },
  getAllUsers: (req, res) => {
    User.find().then(data => {
      res.status(200).json(data)
    }).catch(err=>{
      res.status(404).json(err)
    })
  },
  getUserById: (req, res) => {
    User.findById(req.params.id).then(data => {
      if(data)
      res.status(200).json(data)
      else{
        res.status(404).json("user not found")
      }
    }).catch(err=>{
      res.status(500).json(err)
    })
  },
  updateUserById: (req, res) => {
    const body = req.body
    bcrypt.hash(body.password, saltRounds, (err, hash) => {
      if (err) {
        console.error(err)
      }
      // use the index of the password value to pass to bcrypt
      const user = {...body,password:hash} // replace plain text password with hash
      User.findByIdAndUpdate(req.params.id, user).then(result=>{
        
          res.status(200).send()
        
      }).catch(err=>{
        res.status(400).send(err)
      })
    })
  },
  deleteUserById: (req, res) => {
    User.deleteOne({_id:req.params.id}).then(data => {
      res.status(200).json(data)
    }).catch(err=>{
      res.status(400).send(err)
      console.log(err)
    })
  }
}
