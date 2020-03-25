import React, {Component} from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from 'values';
import {Touchable, Text, TextInput} from 'components';
import {FormatUtils} from 'utils';
type Props = {
  title: string;
  list: Array<any>;
  inputChangeHandler: Function;
  removeListInput: Function;
  addInput: Function;
};

class ListInput extends Component<Props> {
  renderInputField = ({item: value, index}) => {
    const {inputChangeHandler, title, removeListInput} = this.props;
    return (
      <View style={styles.inputRowContainer}>
        <View style={styles.inputContainer}>
          <TextInput
            enablesReturnKeyAutomatically
            style={styles.input}
            onChangeText={(input) => inputChangeHandler(input, index)}
            value={value}
            placeholder={`${FormatUtils.toProperCase(title)}...`}
          />
        </View>
        <View style={styles.deleteBtnContainer}>
          <Touchable onPress={() => removeListInput(index)}>
            <Icon name="close" size={24} color={Colors.secondaryDark} />
          </Touchable>
        </View>
      </View>
    );
  };

  render() {
    const {list, addInput, title} = this.props;
    return (
      <View>
        <FlatList
          data={list}
          renderItem={this.renderInputField}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.addBtnContainer}>
          <Touchable onPress={() => addInput(title)}>
            <Text scale={Text.Scale.SUBTITLE} color={Colors.primary}>
              + Add More
            </Text>
          </Touchable>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputRowContainer: {
    padding: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  inputContainer: {
    flex: 1,
    alignSelf: 'stretch',
  },
  input: {
    marginBottom: 8,
  },
  addBtnContainer: {
    padding: 8,
  },
  deleteBtnContainer: {
    paddingTop: 8,
    paddingLeft: 16,
    alignSelf: 'center',
  },
});
export default ListInput;
