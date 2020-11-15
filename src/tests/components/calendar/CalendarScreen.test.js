import React from 'react'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { types } from '../../../types/types';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { messages } from '../../../helpers/calendar-messages-es';
import { eventSetActive } from '../../../actions/eventActions';
import { CalendarScreen } from '../../../components/calendar/CalendarScreen';
import '@testing-library/jest-dom';
import { act } from 'react-dom/test-utils';

jest.mock('../../../actions/eventActions', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn()
}))

Storage.prototype.setItem = jest.fn()

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);
const initState = {
    ui: {
        modalOpen: false
    },
    auth: {
        uid: '1234',
        name: 'Jose Enrique'
    }, 
    calendar: {
        events: []
    }
 }
const store = mockStore(initState);
store.dispatch = jest.fn(); 

const wrapper = mount(
    <Provider store={ store }>
        <CalendarScreen />
    </Provider>
)

describe('Pruebas en el CalendarScreen', () => {
    
    test('debe de mostrarse correctamente', () => {
        
        expect(wrapper).toMatchSnapshot();

    })

    test('pruebas con las interacciones del calendario ', () => {
        
        const calendar = wrapper.find('Calendar');
        const calendarMessages = calendar.prop('messages');
        
        expect(calendarMessages).toEqual(messages)

        calendar.prop('onDoubleClickEvent')();
        expect( store.dispatch ).toHaveBeenCalledWith({ type: types.uiOpenModal  })

        calendar.prop('onSelectEvent')({ start: 'Hola' });
        expect( eventSetActive ).toHaveBeenCalledWith({ start: 'Hola' });

        act(() => {
            calendar.prop('onView')('week');
            expect( localStorage.setItem ).toHaveBeenCalledWith('lastView', 'week')
        })

    })
    
    
})
