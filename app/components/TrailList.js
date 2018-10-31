import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

const TrailList = ({ trails, handleSelectedTrail }) => (
  <ScrollView>
    <List containerStyle={styles.list}>
      {
      trails.map((trail) => {
        let icon;
        switch (trail.difficulty) {
          case ('easy'):
            icon = require('../../assets/icons/triangle.jpg');
            break;
          case ('medium'):
            icon = require('../../assets/icons/rectangle.jpg');
            break;
          case ('hard'):
            icon = require('../../assets/icons/circle.jpg');
            break;
          default:
            break;
        }
        return (
          <TouchableOpacity
            key={trail.name}
            activeOpacity={0.5}
            onPress={() => handleSelectedTrail(trail.id)}
          >
            <ListItem
              avatar={icon}
              title={trail.name}
              subtitle={`${trail.length} miles`}
            />
          </TouchableOpacity>
        );
      })
      }
    </List>
  </ScrollView>
);

const styles = StyleSheet.create({
  list: {
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
});


TrailList.propTypes = {
  trails: PropTypes.arrayOf(PropTypes.object),
  handleSelectedTrail: PropTypes.func,
};

export default TrailList;
