import React from 'react';
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
} from 'react-native';

type RNTouchableProps = TouchableNativeFeedbackProps &
  TouchableNativeFeedbackProps;

interface Props extends RNTouchableProps {
  children: React.ReactElement;
}

const Touchable = ({children, ...props}: Props) =>
  Platform.OS === 'ios' ? (
    <TouchableOpacity {...props}>{children}</TouchableOpacity>
  ) : (
    <TouchableNativeFeedback {...props}>{children}</TouchableNativeFeedback>
  );

export default Touchable;
