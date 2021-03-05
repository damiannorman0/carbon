import React from 'react';
import {PropTypes} from 'prop-types';

const DataRow = (props) => {
  const {from, to, intensity: {actual, forecast, index}} = props;
  return (
    <div className='textShadow'>
      <div className='row'>
        <span>To: </span><span>{to}</span>
      </div>
      <div className='row'>
        <span>From: </span><span>{from}</span>
      </div>
      <div className='row'>
        <span>Actual: </span><span>{actual}</span>
      </div>
      <div className='row'>
        <span>Forecast: </span><span>{forecast}</span>
      </div>
      <div className='row'>
        <span>Index: </span>
        <span>{index}</span>
      </div>
    </div>
  );
};

DataRow.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  intensity: PropTypes.shape({
    actual: PropTypes.string.isRequired,
    forecast: PropTypes.string.isRequired,
    index: PropTypes.string.isRequired,
  }),
};

export default DataRow;
