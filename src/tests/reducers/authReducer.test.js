import { types } from '../../types/types'
import { authReducer } from '../../reducers/authReducer'
import '@testing-library/jest-dom'

const initState = { checking: true }

describe('Pruebas en el authReducer', () => {
    
    test('debe de retornar el estado por defecto', () => {
        
        const state = authReducer(initState, {})
        expect(state).toEqual(initState)

    })

    test('debe de hacer el logout correctamente', () => {
        
        const action = { type: types.authLogout};
        const state = authReducer(initState, action);

        expect(state).toEqual({ checking: false })

    })
    
    test('debe de hacer el login correctamente', () => {
        
        const action = { 
            type: types.authLogin,
            payload: {
                uid: '1234',
                name: 'Jose'
            }
        }
        const state = authReducer(initState, action)
        
        expect(state).toEqual({ checking: false, ...action.payload})
    })

    test('debe de hacer el authChecking correctamente', () => {
        const action = {  type: types.authCheckingFinish }
        const state = authReducer(initState, action)
        
        expect(state).toEqual({ checking: false })
    })
    
    

})
