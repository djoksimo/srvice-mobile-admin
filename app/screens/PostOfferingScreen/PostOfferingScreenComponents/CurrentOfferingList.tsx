import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import {Colors, Dimensions} from 'values';
import {Offering} from 'types/OfferingType';
import {Text, Touchable, Card, Line} from 'components';
import Button from 'components/Button';
import OrDivider from 'components/OrDivider';
type Props = {
  offerings: Offering[];
  isModalVisible: boolean;
  onDismissPressed: () => void;
  removeOffering: (index: number) => void;
  onFinishPressed: () => void;
  addAnotherOffering: () => void;
  isFinishPressed: boolean;
};

const CurrentOfferingList = ({
  offerings,
  isModalVisible = false,
  onDismissPressed,
  removeOffering,
  onFinishPressed,
  isFinishPressed,
  addAnotherOffering,
}: Props) => {
  const toggleModal = () => {
    onDismissPressed();
  };

  const renderOfferingItem = ({item: offering, index}) => {
    const {title, price, duration, description} = offering;
    return (
      <View style={styles.offeringItemContainer}>
        <View style={styles.offeringDetailsContainer}>
          <Text>{`Title: ${title}`}</Text>
          <Text>{`Duration: ${duration} minutes`}</Text>
          <Text>{`Price: ${price} CAD`}</Text>
          <Text>{`Description: ${description}`}</Text>
        </View>
        <View style={styles.deleteButtonContainer}>
          <Touchable
            onPress={() => {
              removeOffering(index);
            }}>
            <Icon
              name="delete-forever"
              size={24}
              color={Colors.secondaryDark}
            />
          </Touchable>
        </View>
      </View>
    );
  };

  const finishButtonText = !offerings.length ? 'Exit' : 'Finish';
  return (
    <Modal
      backdropColor={Colors.screenBackground}
      isVisible={isModalVisible}
      onBackdropPress={onDismissPressed}>
      <Card>
        <View style={styles.offeringListContainer}>
          <View style={styles.header}>
            <View>
              <Text scale={Text.Scale.H5}>Current Offerings</Text>
            </View>
            <View>
              <Touchable onPress={onDismissPressed}>
                <Icon name="close" size={24} color={Colors.secondaryDark} />
              </Touchable>
            </View>
          </View>
          {!offerings.length && <Text>No offerings added yet</Text>}
          <FlatList
            scrollEnabled
            data={offerings}
            renderItem={renderOfferingItem}
            keyExtractor={(item, index) => item.title + index.toString()}
            ItemSeparatorComponent={() => <Line />}
          />
          <View style={styles.finishButtonContainer}>
            <Button
              onPress={() => {
                toggleModal();
                addAnotherOffering();
              }}
              title="Add another offering"
            />
            <OrDivider />
            <Button
              title={finishButtonText}
              color={Colors.white}
              titleColor={Colors.text}
              borderColor={Colors.secondary}
              onPress={() => {
                onFinishPressed();
              }}
              isDisabled={isFinishPressed}
            />
          </View>
        </View>
      </Card>
    </Modal>
  );
};

const {screenHeight} = Dimensions;
const styles = StyleSheet.create({
  offeringListContainer: {
    padding: 16,
    maxHeight: screenHeight - 88,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 8,
  },
  offeringItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
  },
  finishButtonContainer: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  offeringDetailsContainer: {
    flex: 5,
  },
  deleteButtonContainer: {
    flex: 1,
  },
});
export default CurrentOfferingList;
