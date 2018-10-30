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
        round
        containerStyle={
          {
            backgroundColor: '#F9F5ED',
            borderBottomWidth: 0,
            borderTopWidth: 0,

          }
        }
        inputStyle={
          {
            backgroundColor: '#c1e6b1',
            color: '#005900',
          }
        }
        clearIcon={{ color: '#005900' }}
        style={styles.search}
        showLoading
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
  },
});

Search.propTypes = {
  updateLocation: PropTypes.func,
};
