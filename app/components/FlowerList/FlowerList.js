import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

const FlowerList = ({ flowers, goToFlowerDetails }) => (
  <ScrollView>
    <List containerStyle={styles.list} >
      {
        flowers.map(flower => (
          <TouchableOpacity key={flower.name} activeOpacity={0.5} onPress={() => goToFlowerDetails(flower.id)}>
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
  </ScrollView>
);

const styles = StyleSheet.create({
  list: {
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
});

FlowerList.propTypes = {
  flowers: PropTypes.arrayOf(PropTypes.object),
  goToFlowerDetails: PropTypes.func,
};

export default FlowerList;
