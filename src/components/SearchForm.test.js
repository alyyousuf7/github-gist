import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event';

import SearchForm from './SearchForm';

describe('SearchForm', () => {
  it('should render correctly', () => {
    const onSubmit = jest.fn();
    const { container } = render(<SearchForm onSubmit={onSubmit} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('should call onSubmit with username', async () => {
    const onSubmit = jest.fn();
    const { container } = render(<SearchForm onSubmit={onSubmit} />);

    userEvent.type(container.querySelector('#username'), 'some username');
    userEvent.click(container.querySelector('input[type=submit]'));

    expect(onSubmit).toBeCalledWith('some username');
  });
});
