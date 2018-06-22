import React, { Component } from 'react';

import { View, Text } from 'react-native';

import PropTypes from 'prop-types';

export default class AnimatedTypingText extends Component<{}> {
  constructor() {
    super();

    this.index = 0;

    this.timer = -1;

    this.blinking_cursor = -1;

    this.state = {

      text: '',

      cursor_color: 'transparent',

    };
  }

  componentDidMount() {
    this.StartAnimatedTyping();

    this.AnimatedblinkingCursor();
  }

    AnimatedblinkingCursor = () => {
      this.blinking_cursor = setInterval(() => {
        if (this.animatedText) {
          if (this.state.cursor_color === 'transparent') {
            this.setState({ cursor_color: this.props.TextColor });
          } else {
            this.setState({ cursor_color: 'transparent' });
          }
        }
      }, this.props.AnimatedBlinkingCursorDuration);
    };

    StartAnimatedTyping = () => {
      clearTimeout(this.timer);

      this.timer = -1;

      if (this.index < this.props.text.length) {
        if (this.animatedText) {
          this.setState({ text: this.state.text + this.props.text.charAt(this.index) }, () => {
            this.index += 1;

            this.timer = setTimeout(() => {
              this.StartAnimatedTyping();
            }, this.props.AnimatedTypingDuration);
          });
        }
      } else {
        GLOBAL.showToast('type stop');
        this.componentWillUnmout();
      }
    };

    componentWillUnmout() {
      clearTimeout(this.timer);

      this.timer = -1;

      clearInterval(this.blinking_cursor);

      this.blinking_cursor = -1;

      this.setState({ cursor_color: 'transparent' });
    }

    render() {
      return (
        <View style={{ alignSelf: 'flex-end', flexDirection: 'row', justifyContent: 'flex-start' }}>

          <Text
            ref={(ref) => { this.animatedText = ref; }}
            style={{
                    color: this.props.TextColor,
                    fontSize: this.props.AnimatedTextSize,
                    textAlign: 'left',
                backgroundColor: 'transparent',
                width: width / 2,
                height: height / 6,
                flexWrap: 'wrap',
                marginLeft: 20,
                marginTop: 10,
}}
          >

            { this.state.text }

            <Text style={{ color: this.state.cursor_color }}>|</Text>

          </Text>
        </View>
      );
    }
}

AnimatedTypingText.propTypes =
    {
      text: PropTypes.string,
      AnimatedTextSize: PropTypes.number,
      TextColor: PropTypes.string,
      AnimatedTypingDuration: PropTypes.number,
      AnimatedBlinkingCursorDuration: PropTypes.number,
    };

AnimatedTypingText.defaultProps =
    {
      text: 'Love finds a way.',
      TextColor: '#eee',
      AnimatedTextSize: 25,
      AnimatedTypingDuration: 200,
      AnimatedBlinkingCursorDuration: 400,
    };
