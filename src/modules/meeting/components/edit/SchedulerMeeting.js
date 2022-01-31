import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState, IntegratedEditing } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  AppointmentForm,
  AppointmentTooltip,
  ConfirmationDialog,
  EditRecurrenceMenu,
  CurrentTimeIndicator,
  DragDropProvider,
  Toolbar,
  DateNavigator,
  WeekView,
  TodayButton,
  MonthView,
  ViewSwitcher,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { navHeight } from '../../../layout/components/Attribute';
import moment from 'moment';

import { addMeeting } from '../../actions';
const style = ({ palette }) => ({
  icon: {
    color: palette.action.active,
  },
  textCenter: {
    textAlign: 'center',
  },
  firstRoom: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/Lobby-4.jpg)',
  },
  secondRoom: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-4.jpg)',
  },
  thirdRoom: {
    background: 'url(https://js.devexpress.com/Demos/DXHotels/Content/Pictures/MeetingRoom-0.jpg)',
  },
  header: {
    height: '210px',
    backgroundSize: 'cover',
  },
  commandButton: {
    margin: '5px 5px',
    backgroundColor: 'rgba(255,255,255,0.65)',
  },
});


const Header = withStyles(style, { name: 'Header' })(({
  children,
  appointmentData,
  classes,
  onClick,
  ...restProps
}) => (
  <AppointmentTooltip.Header
    {...restProps}
    className={classNames(classes.secondRoom, classes.header)}
    appointmentData={appointmentData}
  >
    {/* {
      console.log(appointmentData)
    } */}
  </AppointmentTooltip.Header>
));

const Content = withStyles(style, { name: 'Content' })(({
  children, appointmentData, classes, ...restProps
}) => (
  <AppointmentTooltip.Content {...restProps} appointmentData={appointmentData}>

  </AppointmentTooltip.Content>
));

const CommandButton = withStyles(style, { name: 'CommandButton' })(({
  classes, ...restProps
}) => (
  <AppointmentTooltip.CommandButton {...restProps} className={classes.commandButton} />
));

export default class SchedulerMeeting extends React.PureComponent {

  constructor(props) {
    super(props);

    const { meetRoom, myMeeting, members, uid } = props
    console.log(myMeeting);
    this.state = {
      data: myMeeting,
      currentDate: new Date(),
      currentViewName: 'work-week',
      startDayHour: '9',
      endDayHour: '19',
      showOpenButton: true,
      resources: [
        {
          fieldName: 'roomId',
          title: 'Room',
          instances: meetRoom,
        },
        {
          fieldName: 'members',
          title: 'Members',
          instances: members,
          allowMultiple: true,
        },
      ],
    };
    this.currentViewNameChange = (currentViewName) => {
      this.setState({ currentViewName });
    };
    this.commitChanges = this.commitChanges.bind(this);

  }



  commitChanges({ added, changed, deleted }) {
    this.setState((state) => {
      let { data } = state;

      if (added) {
        console.log(added);
        let values = {
          members: added.members.map((n) => { return String(n) }),
          Date: moment(added.startDate).format('YYYY-MM-DD'),
          Start_at: moment(added.startDate).format("HH:mm:ss"),
          End_at: moment(added.endDate).format("HH:mm:ss"),
          Room_Id: String(added.roomId),
          Subject: added.title,
          Description: added.notes,
        }
        // addMeeting(values, this.props.uid)
        addMeeting(values)
        // const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        // data = [...data, { id: startingAddedId, ...added }];
      }
      if (changed) {
        console.log(changed);
        data = data.map(appointment => (
          changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
      }
      if (deleted !== undefined) {
        console.log(deleted);
        data = data.filter(appointment => appointment.id !== deleted);
      }
      return { data };
    });
  }


  render() {
    const {
      data,
      currentDate,
      currentViewName,
      startDayHour,
      endDayHour,
      resources,
    } = this.state;

    return (
      <Paper style={{ overflow: 'hidden' }}>
        <Scheduler
          data={data}
          // height='auto'  
          // height={657}
          // height={560}
          height={window.innerHeight - 96.03 - parseInt(navHeight.slice(0, -2))}
        >
          <ViewState
            defaultCurrentDate={currentDate}
            currentViewName={currentViewName}
            onCurrentViewNameChange={this.currentViewNameChange}
          />
          <EditingState
            onCommitChanges={this.commitChanges}
          />

          <IntegratedEditing />
          <DayView
            startDayHour={startDayHour}
            endDayHour={endDayHour}
          />
          <WeekView
            startDayHour={startDayHour}
            endDayHour={endDayHour}
          />
          <WeekView
            name="work-week"
            displayName="Work Week"
            excludedDays={[0, 6]}
            startDayHour={startDayHour}
            endDayHour={endDayHour}
          />
          <MonthView />
          <Appointments />
          {/* <DragDropProvider /> */}
          <AppointmentTooltip
            headerComponent={Header}
            contentComponent={Content}
            commandButtonComponent={CommandButton}
            showOpenButton
          // showDeleteButton
          />
          <ConfirmationDialog
            ignoreCancel
          />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <AppointmentForm
            readOnly
          />
          <Resources
            data={resources}
            mainResourceName="roomId"
          />
          <ViewSwitcher />
          <CurrentTimeIndicator
            shadePreviousCells={true}
            shadePreviousAppointments={true}
            updateInterval='10000'
          />
        </Scheduler>
      </Paper>
    );
  }

}
