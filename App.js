/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
//import {TextInput} from 'react-native';
import {TextInput} from 'react-native-paper';
import {FlatList} from 'react-native';
import {Avatar} from 'react-native-paper';
import {Card, Title, Paragraph} from 'react-native-paper';
//import { Button } from 'react-native-material-ui';
import {Button} from 'react-native-paper';
import {Component} from 'react';
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

// function Item({city, title, temperature, sunset, sunrise, pressure}) {
//   return (
//     <View style={styles.item}>
//       <Text style={styles.title}>{city}</Text>
//       <Text style={styles.title}>{title}</Text>
//       <Avatar.Icon size={90} backgroundColor="#4d2c91" icon="cloud-outline" />
//       <Text style={styles.title}>Temperatura {temperature} </Text>
//       <Text style={styles.title}>sunset {sunset}</Text>
//       <Text style={styles.title}>sunrise {sunrise} </Text>
//       <Text style={styles.title}>pressure {pressure} </Text>
//     </View>
//   );
// }

function Item({city, title, temperature, sunset, sunrise, pressure}) {
  return (
    <View style={styles.item}>
      <Avatar.Icon
        size={90}
        accent="#3498db"
        backgroundColor="#4d2c91"
        icon="weather-partlycloudy"
      />
      <Card.Title
        title="City"
        subtitle=""
        left={props => (
          <Avatar.Icon size={50} backgroundColor="#4d2c91" icon="city" />
        )}
        right={props => <Text style={styles.title}> {city} </Text>}
      />

      <Card.Title
        title="Sky"
        subtitle=""
        left={props => (
          <Avatar.Icon
            size={50}
            backgroundColor="#4d2c91"
            icon="cloud-outline"
          />
        )}
        right={props => <Text style={styles.title}> {title} </Text>}
      />
      <Card.Title
        title="Temperatura"
        subtitle=""
        left={props => (
          <Avatar.Icon
            size={50}
            backgroundColor="#4d2c91"
            icon="temperature-celsius"
          />
        )}
        right={props => <Text style={styles.title}> {temperature} </Text>}
      />
      <Card.Title
        title="Sunset"
        subtitle=""
        left={props => (
          <Avatar.Icon
            size={50}
            backgroundColor="#4d2c91"
            icon="weather-sunset-down"
          />
        )}
        right={props => <Text style={styles.title2}> {sunset} </Text>}
      />
      <Card.Title
        title="Sunrise"
        subtitle=""
        left={props => (
          <Avatar.Icon
            size={50}
            backgroundColor="#4d2c91"
            icon="weather-sunset-up"
          />
        )}
        right={props => <Text style={styles.title2}> {sunrise} </Text>}
      />
      <Card.Title
        title="Pressure"
        subtitle=""
        left={props => (
          <Avatar.Icon
            size={50}
            backgroundColor="#4d2c91"
            icon="weather-windy"
          />
        )}
        right={props => <Text style={styles.title}> {pressure} </Text>}
      />
    </View>
  );
}

export default class App extends Component {
  state = {
    api: null,
    temp: '',
    text: '', //nazwa wyszukiwania miasta
    city: null, //tu temperatura w mieście
    sunset: null,
    sunrise: null,
    pressure: null,
    description: null,
  };
  // componentDidMount() {
  // }
  displayCity = () => {
    const url =
      'http://api.openweathermap.org/data/2.5/weather?q=London&appid=ff0db0006282fd4c77c1d69aec442ec1';
    let link = url.replace('London', this.state.text);
    return fetch(link)
      .then(response => response.json())
      .then(responseData => {
        this.setState({api: responseData});
        let lol = -273.15;
        lol += parseFloat(this.state.api.main.temp);

        this.setState({city: Math.round(lol)});
        this.setState({description: this.state.api.weather[0].description});

        const timestamp = Date(this.state.api.sys.sunset).toString();
        this.setState({sunset: timestamp});

        const timestamp2 = Date(this.state.api.sys.sunrise).toString();
        this.setState({sunrise: timestamp2});
        this.setState({pressure: this.state.api.main.pressure});
      })
      .catch(error => this.setState({error}));
  };

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <TextInput
            label="City"
            value={this.state.text}
            onChangeText={text => this.setState({text})}
          />
          <Button
            onPress={this.displayCity}
            icon="arrow-right-box"
            mode="contained"
            color="#4d2c91">
            Search
          </Button>

          <Item
            city={this.state.text}
            title={this.state.description}
            temperature={this.state.city}
            sunrise={this.state.sunrise}
            sunset={this.state.sunset}
            pressure={this.state.pressure}
          />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fafafa',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: '#fafafa',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  container: {
    flex: 1,

    backgroundColor: '#fafafa',
  },
  item: {
    backgroundColor: '#4d2c91',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    color: '#fafafa',
  },
  title2: {
    fontSize: 20,
    color: '#fafafa',
  },
});
