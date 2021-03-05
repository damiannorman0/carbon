import React, {useCallback} from 'react';
import {debounce} from 'debounce';
import {PropTypes} from 'prop-types';

const Search = (props) => {
  const {setSearch = ''} = props;
  const onChange = useCallback((e) => {
    const debounced = debounce(setSearch, 200);
    debounced(e.target.value);
  }, [setSearch, debounce]);

  return (
    <>
      <label>Search by region:
        <input type='text' onChange={onChange} placeholder='Enter a region...'/>
      </label>
    </>
  );
};

Search.propTypes = {
  setSearch: PropTypes.func.isRequired,
};

export default Search;


