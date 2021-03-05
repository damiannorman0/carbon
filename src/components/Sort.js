import React, {useState} from 'react';
import MenuIcon from '@material-ui/icons/SwapVert';
import {PropTypes} from 'prop-types';

const Sort = (props) => {
  const {setSort, type, setSortType} = props;
  const [rev, setRev] = useState(true);

  const onClick = () => {
    setRev(!rev);
    if (rev) {
      setSortType(type);
      setSort(1);
    } else {
      setSortType(type);
      setSort(-1);
    }
  };

  return (
    <span className='sort' onClick={onClick}>
      <MenuIcon/>
    </span>
  );
};

Sort.propTypes = {
  setSort: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  setSortType: PropTypes.func.isRequired,
};

export default Sort;
