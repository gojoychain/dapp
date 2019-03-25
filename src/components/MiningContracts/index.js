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
        contractAt={pot}
        currentAddress={currentAddress}
        title="Proof Of Transaction Contract"
      />
      <BaseMiningContract
        contractAt={poi}
        currentAddress={currentAddress}
        title="Proof Of Investment Contract"
      />
      <BaseMiningContract
        contractAt={poc}
        currentAddress={currentAddress}
        title="Proof Of Contribution Contract"
      />
    </Fragment>
  );
};

export default MiningContracts;
