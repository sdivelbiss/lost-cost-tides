import React from 'react';
import styled from 'styled-components';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

import Header from './components/header/Header';
// import DatePicker from './components/datePicker/DatePicker';
import ContextProvider from './context/Context';
import Form from './components/form/Form';
import PredictionTable from './components/predictionTable/PredictionTable';

const StyledApp = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const Body = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`;

function App() {
  return (
    <StyledApp>
      <Header />
      <ContextProvider>
        <Body>
          <Form />
        </Body>
        <PredictionTable />
      </ContextProvider>
    </StyledApp>
  );
}

export default App;
