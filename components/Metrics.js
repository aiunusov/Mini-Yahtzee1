import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const metrics = {
  screenWidth: width,
  screenHeight: height,
  marginHorizontal: width * 0.05, 
  marginVertical: height * 0.02, 
  padding: 10,
  borderRadius: 5,
};

