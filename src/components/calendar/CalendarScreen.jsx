import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment'
import 'moment/locale/es'
import { messages } from '../../helpers/calendar-messages-es'
import { Navbar } from '../ui/Navbar'
import { CalendarEvent } from './CalendarEvent';
import { useState } from 'react';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../actions/uiActions';
import { eventClearActiveEvent, eventSetActive, eventStartLoading } from '../../actions/eventActions';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';
import { useEffect } from 'react';



moment.locale('es');
const localizer = momentLocalizer(moment);


export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state)
    const { events } = useSelector(state => state.calendar)
    const { uid } = useSelector(state => state.auth)
    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month' );

    useEffect(() => {
        dispatch(eventStartLoading())
    }, [dispatch])

    const onSelectSlot = (e) => {
        dispatch( eventClearActiveEvent() )
    }

    const onDobleClick = (e) => {
        dispatch(uiOpenModal());
    }

    const onSelectEvent = (e) => {
        dispatch(eventSetActive(e));
    }

    const onViewChange = (e) => {
        setLastView( e )
        localStorage.setItem('lastView', e);
    }

    const eventStylesGetter = (event, start, end, isSelected) => {

        const style = {
            backgroundColor: ( uid === event.user._id ) ? '#367CF7' : '#465660',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        }

        return {
            style
        }
    };


    return (
        <>
            <div className="calendar-screen">
                <Navbar /> 

                <Calendar
                localizer={localizer}
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                onDoubleClickEvent = { onDobleClick }
                onSelectEvent = { onSelectEvent }
                eventPropGetter={ eventStylesGetter }
                onView={ onViewChange }
                onSelectSlot = { onSelectSlot }
                selectable = { true }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
                /> 

                {
                    (state.calendar.activeEvent) && <DeleteEventFab />
                }
                <AddNewFab />
                <CalendarModal />
            </div> 
        </>
    )
}
