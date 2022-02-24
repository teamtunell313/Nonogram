import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

test('renders learn react link', () => {
  const renderResult = render(<App />);
  // console.log(renderResult.container)
  const linkElement = renderResult.getByText("Reset");
  // expect(linkElement).toBeInTheDocument();
});
