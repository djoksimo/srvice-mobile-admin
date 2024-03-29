import Snackbar from 'react-native-snackbar';

import {Colors} from 'values';

class AlertUtils {
  static showSnackBar = (
    text = 'Something went wrong',
    color: string = Colors.secondaryDark,
    customAction: any = null,
  ) => {
    const snackBarOptions: any = {
      title: text,
      duration: Snackbar.LENGTH_LONG,
      backgroundColor: color,
      color: Colors.white,
      action: customAction,
    };
    Snackbar.show(snackBarOptions);
  };
}

export default AlertUtils;
