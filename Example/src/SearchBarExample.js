import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import {
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
  const [value, setValue] = useState('');
  const width = useSharedValue(SEARCH_BAR_WIDTH);
  const translateY = useSharedValue(0);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(width.value, config),
    };
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withTiming(translateY.value, config) }],
    };
  });

  const changeState = () => {
    width.value =
      width.value === SEARCH_BAR_WIDTH
        ? SEARCH_BAR_WIDTH - 80
        : SEARCH_BAR_WIDTH;
    translateY.value = translateY.value === 0 ? -100 : 0;
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
      <Animated.View style={[styles.container, containerStyle]}>
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
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    margin: 30,
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
