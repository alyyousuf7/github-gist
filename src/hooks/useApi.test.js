import { renderHook } from '@testing-library/react-hooks';

import useApi from './useApi';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('useApi', () => {
  it('should throw error if fn is not a function', async () => {
    const fn = 'invalid';

    const { result } = renderHook(({ fn }) => useApi(fn), {
      initialProps: { fn },
    });

    expect(result.error).toEqual(new Error('fn must be a function'));
  });

  it('should return response when fn() is successful', async () => {
    const fn = async () => {
      await sleep(100);
      return 'some response';
    };

    const { result, waitForNextUpdate } = renderHook(({ fn }) => useApi(fn), {
      initialProps: { fn },
    });

    expect(result.current.pending).toBe(true);
    await waitForNextUpdate();
    expect(result.current.pending).toBe(false);
    expect(result.current.response).toBe('some response');
  });

  it('should return error when fn() fails', async () => {
    const fn = async () => {
      await sleep(100);
      throw new Error('some error')
    };

    const { result, waitForNextUpdate } = renderHook(({ fn }) => useApi(fn), {
      initialProps: { fn },
    });

    expect(result.current.pending).toBe(true);
    await waitForNextUpdate();
    expect(result.current.pending).toBe(false);
    expect(result.current.error).toEqual(new Error('some error'));
  });

  it('should reload when fn changes', async () => {
    let fn = async () => {
      await sleep(100);
      return 'response 1';
    };

    const { result, rerender, waitForNextUpdate } = renderHook(({ fn }) => useApi(fn), {
      initialProps: { fn },
    });

    expect(result.current.pending).toBe(true);
    await waitForNextUpdate();
    expect(result.current.pending).toBe(false);
    expect(result.current.response).toBe('response 1');

    // change and respond with different value
    fn = async () => {
      await sleep(100);
      return 'response 2';
    };
    rerender({ fn });

    expect(result.current.pending).toBe(true);
    await waitForNextUpdate();
    expect(result.current.pending).toBe(false);
    expect(result.current.response).toBe('response 2');

    // change and throw error
    fn = async () => {
      await sleep(100);
      throw new Error('some error');
    };
    rerender({ fn });

    expect(result.current.pending).toBe(true);
    await waitForNextUpdate();
    expect(result.current.pending).toBe(false);
    expect(result.current.error).toEqual(new Error('some error'));

    // change and respond with different value
    fn = async () => {
      await sleep(100);
      return 'response 3';
    };
    rerender({ fn });

    expect(result.current.pending).toBe(true);
    await waitForNextUpdate();
    expect(result.current.pending).toBe(false);
    expect(result.current.response).toBe('response 3');
  });
});
