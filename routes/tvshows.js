require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require("axios");
const API_KEY = process.env.API_KEY


router.use(bodyParser.urlencoded({ extended: false }));

router.post("/popularShows", async (req, res) => {
    let page = req.body.page || 1
    console.log(page)
    let API_KEY = process.env.API_KEY
    let popularURL = `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}`

    try {
        let popular = await axios.get(popularURL);
        res.status(200).send(popular.data)
    } catch (e){
        res.status(500).json({ message: "An error has occured", error: e})
    }

})

router.post("/fullshowInfo", async (req, res) => {
    let tv_id = req.body.id
    let infoURL = `https://api.themoviedb.org/3/tv/${tv_id}?api_key=${API_KEY}&language=en-US`
    let creditsURL = `https://api.themoviedb.org/3/tv/${tv_id}/credits?api_key=${API_KEY}&language=en-US`
    let recsURL = `https://api.themoviedb.org/3/tv/${tv_id}/recommendations?api_key=${API_KEY}&language=en-US`

    try {
        let info = await axios.get(infoURL)
        let credits = await axios.get(creditsURL)
        let recs = await axios.get(recsURL)
        let showinfo = {
            info: info.data,
            credits: credits.data,
            recs: recs.data
        }

        res.status(200).send(showinfo)
    }  catch (e) {
        res.status(500).json({ message: "An error has occured", error: e})
    }
})

module.exports = router;