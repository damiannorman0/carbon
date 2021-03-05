import React, {useMemo} from 'react';
import {PropTypes} from 'prop-types';
import {convertToReadableString} from "../utils/dateUtils";

const DataDetailRow = (props) => {
  const {shortname, dnoregion, data = []} = props;
  const generationItems = useMemo(() => {
    return data.map((item , index1) => {
      const {
        from = '',
        intensity: {index} = {},
        to = '',
        generationmix = [],
      } = (item);

      const fromFormatted = convertToReadableString(from);
      const toFormatted = convertToReadableString(to);
      const generations = item.generationmix.map((g, index2) => {
        const {fuel, perc} = g;
        return (
          <div className='row' key={`data-detail-row${index2}`}>
            <span>{fuel}: </span>
            <span>{perc}%</span>
          </div>
        );
      })
      return (
        <div className="generation">
          <div className='detail-header'>
            <div className='row'><h4>{shortname}</h4></div>
            <div className='row'><h5>{dnoregion}</h5></div>
          </div>
          <div className='row'><span>From: </span><span>{fromFormatted}</span></div>
          <div className='row'><span>To: </span><span>{toFormatted}</span></div>
          <div className='row'>
            <span>Intensity: </span>
            <span>{index}</span>
          </div>
          {generations}
        </div>
      )
    });
  }, [shortname, dnoregion, data]);

  return (
    <>
      <div className="generations">
        <div className="generations-content">
          {generationItems}
        </div>
      </div>
    </>
  );
};


DataDetailRow.propTypes = {
  shortname: PropTypes.string.isRequired,
  dnoregion: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default DataDetailRow;
