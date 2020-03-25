// @flow
import React from "react";
import { View, Image, StyleSheet } from "react-native";

import { FormatUtils } from "utils";
import type { Category } from "types/CategoryType";

type Props = {
  categories: Array<Category>,
  shuffle: boolean,
};

const CategoryIcon = ({ iconUrl, index }) => {
  const isEvenIndex = index % 2 === 0;
  return (
    <Image
      style={[{ marginTop: isEvenIndex ? 0 : 48 }, styles.icon]}
      source={{ uri: iconUrl }}
      resizeMode="contain"
    />
  );
};

const CategoryList = ({ categories }) =>
  categories.map((category, index) => (
    <CategoryIcon key={index} iconUrl={category.iconUrl} index={index} />
  ));

const CategoryBackground = ({ categories, shuffle }: Props) => (
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
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    alignItems: "stretch",
  },
  icon: {
    width: 64,
    height: 64,
  },
});

export default CategoryBackground;
