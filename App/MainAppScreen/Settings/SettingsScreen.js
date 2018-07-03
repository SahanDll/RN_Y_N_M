import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Form, Text, Item, Icon, Input } from 'native-base';
import { ScrollView, StyleSheet, TouchableOpacity, TouchableHighlight, View, Image, Alert, Modal, Button, Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import TopTabs from '../TopTabs/TopTabs';
import Email from '../InputComponents/Email';
import Password from '../InputComponents/Password';

const load = require('../../../assets/load.png');

const hide = { from: { opacity: 0 }, to: { opacity: 0 } };
export default class SettingsScreen extends Component {
  constructor() {
    super();
    this.state = {
      inputs: [],
      zIndex: 0,
    };
  }

  changeZindex(i) {
    this.setState({ zIndex: i });
  }
    updateState = () => {

    };

    changeInputFocus = index => () => {
      if (index === 0) {
            this.state.inputs[index+1].state.inputRef._root.focus(); // eslint-disable-line
      }
    };

    render() {
      return (
        <Animatable.View
          animation={hide}
          duration={0}
          ref={(ref) => { this.animationView = ref; }}
          style={{
              zIndex: this.state.zIndex,
              position: 'absolute',
              flex: 1,
              backgroundColor: 'transparent',
              width: '100%',
              height: '100%',
          }}
        >
          <View style={{ marginTop: height / 3, marginLeft: width / 4 }}>
            <Image source={load} resizeMode="contain" />
          </View>
        </Animatable.View>
      );
    }
}
