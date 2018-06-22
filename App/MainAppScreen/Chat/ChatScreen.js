import React, { Component } from 'react';
import { Form, Text, Item, Icon, Input, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import TopTabs from '../TopTabs/TopTabs';
import Email from '../InputComponents/Email';
import Password from '../InputComponents/Password';

const hide = { from: { opacity: 0 }, to: { opacity: 0 } };
export default class ChatScreen extends Component {

  constructor() {
    super();
    this.state = {
      inputs: [],
    };
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
                  zIndex: this.state.zIndex, position: 'absolute', flex: 1, backgroundColor: 'transparent',
              }}
        >
          <Form style={GLOBAL.loginScreenStyle.form}>
            <Email
              changeFocus={this.changeInputFocus(0)}
              update={this.updateState}
              ref={(ref) => { this.state.inputs[0] = ref; }}
            />
            <Password
              changeFocus={this.changeInputFocus(1)}
              update={this.updateState}
              ref={(ref) => { this.state.inputs[1] = ref; }}
            />
          </Form>
        </Animatable.View>
      );
    }
}
