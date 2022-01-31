import React, { useEffect, useState } from 'react'
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
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { addMeeting } from '../../actions';
import ConfirmDialog from './ConfirmDialog'
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
const ShowConfirmDialog = () => {
  const [open, setOpen] = useState(false)
  return (
    <>

    </>
  )
}

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
    <IconButton
      /* eslint-disable-next-line no-alert */
      onClick={() => alert(JSON.stringify(appointmentData))}
      className={classes.commandButton}
    >
      <EditIcon />
    </IconButton>
    <IconButton
      /* eslint-disable-next-line no-alert */
      onClick={() => alert(JSON.stringify(appointmentData))}
      className={classes.commandButton}
    >
      <DeleteIcon />
    </IconButton>
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

export default function SchedulerMeeting(props) {


  const { meetRoom, myMeeting, members, uid } = props
  console.log(myMeeting);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const [deleteID, setDeleteID] = useState('')
  let data = myMeeting
  let currentDate = new Date()
  let startDayHour = '9'
  let endDayHour = '19'
  let resources = [
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
  ]
  console.log(openDeleteDialog);
  const [state, setState] = React.useState({
    currentViewName: 'Week'
  })

  const currentViewNameChange = (currentViewName) => {
    setState({ currentViewName })
  };

  const handleOpenConfirmDialog = () => {
    setOpenDeleteDialog(false)
  };

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
      <IconButton
        /* eslint-disable-next-line no-alert */
        onClick={() => alert(JSON.stringify(appointmentData))}
        className={classes.commandButton}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        /* eslint-disable-next-line no-alert */
        onClick={() => {
          setDeleteID(appointmentData.id)
          setOpenDeleteDialog(true)
        }}
        className={classes.commandButton}
      >
        <DeleteIcon />
      </IconButton>
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




  return (
    <Paper style={{ overflow: 'hidden' }}>
      {
        uid ?
          <ConfirmDialog open={openDeleteDialog} handleOpenConfirmDialog={handleOpenConfirmDialog} deleteID={deleteID ? deleteID : ''} uid={uid} />
          : ''
      }
      <Scheduler
        data={data}
      // height='auto'  
      // height={657}
      // height={560}
      // height={window.innerHeight - 96.03 - parseInt(navHeight.slice(0, -2))}
      >
        <ViewState
          defaultCurrentDate={currentDate}
          currentViewName={state.currentViewName}
          onCurrentViewNameChange={currentViewNameChange}
        />
        <DayView
          startDayHour={startDayHour}
          endDayHour={endDayHour}
        />
        <WeekView
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
        // showOpenButton
        // showDeleteButton
        />
        <Toolbar />
        <DateNavigator />
        <TodayButton />

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
    </Paper >
  );
}


