import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {Category} from 'types/Category';
import {Text, Loading} from 'components';
import Container from 'components/Container';
import {Colors} from 'values';
import Bottle from '../../bottle';
import {ContentManager} from '../../managers';
import {CategorySquare} from './CategorySelectionComponents';
type Props = {
  navigation: NavigationScreenProp<any, any>;
};
type State = {
  categories: Category[];
  isLoading: boolean;
  error: Error | null;
};

export class CategorySelectionScreen extends Component<Props, State> {
  contentManager: ContentManager;
  allCategoriesSubscription: any;

  constructor(props: Props) {
    super(props);
    this.contentManager = Bottle.ContentManager;
    this.state = {
      categories: [],
      isLoading: false,
      error: null,
    };
  }

  async componentDidMount() {
    this.setState({
      isLoading: true,
    });

    try {
      await this.contentManager.getAllCategories();
      this.allCategoriesSubscription = this.contentManager.allCategories$.subscribe(
        (categories) => {
          this.setState({
            categories,
          });
        },
      );
    } catch (error) {
      console.log(error);
      this.setState({
        error,
      });
    }

    this.setState({
      isLoading: false,
    });
  }

  componentWillUnmount() {
    this.allCategoriesSubscription.unsubscribe();
  }

  onCategorySelected = (category: Category) => {
    const {navigation} = this.props;
    navigation.navigate({
      routeName: 'PostServiceScreen',
      params: {
        category,
      },
    });
  };

  render() {
    const {categories, isLoading, error} = this.state;
    let categoryList: any = <View />;

    if (categories.length) {
      categoryList = categories.map((category, index) => (
        <View key={index} style={styles.item}>
          <CategorySquare
            key={index}
            category={category}
            onCategorySelected={this.onCategorySelected}
          />
        </View>
      ));
    }

    if (error) {
      categoryList = (
        <Text scale={Text.Scale.SUBTITLE}>Something went wrong</Text>
      );
    }

    return (
      <Container style={styles.container}>
        <ScrollView>
          <View style={styles.titleContainer}>
            <Text
              style={styles.title}
              scale={Text.Scale.H3}
              color={Colors.primary}>
              What do you specialize in?
            </Text>
          </View>
          <Loading isLoading={isLoading} />
          <View style={styles.categorySquareContainer}>{categoryList}</View>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  categorySquareContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    padding: 16,
  },
  titleContainer: {
    paddingLeft: 64,
    paddingRight: 64,
    paddingTop: 32,
    paddingBottom: 32,
  },
  title: {
    textAlign: 'center',
  },
});
