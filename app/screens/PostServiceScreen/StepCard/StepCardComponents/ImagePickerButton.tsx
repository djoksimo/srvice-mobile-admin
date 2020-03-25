import React from 'react';
import _ from 'lodash';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Colors} from 'values';
import {Text, Touchable} from 'components';
import styles from '../styles';
import {ImagePickerButtonProps} from '../StepCardTypes';

const ImagePickerButton = ({
  onImagePickerPressed,
  pictures,
}: ImagePickerButtonProps) => {
  const selectedPicturesCount = pictures.length;
  const uploadBtnText = _.isEmpty(pictures)
    ? 'Add photo(s)'
    : `${selectedPicturesCount} photos selected`;
  return (
    <View style={styles.imageUploadContainer}>
      <Touchable
        activeOpacity={0.4}
        onPress={() => onImagePickerPressed()}
        underlayColor={Colors.bland}>
        <View style={styles.imageUploadBtn}>
          <Icon name="image-multiple" size={28} color={Colors.primaryDark} />
          <Text scale={Text.Scale.BUTTON} style={styles.imageUploadBtnText}>
            {uploadBtnText}
          </Text>
        </View>
      </Touchable>
    </View>
  );
};

export default ImagePickerButton;
