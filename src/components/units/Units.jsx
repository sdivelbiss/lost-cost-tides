import React, { useContext } from 'react';
import Select from 'react-select';
import { Context } from '../../context/Context';
import { UNIT_OPTIONS } from '../../constants/AppConstants';
import StyledLabel from '../form/components/StyledLabel';

const Units = () => {
  const { setUnits, selectedUnit } = useContext(Context);

  return (
    <StyledLabel>
      <span>Units</span>
      <Select
        className="form-item-units"
        value={selectedUnit} // Feet
        name="units"
        options={UNIT_OPTIONS}
        onChange={setUnits}
      />
    </StyledLabel>
  );
};

export default Units;
