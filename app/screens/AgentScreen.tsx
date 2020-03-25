import {Component} from 'react';
import {NavigationScreenProp} from 'react-navigation';
import {Agent} from 'types/Agent';
import {AgentManager, AuthenticationManager} from '../managers';
import Bottle from '../bottle';
import {AuthStatus} from '../enums';
type Props = {
  navigation: NavigationScreenProp<any, any>;
};
type State = {
  agent: Agent | any;
};

class AgentScreen extends Component<Props, State & any> {
  agentManager: AgentManager;
  authenticationManager: AuthenticationManager;
  agentSubscription: any;

  constructor(props: any) {
    super(props);
    this.state = {
      agent: undefined,
    };
    this.agentManager = Bottle.AgentManager;
    this.authenticationManager = Bottle.AuthenticationManager;
  }

  componentDidMount() {
    this.agentSubscription = this.agentManager.agent$.subscribe(
      (agent: Agent) => {
        this.setState({
          agent,
        });
      },
    );
  }

  componentWillUnmount() {
    this.agentSubscription.unsubscribe();
  }

  refreshAgent = async () => {
    const {navigation} = this.props;
    const tokenVerificationStatus = await this.authenticationManager.verifyTokenIfExists();

    if (tokenVerificationStatus === AuthStatus.NOT_LOGGED_IN) {
      navigation.navigate('LoginScreen');
    }
  };
}

export default AgentScreen;
