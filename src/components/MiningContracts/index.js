import React, { Fragment } from 'react';
import ProofOfTransaction from '../../contracts/proof-of-transaction';
import ProofOfInvestment from '../../contracts/proof-of-investment';
import ProofOfContribution from '../../contracts/proof-of-contribution';
import BaseMiningContract from './BaseMiningContract';

const MiningContracts = (props) => {
  const { currentAddress } = props;
  return (
    <Fragment>
      <BaseMiningContract
        contract={ProofOfTransaction()}
        currentAddress={currentAddress}
        title="Proof Of Transaction Contract"
      />
      <BaseMiningContract
        contract={ProofOfInvestment()}
        currentAddress={currentAddress}
        title="Proof Of Investment Contract"
      />
      <BaseMiningContract
        contract={ProofOfContribution()}
        currentAddress={currentAddress}
        title="Proof Of Contribution Contract"
      />
    </Fragment>
  );
};

export default MiningContracts;
