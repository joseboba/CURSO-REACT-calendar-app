import React from 'react'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { DeleteEventFab } from '../../../components/ui/DeleteEventFab';
import { eventStartDelete } from '../../../actions/eventActions';
import '@testing-library/jest-dom';

jest.mock('../../../actions/eventActions', () => ({
    eventStartDelete: jest.fn()
}))

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);
const initState = { }
const store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={ store }>
        <DeleteEventFab />
    </Provider>
)


describe('Pruebas en DeleteEventFab', () => {
    
    test('debe de mostrarse correctamente', () => {
        
        expect(wrapper).toMatchSnapshot();

    })

    test('debe de llamar el eventStartDelete al hacer click', () => {
        
        wrapper.find('button').simulate('click')
        
        expect(eventStartDelete).toHaveBeenCalled()

    })
    
    

})
