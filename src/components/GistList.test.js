
import { render } from '@testing-library/react';

import GistList from './GistList';

describe('GistList', () => {
  it('should render correctly', async () => {
    const { container } = render(<GistList onClickPrev={() => {}} onClickNext={() => {}}>
      <div>child 1</div>
      <div>child 2</div>
    </GistList>);

    expect(container).toMatchSnapshot();
  });
});
