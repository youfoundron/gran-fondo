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

const {REACT_APP_INFURA_ENDPOINT} = process.env

console.log('***', { StringStore })

var web3 = new Web3(new Web3.providers.HttpProvider(REACT_APP_INFURA_ENDPOINT));
// if deploying via truffle
// const drizzleOptions = { contracts: [StravaChallengeHub] };

// if deploying remix on rinkeby
const drizzleOptions = { contracts: [{
  contractName: 'StringStore',
  web3Contract: new web3.eth.Contract(
    StringStore.abi,
    '0x69a6cc5e4f9f0e9b19fe5dcdc2ece0e38dc133a7',
    {
      from: '0x1a10153A7c8De1bF12006291fe0169Dfe050a135'
    }
  )
}] };

const store = initializeStore()

ReactDOM.render(
  <DrizzleProvider options={drizzleOptions}>
    <Provider store={store}>
      <App />
    </Provider>
  </DrizzleProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
