/* eslint-disable class-methods-use-this */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

const AppContext = React.createContext({});
AppContext.displayName = 'AppContext';


class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: {},
      regions: [],
    };

    this.setRegion = this.setRegion.bind(this);
    this.setRegions = this.setRegions.bind(this);
  }

  setRegion(id, region = {}) {
    this.setState({
      region: {
        ...this.state.region,
        [id]: region,
      },
    });
  }

  setRegions(regions = []) {
    this.setState({
      regions: [...regions],
    });
  }

  render() {
    const {children} = this.props;
    return (
      <AppContext.Provider
        value={{
          region: this.state.region,
          regions: this.state.regions,
          setRegion: this.setRegion,
          setRegions: this.setRegions,
        }}>
        {children}
      </AppContext.Provider>
    );
  }
}

const AuthConsumer = AppContext.Consumer;
export {AppContext, AuthConsumer, Provider};
