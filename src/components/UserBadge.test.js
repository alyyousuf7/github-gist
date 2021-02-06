
import { render } from '@testing-library/react';

import UserBadge from './UserBadge';

describe('UserBadge', () => {
  it('should render correctly', async () => {
    const { container } = render(<UserBadge username='my username' avatar='http://url-to-avatar' />);

    expect(container).toMatchSnapshot();
  });
});
