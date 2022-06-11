import Cookies from "universal-cookie";
import { encodeB64, decodeB64 } from "./crypto";
// import getConfig from 'next/config'
// const { publicRuntimeConfig } = getConfig()

const cookie = new Cookies();

export const getCookieFromBrowser = (key) => {
  if (cookie.get(key)) {
    return decodeB64(cookie.get(key));
  }
  return cookie.get(key);
};

export const setCookie = (key, value, time) => {
  let expire_time = new Date();
  expire_time.setTime(expire_time.getTime() + time);
  cookie.set(key, encodeB64(value), {
    expires: expire_time,
    path: "/",
    domain: process.env.React_App_DOMAIN,
  });
};

export const getCookie = (key, req) => {
  return process.browser
    ? getCookieFromBrowser(key)
    : getCookieFromServer(key, req);
};

const getCookieFromServer = (key, req) => {
  if (!req.headers.cookie) {
    return undefined;
  }
  var rawCookie = req.headers.cookie
    .split(";")
    .find((c) => c.trim().startsWith(`${key}=`));
  if (!rawCookie) {
    return undefined;
  }
  return rawCookie.split(/=(.+)/)[1];
};

export const removeCookie = (key) => {
  if (process.browser) {
    let expire_time = new Date();
    expire_time.setTime(expire_time.getTime() + 1000 * 3600 * 24 * 1);
    cookie.remove(key, {
      expires: expire_time,
    });
  }
};

export const clearCookie = (key) => {
  if (process.browser) {
    let expire_time = new Date();
    expire_time.setTime(expire_time.getTime() - 1000 * 3600 * 24);
    cookie.set(key, "", {
      expires: expire_time,
      path: "/",
      domain: process.env.React_App_DOMAIN,
    });
  }
};
