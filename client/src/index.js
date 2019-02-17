import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { DrizzleProvider } from 'drizzle-react';
import Web3 from 'web3'
import './index.css';
import App from './App';
import initializeStore from './store'
import * as serviceWorker from './serviceWorker';
import StravaChallengeHub from './contracts/StravaChallengeHub.json';
import StringStore from './contracts/StringStore.json';

const {REACT_APP_INFURA_ENDPOINT, REACT_APP_CONTRACT_ADDRESS, REACT_APP_FROM_ADDRESS} = process.env

var web3 = new Web3(new Web3.providers.HttpProvider(REACT_APP_INFURA_ENDPOINT));

// if deploying remix on rinkeby
const drizzleOptions = {
  contracts: [
    {
      contractName: 'StravaChallengeHub',
      web3Contract: new web3.eth.Contract(StravaChallengeHub.abi, '0x14C302E8d8aE984A596E0Ca60F1C4254F249433f'),
    },
    {
      contractName: 'StringStore',
      web3Contract: new web3.eth.Contract(
        StringStore.abi,
        REACT_APP_CONTRACT_ADDRESS,
        { from: REACT_APP_FROM_ADDRESS }
      )
    }
  ],
  events: {
    StravaChallengeHub: [
      { eventName: 'ChallengeIssued', eventOptions: {} },
      { eventName: 'ChallengeJoined', eventOptions: {} },
      { eventName: 'ChallengeSettled', eventOptions: {} },
      { eventName: 'AthleteSucceeded', eventOptions: {} }
    ]
  }
};

const store = initializeStore()

ReactDOM.render(
  <DrizzleProvider options={drizzleOptions}>
    <Provider store={store}>
      <App />
    </Provider>,
  </DrizzleProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
