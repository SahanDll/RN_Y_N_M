import React, { Component } from 'react';
import { ImageBackground, Image, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { View } from 'react-native-animatable';
import AnimatedTypingText from '../Text/AnimatedTypingText';

const bannerImage = require('../../../assets/bg.png');
const companyLogo = require('../../../assets/ynm.png');

const styles = StyleSheet.create({
  container: {
    width,
    height: companyBannerHeight,
  },
});

export default class CompanyBanner extends Component {
  constructor() {
    super();
    this.state = {
      gradient: ['#E75A79', '#A19497', '#DAD5D6'],
    };
  }

  reRender() {
    this.animatedTypingText.reStart();
    this.setState({ gradient: ['#E75A79', '#A19497', '#DAD5D6'] });
  }

  render() {
    return (
      <View
        animation="fadeInRight"
        delay={250}
        duration={700}
      >
        <LinearGradient
          colors={this.state.gradient}
          style={styles.container}
        >
          {/*          <ImageBackground
            source={bannerImage}
            imageStyle={{ resizeMode: 'cover' }}
            style={companyBannerStyle.logobg}
          > */}

          {/* </ImageBackground> */}


          <View style={{
 flexDirection: 'row', justifyContent: 'space-between', margin: 10,
}}
          >
            <Image source={companyLogo} resizeMode="contain" style={companyBannerStyle.logo} />
            {/*            <Text
              resizeMode="contain"
              style={{
                color: '#eee',
                backgroundColor: 'transparent',
                width: width / 2,
                height: height / 6,
                alignSelf: 'center',
                flex: 1,
                flexWrap: 'wrap',
                marginLeft: 20,
            }}
            >{'There is only one happiness in this life, to love and be loved.'}
            </Text> */}
            <AnimatedTypingText
              text="There is only one happiness in this life, to love and be loved..."
              TextColor="#271C3B"
              AnimatedTextSize={16}
              ref={(ref) => { this.animatedTypingText = ref; }}
            />
          </View>
        </LinearGradient>
      </View>
    );
  }
/*  render() {
    return (
      <View animation="fadeInRight" delay={250} duration={700}>
        <ImageBackground
          source={bannerImage}
          style={companyBannerStyle.background}
        >
          <LinearGradient colors={this.state.gradient} style={companyBannerStyle.background} />
          <Image source={companyLogo} resizeMode="contain" style={companyBannerStyle.logo} />
        </ImageBackground>
      </View>
    );
  } */
}
