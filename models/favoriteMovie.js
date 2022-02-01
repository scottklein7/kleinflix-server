const mongoose = require('mongoose')

const FavoriteMoviesSchema = new mongoose.Schema({
    uId: String,
    movieID: {
        type: String,
        required: true
    },
    media: {
        type: String,
        required: true
    },
    backDrop: {
        type: String,
        required: true
    }, 
    voteAvg: {
        type: String,
        required: true
    }, 
    title: {
        type: String,
        required: true
    }, 
    overview: {
        type: String,
        required: true
    }, 

}, { timestamps: true })

module.exports = mongoose.model('FavoriteMovie', FavoriteMoviesSchema)