import { StackNavigationProp } from '@react-navigation/stack';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  '(tabs)': undefined; 
};

export type AuthScreenNavigationProp = StackNavigationProp<AuthStackParamList>;