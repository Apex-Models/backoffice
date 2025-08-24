import { renderHook, act } from '@testing-library/react';
import useFetch from './useFetch';

describe('useFetch', () => {
  const OLD_ENV = process.env;
  beforeEach(() => {
    jest.resetAllMocks();
    process.env = { ...OLD_ENV, NEXT_PUBLIC_API_URL: 'http://localhost' };
  });
  afterAll(() => {
    process.env = OLD_ENV;
  });

  it('retourne data au succès', async () => {
    const mockJson = jest.fn().mockResolvedValue({ code: 200, data: { ok: true } });
    // @ts-ignore
    global.fetch = jest.fn().mockResolvedValue({ json: mockJson });

    const { result } = renderHook(() => useFetch({ url: 'test', method: 'GET' }));

    await act(async () => {
      await result.current.fetchData();
    });

    expect(global.fetch).toHaveBeenCalledWith('http://localhost/test', expect.any(Object));
    expect(result.current.data).toEqual({ code: 200, data: { ok: true } });
    expect(result.current.error).toBeNull();
  });

  it('retourne error si code != 200', async () => {
    const mockJson = jest.fn().mockResolvedValue({ code: 500, message: 'err' });
    // @ts-ignore
    global.fetch = jest.fn().mockResolvedValue({ json: mockJson });

    const { result } = renderHook(() => useFetch({ url: 'test', method: 'GET' }));

    await act(async () => {
      await result.current.fetchData();
    });

    expect(result.current.error).toBe('err');
  });
});


