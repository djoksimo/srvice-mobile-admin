import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Card, GradientHeader, Loading, Text} from 'components';
import Container from 'components/Container';
import Button from 'components/Button';
import {Colors} from 'values';
import {Agent} from 'types/Agent';
import {AvailabilitySlot} from 'types/AvailabilitySlot';
import {Day as DayType} from 'types/Day';
import {AlertUtils} from 'utils';
import AgentScreen from '../AgentScreen';
import {DayCircles, TimeSlots} from './AvailabilityScreenComponents';
import {DefaultAvailability} from './AvailabilityScreenValues';
import Bottle from '../../bottle';
import {ScheduleManager} from '../../managers';
type Props = {
  navigation: NavigationScreenProp<any, any>;
};
type State = {
  agent: Agent | any;
  availability: Array<AvailabilitySlot>;
  isLoading: boolean;
  isDateTimePickerVisible: boolean;
  currentWeekday: DayType | any;
  isStartSelected: boolean | any;
};

export class AvailabilityScreen extends AgentScreen {
  state: State;
  scheduleManager: ScheduleManager;

  constructor(props: Props) {
    super(props);
    this.state = {
      agent: undefined,
      availability: DefaultAvailability,
      currentWeekday: undefined,
      isStartSelected: undefined,
      isDateTimePickerVisible: false,
      isLoading: false,
    };
    this.scheduleManager = Bottle.ScheduleManager;
  }

  componentDidMount() {
    super.componentDidMount();
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  onSelectStart = (weekDay: DayType) => {
    this.setState({
      isStartSelected: true,
      currentWeekday: weekDay,
    });
    this.showDateTimePicker();
  };
  onSelectEnd = (weekDay: DayType) => {
    this.setState({
      isStartSelected: false,
      currentWeekday: weekDay,
    });
    this.showDateTimePicker();
  };
  showDateTimePicker = () => {
    this.setState({
      isDateTimePickerVisible: true,
    });
  };
  hideDateTimePicker = () => {
    this.setState({
      isDateTimePickerVisible: false,
    });
    this.setState({
      isStartSelected: undefined,
      currentWeekday: undefined,
    });
  };
  handleAndGetPickedTime = (date: Date) => {
    if (this.state.isStartSelected === true) {
      this.updateStartTime(date.getHours(), date.getMinutes());
    } else if (this.state.isStartSelected === false) {
      this.updateEndTime(date.getHours(), date.getMinutes());
    } else {
      console.error('PANIC');
    }

    this.hideDateTimePicker();
  };
  updateStartTime = (hours: number, minutes: number) => {
    const newAvailability = [...this.state.availability];
    const newStartTime = hours + minutes / 60;
    const weekDay = this.state.currentWeekday;
    newAvailability.some((slot, index) => {
      if (slot.weekDay === weekDay) {
        newAvailability[index].startTime = newStartTime;
        this.setState({
          availability: newAvailability,
        });
      }

      return slot.weekDay === weekDay;
    });
  };
  updateEndTime = (hours: number, minutes: number) => {
    const newAvailability = [...this.state.availability];
    const newEndTime = hours + minutes / 60;
    const weekDay = this.state.currentWeekday;
    newAvailability.some((slot, index) => {
      if (slot.weekDay === weekDay) {
        newAvailability[index].endTime = newEndTime;
        this.setState({
          availability: newAvailability,
        });
      }

      return slot.weekDay === weekDay;
    });
  };
  onPressCircle = (weekDay: DayType) => {
    const newAvailability = [...this.state.availability];
    newAvailability.some((slot, index) => {
      if (slot.weekDay === weekDay) {
        newAvailability[index].isSelected = !newAvailability[index].isSelected;
        this.setState({
          availability: newAvailability,
        });
      }

      return slot.weekDay === weekDay;
    });
  };
  onSavePressed = async () => {
    const {navigation} = this.props;
    const {agent, availability} = this.state;
    const {schedule} = agent;

    try {
      this.setState({
        isLoading: true,
      });
      const parsedAvailability = availability
        .filter((availabilitySlot) => {
          const {isSelected} = availabilitySlot;
          return isSelected;
        })
        .map((availabilitySlot) => {
          const {weekDay, startTime, endTime} = availabilitySlot;
          return {
            weekDay,
            start: startTime,
            end: endTime,
          };
        });
      await this.scheduleManager.updateSchedule(
        schedule,
        'availability',
        parsedAvailability,
      );
      this.refreshAgent();
      this.setState({
        isLoading: false,
      });
      AlertUtils.showSnackBar('Updated work hours!', Colors.primary);
      navigation.goBack();
    } catch (err) {
      console.log(err);
      this.setState({
        isLoading: false,
      });
      AlertUtils.showSnackBar('Something went wrong', Colors.error);
    }
  };

  render() {
    const {navigation} = this.props;
    const {availability, isLoading} = this.state;
    const circleDays = availability.map((slot) => ({
      isSelected: slot.isSelected,
      name: slot.weekDay,
    }));
    const timePickerDefault = new Date(2019, 0, 1, 12);
    return (
      <Container navigation={navigation} style={styles.container}>
        <GradientHeader>
          <Loading isLoading={isLoading} />
          <View style={styles.screenTitleContainer}>
            <Text scale={Text.Scale.H4} color={Colors.white}>
              Add Work Hours
            </Text>
          </View>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this.handleAndGetPickedTime}
            onCancel={this.hideDateTimePicker}
            mode="time"
            date={timePickerDefault}
          />
          <ScrollView>
            <Card style={styles.availabilityCard}>
              <Text scale={Text.Scale.H5}>Days Available:</Text>
              <DayCircles
                onPressCircle={this.onPressCircle}
                days={circleDays}
              />
              <TimeSlots
                slots={availability}
                onSelectStart={this.onSelectStart}
                onSelectEnd={this.onSelectEnd}
              />
              <Button
                title="SAVE"
                color={Colors.primary}
                onPress={this.onSavePressed}
              />
            </Card>
          </ScrollView>
        </GradientHeader>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  screenTitleContainer: {
    marginTop: -160,
    bottom: 16,
    paddingBottom: 16,
    alignSelf: 'center',
    paddingTop: 16,
  },
  availabilityCard: {
    padding: 16,
    paddingBottom: 32,
    marginBottom: 16,
  },
});
