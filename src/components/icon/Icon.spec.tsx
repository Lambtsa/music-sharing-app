import { render } from '@testing-library/react';
import React from 'react';

import { Icon } from './Icon';

describe('Icon component', () => {
  test('renders burgerIcon svg', () => {
    const { container } = render(<Icon id="burger-icon" width={16} height={16} icon="burger" />);
    expect(container.querySelector('#burger-icon')).toBeInTheDocument();
  });

  test('renders chevronIcon svg', () => {
    const { container } = render(<Icon id="chevron-icon" width={16} height={16} icon="chevron" />);
    expect(container.querySelector('#chevron-icon')).toBeInTheDocument();
  });

  test('renders closeIcon svg', () => {
    const { container } = render(<Icon id="close-icon" width={16} height={16} icon="close" />);
    expect(container.querySelector('#close-icon')).toBeInTheDocument();
  });

  test('renders infoIcon svg', () => {
    const { container } = render(<Icon id="info-icon" width={16} height={16} icon="info" />);
    expect(container.querySelector('#info-icon')).toBeInTheDocument();
  });

  test('renders searchIcon svg', () => {
    const { container } = render(<Icon id="search-icon" width={16} height={16} icon="search" />);
    expect(container.querySelector('#search-icon')).toBeInTheDocument();
  });

  test('renders tickIcon svg', () => {
    const { container } = render(<Icon id="tick-icon" width={16} height={16} icon="tick" />);
    expect(container.querySelector('#tick-icon')).toBeInTheDocument();
  });

  test('renders validIcon svg', () => {
    const { container } = render(<Icon id="valid-icon" width={16} height={16} icon="valid" />);
    expect(container.querySelector('#valid-icon')).toBeInTheDocument();
  });

  test('renders warningIcon svg', () => {
    const { container } = render(<Icon id="warning-icon" width={16} height={16} icon="warning" />);
    expect(container.querySelector('#warning-icon')).toBeInTheDocument();
  });
});
