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
    />

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

export default function ScedulerMeetingFunc(props) {
    const { meetRoom, myMeeting, members,filter } = props

    let data = myMeeting
    let currentDate = new Date()
 
    const [state,setState] = React.useState({        
        currentViewName:'Week'
    })
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

    const currentViewNameChange = (currentViewName) => {
        setState({currentViewName}) 
    };




    return (
        <Paper style={{ overflow: 'hidden' }}>
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
                {/* <WeekView
            name="work-week"
            displayName="Work Week"
            excludedDays={[0, 6]}
            startDayHour={startDayHour}
            endDayHour={endDayHour}
          /> */}
                <MonthView />
                <Appointments />
                <AppointmentTooltip
                    headerComponent={Header}
                    contentComponent={Content}
                    commandButtonComponent={CommandButton}
                />
                <Toolbar />
                <DateNavigator />
                <TodayButton />
                <Resources
                    data={resources}
                    mainResourceName={filter===1?'members':filter===2?'roomId':''}
                />
                <ViewSwitcher />
                <CurrentTimeIndicator
                    shadePreviousCells={true}
                    shadePreviousAppointments={true}
                    updateInterval='10000'
                />
            </Scheduler>
        </Paper>
    )
}
