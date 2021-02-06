
import { render } from '@testing-library/react';

import Gist from './Gist';

describe('Gist', () => {
  it('should render correctly', async () => {
    const { container } = render(<Gist
      description='some description'
      url='some-url'
      filetypes={['type 1', 'type 2']}
      forks={[]}
    />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
