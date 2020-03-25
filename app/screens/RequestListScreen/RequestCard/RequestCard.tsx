import React from 'react';
import {View} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import {Card} from 'components';
import Badge from 'components/Badge';
import styles from './styles';
import {ActionButtons, ServiceInfo, UserInfo} from './RequestCardComponents';
// TODO add actual user Rating stuff once srvice-api implements user ratings fully

type Props = {
  userFirstName: string;
  userLastName: string;
  requestDescription: string;
  userProfilePictureUrl: string;
  serviceTitle: string;
  userAccepted: boolean;
  agentAccepted: boolean;
  requestId: string;
  bookingId: string;
  navigation: NavigationScreenProp<any, any>;
};

const onPressResponseAction = (requestResponseParams: Partial<Props>) => {
  const {
    requestId,
    bookingId,
    userFirstName,
    userLastName,
    requestDescription,
    userProfilePictureUrl,
    serviceTitle,
    navigation,
  } = requestResponseParams;

  navigation!.navigate({
    routeName: 'RequestResponseScreen',
    params: {
      requestId,
      bookingId,
      userFirstName,
      userLastName,
      userProfilePictureUrl,
      serviceTitle,
      requestDescription,
    },
  });
};

const RequestCard = (props: Props) => {
  const {
    userFirstName,
    userLastName,
    requestDescription,
    userProfilePictureUrl,
    serviceTitle,
    userAccepted,
    agentAccepted,
  } = props;
  let badgeText = 'unknown';
  let badgeStatus = '';

  if (agentAccepted && !userAccepted) {
    badgeText = 'Awaiting Response';
    badgeStatus = 'warn';
  } else if (userAccepted) {
    badgeText = 'Confirmed';
    badgeStatus = 'success';
  } else if (!agentAccepted && !userAccepted) {
    badgeText = 'Not Approved';
    badgeStatus = 'bad';
  }

  return (
    <Card style={styles.cardContainer}>
      <UserInfo
        userFirstName={userFirstName}
        userLastName={userLastName}
        userProfilePictureUrl={userProfilePictureUrl}
      />
      <ServiceInfo
        serviceTitle={serviceTitle}
        requestDescription={requestDescription}
      />
      <View style={styles.badgeContainer}>
        <Badge badgeText={badgeText} status={badgeStatus} />
      </View>
      <ActionButtons
        onPressRespondButtonPressed={() => onPressResponseAction(props)}
      />
    </Card>
  );
};

export default RequestCard;
