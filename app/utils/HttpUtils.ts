/* eslint-disable indent */
import type {AuthHeader} from 'types/AuthHeader';

class HttpUtils {
  static async get(
    endpoint: string,
    extension: string,
    queryParams: Record<string, any>,
  ) {
    const queryString = !queryParams
      ? extension
      : `${extension}?${Object.keys(queryParams)
          .map((key) => `${key}=${queryParams[key]}`)
          .join('&')}`;

    const response = await fetch(`${endpoint}/${queryString}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });
    return response.json();
  }

  static async postProtected(
    endpoint: string,
    payload: Record<string, any>,
    authHeader: AuthHeader,
  ) {
    let body = {};
    let contentType = 'application/json';
    if (payload instanceof FormData) {
      body = payload;
      contentType = 'multipart/form-data';
    } else {
      body = JSON.stringify(payload);
    }

    let headers: Record<string, any> = {
      Accept: 'application/json',
      'Content-Type': contentType,
    };
    headers = Object.assign(headers, authHeader);

    const response = await fetch(endpoint, {
      method: 'POST',
      headers,
      body,
    });
    return response.json();
  }

  static async post(endpoint: string, payload: Record<string, any>) {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
    return response.json();
  }

  static async patch(
    endpoint: string,
    payload: Record<string, any>,
    authHeader: AuthHeader,
  ) {
    let headers: Record<string, any> = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    headers = Object.assign(headers, authHeader);

    const response = await fetch(endpoint, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(payload),
    });
    return response.json();
  }

  static async delete(
    endpoint: string,
    payload: Record<string, any>,
    authHeader: AuthHeader,
  ) {
    let headers: Record<string, any> = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    headers = Object.assign(headers, authHeader);
    const body = payload ? JSON.stringify(payload) : undefined;

    const response = await fetch(endpoint, {
      method: 'DELETE',
      headers,
      body,
    });
    return response.json();
  }
}

export default HttpUtils;
