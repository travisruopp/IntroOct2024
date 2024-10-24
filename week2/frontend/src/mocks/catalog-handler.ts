import { http, HttpResponse } from 'msw';
import { SoftwareItemModel } from '../app/software/types';
const fakeItems: SoftwareItemModel[] = [
  {
    id: '1',
    title: 'Word',
    vendor: 'Microsoft',
    isOpenSource: false,
  },
  {
    id: '2',
    title: 'Firefox',
    vendor: 'Mozilla',
    isOpenSource: false,
  },
];
const handlers = [
  http.get('http://localhost:1337/catalog', () => {
    return HttpResponse.json(fakeItems);
  }),
];

export default handlers;
