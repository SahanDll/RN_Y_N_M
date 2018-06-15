import tinycolor from 'tinycolor2';


mainThemeColors = [
  ['#F5F5F5', '#606060', '#E0E0E0', '#F5F5F5'], // white theme
  ['#000000', '#EEEEEE', '#E0E0E0', '#606060'], // black theme
];

class Colors {
    defineAppColors = (color) => {
      const baseLight = tinycolor('#606060');
      topTabColorOff = tinycolor.mix(baseLight, color, 60).toHexString();
      topTabColorOn = tinycolor.mix(baseLight, color, 70).toHexString();
      gradient1 = tinycolor.mix(baseLight, color, 80).toHexString();
      gradient2 = tinycolor.mix(baseLight, color, 95).toHexString();
    };
    defineAppTheme = (theme) => {
      if (theme === 'white') {
        const [
          mainThemeColor, mainReverseThemeColor, mainUnderlineColor, placeHolderColor,
        ] = mainThemeColors[0];
        GLOBAL.mainThemeColor = mainThemeColor;
        GLOBAL.mainReverseThemeColor = mainReverseThemeColor;
        GLOBAL.mainUnderlineColor = mainUnderlineColor;
        GLOBAL.placeHolderColor = placeHolderColor;
      } if (theme === 'black') {
        const [
          mainThemeColor, mainReverseThemeColor, mainUnderlineColor, placeHolderColor,
        ] = mainThemeColors[1];
        GLOBAL.mainThemeColor = mainThemeColor;
        GLOBAL.mainReverseThemeColor = mainReverseThemeColor;
        GLOBAL.mainUnderlineColor = mainUnderlineColor;
        GLOBAL.placeHolderColor = placeHolderColor;
      }
    }
}

export default new Colors();
