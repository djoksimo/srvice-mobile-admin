import _ from 'lodash';

import {Service} from 'types/Service';
import {InputValidity} from 'types/InputValidity';

import {MinInput, Max} from 'values';

class ValidateUtils {
  static getServiceValidity(service: Service): InputValidity {
    const {title, description, inCall, outCall, remoteCall, address} = service;

    const trimmedTitleText = title.trim();
    const trimmedDescriptionText = description.trim();

    if (trimmedTitleText.length <= MinInput.serviceTitle) {
      return {isValid: false, reason: 'Title is too short'};
    }

    if (trimmedDescriptionText.length <= MinInput.serviceDescription) {
      return {isValid: false, reason: 'Description is too short'};
    }
    if (!inCall && !outCall && !remoteCall) {
      return {isValid: false, reason: 'Please select at least one option'};
    }
    if (_.isUndefined(address)) {
      return {isValid: false, reason: 'Please enter your service location'};
    }

    return {isValid: true};
  }

  static getOfferingValidity(offering: {
    currentTitle: string;
    currentDescription: string;
    currentHours: number;
    currentMinutes: number;
  }): InputValidity {
    const {
      currentTitle,
      currentDescription,
      currentHours,
      currentMinutes,
    } = offering;

    const currentTitleLength = currentTitle.length;
    const currentDescriptionLength = currentDescription.length;

    if (currentTitleLength < MinInput.offeringTitle) {
      return {isValid: false, reason: 'That title is a bit too short'};
    }
    if (currentTitleLength > Max.offeringTitle.full) {
      return {isValid: false, reason: 'That title is a bit too long'};
    }
    if (currentHours === 0 && currentMinutes === 0) {
      return {isValid: false, reason: "That duration doesn't look right"};
    }
    if (currentDescriptionLength > Max.offeringDescription.full) {
      return {isValid: false, reason: 'That description is a bit too short'};
    }
    return {isValid: true};
  }
}

export default ValidateUtils;
