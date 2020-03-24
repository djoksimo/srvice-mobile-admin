// @flow
import React from "react";
import { StyleSheet, View, FlatList, Alert } from "react-native";
import { NavigationScreenProp } from "react-navigation";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import type { Agent } from "types/AgentType";
import { GradientHeader, Text, Card, Touchable, Loading } from "components";
import Container from "components/Container";
import { Colors } from "values";
import type { Service } from "types/ServiceType";

import { DateUtils, AlertUtils } from "utils";
import type { Offering } from "types/OfferingType";
import AgentScreen from "../AgentScreen";
import { OfferingManager } from "../../managers";
import Bottle from "../../bottle";

type State = {
  agent: Agent | any,
  isLoading: boolean,
  offerings: Offering[],
};

type Props = {
  navigation: NavigationScreenProp<any, {
    service: Service,
    shouldUpdateAgent: boolean,
  }>,
};

class OfferListingScreen extends AgentScreen {
  state: State;
  offeringManager: OfferingManager;

  constructor(props: Props) {
    super(props);
    this.state = {
      agent: undefined,
      isLoading: false,
      offerings: [],
    };
    this.offeringManager = Bottle.OfferingManager;
  }

  async componentDidMount(): any {
    super.componentDidMount();
    this.setOfferingData();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  onBackButtonPressed = () => {
    const { navigation } = this.props;
    navigation.navigate({ routeName: "ServiceScreen" });
  }

  setOfferings = () => {
    this.setState({ offerings: this.getOfferingsFromAgent() });
  }

  setOfferingData = async () => {
    const { offerings } = this.state;
    const { navigation } = this.props;
    const shouldUpdateAgent = navigation.getParam("shouldUpdateAgent");

    if (shouldUpdateAgent || !offerings.length) {
      this.setState({ isLoading: true });
      await this.refreshAgent();
      this.setOfferings();
      this.setState({ isLoading: false });
    } else {
      this.setOfferings();
    }
  };

  getOfferingsFromAgent = () => {
    const { agent } = this.state;
    const { navigation } = this.props;
    const { _id: currentServiceId } = navigation.getParam("service");
    const { offerings } = agent.services.find((service) => service._id === currentServiceId);
    return [...offerings] || [];
  }

  onDeletePressed = (offering: Offering, index: number) => {
    Alert.alert(
      "Delete Offering",
      `Are you sure that you want to delete ${offering.title}`,
      [
        {
          text: "Delete",
          onPress: () => { this.deleteOffering(offering._id, index); },
        },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true },
    );
  };

  deleteOffering = async (offeringId: string, index: number) => {
    const { navigation } = this.props;
    const service = navigation.getParam("service");
    const newOfferings = [...this.getOfferingsFromAgent()];

    try {
      this.setState({ isLoading: true });
      await this.offeringManager.deleteOffering(offeringId, service._id);
      newOfferings.splice(index, 1);
      this.refreshAgent();
      this.setState({ offerings: newOfferings, isLoading: false });
      AlertUtils.showSnackBar("Removed offering", Colors.primary);
    } catch (error) {
      console.error(error);
      AlertUtils.showSnackBar("Something went wrong", Colors.secondaryDark);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  renderOfferingCard = ({ item, index }) => {
    const { title, description, price, duration } = item;

    const priceFormat = price === 0 ? "Free" : `$ ${price}`;

    return (
      <View style={styles.offeringCardContainer}>
        <Card style={styles.offeringCard}>
          <View style={styles.offeringDetailsContainer}>
            <View style={styles.titleContainer}>
              <Text scale={Text.Scale.H5} color={Colors.text}>
                {title}
              </Text>
            </View>
            <View>
              <Text scale={Text.Scale.BODY}>{description}</Text>
            </View>
            <View style={styles.bottomInfoContainer}>
              <Text scale={Text.Scale.SUBTITLE}>{priceFormat}</Text>
              <Text scale={Text.Scale.SUBTITLE}>
                {DateUtils.minutesToHoursAndMinutes(duration)}
              </Text>
            </View>
          </View>
          <View>
            <View style={styles.actionButtonContainer}>
              {/* <Touchable>
                <View style={styles.actionButton}>
                  <Icon name="pencil" size={24} color={Colors.white} />
                </View>
              </Touchable> */}
              <Touchable onPress={() => { this.onDeletePressed(item, index); }}>
                <View style={styles.actionButton}>
                  <Icon name="close" size={18} color={Colors.white} />
                </View>
              </Touchable>
            </View>
          </View>
        </Card>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    const { agent, isLoading, offerings } = this.state;
    let offeringCardList = <View />;

    const service = navigation.getParam("service");

    const nullOfferingsText = !isLoading && (
      <View style={styles.nullOfferingsTextContainer}>
        <Text>There are no offerings for this service at the moment</Text>
      </View>
    );

    if (agent) {
      offeringCardList = offerings.length ? (
        <FlatList
          contentContainerStyle={{ paddingBottom: 120 }}
          scrollEnabled
          data={offerings}
          renderItem={this.renderOfferingCard}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : nullOfferingsText;
    }

    return (
      <Container navigation backButtonHandler={this.onBackButtonPressed} style={styles.container}>
        <GradientHeader absolute>
          <Loading isLoading={isLoading} />
          <View style={styles.offeringCardList}>
            <View style={styles.serviceTitleCardContainer}>
              <Card>
                <View style={styles.serviceTitleContainer}>
                  <Text scale={Text.Scale.H5} color={Colors.primary}>
                    {"Offerings for service: "}
                  </Text>
                  <Text scale={Text.Scale.SUBTITLE} color={Colors.primary}>
                    {service.title}
                  </Text>
                </View>
              </Card>
            </View>
            {offeringCardList}
          </View>
        </GradientHeader>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
    paddingBottom: 32,
  },
  offeringCardList: {
    paddingTop: 48,
    paddingBottom: 32,
  },
  offeringCardContainer: {
    flex: 1,
    marginBottom: 64,
  },
  offeringCard: {
    padding: 16,
  },
  offeringDetailsContainer: {},
  titleContainer: {
    paddingBottom: 16,
  },
  bottomInfoContainer: {
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButtonContainer: {
    flexDirection: "row",
    alignSelf: "flex-end",
    marginBottom: -32,
  },
  actionButton: {
    padding: 8,
    backgroundColor: Colors.secondary,
    elevation: 6,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowRadius: 8,
    shadowColor: Colors.bland,
    shadowOpacity: 0.4,
    borderRadius: 32,
    marginLeft: 12,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
  },
  nullOfferingsTextContainer: {
    alignSelf: "center",
    paddingTop: 80,
  },
  serviceTitleContainer: {
    paddingLeft: 16,
    paddingRight: 32,
    paddingTop: 16,
    paddingBottom: 16,
  },
  serviceTitleCardContainer: {
    paddingBottom: 32,
  },
});

export default OfferListingScreen;
