import React from 'react';
import { View, PanResponder } from 'react-native';

export default function Swipeable(props){
  const { 
    children,
    style,
    reset,
    onPress,
    onSwipe,
    onSwiped,
    onSwipeLeft,
    onSwipedLeft,
    onSwipeRight,
    onSwipedRight,
  } = props;
  const [dx, setDx] = React.useState(0);
  const [swiped, setSwiped] = React.useState(false);

  React.useEffect(() => {
    if(reset){
      setSwiped(false);
      setDx(0);
    }
  }, [reset]);

  React.useEffect(() => {
    if(swiped){
      const aTimeout = setTimeout(() => {
        setSwiped(false);
        setDx(0);
      }, 5000);
      return () => clearTimeout(aTimeout);
    }
  }, [swiped]);

  const onMoveEnd = (evt, gestureState)=>{
    // The user has released all touches while this view is the
    // responder. This typically means a gesture has succeeded
    // Or
    // Another component has become the responder, so this gesture
    // should be cancelled        
    
    if(onSwiped){
      onSwiped();
    }

    if(Math.abs(gestureState.dx)<10 && Math.abs(gestureState.dy)<10){
      setSwiped(false);
      setDx(0);
      if(onPress){
        onPress();
      }
    }
    else if(gestureState.dx>100 && onSwipeRight){
      setSwiped(true);
      setDx(100);
      if(onSwipedRight){
        onSwipedRight();
        setSwiped(false);
        setDx(0);
      }
    }
    else if(gestureState.dx<-100 && onSwipeLeft){
      setSwiped(true);
      setDx(-100);
      if(onSwipedLeft){
        onSwipedLeft();
        setSwiped(false);
        setDx(0);
      }
    }
    else{
      setSwiped(false);
      setDx(0);
    }
  };
  
  const panResponder = React.useRef(
    PanResponder.create({
      // Ask to be the responder:
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderTerminationRequest: () => true,
      onShouldBlockNativeResponder: () => true,

      onPanResponderGrant: (evt, gestureState) => {
        // The gesture has started. Show visual feedback so the user knows
        // what is happening!
        // gestureState.d{x,y} will be set to zero now
        console.log(evt);
        console.log(gestureState);
      },
      onPanResponderMove: (evt, gestureState) => {
        // The most recent move distance is gestureState.move{X,Y}
        // The accumulated gesture distance since becoming responder is
        // gestureState.d{x,y}
        console.log(evt);
        if(onSwipe){
          onSwipe();
        }
        setDx(gestureState.dx);
      },
      onPanResponderRelease: onMoveEnd,
      onPanResponderTerminate: onMoveEnd,
    })
  ).current;

  return (
    <View 
      style={style}
    >
      <View {...panResponder.panHandlers} style={{transform: [{ translateX: dx }, { translateY: 0 }]}} >
        {children}
      </View>
      {dx<0 && onSwipeLeft &&
        <View style={{opacity: (-dx*0.01),position: "absolute",right:(-dx-100)}}>
          {onSwipeLeft()}
        </View>
      }
      {dx>0 && onSwipeRight &&
        <View style={{opacity: (dx*0.01),position: "absolute",left:(dx-100)}}>
          {onSwipeRight()}
        </View>
      }
    </View>
  );
}