
import { render } from '@testing-library/react';

import Badge from './Badge';

describe('Badge', () => {
  it('should render correctly', async () => {
    const { container } = render(<Badge>my badge</Badge>);

    expect(container).toMatchSnapshot();
  });
});
