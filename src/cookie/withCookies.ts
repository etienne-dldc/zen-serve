import { Headers } from 'undici';
import type { ZenResponse } from '../mod';
import { HttpHeader } from '../mod';
import type { SetCookies } from './Cookie';
import { SetCookie } from './Cookie';

export function withCookies(res: ZenResponse, cookies: SetCookies): ZenResponse {
  if (cookies.length === 0) {
    return res;
  }
  return res.withHeaders((prev) => {
    const nextHeaders = new Headers(prev);
    const nextCookies = [...prev.getSetCookie(), ...cookies.map((cookie) => SetCookie.toString(cookie))];
    nextHeaders.set(HttpHeader.SetCookie, nextCookies.join(', '));
    return nextHeaders;
  });
}
