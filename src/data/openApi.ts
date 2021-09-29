import { IOpenAPI } from '../model/openApi';

export const DEFAULT_OPEN_APIS: IOpenAPI[] = [
  {
    service: 'petstore-v3',
    label: 'Pet Store V3',
    url: 'https://petstore3.swagger.io/api/v3/openapi.json',
  },
];

function parseRawToOpenAPIs(openAPIsRaw: any): IOpenAPI[] {
  return openAPIsRaw.map((element: any) => {
    return {
      service: element.service,
      label: element.label,
      url: element.url,
    };
  });
}

export function getOpenAPIs(): IOpenAPI[] {
  if (window._env_.OPEN_APIS) {
    const openAPIsRaw = JSON.parse(window._env_.OPEN_APIS);
    return parseRawToOpenAPIs(openAPIsRaw);
  }
  return DEFAULT_OPEN_APIS;
}