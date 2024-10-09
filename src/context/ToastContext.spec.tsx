import { ToastProvider, useToast } from './ToastContext';
import { type ToastProps } from '@/components/toast';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useCallback } from 'react';
import { LightOrDarkThemeProvider } from './ThemeContext';

const ToastTestComponent = () => {
  const { addToast } = useToast();

  const handleAddToast = useCallback(
    (input: Pick<ToastProps, 'message' | 'type' | 'title'> & { id: string }) => {
      addToast(input);
    },
    [addToast]
  );
  return (
    <>
        <button
          data-testid="toast-trigger-success-btn"
          type="button"
          onClick={() =>
            handleAddToast({
              id: '1',
              type: 'success',
              title: 'Title success',
              message: 'This is a success toast message',
            })
          }
        >
          Trigger
        </button>
        <button
          data-testid="toast-trigger-fail-btn"
          type="button"
          onClick={() =>
            handleAddToast({
              id: '2',
              type: 'danger',
              title: 'Title failed',
              message: 'This is a fail toast message',
            })
          }
        >
          Trigger
        </button>
    </>
  );
};

describe('Toast context', () => {
  test('success toast appears in toast root', async () => {
    const container = document.createElement('div');
    container.setAttribute('id', 'toast-root');
    document.body.appendChild(container);
    render(
      <LightOrDarkThemeProvider>
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      </LightOrDarkThemeProvider>      
    );
    const successBtn = screen.getByTestId('toast-trigger-success-btn');
    fireEvent.click(successBtn);
    const toastRoot = document.querySelector('#toast-root');

    expect(toastRoot?.innerHTML).contains('Title success');
    expect(toastRoot?.innerHTML).contains('This is a success toast message');
  });

  test('failed toast appears in toast root', async () => {
    const container = document.createElement('div');
    container.setAttribute('id', 'toast-root');
    document.body.appendChild(container);
    render(
      <LightOrDarkThemeProvider>
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      </LightOrDarkThemeProvider>   
    );
    const failBtn = screen.getByTestId('toast-trigger-fail-btn');
    fireEvent.click(failBtn);
    const toastRoot = document.querySelector('#toast-root');

    expect(toastRoot?.innerHTML).contains('Title failed');
    expect(toastRoot?.innerHTML).contains('This is a fail toast message');
  });

  test('toast appears for 3000ms', async () => {
    const container = document.createElement('div');
    container.setAttribute('id', 'toast-root');
    document.body.appendChild(container);
    render(
      <LightOrDarkThemeProvider>
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      </LightOrDarkThemeProvider>   
    );
    const successBtn = screen.getByTestId('toast-trigger-success-btn');
    fireEvent.click(successBtn);
    const toastRoot = document.querySelector('#toast-root');

    const successToast = screen.queryByTestId('component-toast');

    expect(successToast).toBeInTheDocument();

    await waitFor(() => expect(toastRoot).not.toBeEmptyDOMElement(), {
      timeout: 2500,
    });
  });

  test('toast disappears after 3000ms', async () => {
    const container = document.createElement('div');
    container.setAttribute('id', 'toast-root');
    document.body.appendChild(container);
    render(
      <LightOrDarkThemeProvider>
        <ToastProvider>
          <ToastTestComponent />
        </ToastProvider>
      </LightOrDarkThemeProvider>   
    );
    const successBtn = screen.getByTestId('toast-trigger-success-btn');
    fireEvent.click(successBtn);
    const toastRoot = document.querySelector('#toast-root');

    await waitFor(() => expect(toastRoot).toBeEmptyDOMElement(), {
      timeout: 3000,
    });
  });
});
