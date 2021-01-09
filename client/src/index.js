import express from 'express'
import { client, setAsync, getAsync } from './db.js'
const app = express()

app.get('/', (req, res, next) => {
    let currentCounter = updateCounter()
    res.send({ counter: currentCounter })
})

const updateCounter = async () => {
    try {
        const result = getAsync("counter")
        if (!result.data)
            await setAsync("counter", 0)
        else
            await setAsync("counter", result.data + 1)
    } catch (error) {

    }
}

const PORT = process.env.PORT || 3000

app.listen(PORT, () => { console.log(`🚀 on ${PORT}`) })