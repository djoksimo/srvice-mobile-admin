import React from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Text, Touchable, Card} from 'components';
import Button from 'components/Button';
import {Colors} from 'values';
import {NotificationType} from '../../../enums';
type Props = {
  warningText: NotificationType;
  promptText: string;
  onPrimaryActionPressed: () => void;
  onDiscardPressed: () => void;
};

const PromptCard = ({
  warningText,
  promptText,
  onPrimaryActionPressed,
  onDiscardPressed,
}: Props) => (
  <Card style={styles.promptCard}>
    <View style={styles.promptHeader}>
      <Text>{warningText}</Text>
      <View>
        <Touchable onPress={onDiscardPressed}>
          <Icon name="close" />
        </Touchable>
      </View>
    </View>
    <View style={styles.primaryActionContainer}>
      <Button
        onPress={onPrimaryActionPressed}
        title={promptText}
        color={Colors.primary}
      />
    </View>
  </Card>
);

const styles = StyleSheet.create({
  promptCard: {
    padding: 16,
    marginTop: 16,
    marginBottom: 16,
  },
  promptHeader: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  primaryActionContainer: {
    marginTop: 16,
    marginBottom: 16,
    alignSelf: 'center',
  },
});
export default PromptCard;
