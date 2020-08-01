import React, { useContext } from 'react';
import Select from 'react-select';
import { Context } from '../../context/Context';
import { INTERVAL_OPTIONS } from '../../constants/AppConstants';
import StyledLabel from '../form/components/StyledLabel';

const Interval = () => {
  const { setInterval, selectedInterval } = useContext(Context);

  return (
    <StyledLabel>
      <span>Interval</span>
      <Select
        className="form-item-interval"
        value={selectedInterval}
        name="interval"
        options={INTERVAL_OPTIONS}
        onChange={setInterval}
      />
    </StyledLabel>
  );
};

export default Interval;
