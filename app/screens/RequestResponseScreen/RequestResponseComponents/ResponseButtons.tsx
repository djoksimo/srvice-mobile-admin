import React from 'react';
import {View, StyleSheet} from 'react-native';
import OrDivider from 'components/OrDivider';
import Button from 'components/Button';
import {Colors} from 'values';
type Props = {
  isDeclinePressed: boolean;
  isRespondPressed: boolean;
  onRespondPressed: () => void;
  onDeclinePressed: () => void;
};

const ResponseButtons = ({
  isDeclinePressed,
  isRespondPressed,
  onRespondPressed,
  onDeclinePressed,
}: Props) => (
  <View style={styles.declineRespondContainer}>
    <View style={styles.buttonContainer}>
      <View>
        <Button
          title="RESPOND"
          color={Colors.primary}
          borderColor={Colors.primary}
          isDisabled={isRespondPressed}
          onPress={onRespondPressed}
        />
      </View>
      <OrDivider />
      <Button
        title="DECLINE"
        color={Colors.red}
        borderColor={Colors.red}
        isDisabled={isDeclinePressed}
        onPress={onDeclinePressed}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  buttonContainer: {
    justifyContent: 'center',
    marginBottom: 24,
  },
  declineRespondContainer: {},
});
export default ResponseButtons;
