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
import { appointments } from './data';

export default class SchedulerMeeting extends React.PureComponent {
  constructor(props) {
    super(props);

    const { meetRoom } = props
 
    this.state = {
      data: appointments,
      currentDate: new Date(),
      currentViewName: 'work-week',
      startDayHour: '9',
      endDayHour: '19', 
      resources: [
        {
          fieldName: 'roomId',
          title: 'Room',
          instances: meetRoom,
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
        const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
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
    const {
      meetRoom
    } = this.props;
    console.log(meetRoom);
    return (
      <Paper>
        <Scheduler
          data={data}
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
          <ConfirmationDialog />
          <Appointments />
          <DragDropProvider />
          <AppointmentTooltip
            showOpenButton
            showDeleteButton
          />
          <Toolbar />
          <DateNavigator />
          <TodayButton />
          <AppointmentForm/>
          <ViewSwitcher />
          <CurrentTimeIndicator
            shadePreviousCells={true}
            shadePreviousAppointments={true}
            updateInterval='10000'
          />
          <Resources
            data={resources}
            mainResourceName="text"
          />

        </Scheduler>
      </Paper>
    );
  }

}
