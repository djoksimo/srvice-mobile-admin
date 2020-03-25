export type TravelSetting = {
  value: boolean;
  title: string;
  onTravelSettingSelected: (travelSetting: TravelSetting) => void;
};
