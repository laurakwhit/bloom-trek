import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar } from 'react-native-elements';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
    };
  }

  render() {
    const { input } = this.state;

    return (
      <SearchBar
        style={styles.search}
        showLoading
        clearIcon={{ color: 'red' }}
        searchIcon={true}
        onChangeText={input => this.setState({ input })}
        onCancel={() => this.setState({ input: '' })}
        value={input}
        placeholder='Search location'
        onSubmitEditing={e => this.props.updateLocation(input)} />
    );
  }
}

const styles = StyleSheet.create({
  search: {
    flex: 1,
    top: 100,
  },
});