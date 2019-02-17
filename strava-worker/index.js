const express = require('express')
const app = express()
const strava = require('./strava-lib.js')
var Int64BE = require("int64-buffer").Int64BE;


const convertQuery = data => {
  // the ugliest piece of integer parsing code I've ever written
  const intArray = data.split('\\').slice(1 + 16).map(d=>parseInt(d.slice(1)))

  const type = parseInt(Int64BE(new Buffer(intArray.slice(0, 8))))
  const segmentId = parseInt(Int64BE(new Buffer(intArray.slice(8, 16))))
  const expireTime = parseInt(Int64BE(new Buffer(intArray.slice(16, 24))))
  const timeToBeat = parseInt(Int64BE(new Buffer(intArray.slice(24, 32))))

  const challenge = { type, segmentId, expireTime, timeToBeat };
  console.log('***', {challenge})
  return challenge
}

console.log(strava)
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

  console.log('***', { req, params: req.params })
  
  const challenge = convertQuery(req.query.data)

  const athleteId = req.params.athleteId

  const success = await strava.checkAthleteSuccess({challenge, athleteId})

  res.json({success})
})

app.listen(port, () => console.log(`Strava worker listening on port ${port}!`))

strava.getAthlete().then(
  res => {console.log(res)}
)
