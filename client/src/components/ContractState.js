import React from "react";

class ContractState extends React.Component {
  state = {stackId: null}

  componentDidMount() {
    console.log('here3')
    const {drizzle} = this.props;
    const contract = drizzle.contracts.StringStore
    const stringDataKey = contract.methods['myString'].cacheCall()
    this.setState({stringDataKey})
    console.log('here4')
  }

  handleKeyDown = e => {
    console.log('*** KEYPRESS', { e })
    if (e.keyCode === 13) {
      this.setValue(e.target.value)
    }
  }

  setValue = value => {
    console.log('here0')
    const { drizzle, drizzleState } = this.props
    const contract = drizzle.contracts.StringStore
    console.log('here1')
    const stackId = contract.methods['set'].cacheSend(value, {from: drizzleState.accounts[0]})
    this.setState({stackId})
    console.log('here2')
  }

  getTxStatus = () => {
    console.log('here5')
    const { transactions, transactionStack } = this.props.drizzleState
    const txHash = transactionStack[this.state.stackId]

    if (!txHash) {
      return null
    }

    if (!transactions[txHash]) {
      return 'Transaction status: not yet broadcast'
    }

    return `Transaction status: ${transactions[txHash].status}`
  }

  render() {
    console.log('here6')
    const {StringStore} = this.props.drizzleState.contracts

    const currentString = StringStore.myString[this.state.stringDataKey]

    const txStatus = this.getTxStatus()
    console.log('here7')
    return (
      <div>
        <input type="text" onKeyDown={this.handleKeyDown} />
        ContractState Component: current string is {currentString && currentString.value}
        {txStatus}
      </div>
    )
  }
}

export default ContractState
