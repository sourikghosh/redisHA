import express from 'express'
import { setAsync, getAsync } from './db.js'
const app = express()

app.get('/', async (req, res, next) => {
    try {
        await setAsync("ed", "shot")
        const result = await getAsync("ed")
        console.log(result)
        res.send({ ed: result })
    }
    catch (err) {
        res.send(err)
    }
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => { console.log(`🚀 on ${PORT}`) })