import React, { Component } from 'react';
import { ImageBackground, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { View } from 'react-native-animatable';

const bannerImage = require('../../../assets/bg.png');
const companyLogo = require('../../../assets/ynm.png');


export default class CompanyBanner extends Component {
  constructor() {
    super();
    this.state = {
      gradient: [`${appMainColor}DC`, `${gradient1}DD`],
    };
  }

  render() {
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
