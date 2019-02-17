import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Drizzle, generateStore as initializeDrizzleStore } from 'drizzle'
import { DrizzleContext } from 'drizzle-react';
// import Web3 from 'web3'
import './index.css';
import App from './App';
import initializeStore from './store'
import * as serviceWorker from './serviceWorker';
import StringStore from './contracts/StringStore.json';
import StravaChallengeHub from './contracts/StravaChallengeHub.json';

// const {
//   REACT_APP_INFURA_ENDPOINT,
//   REACT_APP_CONTRACT_ADDRESS,
//   REACT_APP_FROM_ADDRESS,
//   STRAVA_CHALLENGE_HUB_CONTRACT_ADDRESS
// } = process.env

// var web3 = new Web3(new Web3.providers.HttpProvider(REACT_APP_INFURA_ENDPOINT));
// var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

const drizzleOptions = {
  syncAlways: true,
  contracts: [
    StringStore,
    StravaChallengeHub,

    // {
    //   contractName: 'StringStore',
    //   web3Contract: new web3.eth.Contract(StringStore.abi, '0x77aC9279d50c2cC846FbC9208F7643287bd84dD1')
    // },
    // {
    //   contractName: 'StravaChallengeHub',
    //   web3Contract: new web3.eth.Contract(StravaChallengeHub.abi, '0x4Ee03E1965238cBD62F6b391822A0f59050a7c4d')
    // }

    // {
    //   contractName: 'StravaChallengeHub',
    //   web3Contract: new web3.eth.Contract(StravaChallengeHub.abi, '0x14C302E8d8aE984A596E0Ca60F1C4254F249433f'),
    // },
    // {
    //   contractName: 'StringStore',
    //   web3Contract: new web3.eth.Contract(
    //     StringStore.abi,
    //     REACT_APP_CONTRACT_ADDRESS,
    //     { from: REACT_APP_FROM_ADDRESS }
    //   )
    // }
  ],
  // events: {
  //   StravaChallengeHub: [
  //     { eventName: 'ChallengeIssued', eventOptions: {} },
  //     { eventName: 'ChallengeJoined', eventOptions: {} },
  //     { eventName: 'ChallengeSettled', eventOptions: {} },
  //     { eventName: 'AthleteSucceeded', eventOptions: {} }
  //   ]
  // }
};

const store = initializeStore()
const drizzleStore = initializeDrizzleStore(drizzleOptions)
const drizzle = new Drizzle(drizzleOptions, drizzleStore)

ReactDOM.render(
  <DrizzleContext.Provider drizzle={drizzle}>
    <Provider store={store}>
      <App />
    </Provider>
  </DrizzleContext.Provider>
  , document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
