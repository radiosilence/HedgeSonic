import React, { FC } from 'react';
import {
  TextProps as RNTextProps,
  Text as RNText,
  StyleSheet,
} from 'react-native';
import colors from '../../theme/colors';

type TextProps = RNTextProps & {};

const styles = StyleSheet.create({
  text: {
    color: colors.foreground,
  },
});
const Text: FC<TextProps> = ({ children }) => {
  return <RNText style={styles.text}>{children}</RNText>;
};

export default Text;
