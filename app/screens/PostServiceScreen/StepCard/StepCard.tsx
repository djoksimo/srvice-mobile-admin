import React from 'react';
import {Element} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {Colors} from 'values';
import {Text, Card} from 'components';
import Button from 'components/Button';
import {ImagePickerButton, ProgressDots} from './StepCardComponents';
import {StepCardProps} from './StepCardTypes';
import StepCardId from '../../../enums/StepCardId';

const StepCard = (props: StepCardProps) => {
  const {
    children = null,
    stepNumber,
    step,
    stepCount,
    onContinuePressed,
    onImagePickerPressed,
    pictures,
    isPostButtonPressed,
    isLoading,
  } = props;
  const imagePicker: Element<any> = (
    <ImagePickerButton
      pictures={pictures}
      onImagePickerPressed={onImagePickerPressed}
    />
  );
  const touchableImagePicker: Element<any> | null =
    step.id === StepCardId.DESCRIPTION_PICTURES ? imagePicker : null;
  const buttonTitle: string =
    stepNumber + 1 < stepCount ? 'Continue' : 'Post Service';
  return (
    <Card style={styles.cardContainer}>
      <View style={styles.dotsContainer}>
        <ProgressDots stepNumber={stepNumber} stepCount={stepCount} />
      </View>
      {touchableImagePicker}
      <Text style={styles.stepTitle} scale={Text.Scale.H5} color={Colors.black}>
        {step.stepTitle}
      </Text>
      {step.component}
      <View style={styles.continueButtonContainer}>
        <Button
          isDisabled={isPostButtonPressed || isLoading}
          title={buttonTitle}
          onPress={() => onContinuePressed(step.id, stepCount)}
        />
      </View>
      {children}
    </Card>
  );
};

export default StepCard;
