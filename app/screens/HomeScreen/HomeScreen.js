import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { Location, Permissions, Font } from 'expo';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_KEY } from 'react-native-dotenv';
import Map from '../../components/Map/Map';
import Search from '../../components/Search/Search';
import InfoContainer from '../../components/InfoContainer/InfoContainer';
import { getAllParks, getParkTrails } from '../../utils/api';

console.log(process.env.GOOGLE_KEY);
Geocoder.init(GOOGLE_KEY);

export default class HomeScreen extends Component {
  state = {
    location: null,
    errorMessage: null,
    parks: [],
    selectedPark: null,
    trails: [],
    selectedTrail: null,
    selectedIndex: 0,
    deltas: {
      latitudeDelta: 0.9,
      longitudeDelta: 0.9,
    },
    isFontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      bloom: require('../../../assets/fonts/Pacifico-Regular.ttf'),
    });

    this.setState({ isFontLoaded: true });
    this.getCurrentLocation();
    this.getParks();
  }

  getCurrentLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied...',
      });
    }

    const position = await Location.getCurrentPositionAsync({});
    const location = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    };
    this.setState({ location });
  };

  getParks = async () => {
    const parks = await getAllParks();
    this.setState({ parks });
  };

  handleSelectedPark = async (id) => {
    const { parks } = this.state;
    const matchingPark = parks.find(park => park.id === id);
    const trails = await getParkTrails(id);
    this.setState({
      selectedPark: id,
      location: matchingPark.coords,
      deltas: {
        latitudeDelta: 0.3,
        longitudeDelta: 0.3,
      },
      selectedTrail: null,
      trails,
    });
  };

  resetMap = () => {
    this.getCurrentLocation();
    this.setState({
      selectedPark: null,
      deltas: {
        latitudeDelta: 1,
        longitudeDelta: 1,
      },
      trails: [],
    });
  };

  handleSelectedTrail = (id) => {
    const { trails } = this.state;
    const selectedTrail = trails.find(trail => trail.id === id);
    this.setState({ selectedTrail, selectedIndex: 2 });
  }

  resetSelectedTrail = () => {
    this.setState({ selectedTrail: null });
  }

  updateLocation = (input) => {
    Geocoder.from(input)
      .then((json) => {
        const { location } = json.results[0].geometry;
        const { lat, lng } = location;
        this.setState({
          location: {
            latitude: lat,
            longitude: lng,
          },
        });
      })
      .catch(error => console.warn(error));
  };

  updateIndex = (selectedIndex) => {
    this.setState({ selectedIndex });
    if (selectedIndex === 1) {
      this.resetMap();
      this.setState({ selectedIndex: 0 });
    }
  };

  render() {
    const {
      location,
      parks,
      selectedPark,
      deltas,
      trails,
      selectedTrail,
      selectedIndex,
      isFontLoaded,
    } = this.state;

    if (!isFontLoaded) {
      return <Text>broken</Text>;
    }
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="white"
          outerContainerStyles={{ padding: 0 }}
          containerStyle={{ margin: 0 }}
          centerComponent={
                    {
                      text: 'Bloom Trek',
                      style: {
                        color: '#1e231b',
                        fontSize: 30,
                        fontFamily: 'bloom',
                        padding: 0,
                      },
                    }
                  }
        />

        <Search updateLocation={this.updateLocation} />
        <Map
          location={location}
          parks={parks}
          deltas={deltas}
          trails={trails}
          handleSelectedTrail={this.handleSelectedTrail}
          handleSelectedPark={this.handleSelectedPark}
        />
        {selectedPark ? (
          <InfoContainer
            selectedPark={selectedPark}
            resetMap={this.resetMap}
            trails={trails}
            updateIndex={this.updateIndex}
            selectedIndex={selectedIndex}
            selectedTrail={selectedTrail}
            handleSelectedTrail={this.handleSelectedTrail}
            resetSelectedTrail={this.resetSelectedTrail}
          />
        ) : (
          <View />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
  },
  header: {
    alignItems: 'center',
  },
});
