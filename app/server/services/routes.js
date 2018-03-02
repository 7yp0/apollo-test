// @flow
import fetch from 'node-fetch';

export async function fetchRoutes(routesUrl: string, language: string): Object {
  const response = await fetch(`${routesUrl}/${language.toLowerCase()}`);

  if (!response) {
    return {};
  }

  return response.json();
}
