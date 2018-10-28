import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

const TrailList = ({ trails, goToTrailDetails }) => (
  <ScrollView contentContainerStyle={styles.container}>
    <List>
      {
      trails.map((trail) => {
        let icon;
        switch (trail.difficulty) {
          case ('easy'):
            icon = require('../../../assets/icons/triangle.jpg');
            break;
          case ('medium'):
            icon = require('../../../assets/icons/rectangle.jpg');
            break;
          case ('hard'):
            icon = require('../../../assets/icons/circle.jpg');
            break;
          default:
            break;
        }
        return (
          <ListItem
            avatar={icon}
            key={trail.name}
            title={trail.name}
            subtitle={`${trail.length} miles`}
            onPress={() => goToTrailDetails(trail.id)}
          />
        );
      })
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
  goToTrailDetails: PropTypes.func,
};

export default TrailList;
