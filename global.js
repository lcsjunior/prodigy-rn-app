import { Platform } from 'react-native';

global.maxDegreeOfParallelism = 2;
global.moreIcon = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
global.reactotronEnabled = false;
