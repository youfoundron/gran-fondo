const express = require('express')
const app = express()
const strava = require('./strava-lib.js')



// const strava = require('./strava-lib')(STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET)
const port = 3001

app.get('/', (req, res) => res.send('Abandon hope, all ye who compete with Rons Hawk Hill PR'))

app.listen(port, () => console.log(`Strava worker listening on port ${port}!`))

strava.authenticate()

strava.getAthlete().then(
  res => {console.log(res)}
)