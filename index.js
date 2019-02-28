const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');

const server = express();
const PORT = '9090';

server.use(express.json());
server.use(cors());

server.get('/api/users', (req, res) => {
   // will send back a status of 200 automatically
  db.find()
  .then(users => {
    if (users) {
      res.json(users)
    } else {
      res.status(500).json({err: 'User information cannot be retrieved'})
    }
  })
  .catch(err => {
    res.status(400).json({err: 'Bad Request'})
  })
})

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db.findById(id)
  .then(user => {
    if(user) {
      res.json(user)
    } else {
      res.status(500).json({err: 'Invalid Id'})
    }
  })
  .catch(err => {
    res.status(400).json({err: 'Bad Request'})
  })
})

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
  .then(user => {
    if (user) {
      res.json(user)
    } else {
      res.status(400).json({err: 'invalid user id'})
    }
  })
  .catch(err => {
    res.status(500).json({err: 'Bad Request'})
  })
})

server.post('/api/users', (req, res) => {
  const newUser = req.body;

  db.insert(newUser)
  .then(user => {
    if(newUser.name && newUser.bio) {
    res.status(201).json(user);
    } else {
      res.status(400).json({err: "Please provide name and bio for the user"})
    }
  })
  .catch(err => {
    res.status(500).json({ error: "There was an error while saving the user to the database" });
  });
})

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body
  const properUser = (updatedUser.name && updatedUser.bio) ? true : false;

  db.update(id, updatedUser)
  .then(updated => {
    if (updated && properUser) {
      res.json(updated)
    } else {
      if (!properUser) {
        res.status(400).json({err: "Please provide name and bio for the user."})
      } else {
        res.status(404).json({err: "The user with the specified ID does not exist."})
      }
    }
  })
  .catch(err => {
    res.status(500).json({ error: "There was an error while saving the user to the database" });
  });
})

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
