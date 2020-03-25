import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CategoryIcon, Text, Touchable} from 'components';
import {Colors} from 'values';
import {Category} from 'types/Category';
type Props = {
  category: Category;
  onCategorySelected: Function;
};

const CategorySquare = (props: Props) => {
  const {category, onCategorySelected} = props;
  return (
    <Touchable onPress={() => onCategorySelected(category)}>
      <View style={styles.categorySquareContainer}>
        <CategoryIcon iconUrl={category.iconUrl} scale={1.5} />
        <View style={styles.categoryNameContainer}>
          <Text
            style={styles.categoryName}
            scale={Text.Scale.BUTTON}
            color={Colors.primary}>
            {category.name}
          </Text>
        </View>
      </View>
    </Touchable>
  );
};

const styles = StyleSheet.create({
  categorySquareContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 136,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    shadowColor: Colors.black,
    elevation: 4,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 8,
    shadowOpacity: 0.4,
    padding: 8,
  },
  categoryNameContainer: {
    paddingTop: 16,
  },
  categoryName: {
    textAlign: 'center',
    width: 100,
  },
});
export default CategorySquare;
