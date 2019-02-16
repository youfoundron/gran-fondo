import React from "react";

class ContractState extends React.Component {
  state = {stackId: null}

  componentDidMount() {
    const {drizzle} = this.props;
    const contract = drizzle.contracts.StringStore
    const stringDataKey = contract.methods['myString'].cacheCall()
    this.setState({stringDataKey})
  }

  handleKeyDown = e => {
    console.log('*** KEYPRESS', { e })
    if (e.keyCode === 13) {
      this.setValue(e.target.value)
    }
  }

  setValue = value => {
    const { drizzle, drizzleState } = this.props
    const contract = drizzle.contracts.StringStore

    const stackId = contract.methods['set'].cacheSend(value, {from: drizzleState.accounts[0]})
    this.setState({stackId})
  }

  getTxStatus = () => {
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

    const {StringStore} = this.props.drizzleState.contracts

    const currentString = StringStore.myString[this.state.stringDataKey]

    const txStatus = this.getTxStatus()

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
