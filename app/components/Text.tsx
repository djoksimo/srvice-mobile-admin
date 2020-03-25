import React, {Component} from 'react';
import {
  Text as ReactNativeText,
  StyleSheet,
  View,
  TextStyle,
} from 'react-native';
import {Colors, Fonts} from 'values';
import {TextScale} from 'types/TextScale';

interface SrviceTextStyle extends Partial<TextStyle> {
  fontFamily?: Fonts;
}

interface Props {
  // TODO: remove wherever style prop is used in other components - Danilo
  style?: Partial<TextStyle> | Partial<TextStyle>[];
  scale?: TextScale | string;
  color?: string;
  withOptionalTag?: boolean;
  children?: React.ReactNode;
}

class Text extends Component<Props> {
  static defaultProps = {
    scale: '',
    color: Colors.text,
    style: null,
    withOptionalTag: false,
  };
  static Scale: TextScale = {
    H3: 'h3',
    H4: 'h4',
    H5: 'h5',
    H6: 'h6',
    SUBTITLE: 'subtitle',
    BODY: 'body',
    CAPTION: 'caption',
    BUTTON: 'button',
  };

  render() {
    const {
      style,
      scale,
      color,
      withOptionalTag,
      children,
      ...restProps
    } = this.props;

    const textStyle: SrviceTextStyle[] = [styles.base];

    switch (scale) {
      case Text.Scale.H3:
        textStyle.push(styles.h3);
        break;

      case Text.Scale.H4:
        textStyle.push(styles.h4);
        break;

      case Text.Scale.H5:
        textStyle.push(styles.h5);
        break;

      case Text.Scale.H6:
        textStyle.push(styles.h6);
        break;

      case Text.Scale.SUBTITLE:
        textStyle.push(styles.subtitle);
        break;

      case Text.Scale.BODY:
        textStyle.push(styles.body);
        break;

      case Text.Scale.CAPTION:
        textStyle.push(styles.caption);
        break;

      case Text.Scale.BUTTON:
        textStyle.push(styles.button);
        break;

      default:
        textStyle.push(styles.body);
        break;
    }

    if (color) {
      textStyle.push({
        color: color ?? Colors.text,
        fontFamily: Fonts.RegularLato,
      });
    }

    if (style) {
      textStyle.push(style);
    }

    const optionalText = '(Optional)';
    const textComponent = withOptionalTag ? (
      <View style={styles.textContainer}>
        <ReactNativeText {...restProps} style={textStyle}>
          {children}
        </ReactNativeText>
        <ReactNativeText
          style={[styles.base, styles.caption, styles.optionalLabelContainer]}>
          {optionalText}
        </ReactNativeText>
      </View>
    ) : (
      <ReactNativeText {...restProps} style={textStyle}>
        {children}
      </ReactNativeText>
    );

    return <>{textComponent}</>;
  }
}

const styles = StyleSheet.create({
  base: {
    color: Colors.text,
    fontFamily: Fonts.RegularLato,
  },
  h3: {
    fontSize: 32,
    letterSpacing: 0,
    fontFamily: Fonts.SemiBoldOpenSans,
  },
  h4: {
    fontSize: 24,
    letterSpacing: 0.25,
    fontFamily: Fonts.SemiBoldOpenSans,
  },
  h5: {
    fontSize: 18,
    letterSpacing: 0,
    fontFamily: Fonts.SemiBoldOpenSans,
  },
  h6: {
    fontSize: 16,
    letterSpacing: 0.15,
    fontFamily: Fonts.SemiBoldOpenSans,
  },
  subtitle: {
    fontSize: 14,
    letterSpacing: 0.15,
    fontFamily: Fonts.RegularOpenSans,
  },
  optionalLabelContainer: {
    marginLeft: 4,
  },
  body: {
    fontSize: 12,
    letterSpacing: 0.25,
    fontFamily: Fonts.RegularLato,
    lineHeight: 18,
  },
  caption: {
    fontSize: 12,
    letterSpacing: 0.4,
    fontFamily: Fonts.RegularLato,
  },
  button: {
    fontFamily: Fonts.SemiBoldOpenSans,
    fontSize: 14,
    letterSpacing: 0.75,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default Text;
