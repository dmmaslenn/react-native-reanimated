import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {
  View,
  Button,
  Text,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';

const SEARCH_BAR_WIDTH = Dimensions.get('screen').width - 60;

export default function SearchBarExample(props) {
  const [isActive, setActive] = useState(false);
  const [value, setValue] = useState('');
  const width = useSharedValue(SEARCH_BAR_WIDTH);

  const style = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  const changeState = () => {
    width.value =
      width.value === SEARCH_BAR_WIDTH
        ? SEARCH_BAR_WIDTH - 80
        : SEARCH_BAR_WIDTH;
    setActive(!isActive);
  };

  const onChangeText = (text) => setValue(text);

  return (
    <ScrollView
      style={{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'white',
      }}>
      <Text style={styles.header}>Header</Text>
      <View style={[styles.container, isActive && styles.active]}>
        <Animated.View style={[{ marginRight: 30 }, style]}>
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => onChangeText(text)}
            value={value}
            placeholder={'Type some text'}
            onFocus={changeState}
            onBlur={changeState}
          />
        </Animated.View>
        <Button style={{ position: 'relative' }} title="cancel" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 30,
  },
  active: {
    transform: [{ translateY: -100 }],
  },
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 30,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 20,
    paddingLeft: 20,
  },
});
