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

  handleCancel = () => {
    this.setState({
      searchInput: '',
    });
  };

  handleChangeText = (input) => {
    this.setState({
      searchInput: input,
    });
  };

  handleSubmit = () => {
    const { updateLocation } = this.props;
    const { searchInput } = this.state;

    updateLocation(searchInput);
  }

  render() {
    const { searchInput } = this.state;

    return (
      <SearchBar
        style={styles.search}
        showLoading
        clearIcon={{ color: 'red' }}
        searchIcon
        onChangeText={input => this.setState({ searchInput: input })}
        onCancel={this.handleCancel}
        value={searchInput}
        placeholder="Search location"
        onSubmitEditing={this.handleSubmit}
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
