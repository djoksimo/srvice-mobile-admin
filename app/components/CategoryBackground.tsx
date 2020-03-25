import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {FormatUtils} from 'utils';
import {Category} from 'types/Category';
type Props = {
  categories: Array<Category>;
  shuffle: boolean;
};

interface CategoryIconProps {
  iconUrl: string;
  index: number;
}

const CategoryIcon = ({iconUrl, index}: CategoryIconProps) => {
  const isEvenIndex = index % 2 === 0;
  return (
    <Image
      style={[
        {
          marginTop: isEvenIndex ? 0 : 48,
        },
        styles.icon,
      ]}
      source={{
        uri: iconUrl,
      }}
      resizeMode="contain"
    />
  );
};

const CategoryList = ({categories}: {categories: Category[]}) => (
  <>
    {categories.map((category: Category, index: number) => (
      <CategoryIcon key={index} iconUrl={category.iconUrl} index={index} />
    ))}
  </>
);

const CategoryBackground = ({categories, shuffle}: Props) => (
  <View style={styles.iconContainer}>
    {shuffle ? (
      <CategoryList categories={FormatUtils.shuffle(categories)} />
    ) : (
      <CategoryList categories={categories} />
    )}
  </View>
);

const styles = StyleSheet.create({
  iconContainer: {
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    alignItems: 'stretch',
  },
  icon: {
    width: 64,
    height: 64,
  },
});
export default CategoryBackground;
