import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from 'react-native-modal';
import {Touchable} from 'components';
import {GOOGLE_MAPS_API_KEY} from 'values/Google';
import {Colors, Fonts, Dimensions} from 'values';
import {Location} from 'types/Location'; // See https://github.com/FaridSafi/react-native-google-places-autocomplete for more info

type Props = {
  isVisibleModal: boolean;
  toggleModalVisibility: () => void;
  setLocation: (locationDetails: Location) => void;
};

class InputLocationModal extends Component<Props> {
  onSelectLocation = (_locationData: any, locationDetails: any) => {
    const {setLocation} = this.props;
    setLocation({
      lat: locationDetails.geometry.location.lat,
      lng: locationDetails.geometry.location.lng,
      address: locationDetails.formatted_address,
    });
  };
  onCloseButtonPressed = () => {
    const {toggleModalVisibility} = this.props;
    toggleModalVisibility();
  };

  render() {
    const {isVisibleModal} = this.props;

    const GoogleMapsInput = () => (
      <GooglePlacesAutocomplete
        placeholder="Enter Address or Postal Code"
        minLength={2}
        autoFocus
        returnKeyType="search"
        fetchDetails
        renderDescription={(row: any) => row.description}
        onPress={(data: any, details = null) => {
          this.onSelectLocation(data, details);
        }}
        listViewDisplayed="auto"
        getDefaultValue={() => ''}
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: GOOGLE_MAPS_API_KEY,
          language: 'en',
          // language of the results
          types: 'geocode',
          // default: 'geocode'
          components: 'country:CA',
        }}
        styles={{
          textInputContainer: {
            width: '100%',
            height: 64,
            alignItems: 'center',
            paddingLeft: 16,
            backgroundColor: Colors.primaryLight,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
          textInput: {
            marginTop: 0,
            height: 40,
            marginRight: 16,
            alignSelf: 'center',
          },
          description: {
            color: Colors.text,
            fontFamily: Fonts.RegularLato,
          },
        }}
        currentLocation={false}
        currentLocationLabel="Current location"
        nearbyPlacesAPI="GooglePlacesSearch"
        GoogleReverseGeocodingQuery={{}}
        GooglePlacesSearchQuery={{}}
        filterReverseGeocodingByTypes={[
          'locality',
          'administrative_area_level_3',
        ]}
        debounce={0}
        renderRightButton={() => (
          <Touchable
            onPress={() => {
              this.onCloseButtonPressed();
            }}>
            <View style={styles.closeButton}>
              <Icon
                name="close"
                color={Colors.white}
                size={24}
                style={styles.closeButton}
              />
            </View>
          </Touchable>
        )}
      />
    );

    return (
      <Modal
        style={styles.modal}
        isVisible={isVisibleModal}
        presentationStyle="overFullScreen">
        <GoogleMapsInput />
      </Modal>
    );
  }
}

const {screenHeight} = Dimensions;
const styles = StyleSheet.create({
  closeButton: {
    flexDirection: 'row',
    paddingRight: 16,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  modal: {
    top: 64,
    maxHeight: screenHeight - 140,
    backgroundColor: Colors.blandLight,
    borderRadius: 16,
  },
});
export default InputLocationModal;
