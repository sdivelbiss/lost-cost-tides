import React, { useContext } from 'react';
import Select from 'react-select';
import { Context } from '../../context/Context';
import { TIME_FORMAT_OPTIONS } from '../../constants/AppConstants';
import StyledLabel from '../form/components/StyledLabel';

const TimeFormat = () => {
  const { setTimeFormat, selectedTimeFormat } = useContext(Context);

  return (
    <StyledLabel>
      <span>Time Format</span>
      <Select
        className="form-item-time-format"
        value={selectedTimeFormat}
        name="timeFormat"
        options={TIME_FORMAT_OPTIONS}
        onChange={setTimeFormat}
      />
    </StyledLabel>
  );
};

export default TimeFormat;
