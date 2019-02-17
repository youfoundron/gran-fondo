import { challengeType, exerciseType } from './constants'

export const POPULAR_CHALLENGES = [
  {
    image: 'map.jpg',
    challengeType: challengeType.DISTANCE,
    title: 'NYRR NYC Half – Virtual 13.1M',
    exerciseType: exerciseType.RUN,
    fee: 20
  },
  {
    image: 'map.jpg',
    challengeType: challengeType.SEGMENT,
    title: 'February Cycling Distance Challenge',
    exerciseType: exerciseType.BIKE,
    fee: 140
  },
  {
    image: 'map.jpg',
    challengeType: challengeType.DISTANCE,
    title: 'Le Col 100 km | 200 km Challenge',
    exerciseType: exerciseType.BIKE,
    fee: 140
  },
  {
    image: 'map.jpg',
    challengeType: challengeType.DISTANCE,
    title: 'NYRR NYC Half – Virtual 13.1M',
    exerciseType: exerciseType.SWIM,
    fee: 100
  },
  {
    image: 'map.jpg',
    challengeType: challengeType.DISTANCE,
    title: "NYRR Virtual Valentine's Duo 5K",
    exerciseType: exerciseType.RUN,
    fee: 80
  },
  {
    image: 'map.jpg',
    challengeType: challengeType.SEGMENT,
    title: 'February 10K',
    exerciseType: exerciseType.RUN,
    fee: 140
  },
  {
    image: 'map.jpg',
    challengeType: challengeType.SEGMENT,
    title: 'NYRR NYC Half – Virtual 13.1M',
    exerciseType: exerciseType.SWIM,
    fee: 300
  },
  {
    image: 'map.jpg',
    challengeType: challengeType.SEGMENT,
    title: 'February Gran Fondo',
    exerciseType: exerciseType.BIKE,
    fee: 140
  },
  {
    image: 'map.jpg',
    challengeType: challengeType.SEGMENT,
    title: 'NYRR NYC Half – Virtual 13.1M',
    exerciseType: exerciseType.SWIM,
    fee: 90
  },
  {
    image: 'map.jpg',
    challengeType: challengeType.DISTANCE,
    title: 'February Cycling Climbing Challenge',
    exerciseType: exerciseType.BIKE,
    fee: 45
  }
]

export const CHALLENGE_SINGLE = {
  challengeType: challengeType.DISTANCE,
  exerciseType: exerciseType.SWIM,
  name: 'Some cool name for an event',
  description:
    'Uhuh Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure laudantium, quod quos tempora rem non quia quibusdam est reiciendis, cupiditate commodi sint praesentium consequatur. Ad quae odit quas iusto harum!',
  expirationDate: '1552885345',
  distance: '105600',
  fee: '120'
}

export const USERS = [
  {
    image: 'girlie.jpg',
    name: 'Haley Jackson',
    location: 'San Francisco, CA'
  },
  {
    image: 'girlie.jpg',
    name: 'Rodney Jones',
    location: 'Los Gatos, CA'
  },
  {
    image: 'girlie.jpg',
    name: 'Dale Arnold',
    location: 'Sausalito, CA'
  },
  {
    image: 'girlie.jpg',
    name: 'Becky Smith',
    location: 'Oakland, CA'
  }
]
