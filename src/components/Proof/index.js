import React, { Fragment } from 'react';
import pot from '../../pot';
import poi from '../../poi';
import poc from '../../poc';
import ProofOfContract from './model';

const GHUSDContract = (props) => {
  const { currentAddress } = props;
  return (
    <Fragment>
      <ProofOfContract contractAt={pot} currentAddress={currentAddress} title="Proof Of Transaction Contract" />
      <ProofOfContract contractAt={poi} currentAddress={currentAddress} title="Proof Of Investment Contract" />
      <ProofOfContract contractAt={poc} currentAddress={currentAddress} title="Proof Of Contribution Contract" />
    </Fragment>
  );
};

export default GHUSDContract;
