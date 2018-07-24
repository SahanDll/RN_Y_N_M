import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Form, Text, Item, Icon, Input } from 'native-base';
import { ScrollView, StyleSheet, TouchableOpacity, TouchableHighlight, View, Image, Alert, Modal, Button, Platform, ActivityIndicator } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Card } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import TopTabs from '../TopTabs/TopTabs';
import Email from '../InputComponents/Email';
import Password from '../InputComponents/Password';
import Sample from '../Data/Sample';
import Images from '../Image/Images';
import Texts from '../Image/Texts';
import Items from '../Image/Items';
import { getAuthenticated, isValidUserLogin } from '../../AppGlobalConfig/Common';

const iconWidth = (width * 52) / 100;
const iconImage = require('../../../assets/sample.png');
const logreq = require('../../../assets/logreq.png');


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});


export default class MatchScreen extends Component {
  constructor() {
    super();
    this.state = {
      inputs: [],
      zIndex: 1,
      animating: true,
    };
  }

    moveToLogSignScreen = () => {
      Actions.pop({ refresh: { test: true } });
    };

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

    componentDidMount() {
      setTimeout(() => {
        this.setState({ animating: false });
      }, 5000);
    }

    componentWillUnmount() {
      setTimeout(() => {
        GLOBAL.showToast('Match Screen pop');
      }, 5000);
    }

    render() {
      if (getAuthenticated()) {
        return (
          <Animatable.View
            animation="fadeInRight"
            delay={1200}
            duration={700}
            ref={(ref) => {
                        this.animationView = ref;
                    }}
            style={{
                        zIndex: this.state.zIndex,
                        position: 'absolute',
                        flex: 1,
                        backgroundColor: 'transparent',
                        width: '100%',
                        height: '100%',
                    }}
          >
            <LinearGradient
              colors={['#051937', '#960F2C']}
              style={styles.container}
            >
              {/*            <Card title="Jenny">
                    <Sample />
                  </Card> */}
              <View style={{ height: height / 1.5 }}>
                {!this.state.animating ? <Items ref={(ref) => { this.ite = ref; }} /> : null}
              </View>
              <View style={{
                  alignSelf: 'center',
                    marginTop: 10,
                  height: 50,
                  width: 50,
                }}
              >
                <ActivityIndicator
                  style={{
                      alignSelf: 'center',
                            height: 10,
                        }}
                  animating={this.state.animating}
                  color={['#D7FFFE']}
                  thickness={10}
                  size={100}
                />
              </View>
            </LinearGradient>

          </Animatable.View>
        );
      }
      return (
        <Animatable.View
          animation="fadeInRight"
          delay={1200}
          duration={700}
          ref={(ref) => {
                  this.animationView = ref;
              }}
          style={{
                  zIndex: this.state.zIndex,
                  position: 'absolute',
                  flex: 1,
                  backgroundColor: 'white',
                  width: '100%',
                  height: '100%',
              }}
        >
          <View style={{ height: height / 1.5 }}>
            <TouchableOpacity
              onPress={this.moveToLogSignScreen}
            >
              <View style={{ marginTop: height / 4, marginLeft: width / 5 }}>
                {!this.state.animating ? <Image source={logreq} resizeMode="contain" /> : null}
              </View>
            </TouchableOpacity >
          </View>
          <View style={{
                alignSelf: 'center',
                marginTop: 10,
                height: 50,
                width: 50,
            }}
          >
            <ActivityIndicator
              style={{
                        alignSelf: 'center',
                        height: 10,
                    }}
              animating={this.state.animating}
              duration={5000}
              color={['#537895']}
              thickness={2}
              size={100}
            />
          </View>
        </Animatable.View>
      );
    }
}

