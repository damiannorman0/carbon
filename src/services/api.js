const getDensityToday = async () => {
  try {
    const result = await fetch('https://api.carbonintensity.org.uk/intensity');
    const json = await result.json() || {};
    return json.data;
  } catch (err) {
    console.error(err);
  }
};

const getDensityByRegion = async () => {
  try {
    const result = await fetch('https://api.carbonintensity.org.uk/regional');
    const json = await result.json() || {};
    const {
      data:
        [
          {
            regions = [],
          } = {},
        ] = {},
    } = json;
    return regions;
  } catch (err) {
    console.error(err);
  }
};

const getDetailByRegion = async (id) => {
  try {
    const result = await fetch(`https://api.carbonintensity.org.uk/regional/regionid/${id}`);
    const json = await result.json() || {};
    return json.data[0];
  } catch (err) {
    console.error(err);
  }
};

const getDetailByRegionWithTime = async ({region, start, end}) => {
  const hoursMS= (60 * 60 * 1000);
  const p = Date.now() - ((start) * hoursMS);
  const pDate = new Date(p).toISOString();
  const f = Date.now() + ((end) * hoursMS);
  const fDate = new Date(f).toISOString();
  try {
    const result = await fetch(`https://api.carbonintensity.org.uk/regional/intensity/${pDate}/${fDate}/regionid/${region}`);
    const json = await result.json()  || {};
    return json.data;
  } catch (err) {
    console.error(err);
  }
};

export {
  getDensityToday,
  getDensityByRegion,
  getDetailByRegion,
  getDetailByRegionWithTime,
};
