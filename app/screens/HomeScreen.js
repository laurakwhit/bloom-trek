import React, { Component } from 'react';
import {
  View, StyleSheet, Text, Image,
} from 'react-native';
import { Header } from 'react-native-elements';
import { Location, Permissions, Font } from 'expo';
import Geocoder from 'react-native-geocoding';
import { GOOGLE_KEY } from 'react-native-dotenv';
import Map from '../components/Map';
import Search from '../components/Search';
import InfoContainer from '../components/InfoContainer';
import MonthSlider from '../components/MonthSlider';
import LoadingScreen from './LoadingScreen';
import { getAllParks, getParkTrails } from '../utils/api';

Geocoder.init(process.env.GOOGLE_KEY || GOOGLE_KEY);

export default class HomeScreen extends Component {
  state = {
    location: null,
    errorMessage: null,
    parks: [],
    selectedPark: null,
    trails: [],
    selectedTrail: null,
    selectedIndex: 0,
    selectedMonth: null,
    deltas: {
      latitudeDelta: 0.9,
      longitudeDelta: 0.9,
    },
    isFontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      bloom: require('../../assets/fonts/Pacifico-Regular.ttf'),
    });

    this.setState({ isFontLoaded: true });
    this.getCurrentLocation();
    this.getParks();

    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    this.setState({ selectedMonth: currentMonth });
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
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
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
        latitudeDelta: 0.9,
        longitudeDelta: 0.9,
      },
      trails: [],
    });
  };

  handleSelectedTrail = (id) => {
    const { trails } = this.state;
    const selectedTrail = trails.find(trail => trail.id === id);
    this.setState({ selectedTrail, location: selectedTrail.coords, selectedIndex: 2 });
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
      .catch(error => this.setState({ errorMessage: error }));
  };

  updateIndex = (selectedIndex) => {
    this.setState({ selectedIndex });
    if (selectedIndex === 1) {
      this.resetMap();
      this.setState({ selectedIndex: 0 });
    }
  };

  updateMonth = (selectedMonth) => {
    this.setState({ selectedMonth });
  }

  render() {
    const {
      location,
      parks,
      selectedPark,
      deltas,
      trails,
      selectedTrail,
      selectedIndex,
      selectedMonth,
      isFontLoaded,
    } = this.state;
    const parkArea = parks.find(park => park.id === selectedPark);

    if (!isFontLoaded || !parks.length) {
      return <LoadingScreen />;
    }
    return (
      <View style={styles.container}>
        <Header
          backgroundColor="white"
          outerContainerStyles={{ padding: 0, height: 50 }}
          containerStyle={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          centerComponent={(
            <View style={styles.header}>
              <Text style={styles.headerText}>Bloom Trek</Text>
              <Image style={styles.headerImg} source={require('../../assets/icons/flower.png')} />
            </View>
          )}
        />
        <Search updateLocation={this.updateLocation} />
        <Map
          location={location}
          parks={parks}
          deltas={deltas}
          trails={trails}
          handleSelectedTrail={this.handleSelectedTrail}
          handleSelectedPark={this.handleSelectedPark}
          selectedPark={selectedPark}
          parkArea={parkArea}
        />
        {selectedPark ? (
          <InfoContainer
            selectedPark={selectedPark}
            resetMap={this.resetMap}
            trails={trails}
            updateIndex={this.updateIndex}
            selectedIndex={selectedIndex}
            selectedTrail={selectedTrail}
            selectedMonth={selectedMonth}
            handleSelectedTrail={this.handleSelectedTrail}
            resetSelectedTrail={this.resetSelectedTrail}
          />
        ) : (
          <View />
        )}
        <MonthSlider selectedMonth={selectedMonth} updateMonth={this.updateMonth} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    marginRight: 10,
    padding: 0,
    color: '#1e231b',
    fontFamily: 'bloom',
    fontSize: 30,
  },
  headerImg: {
    height: 35,
    width: 35,
  },
});
