import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {
  useParams,
} from 'react-router-dom';
import styles from '../app.css';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {debounce} from 'debounce';


import {getDetailByRegion, getDetailByRegionWithTime} from '../services/api';
import DataDetailRow from '../components/DataDetailRow';
import {AppContext} from '../AppContext';
import PageHeader from "../components/PageHeader";
import {
  Slider,
  SliderInput,
  SliderTrack,
  SliderRange,
  SliderHandle,
  SliderMarker,
} from "@reach/slider";
import "@reach/slider/styles.css";


const Detail = (props) => {
  const {region} = useParams();
  const {region: storedRegion, setRegion} = useContext(AppContext);
  const [data, setData] = useState(storedRegion[region] || {});
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(1);
  const [interactive, setInteractive] = useState(false);


  useEffect(() => {
    try {
      const get = async () => {
        const data = await getDetailByRegion(region);
        setRegion(region, data);
        setData(data);
      };
      (region && !storedRegion[region]) && get();
    } catch (err) {
      console.error(err);
    };
  }, [storedRegion, region]);

  useEffect(() => {
    try {
      const get = async () => {
        const data = await getDetailByRegionWithTime({
          region,
          start,
          end,
        });
        setInteractive(false);
        setData(data);
      };
      (region && start && end && interactive && get());
    } catch (err) {
      console.error(err);
    };
  }, [storedRegion, region, start, end, interactive]);

  const rows = useMemo(() => {
    return (<DataDetailRow {...data} />);
  }, [data]);

  const handleDateStartChange = useCallback((value) => {
    setStart(value);
    setInteractive(true);
  }, [setStart, setInteractive]);

  const handleDateEndChange = useCallback((value) => {
    setEnd(value);
    setInteractive(true);
  }, [setEnd, setInteractive]);

  return (
    <>
      <div className='Container'>
        <div className='Panel'>
          <PageHeader heading={['Today\'s', 'Carbon', 'Intensity']} />
        </div>
      </div>
      <div className='Container'>
        <div className='PanelPlain'>
          <div className='PanelPlainBlur'/>
          <main>
            <div className='dates'>
              <Slider className='slider' min={1} max={24} step={1} defaultValue={start} onChange={debounce(handleDateStartChange, 2000)}>
              </Slider>
              <span className="cell">past (up to 72 hours)</span>
              <Slider className='slider' min={1} max={24} step={1} defaultValue={end} onChange={debounce(handleDateEndChange, 2000)}>
              </Slider>
              <span className="cell">future (up to 72 hours)</span>
            </div>
            <div className='data-body'>
              {rows}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Detail;
