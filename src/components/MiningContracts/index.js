import React, { Fragment } from 'react';
import ProofOfTransaction from '../../contracts/proof-of-transaction';
import ProofOfInvestment from '../../contracts/proof-of-investment';
import ProofOfContribution from '../../contracts/proof-of-contribution';
import BaseMiningContract from './BaseMiningContract';

const MiningContracts = (props) => {
  const { network, currentAddress } = props;
  return (
    <Fragment>
      <BaseMiningContract
        contract={ProofOfTransaction(network)}
        currentAddress={currentAddress}
        title="Proof of Transaction Contract"
      />
      <BaseMiningContract
        contract={ProofOfInvestment(network)}
        currentAddress={currentAddress}
        title="Proof of Investment Contract"
      />
      <BaseMiningContract
        contract={ProofOfContribution(network)}
        currentAddress={currentAddress}
        title="Proof of Contribution Contract"
      />
    </Fragment>
  );
};

export default MiningContracts;
