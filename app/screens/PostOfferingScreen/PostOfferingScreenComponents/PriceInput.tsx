import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, TextInput} from 'components';
import {Colors} from 'values';
type Props = {
  currentPrice: string;
  onPriceChanged: (price: string) => void;
};

const PriceInput = ({currentPrice, onPriceChanged}: Props) => (
  <View style={styles.stepContainer}>
    <Text scale={Text.Scale.H5}>Price</Text>
    <View style={styles.inputContainer}>
      <View style={styles.dollarSignContainer}>
        <Text scale={Text.Scale.BUTTON}>$</Text>
      </View>
      <TextInput
        value={`${currentPrice}`}
        keyboardType="decimal-pad"
        onChangeText={onPriceChanged}
        style={styles.textInput}
        returnKeyType="next"
        placeholder="Price..."
        placeholderTextColor={Colors.bland}
      />
      <View style={styles.currencyContainer}>
        <Text scale={Text.Scale.BUTTON}>CAD</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  textInput: {
    height: 50,
    flex: 1,
    padding: 16,
    marginBottom: 16,
    marginTop: 16,
    shadowRadius: 8,
  },
  stepContainer: {
    marginLeft: 32,
    marginRight: 32,
    marginBottom: 16,
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dollarSignContainer: {
    paddingRight: 16,
  },
  currencyContainer: {
    paddingLeft: 16,
  },
});
export default PriceInput;
