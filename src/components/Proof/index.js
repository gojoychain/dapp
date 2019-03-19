import React, { Component, Fragment } from 'react'
import pot from '../../pot';
import poi from '../../poi';
import poc from '../../poc';
import ProofOfContract from './model'
export default class GHUSDContract extends Component{
  render() {
    const { currentAddress } = this.props
    return(
      <Fragment>
        <ProofOfContract contractAt={pot} currentAddress={currentAddress} title={'Proof Of Transaction Contract'}/>
        <ProofOfContract contractAt={poi} currentAddress={currentAddress} title={'Proof Of Investment Contract'}/>
        <ProofOfContract contractAt={poc} currentAddress={currentAddress} title={'Proof Of Contribution Contract'}/>
      </Fragment>
    )
  }
}
