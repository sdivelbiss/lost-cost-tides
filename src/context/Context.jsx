/* eslint-disable react/no-unused-state */
import React, { Component } from 'react';
import moment from 'moment';
import { TIME_FORMAT_OPTIONS, UNIT_OPTIONS, INTERVAL_OPTIONS, STATUS } from '../constants/AppConstants';
import { fetchTideData } from '../apis/Api';
import { formatPredictionData } from '../constants/util';

export const Context = React.createContext();

const INITIAL_STATE = {
  startDate: null,
  endDate: null,
  selectedUnit: null,
  selectedTimeFormat: null,
  selectedInterval: null,
  status: '',
  predictions: [],
};

class ContextProvider extends Component {
  // Context state
  constructor() {
    super();
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    // set defaults
    this.setState({
      selectedUnit: UNIT_OPTIONS[0], // Feet
      selectedTimeFormat: TIME_FORMAT_OPTIONS[0], // 12 Hour
      selectedInterval: INTERVAL_OPTIONS[INTERVAL_OPTIONS.length - 1], // Last option is High/Low which is the default
      startDate: moment(),
      endDate: moment().add(1, 'month'),
    });
  }

  setSelectedDates = ({ startDate, endDate }) => {
    this.setState({
      startDate,
      endDate,
    });
  };

  setUnits = selectedUnit => {
    this.setState({
      selectedUnit,
    });
  };

  setTimeFormat = selectedTimeFormat => {
    this.setState({
      selectedTimeFormat,
    });
  };

  setInterval = selectedInterval => {
    this.setState({
      selectedInterval,
    });
  };

  onClose = () => {
    console.log('object');
  };

  fetchData = () => {
    const { startDate, endDate, selectedUnit, selectedInterval } = this.state;
    this.setState(
      {
        status: STATUS.LOADING,
      },
      async () => {
        try {
          const dateFormat = 'L';
          const { value: units } = selectedUnit;
          const { value: interval } = selectedInterval;
          const formattedStartDate = startDate.format(dateFormat);
          const formattedEndDate = endDate.format(dateFormat);
          const { predictions, error } = await fetchTideData(formattedStartDate, formattedEndDate, units, interval);
          if (predictions) {
            const { selectedTimeFormat } = this.state;
            const { value: timeFormat } = selectedTimeFormat;
            const formattedPredictionData = formatPredictionData(predictions, timeFormat, units);
            this.setState({
              status: STATUS.SUCCESS,
              predictions: formattedPredictionData,
            });
            return;
          }
          throw error;
        } catch (error) {
          this.setState({
            status: STATUS.ERROR,
          });
        }
      }
    );
  };

  render() {
    const { children } = this.props;

    return (
      <Context.Provider
        value={{
          ...this.state,
          setSelectedDates: this.setSelectedDates,
          setUnits: this.setUnits,
          setTimeFormat: this.setTimeFormat,
          setInterval: this.setInterval,
          onClose: this.onClose,
          fetchData: this.fetchData,
        }}
      >
        {children}
      </Context.Provider>
    );
  }
}

export const ContextConsumer = Context.Consumer;

export default ContextProvider;
