import { types } from '../../types/types'
import '@testing-library/jest-dom';

describe('Pruebas en Types', () => {

    test('los types deben de ser iguales', () => {
        
        expect(types).toEqual({
            uiOpenModal: '[ui] Open Modal',
            uiCloseModal: '[ui] Close Modal',
        
            eventStartNew: '[event] Event Start New',
            eventLogout: '[event] Logout Event',
            eventSetActive: '[event] Set Active',
            eventAddNew: '[event] Add new',
            clearActiveEvent: '[event] Clear active event',
            eventUpdate: '[event] Event updated',
            eventDeleted: '[event] Event deleted',
            eventLoaded: '[event] Events Loaded',
        
        
            authCheckingFinish: '[auth] Finish checking login state',
            authStartLogin: '[auth] Start login',
            authLogin: '[auth] Login',
            authStartRegister: '[auth] Login',
            authStartTokenRenew: '[auth] Start token renew',
            authLogout: '[auth] Logout'
        })

    })
    

})