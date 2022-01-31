const mongoose = require('mongoose')

const FavoriteMoviesSchema = new mongoose.Schema({
    uId: String,
    movie: {
        type: String,
        required: true
    },
    media: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('FavoriteMovie', FavoriteMoviesSchema)