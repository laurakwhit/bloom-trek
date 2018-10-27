import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { SearchBar } from 'react-native-elements';
import PropTypes from 'prop-types';

export default class Search extends Component {
  constructor() {
    super();
    this.state = {
      searchInput: '',
    };
  }

  render() {
    const { searchInput } = this.state;
    const { updateLocation } = this.props;

    return (
      <SearchBar
        style={styles.search}
        showLoading
        clearIcon={{ color: 'red' }}
        searchIcon
        onChangeText={input => this.setState({ searchInput: input })}
        onCancel={() => this.setState({ searchInput: '' })}
        value={searchInput}
        placeholder="Search location"
        onSubmitEditing={() => updateLocation(searchInput)}
      />
    );
  }
}

const styles = StyleSheet.create({
  search: {
    flex: 1,
    top: 100,
  },
});

Search.propTypes = {
  updateLocation: PropTypes.func,
};
