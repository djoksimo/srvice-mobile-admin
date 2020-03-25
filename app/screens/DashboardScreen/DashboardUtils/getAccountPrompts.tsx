import {NavigationScreenProp} from 'react-navigation';
import {Agent} from 'types/AgentType';
type Prompt = {
  field: string;
  warningText: string;
  promptText: string;
  onPrimaryActionPressed: () => void;
  onDiscardPressed: () => void;
}; // TODO: implement discarding/dismissing prompts

const getAccountPrompts = (
  agent: Agent,
  navigation: NavigationScreenProp<any, any>,
): Prompt[] => {
  const prompts: Prompt[] = [
    {
      field: 'profilePictureUrl',
      warningText: 'Looks like you do not have a profile picture',
      promptText: 'Add profile picture',
      onPrimaryActionPressed: () => {
        navigation.navigate({
          routeName: 'AccountScreen',
          params: {
            shouldSetProfilePicture: true,
          },
        });
      },
      onDiscardPressed: () => {},
    },
    {
      field: 'company',
      warningText: 'Please specify your business name',
      promptText: 'Add business name',
      onPrimaryActionPressed: () => {
        navigation.navigate({
          routeName: 'AccountScreen',
          params: {
            shouldSetBusinessName: true,
          },
        });
      },
      onDiscardPressed: () => {},
    },
  ];
  return prompts
    .filter(
      (prompt) =>
        agent[prompt.field] === undefined || agent[prompt.field] === '',
    )
    .slice(0, 3);
};

export default getAccountPrompts;
