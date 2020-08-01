import React from 'react';
import moment from 'moment';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const TIDE_THRESHOLD_ENGLISH = 3;
const TIDE_THRESHOLD_METRIC = 0.9144;

export const formatPredictionData = (data, timeFormat = '12', unit = 'english') => {
  const formattedPredictionData = data.map(({ t, v, type }) => {
    const dateTime = moment(t, `YYYY-MM-DD HH:mm`).subtract(7, 'hours');
    console.log(dateTime);
    // var lostCoastDateTime = moment.tz(t, 'America/Los_Angeles');
    // console.log(lostCoastDateTime);
    const date = dateTime.format('MMM Do YYYY');
    const time = dateTime.format(timeFormat === '24' ? 'HH:mm' : 'LT');
    const predictedHeight = `${v} ${unit === 'english' ? 'Feet' : 'Meters'}`;
    let highLow;
    let isTooHigh;
    if (type) {
      highLow = type === 'H' ? <HighlightOffIcon /> : <CheckCircleOutlineIcon />;
      isTooHigh = type === 'H';
    } else {
      if (unit === 'english') {
        highLow = Number(v) > TIDE_THRESHOLD_ENGLISH ? <HighlightOffIcon /> : <CheckCircleOutlineIcon />;
        isTooHigh = Number(v) > TIDE_THRESHOLD_ENGLISH;
      } else {
        highLow = Number(v) > TIDE_THRESHOLD_METRIC ? <HighlightOffIcon /> : <CheckCircleOutlineIcon />;
        isTooHigh = Number(v) > TIDE_THRESHOLD_METRIC;
      }
    }
    return {
      date,
      time,
      predictedHeight,
      highLow,
      isTooHigh,
    };
  });
  return formattedPredictionData;
};
