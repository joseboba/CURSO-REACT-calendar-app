import React from 'react'
import Swal from 'sweetalert2';
import thunk from 'redux-thunk';
import moment from 'moment'
import configureStore from 'redux-mock-store';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { eventStartUpdated, eventClearActiveEvent, eventStartAddNew } from '../../../actions/eventActions'
import { CalendarModal } from '../../../components/calendar/CalendarModal';
import '@testing-library/jest-dom';

jest.mock('../../../actions/eventActions', () => ({
    eventStartUpdated: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew: jest.fn()  
}))

jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}))

Storage.prototype.setItem = jest.fn()

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);




const now = moment().minutes(0).seconds(0).add(1, 'hour');
const after = now.clone().add(1, 'hour')

const initState = {
    ui: {
        modalOpen: true
    },
    auth: {
        uid: '1234',
        name: 'Jose Enrique',
    }, 
    calendar: {
        events: [],
        activeEvent: {
            title: 'Hola Mundo',
            notes: 'Algunas notas',
            start: now.toDate(),
            end: after.toDate()

        }
    }
 }
const store = mockStore(initState);
store.dispatch = jest.fn(); 

const wrapper = mount(
    <Provider store={ store }>
        <CalendarModal />
    </Provider>
)

describe('Pruebas en CalendarModal', () => {

    beforeEach(() =>{
        jest.clearAllMocks()
    })
    
    test('debe de mostrar el modal', () => {
        
        expect(wrapper.find('Modal').prop('isOpen')).toBe(true)

    })
    
    test('debe de llamar la accion de actualizar y cerrar el modal', () => {
        
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( eventStartUpdated ).toHaveBeenCalledWith(initState.calendar.activeEvent);
        expect( eventClearActiveEvent ).toHaveBeenCalled();

    })
    
    test('debe de mostrar el error si falta el titulo', () => {
        
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        })

        expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(true);
    })

    test('debe de crear un nuevo evento', () => {
        
        const initState = {
            ui: {
                modalOpen: true
            },
            auth: {
                uid: '1234',
                name: 'Jose Enrique',
            }, 
            calendar: {
                events: [],
                activeEvent: null
            }
         }
        const store = mockStore(initState);
        store.dispatch = jest.fn(); 
        
        const wrapper = mount(
            <Provider store={ store }>
                <CalendarModal />
            </Provider>
        )

        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola pruebas'
            }
        })

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        })

        expect( eventStartAddNew ).toHaveBeenCalledWith({
            end: expect.any(Date),
            start: expect.any(Date),
            title: 'Hola pruebas',
            notes: ''
        })

        expect( eventClearActiveEvent ).toHaveBeenCalled();

    })
    
    test('debe de validar las fechas', () => {
        
        wrapper.find('input[name="title"]').simulate('change', {
            target: {
                name: 'title',
                value: 'Hola pruebas'
            }
        })

        const hoy = new Date();

        act(() => {
            wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy);
        })

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        })

        expect( Swal.fire ).toHaveBeenCalledWith("Error", "La fecha fin debe de ser mayor a la fecha de inicio", "error");

    })
    
    

})
