import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

const FlowerList = ({ flowers, goToFlowerDetails }) => (
  <ScrollView style={styles.container} automaticallyAdjustContentInsets={false}>
    <List>
      {
        flowers.map(flower => (
          <ListItem
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
  container: {
    height: '85%',
    // marginTop: -20,
  },
});

FlowerList.propTypes = {
  flowers: PropTypes.arrayOf(PropTypes.object),
  goToFlowerDetails: PropTypes.func,
};

export default FlowerList;
