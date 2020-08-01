import React, { useContext } from 'react';
import styled from 'styled-components';

import { Context } from '../../context/Context';
import DatePicker from '../datePicker/DatePicker';
import Units from '../units/Units';
import TimeFormat from '../timeFormat/TimeFormat';
import Interval from '../interval/Interval';

const StyledForm = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const Form = () => {
  const { fetchData } = useContext(Context);
  return (
    <StyledForm>
      <DatePicker />
      <Units />
      <TimeFormat />
      <Interval />
      <button type="button" onClick={fetchData}>
        Go
      </button>
    </StyledForm>
  );
};

export default Form;
