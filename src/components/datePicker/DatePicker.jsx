import React, { useState, useContext } from 'react';
import { DateRangePicker } from 'react-dates';
import { END_DATE } from 'react-dates/constants';
import styled from 'styled-components';

import { Context } from '../../context/Context';

const StyledDatePicker = styled.div`
  display: flex;
  background: #f5f5f5;
  padding: 20px 40px;
  justify-content: center;
  align-items: center;
  padding-right: 60px;
  border-radius: 4px;
`;

const DatePicker = () => {
  const { startDate, endDate, setSelectedDates, onClose } = useContext(Context);
  const [focusedInput, setFocusedInput] = useState(null);

  let isOutsideRange = () => false;
  if (startDate) {
    isOutsideRange = day =>
      // this prevents the user from selecting an end date before the start date or after maximumNights days after the start date
      focusedInput === END_DATE && (day.isBefore(startDate) || day.isAfter(startDate.clone().add(31, 'days')));
  }

  return (
    <StyledDatePicker>
      <DateRangePicker
        startDate={startDate}
        startDateId="your_unique_start_date_id"
        endDate={endDate}
        endDateId="your_unique_end_date_id"
        onDatesChange={setSelectedDates}
        focusedInput={focusedInput}
        onFocusChange={setFocusedInput}
        noBorder
        onClose={onClose}
        isOutsideRange={isOutsideRange}
      />
    </StyledDatePicker>
  );
};

export default DatePicker;
