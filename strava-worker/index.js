const express = require('express')
const app = express()
const port = 3001

app.get('/', (req, res) => res.send('Abandon hope, all ye who compete with Rons Hawk Hill PR'))

app.listen(port, () => console.log(`Strava worker listening on port ${port}!`))