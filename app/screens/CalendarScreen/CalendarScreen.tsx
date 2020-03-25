import React from 'react';
import {View, Alert} from 'react-native';
import {NavigationScreenProp} from 'react-navigation';
import _ from 'lodash';
import {
  ExpandableCalendar,
  AgendaList,
  CalendarProvider,
} from 'react-native-calendars';
import {Agent} from 'types/AgentType';
import {Text, Touchable, Loading} from 'components';
import Container from 'components/Container';
import WarningBannerPrompt from 'components/WarningBannerPrompt';
import {Colors, Fonts} from 'values';
import {DateUtils, AlertUtils} from 'utils';
import AgentScreen from '../AgentScreen';
import {AgendaItem} from './CalendarScreenTypes';
import styles from './styles';
import Bottle from '../../bottle';
import {AgentManager, ScheduleManager} from '../../managers';
type State = {
  agent: Agent | any;
  agendaItems: Array<AgendaItem>;
  isLoading: boolean;
};
type Props = {
  navigation: NavigationScreenProp<any, any>;
};

class CalendarScreen extends AgentScreen {
  state: State;
  agentManager: AgentManager;
  scheduleManager: ScheduleManager;

  constructor(props: Props) {
    super(props);
    this.state = {
      agent: undefined,
      agendaItems: [],
      isLoading: false,
    };
    this.agentManager = Bottle.AgentManager;
    this.scheduleManager = Bottle.ScheduleManager;
  }

  async componentDidMount(): Promise<any> & any {
    super.componentDidMount();

    if (!this.state.agent) {
      await this.refreshAgent();
    }

    if (this.state.agent) {
      if (!this.state.agent.schedule) {
        await this.initSchedule();
      }

      console.log('AGENT: ', this.state.agent);
      this.parseAgendaItems(this.state.agent);
      this.setState({
        isLoading: false,
      });
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  initSchedule = async () => {
    try {
      this.setState({
        isLoading: true,
      });
      await this.scheduleManager.initSchedule();
      await this.refreshAgent();
    } catch (error) {
      AlertUtils.showSnackBar('Could not initialize schedule');
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };
  parseAgendaItems = (agent: Agent) => {
    const {schedule} = agent;

    if (!schedule) {
      return;
    }

    const {bookings} = schedule; // I am aware that this code is messy as fuck but it works ;)

    const bookingsByDate = {}; // get n days from today where n gets passed into DateUtils.getDates()

    DateUtils.getDates(7).forEach((dateStr) => {
      bookingsByDate[dateStr] = [];
    }); // group bookings by date

    bookings.forEach((booking) => {
      const {start} = booking;
      const dateString = new Date(start).toISOString().split('T')[0];

      if (_.isEmpty(bookingsByDate[dateString])) {
        bookingsByDate[dateString] = [booking];
      } else {
        bookingsByDate[dateString].push(booking);
      }
    });
    const agendaItems = [];
    const bookingDates = Object.keys(bookingsByDate); // format bookings into agenda items

    bookingDates.forEach((bookingDate) => {
      const agendaItem = {
        title: bookingDate,
      };

      if (_.isEmpty(bookingsByDate[bookingDate])) {
        agendaItem.data = [{}];
      } else {
        agendaItem.data = bookingsByDate[bookingDate].map((booking) => ({
          hour: DateUtils.formatHourAMPM(new Date(booking.start)),
          duration: DateUtils.getDifferenceInWords(
            new Date(booking.end),
            new Date(booking.start),
          ).toString(),
          title: `${booking.offering.title} with ${booking.user.firstName}`,
        }));
      }

      agendaItems.push(agendaItem);
    });
    this.setState({
      agendaItems,
    });
  };
  getMarkedDates = () => {
    const {agendaItems} = this.state;
    const marked = {};
    if (_.isEmpty(agendaItems)) return marked;
    agendaItems.forEach((item) => {
      // only mark dates with data
      if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
        marked[item.title] = {
          marked: true,
        };
      }
    });
    return marked;
  };
  itemPressed = (id) => {
    Alert.alert(id); // TODO, open modal or separate screen to view appointment details
  };
  renderEmptyItem = () => (
    <View style={styles.emptyItem}>
      <Text scale={Text.Scale.BUTTON} style={styles.emptyItemText}>
        No appointments on this day
      </Text>
    </View>
  );
  onWorkHoursPromptPressed = () => {
    const {navigation} = this.props;
    navigation.navigate('AvailabilityScreen');
  };
  getTheme = () => ({
    // arrows
    arrowColor: Colors.black,
    arrowStyle: {
      padding: 0,
    },
    // month
    monthTextColor: Colors.black,
    textMonthFontSize: 16,
    textMonthFontFamily: Fonts.RegularOpenSans,
    // day names
    textSectionTitleColor: Colors.black,
    textDayHeaderFontSize: 12,
    textDayHeaderFontFamily: Fonts.SemiBoldOpenSans,
    // today
    todayBackgroundColor: Colors.secondaryDark,
    todayTextColor: Colors.white,
    // dates
    dayTextColor: Colors.primaryLight,
    textDayFontSize: 18,
    textDayFontFamily: Fonts.BoldLato,
    textDayStyle: {
      marginTop: 4,
    },
    // selected date
    selectedDayBackgroundColor: Colors.primary,
    selectedDayTextColor: Colors.white,
    // disabled date
    textDisabledColor: Colors.bland,
    // dot (marked date)
    dotColor: Colors.primary,
    selectedDotColor: Colors.white,
    disabledDotColor: Colors.bland,
  });
  renderAgendaItem = ({item}) => {
    if (_.isEmpty(item)) {
      return this.renderEmptyItem();
    }

    return (
      <Touchable onPress={() => this.itemPressed(item.title)}>
        <View style={styles.item}>
          <View style={styles.timeContainer}>
            <Text scale={Text.Scale.H6} style={styles.itemHourText}>
              {item.hour}
            </Text>
            <Text scale={Text.Scale.BODY} style={styles.itemDurationText}>
              {item.duration}
            </Text>
          </View>
          <View style={styles.itemTextContainer}>
            <Text scale={Text.Scale.H6} style={styles.itemTitleText}>
              {item.title}
            </Text>
          </View>
        </View>
      </Touchable>
    );
  };
  areWorkHoursSpecified = () => {
    const {agent} = this.state;

    if (!agent) {
      return true;
    }

    const {schedule} = agent;
    return schedule && schedule.availability && schedule.availability.length;
  };

  render() {
    const {agendaItems, isLoading} = this.state;
    const workHoursPrompt = this.areWorkHoursSpecified() ? null : (
      <WarningBannerPrompt
        message="Looks like you have not entered your work hours yet."
        onPromptPressed={this.onWorkHoursPromptPressed}
      />
    );
    return (
      <Container style={styles.container}>
        <Loading isLoading={isLoading} />
        <CalendarProvider
          theme={{
            todayButtonTextColor: Colors.primary,
          }}
          disabledOpacity={0.6}
          date={new Date()}>
          <ExpandableCalendar
            firstDay={new Date().getDay()}
            markedDates={this.getMarkedDates()}
            theme={this.getTheme()}
            calendarStyle={styles.calendar}
            headerStyle={styles.calendar} // for horizontal only
          />
          {workHoursPrompt}
          <AgendaList
            sections={agendaItems}
            extraData={this.state}
            renderItem={this.renderAgendaItem}
            sectionStyle={styles.section}
          />
        </CalendarProvider>
      </Container>
    );
  }
}

export default CalendarScreen;
