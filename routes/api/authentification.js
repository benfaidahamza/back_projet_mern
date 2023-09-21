const express = require('express');
const router = express.Router();
const Users = require('../../../models/User');
const {generateToken } = require('./jwt');
const bcrypt = require('bcrypt');

router.post('/login', (req, res) => {
    const login = req.body.username;
    const password = req.body.password;

    Users.findOne({
        $or: [
            { username: login },
            { email: login }
        ]
    })
        .then(user => {
            if (!user) {
                return res.status(404).json({ noUserFound: 'Pas d\'utilisateur trouvé avec cet identifiant.' });
            }
            
            bcrypt.compare(password, user.password)
                .then(match => {
                    if (match) {
                        const token = generateToken(user);
                        res.json({ token, role: user.role });
                    } else {
                        res.status(401).json({ message: 'Mot de passe incorrect.' });
                    }
                })
                .catch(err => res.status(500).json({ error: 'Une erreur s\'est produite lors de la comparaison des mots de passe.' }));
        })
        .catch(err => res.status(500).json({ error: 'Une erreur s\'est produite lors de la recherche de l\'utilisateur.' }));
});


router.post('/inscription', (req, res) => {
    const { username, email, password, phone } = req.body;
    Users.findOne({ $or: [{ username }, { email }] })
      .then(existingUser => {
        if (existingUser) {
          return res.status(400).json({ error: 'Nom d\'utilisateur ou adresse e-mail déjà utilisé' });
        }
        bcrypt.hash(password, 10)
          .then(hashedPassword => {
            const newUser = {
              username: username,
              email: email,
              password: hashedPassword,
              phone: phone,
              role:"adherent"
            };
            Users.create(newUser)
              .then(user => res.json({ msg: 'Utilisateur bien ajouté !' }))
          })
          .catch(err => res.status(500).json({ error: 'Une erreur s\'est produite lors de la création de l\'utilisateur' }));
      })
      .catch(err => res.status(400).json({ error: 'Une erreur s\'est produite lors de la vérification de l\'utilisateur' }));
  });

module.exports = router;