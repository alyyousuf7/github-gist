import { act, renderHook } from '@testing-library/react-hooks';
import useGistSearch from './useGistSearch';

jest.mock('../services/gist-service');

import { GetGistForks, GetGistList } from '../services/gist-service';

describe('useGistSearch', () => {
  beforeAll(() => {
    GetGistForks.mockResolvedValue([]);
  });

  beforeEach(() => {
    GetGistList.mockRestore();
  });

  it('should not fail', () => {
    const { result } = renderHook(({ pageSize }) => useGistSearch(pageSize), {
      initialProps: { pageSize: 10 },
    });

    expect(result.error).toBeUndefined();
  });

  it('should load data when loadGists is called', async () => {
    GetGistList
    .mockResolvedValueOnce([{}, {}])
    .mockResolvedValueOnce([{}])
    .mockResolvedValueOnce([{}, {}, {}]);

    const { result, waitForNextUpdate } = renderHook(({ pageSize }) => useGistSearch(pageSize), {
      initialProps: { pageSize: 10 },
    });

    // load gists
    act(() => { result.current.loadGists('user 1'); });

    expect(result.current.pending).toBe(true);
    expect(result.current.error).toBeUndefined();
    await waitForNextUpdate();

    expect(GetGistList).toBeCalledWith('user 1', 10, 1);
    expect(result.current.pending).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.gists).toEqual([{}, {}]);

    // load more gists
    act(() => { result.current.nextPage(); });

    expect(result.current.pending).toBe(true);
    expect(result.current.error).toBeUndefined();
    await waitForNextUpdate();
    expect(GetGistList).toBeCalledWith('user 1', 10, 2);
    expect(result.current.pending).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.gists).toEqual([{}]);

    // load prev gists
    act(() => { result.current.prevPage(); });

    expect(result.current.pending).toBe(true);
    expect(result.current.error).toBeUndefined();
    await waitForNextUpdate();
    expect(GetGistList).toBeCalledWith('user 1', 10, 1);
    expect(result.current.pending).toBe(false);
    expect(result.current.error).toBeUndefined();
    expect(result.current.gists).toEqual([{}, {}, {}]);
  });

  it('should jump back to page 1 when user changes', async () => {
    GetGistList
    .mockResolvedValueOnce([{}, {}])
    .mockResolvedValueOnce([{}])
    .mockResolvedValueOnce([{}, {}, {}]);

    const { result, waitForNextUpdate } = renderHook(({ pageSize }) => useGistSearch(pageSize), {
      initialProps: { pageSize: 10 },
    });

    // load gists
    act(() => { result.current.loadGists('user 1'); });
    await waitForNextUpdate();
    expect(GetGistList).toBeCalledWith('user 1', 10, 1);

    // go to next page
    act(() => { result.current.nextPage(); });
    await waitForNextUpdate();
    expect(GetGistList).toBeCalledWith('user 1', 10, 2);

    // load gists for another user
    act(() => { result.current.loadGists('user 2'); });
    await waitForNextUpdate();
    expect(GetGistList).toBeCalledWith('user 2', 10, 1);
  });

  it('should jump back to page 1 when page size changes', async () => {
    GetGistList
    .mockResolvedValueOnce([{}, {}])
    .mockResolvedValueOnce([{}])
    .mockResolvedValueOnce([{}, {}, {}]);

    const { result, rerender, waitForNextUpdate } = renderHook(({ pageSize }) => useGistSearch(pageSize), {
      initialProps: { pageSize: 10 },
    });

    // load gists
    act(() => { result.current.loadGists('user 1'); });
    await waitForNextUpdate();
    expect(GetGistList).toBeCalledWith('user 1', 10, 1);

    // go to next page
    act(() => { result.current.nextPage(); });
    await waitForNextUpdate();
    expect(GetGistList).toBeCalledWith('user 1', 10, 2);

    // rerender with different page size
    rerender({ pageSize: 5 });
    act(() => { result.current.loadGists('user 1'); });
    await waitForNextUpdate();
    expect(GetGistList).toBeCalledWith('user 1', 5, 1);
  });

  it('should fill error when initial api fails', async () => {
    GetGistList.mockRejectedValue(new Error('some error'));

    const { result, waitForNextUpdate } = renderHook(({ pageSize }) => useGistSearch(pageSize), {
      initialProps: { pageSize: 10 },
    });

    // load gists
    act(() => { result.current.loadGists('user 1'); });

    expect(result.current.pending).toBe(true);
    expect(result.current.error).toBeUndefined();
    await waitForNextUpdate();

    expect(result.current.pending).toBe(false);
    expect(result.current.error).toEqual(new Error('some error'));
  });

  it('should fill error when nextPage api fails', async () => {
    GetGistList
      .mockResolvedValueOnce([{}])
      .mockRejectedValue(new Error('some error'));

    const { result, waitForNextUpdate } = renderHook(({ pageSize }) => useGistSearch(pageSize), {
      initialProps: { pageSize: 10 },
    });

    // load gists
    act(() => { result.current.loadGists('user 1'); });

    expect(result.current.pending).toBe(true);
    expect(result.current.error).toBeUndefined();
    await waitForNextUpdate();

    expect(result.current.pending).toBe(false);
    expect(result.current.error).toBeUndefined();

    // load next page
    act(() => { result.current.nextPage(); });

    expect(result.current.pending).toBe(true);
    expect(result.current.error).toBeUndefined();
    await waitForNextUpdate();

    expect(result.current.pending).toBe(false);
    expect(result.current.error).toEqual(new Error('some error'));
  });
});
