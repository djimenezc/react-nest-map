import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

test('renders learn react link', () => {
  const mockCallback = jest.fn();

  const wrapper= render(<Button  onClick={mockCallback}>
    Hello
  </Button>);
  const linkElement = wrapper.getByText(/Hello/i);
  expect(linkElement).toBeInTheDocument();
  fireEvent.click(linkElement)
  expect(mockCallback.mock.calls).toHaveLength(1);

  expect(wrapper).toMatchSnapshot();
});
