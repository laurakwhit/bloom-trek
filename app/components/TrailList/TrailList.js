import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

const TrailList = ({ trails, handleSelectedTrail }) => (
  <ScrollView>
    <List containerStyle={styles.list} >
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
            onPress={() => handleSelectedTrail(trail.id)}
          />
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
