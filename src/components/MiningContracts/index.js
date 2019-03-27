import React, { Fragment } from 'react';
import pot from '../../contracts/pot';
import poi from '../../contracts/poi';
import poc from '../../contracts/poc';
import BaseMiningContract from './BaseMiningContract';

const MiningContracts = (props) => {
  const { currentAddress } = props;
  return (
    <Fragment>
      <BaseMiningContract
        contract={pot()}
        currentAddress={currentAddress}
        title="Proof Of Transaction Contract"
      />
      <BaseMiningContract
        contract={poi()}
        currentAddress={currentAddress}
        title="Proof Of Investment Contract"
      />
      <BaseMiningContract
        contract={poc()}
        currentAddress={currentAddress}
        title="Proof Of Contribution Contract"
      />
    </Fragment>
  );
};

export default MiningContracts;
