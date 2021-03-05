import React, {useMemo, useState} from 'react';
import {Link} from 'react-router-dom';
import Sort from './Sort';
import {PropTypes} from 'prop-types';

const TableContainer = ({data = []}) => {
  const [sortName, setSortName] = useState(0);
  const [sorIntensity, setSortIntensity] = useState(0);
  const [sortType, setSortType] = useState('');
  const setSortTypes = (type) => {
    if (type === 'shortname') {
      setSortIntensity(null);
      setSortType('shortname');
    } else {
      setSortName(null);
      setSortType('intensity');
    }
  };

  const Row = ({regionid, index, shortname, forecast, intensity: {index: intensityIndex}}) => {
    return (
      <div className='data-table-row' data-id={`${regionid}`}>
        <div className='cell' data-id={`${regionid}`}>{index + 1}</div>
        <div className='cell' data-id={`${regionid}`}>
          <Link to={`/detail/${regionid}`} style={{color: 'black', textDecoration: 'none'}}>
            {shortname}
          </Link>
        </div>
        <div className='cell' data-id={`${regionid}`}>{intensityIndex}</div>
      </div>
    );
  };

  const sorts = useMemo(() => {
    return {
      ['shortname']: (a, b) => {
        if (sortName === -1) {
          return a.shortname.localeCompare(b.shortname);
        }

        return b.shortname.localeCompare(a.shortname);
      },
      ['intensity']: (a, b) => {
        if (sorIntensity === -1) {
          return +a.intensity.forecast - +b.intensity.forecast;
        }

        return +b.intensity.forecast - +a.intensity.forecast;
      },
    };
  }, [sortName, sorIntensity]);

  const sorted = useMemo(() => {
    if (sortType) {
      return data.sort(sorts[sortType]);
    }

    return data;
  }, [data, sortType, sortName, sorIntensity]);

  const rows = (sorted).map((item, index) => {
    return (
      <Row {...item} index={index} key={index}/>
    );
  });

  const none = (<div className='data-table-row-none'>
    <div className='cell'></div>
    <div className='cell'>sorry no data found this time</div>
    <div className='cell'></div>
  </div>);

  return (
    <div className='data-table'>
      <div className='data-table-header'>
        <div className='cell'>ID</div>
        <div className='cell'>
          <span>Region</span>
          <Sort type='shortname' setSort={setSortName} setSortType={setSortTypes}/>
        </div>
        <div className='cell'>
          <span>Intensity</span>
          <Sort type='intensity' setSort={setSortIntensity} setSortType={setSortTypes}/>
        </div>
      </div>
      <div className='data-table-body'>
        {(rows.length > 0 && rows) || none}
      </div>
    </div>
  );
};

TableContainer.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      regionid: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
      shortname: PropTypes.string.isRequired,
      intensity: PropTypes.shape({
        index: PropTypes.number.isRequired,
      }),
    }),
  ),
};

export default TableContainer;
