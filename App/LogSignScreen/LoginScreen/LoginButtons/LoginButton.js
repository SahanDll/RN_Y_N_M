import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import { Text, Spinner, Button } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { authenticate, getTest } from '../../../Service/ApiCalls/Login';

export default class LoginButton extends Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      canLogin: false,
      email: '',
      password: '',
    };
  }

  updateCanLogin(can) {
    this.setState({ canLogin: can });
  }

  updateEmail(e, p) {
    this.setState({ email: e, password: p });
  }

  moveToMainAppScreen = () => {
    Actions.push('mainAppScreen');
  };

  loginUser = () => {
    authenticate(this.state.email, this.state.password)
      .then((data) => {
        GLOBAL.showToast(JSON.stringify(data));
      });
    if (!this.state.isLogin) {
      if (!this.state.canLogin) {
        GLOBAL.showToast(language.checkFields);
      } else {
        this.setState({ isLogin: true });
        setTimeout(() => {
          GLOBAL.showToast(`Authenticating for email : ${this.state.email}`);
          if (this.state.email === 'sahan' && this.state.password === '123') {
            this.moveToMainAppScreen();
            GLOBAL.showToast('Login Successful');
          } else {
            setTimeout(() => {
              GLOBAL.showToast('Login Failed');
            }, 2000);
          }
          this.props.clear();
          this.setState({ isLogin: false, canLogin: false });
        }, 1000);
      }
    }
  };

  render() {
    let animationType;
    let loginColor;

    if (this.state.canLogin) {
      animationType = 'pulse';
      loginColor = mainThemeColor;
    } else {
      loginColor = mainThemeColor;
      animationType = null;
    }

    let indicator = (<Text uppercase={false} style={{ color: loginColor, fontWeight: '500', fontSize: GLOBAL.totalSize(2.22) }}>{language.login}</Text>);
    if (this.state.isLogin) {
      indicator = (<Spinner color={loginColor} size="large" />);
    }

    return (
      <Animatable.View animation={animationType} iterationCount="infinite" duration={500}>
        <Button
          bordered
          rounded
          activeOpacity={0.5}
          onPress={this.loginUser}
          style={{
            borderColor: loginColor, alignSelf: 'center', justifyContent: 'center', width: (width * 13) / 20, height: height / 14,
          }}
        >
          {indicator}
        </Button>
      </Animatable.View>
    );
  }
}

LoginButton.propTypes = {
  clear: PropTypes.func.isRequired,
};
