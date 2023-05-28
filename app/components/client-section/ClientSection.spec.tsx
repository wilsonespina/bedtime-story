import { render } from '@testing-library/react';

import ClientSection from './ClientSection';

describe('ClientSection', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ClientSection />);
    expect(baseElement).toBeTruthy();
  });
});
