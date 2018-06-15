import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Form, Text, Item, Icon, Input, View } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import TopTabs from '../TopTabs/TopTabs';
import Email from '../InputComponents/Email';
import Password from '../InputComponents/Password';

export default class SettingsScreen extends Component {
  constructor() {
    super();
    this.state = {
      inputs: [],
    };
  }

    changeInputFocus = index => () => {
      if (index === 0) {
            this.state.inputs[index+1].state.inputRef._root.focus(); // eslint-disable-line
      }
    };

    render() {
      return (
        <Animatable.View
          animation="fadeInRight"
          delay={1200}
          duration={700}
          ref={(ref) => { this.animationView = ref; }}
          style={GLOBAL.loginScreenStyle.mainView}
        >
          <Form style={GLOBAL.loginScreenStyle.form}>
            <Email
              changeFocus={this.changeInputFocus(0)}
              update={this.updateCanLoginState}
              ref={(ref) => { this.state.inputs[0] = ref; }}
            />
            <Password
              changeFocus={this.changeInputFocus(1)}
              update={this.updateCanLoginState}
              ref={(ref) => { this.state.inputs[1] = ref; }}
            />
          </Form>
        </Animatable.View>
      );
    }
}
