import {TravelSetting} from './TravelSetting';

export type TravelSettingInputProps = {
  inCall: boolean;
  outCall: boolean;
  remoteCall: boolean;
  radius: number;
  onTravelSettingSelected: (travelSetting: TravelSetting) => void;
  onRadiusChanged: Function;
};
