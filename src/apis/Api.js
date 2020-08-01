// https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=20200731&end_date=20200801&datum=MLLW&station=9418024&time_zone=lst_ldt&units=english&interval=hilo&format=json

const formUrl = (startDate, endDate, units, interval) => {
  // unites - english/ mtric
  const endpoint = `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter?product=predictions&application=NOS.COOPS.TAC.WL&begin_date=${startDate}&end_date=${endDate}&datum=MLLW&station=9418024&time_zone=GMT&units=${units}&interval=${interval}&format=json`;
  return endpoint;
};

export const fetchTideData = async (startDate, endDate, units, interval) => {
  const url = formUrl(startDate, endDate, units, interval);
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    // redirect: 'follow', // manual, *follow, error
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
};
