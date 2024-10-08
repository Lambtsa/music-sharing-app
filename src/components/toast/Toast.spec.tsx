import { LightOrDarkThemeProvider } from '@/context/ThemeContext';
import { Toast } from './Toast';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Toast component tests', () => {
  const title = 'Home';

  test('renders Toast title correctly', () => {
    render(
      <LightOrDarkThemeProvider>
        <Toast
          title={title}
          type="danger"
          onClose={() => ''}
        />
      </LightOrDarkThemeProvider>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent('Home');
  });

  test('toast should have a close button', async () => {
    render(
      <LightOrDarkThemeProvider>
        <Toast
          title={title}
          type="danger"
          onClose={() => ''}
        />
      </LightOrDarkThemeProvider>
    );
    const button = await screen.findByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('toast should have 2 svgs', () => {
    const { container } = render(
      <LightOrDarkThemeProvider>
        <Toast
          title={title}
          type="danger"
          onClose={() => ''}
        />
      </LightOrDarkThemeProvider>
    );
    expect(container.querySelectorAll('svg')).toHaveLength(2);
  });
});
