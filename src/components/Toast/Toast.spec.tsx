import { Toast } from './Toast';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('Toast component tests', () => {
  const title = 'Home';

  test('renders Toast title correctly', () => {
    render(
      <Toast
        title={title}
        type="danger"
        onClose={() => ''}
      />
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toHaveTextContent('Home');
  });

  test('toast should have a close button', async () => {
    render(
      <Toast
        title={title}
        type="danger"
        onClose={() => ''}
      />
    );
    const button = await screen.findByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('toast should have 2 svgs', () => {
    const { container } = render(
      <Toast
        title={title}
        type="danger"
        onClose={() => ''}
      />
    );
    expect(container.querySelectorAll('svg')).toHaveLength(2);
  });
});
