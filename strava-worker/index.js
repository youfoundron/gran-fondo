const express = require('express')
const app = express()
const strava = require('./strava-lib.js')



// const strava = require('./strava-lib')(STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET)
const port = 3001

app.get('/', async (req, res) => {
  res.send('Yay - try /challenge-success')
})

app.get('/athlete', async (req, res) => {
  const athlete = await strava.getAthlete()
  res.send(athlete)
})

app.get('/challenge-success', async (req, res) => {
  const challenge = {
    // TODO: type from request
    type: 0,
    // TODO: segment id from request
    segmentId: 52271403536,
    // TODO: expire time from request
    expireTime: 1557307451000,
    // TODO: time from request
    timeToBeat: 800 // seconds, I think
  }

  const athleteId = req.params.athleteId

  const success = await strava.checkAthleteSuccess({challenge, athleteId})

  res.json({success})
})

app.listen(port, () => console.log(`Strava worker listening on port ${port}!`))

strava.authenticate()