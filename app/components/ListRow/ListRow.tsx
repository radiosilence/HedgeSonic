import React, { FC } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { spacing } from '../../theme';
import colors from '../../theme/colors';

type ListRowProps = ViewProps & {};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing[4],
    paddingVertical: spacing[4],
    flex: 1,
    borderBottomColor: colors.listBorder,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

const ListRow: FC<ListRowProps> = ({ style, ...rest }) => {
  return <View style={[styles.container, style]} {...rest} />;
};

export default ListRow;
