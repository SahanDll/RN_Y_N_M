import React, { Component } from 'react';
import { ImageBackground, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { View, Text } from 'react-native-animatable';
import PropTypes from 'prop-types';

const bgImage = require('../../../assets/sbg.png');
const load = require('../../../assets/load.png');


const images = [];
export default class Sample extends Component {
  constructor() {
    super();
    this.state = {
      gradient: [`${appMainColor}DC`, `${gradient1}DD`],
      imageItem: 0,
    };
  }

  setImageItem() {
    this.setState({ imageItem: this.state.imageItem + 1 });
  }

  getStatus() {
    return images.length <= this.state.imageItem;
  }

  render() {
    if (this.props.image === null || this.props.image === '') {
      GLOBAL.showToast('Need to refresh');
      return (
        <View>
          <ImageBackground
            source={bgImage}
            resizeMode="center"
            style={companyBannerStyle.samplebg}
          >
            <LinearGradient colors={this.state.gradient} />
            <Image source={load} resizeMode="center" style={companyBannerStyle.sample} />
          </ImageBackground>
          <View>
            <Text style={{
                            color: this.props.color,
                            backgroundColor: 'transparent',
                            textAlign: 'center',
                            marginTop: 20,
                        }}
            >No Matching Profiles Found
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View>
        <ImageBackground
          source={bgImage}
          resizeMode="cover"
          style={companyBannerStyle.samplebg}
        >
          <LinearGradient colors={this.state.gradient} />
          <Image source={this.props.image} resizeMode="stretch" style={companyBannerStyle.sample} />
        </ImageBackground>
        <View>
          <Text style={{
          color: this.props.color,
          backgroundColor: 'transparent',
          textAlign: 'center',
          marginTop: 20,
}}
          >{this.props.action}
          </Text>
        </View>
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

Sample.propTypes =
    {
      action: PropTypes.string,
      color: PropTypes.string,
      image: PropTypes.string,
    };
Sample.defaultProps =
    {
      action: '',
      color: 'transparent',
      image: '',
    };
