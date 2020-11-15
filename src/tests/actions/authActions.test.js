import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import Swal from 'sweetalert2'
import { types } from '../../types/types';
import { startChecking, startLogin, startRegister } from '../../actions/authActions';
import * as fetchModule from '../../helpers/fetch'
import '@testing-library/jest-dom';

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);
const initState = { }
let store = mockStore(initState)

Storage.prototype.setItem = jest.fn();
jest.mock('sweetalert2', () => ({
    fire: jest.fn()
}));

describe('Pruebas en el authActions', () => {
    
    beforeEach(() => {
        store = mockStore(initState);
        jest.clearAllMocks();
    })

    let token = '';

    test('startLogin correcto ', async() => {
        
        await store.dispatch(startLogin('test@gmail.com', '123456'));
        const actions  = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: expect.any(String),
                name: expect.any(String)
            }
        })

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String))
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number))

        token = localStorage.setItem.mock.calls[0][1]
    })
    
    test('startLogin incorrecto', async() => {
        
        await store.dispatch(startLogin('test@gmail.com', '149822134'))
        let actions = store.getActions();

        expect(actions).toEqual([])
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'Password incorrecto', 'error')

        await store.dispatch(startLogin('test4@gmail.com', '123456'))
        actions = store.getActions();
        expect(Swal.fire).toHaveBeenCalledWith('Error', 'El usuario no existe en la base de datos', 'error')

    })
  
    test('startRegister correcto', async() => {
        
        fetchModule.fetchSinToken = jest.fn(() => ({
            json() {
                return{
                    ok: true,
                    uid: '123',
                    name: 'Carlos',
                    token: 'ABC123'
                }
            }
        }))

        await store.dispatch( startRegister('test@test.com', '123456', 'test'));
        const actions = store.getActions();
        
        expect( actions[0] ).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Carlos'
            }
        })

        expect(localStorage.setItem).toHaveBeenCalledWith('token', expect.any(String))
        expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number))

    })
    
    test('startChecking correcto', async() => {
        
        fetchModule.fetchConToken = jest.fn(() => ({
            json() {
                return{
                    ok: true,
                    uid: '123',
                    name: 'Carlos',
                    token: 'ABC123'
                }
            }
        }))

        await store.dispatch(startChecking());
        const actions = store.getActions();
        
        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                uid: '123',
                name: 'Carlos'
            }
        })
        expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC123');
        // expect(localStorage.setItem).toHaveBeenCalledWith('token-init-date', expect.any(Number))

    })
    


})
