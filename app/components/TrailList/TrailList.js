import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

const TrailList = ({ trails }) => (
  <ScrollView contentContainerStyle={styles.container}>
    <List>
      {
      trails.map(trail => (
        <ListItem
          key={trail.name}
          title={trail.name}
          // leftIcon={{name: trail.icon}}
        />
      ))
      }
    </List>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    height: 225,
  },
});


TrailList.propTypes = {
  trails: PropTypes.arrayOf(PropTypes.object),
};

export default TrailList;
