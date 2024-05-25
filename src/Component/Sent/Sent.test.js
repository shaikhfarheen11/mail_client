import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Sent from './Sent';

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve({
        email1: {
          to: 'recipient@example.com',
          subject: 'Test Subject',
          message: 'Test Message',
          timestamp: '2024-05-25T12:00:00Z',
        },
        email2: {
          to: 'anotherrecipient@example.com',
          subject: 'Another Subject',
          message: 'Another Message',
          timestamp: '2024-05-25T13:00:00Z',
        },
      }),
  })
);

const mockStore = configureStore([]);

describe('Sent component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
    });
  });

  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Sent />
        </MemoryRouter>
      </Provider>
    );
  });

  test('fetches emails when refresh button is clicked', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Sent />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(getByTestId('refresh-button'));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(2));
  });

  test('composes and sends a new email', async () => {
   
  });
});
