import React from 'react';
import {
  ScrollView, StyleSheet, TouchableOpacity, Text,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

const FlowerList = ({ flowers, goToFlowerDetails }) => (
  <ScrollView>
    {flowers.length
      ? (
        <List containerStyle={styles.list}>
          {
        flowers.map(flower => (
          <TouchableOpacity
            key={flower.name}
            activeOpacity={0.5}
            onPress={() => goToFlowerDetails(flower.id)}
          >
            <ListItem
              roundAvatar
              avatar={{ uri: flower.flower_img_url }}
              title={flower.name}
              subtitle={flower.scientific_name}
              description={flower.description}
              habitat={flower.habitat}
            />
          </TouchableOpacity>
        ))
      }
        </List>
      )
      : <Text style={styles.message}>There are no blooms this month...</Text>}
  </ScrollView>
);

const styles = StyleSheet.create({
  list: {
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  message: {
    marginTop: '30%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

FlowerList.propTypes = {
  flowers: PropTypes.arrayOf(PropTypes.object),
  goToFlowerDetails: PropTypes.func,
};

export default FlowerList;
