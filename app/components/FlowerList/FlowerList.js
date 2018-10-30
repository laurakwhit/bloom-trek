import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

const FlowerList = ({ flowers, goToFlowerDetails }) => (
  <ScrollView>
    <List containerStyle={styles.list} >
      {
        flowers.map(flower => (
          <ListItem
          roundAvatar
            avatar={{ uri: flower.flower_img_url }}
            key={flower.name}
            title={flower.name}
            subtitle={flower.scientific_name}
            description={flower.description}
            habitat={flower.habitat}
            onPress={() => goToFlowerDetails(flower.id)}
          />
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
