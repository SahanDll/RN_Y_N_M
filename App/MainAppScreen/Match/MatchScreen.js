import React, { Component } from 'react';
import { Actions } from 'react-native-router-flux';
import { Form, Text, Item, Icon, Input } from 'native-base';
import { ScrollView, StyleSheet, TouchableOpacity, TouchableHighlight, View, Image, Alert, Modal, Button, Platform } from 'react-native';
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
import { getAuthenticated } from '../../AppGlobalConfig/Common';

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
    };
  }

    moveToLogSignScreen = () => {
      Actions.pop({ refresh: { test: true } });
    };

    resetItems = () => {
      this.ite.resetImages();
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
              <Items ref={(ref) => { this.ite = ref; }} />
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
                  backgroundColor: 'transparent',
                  width: '100%',
                  height: '100%',
              }}
        >
          <TouchableOpacity
            onPress={this.moveToLogSignScreen}
          >
            <View style={{ marginTop: height / 4, marginLeft: width / 5 }}>
              <Image source={logreq} resizeMode="contain" />
            </View>
          </TouchableOpacity >

        </Animatable.View>
      );
    }
}

