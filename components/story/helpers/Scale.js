import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;

//FONT SCALING
//Usage: nf(16)
const scaleNew = height / 667;
const normalizeFont = size => {
  const newSize = size * scaleNew;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

//DYNAMIC DIMENSION CONSTANTS
//Usage: wp(5), hp(20)
const widthPercentageToDP = widthPercent => {
  // Convert string input to decimal number
  const elemWidth = parseFloat(widthPercent);
  return PixelRatio.roundToNearestPixel((width * elemWidth) / 100);
};
const heightPercentageToDP = heightPercent => {
  // Convert string input to decimal number
  const elemHeight = parseFloat(heightPercent);
  return PixelRatio.roundToNearestPixel((height * elemHeight) / 100);
};

//Usage: wpx(141), hpx(220)
const widthFromPixel = (widthPx, w = 414) => {
  const newSize = widthPx * (width / w);
  return newSize;
};
const heightFromPixel = (heightPx, h = 896) => {
  const newSize = heightPx * (height / h);
  return newSize;
};

export {
  scale,
  verticalScale,
  moderateScale,
  normalizeFont as nf,
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  widthFromPixel as wpx,
  heightFromPixel as hpx,
};
