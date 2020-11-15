import { fetchConToken, fetchSinToken } from '../../helpers/fetch';
import '@testing-library/jest-dom';

describe('Pruebas en el helper fetch', () => {

    let token = '';
    
    test('fetchSinToken debe de funcionar', async() => {
        
        const resp = await fetchSinToken('auth', { email: 'test@gmail.com', password: '123456' }, 'POST');
        const body = await resp.json();

        expect( resp instanceof Response ).toBe(true)
        expect(body.ok).toBe(true)
        
        token = body.token;
    })

    test('fetchConToken', async() => {
        
        localStorage.setItem('token', token);

        const resp = await fetchConToken('events/5f930c6c76a3fc27af6fc8d3', {}, 'DELETE');
        const body = await resp.json();

        expect(body.msg).toBe('No existe ningun registro con este ID')

    })
    

})
