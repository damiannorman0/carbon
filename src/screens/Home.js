import React, {useContext, useEffect, useMemo, useState} from 'react';
import styles from '../app.css';
import {Link} from 'react-router-dom';
import {AppContext} from '../AppContext';
import {getDensityByRegion, getDensityToday} from '../services/api';
import DataRow from '../components/DataRow';
import Table from '../components/Table';
import Search from '../components/Search';
import PageHeader from "../components/PageHeader";


const Home = (props) => {
  const {regions, setRegions} = useContext(AppContext);
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const [regionalData, setRegionalData] = useState((regions.length && regions) || []);

  useEffect(() => {
    try {
      const get = async () => {
        const data = await getDensityToday();
        setData(data);
      };
      get();
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    try {
      const get = async () => {
        const data = await getDensityByRegion();
        setRegions(data);
        setRegionalData(data);
      };
      !regions.length && get();
    } catch (err) {
      console.error(err);
    }
  }, [setRegions, setRegionalData]);


  const filteredRegionalData = useMemo(() => {
    const data = regions || regionalData;
    const searchNormalized = search.toLowerCase();
    return data.filter((item) => {
      const shortname = item.shortname.toLowerCase();
      return shortname.includes(searchNormalized);
    });
  }, [setRegions, setRegionalData, regionalData, search]);

  const rows = useMemo(() => {
    return data.map((item) => {
      return (
        <DataRow {...item} key={`key_${item.to}`}/>
      );
    });
  }, [data]);

  return (
    <div className='Container'>
      <div className='Panel'>
        <PageHeader heading={['Today\'s', 'Carbon', 'Intensity']} />
        <main>
          <div className='data-body'>
            {rows}
          </div>
        </main>
      </div>
      <div>
        <Search setSearch={setSearch}/>
      </div>
      <Table data={filteredRegionalData}/>
    </div>
  );
};

export default Home;
