const express = require('express')
const favoritesRouter = express.Router()
const FavoriteMovie = require('../models/favoriteMovie.js');

const admin = require('firebase-admin');
const serviceAccount = JSON.parse(process.env.GOOGLE_CREDS);
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

// INDUCES

async function isAuthenticated(req, res, next) {
    try {
        const token = req.get('Authorization');
        if (!token) throw new Error('You must be logged in')
        const user = await admin.auth().verifyIdToken(token.replace('Bearer ', ''));
        if (!user) throw new Error('something went wrong');
        req.user = user;
        next();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

favoritesRouter.get('/try', (req, res) => {
    res.send('mesaage')
})


favoritesRouter.delete("/:id", async (req, res) => {
    try {
        res.json(await FavoriteMovie.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
});

favoritesRouter.delete("/tvshows/:id", async (req, res) => {
    try {
        res.json(await FavoriteMovie.findByIdAndDelete(req.params.id))
    } catch (error) {
        res.status(400).json(error)
    }
});

favoritesRouter.post("/", isAuthenticated, async (req, res) => {
    try {
        req.body.uId = req.user.uid;
        console.log(req.body)
        res.json(await FavoriteMovie.create(req.body));
    } catch (error) {
        res.status(400).json(error)
    }
});


favoritesRouter.get("/", isAuthenticated, async (req, res) => {
    try {
        res.json(await FavoriteMovie.find({
            $and: [{ uId: req.user.uid }, { media: 'movie' }]
        }))
    } catch (error) {
        res.status(400).json(error)
    }
});

favoritesRouter.get("/tvshows", isAuthenticated, async (req, res) => {
    try {
        res.json(await FavoriteMovie.find({
            $and: [{ uId: req.user.uid }, { media: 'tv' }]
        }))
    } catch (error) {
        res.status(400).json(error)
    }
});


module.exports = favoritesRouter