import { Dimensions, I18nManager } from "react-native";
const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export function useSwipe(
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  rangeOffset = 4
) {
  let firstTouchX = 0;
  let firstTouchY = 0;

  // set user touch start position
  function onTouchStart(e) {
    firstTouchX = e.nativeEvent.pageX;
    firstTouchY = e.nativeEvent.pageY;
  }

  // when touch ends check for swipe directions
  function onTouchEnd(e) {
    // get touch position and screen size
    const positionX = e.nativeEvent.pageX;
    const rangeX = windowWidth / rangeOffset;
    const positionY = e.nativeEvent.pageY;
    const rangeY = windowHeight / rangeOffset;
    const deltaX = firstTouchX - positionX;
    const deltaY = firstTouchY - positionY;
    //for swiping
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // horizontal swipe
      if (deltaX > rangeX) {
        onSwipeLeft && onSwipeLeft();
      } else if (-deltaX > rangeX) {
        onSwipeRight && onSwipeRight();
      }
    } else if (deltaY > rangeY) {
      // vertical swipe
      onSwipeUp && onSwipeUp();
    } else if (-deltaY > rangeY) {
      // vertical swipe
      onSwipeUp && onSwipeDown();
    } else {
      //for tap

      if (!I18nManager.isRTL) {
        if (e.nativeEvent.pageX < windowWidth / 2) {
          onSwipeRight();
        } else {
          onSwipeLeft();
        }
      } else {
        if (e.nativeEvent.pageX < windowWidth / 2) {
          onSwipeLeft();
        } else {
          onSwipeRight();
        }
      }
    }
  }

  return { onTouchStart, onTouchEnd };
}
