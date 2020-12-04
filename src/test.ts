import { handler } from './index';
import { IEvent } from './interfaces';

describe('basic tests', () => {
  let mockEvent: IEvent;
  
  beforeEach(() => {
    mockEvent = {
      queryParams: {}
    }
  });

  test('handler function exists', () => {
    expect(typeof handler).toBe('function');
  });

  test('should correctly find closest city by latitude/longitude', async () => {
    mockEvent.queryParams.lat = '42.18';
    mockEvent.queryParams.long = '-72.93';
    const result = await handler(mockEvent);
    expect(result).toStrictEqual([
      {
        zip: '01008',
        type: 'STANDARD',
        primary_city: 'Blandford',
        acceptable_cities: null,
        unacceptable_cities: null,
        state: 'MA',
        county: 'Hampden County',
        timezone: 'America/New_York',
        area_codes: '413',
        latitude: '42.18',
        longitude: '-72.93',
        country: 'US',
        estimated_population: '1153'
      }
    ]);
  });

  test('should correctly find city by zip', async () => {
    mockEvent.queryParams.zip = '01460';
    const result = await handler(mockEvent);
    expect(result).toStrictEqual([
      {
        zip: '01460',
        type: 'STANDARD',
        primary_city: 'Littleton',
        acceptable_cities: null,
        unacceptable_cities: 'Pingryville',
        state: 'MA',
        county: 'Middlesex County',
        timezone: 'America/New_York',
        area_codes: '978,508,781',
        latitude: '42.53',
        longitude: '-71.47',
        country: 'US',
        estimated_population: '8001'
      }
    ]);
  });

  test('should be able to find multiple cities by partial zip', async () => {
    mockEvent.queryParams.zip = '0146';
    const result = await handler(mockEvent);
    expect(result.length).toBeGreaterThan(1);
  });

  test('should be able to find city by name', async () => {
    mockEvent.queryParams.name = 'Colrain';
    const result = await handler(mockEvent);
    expect(result).toStrictEqual([{
      zip: '01340',
      type: 'STANDARD',
      primary_city: 'Colrain',
      acceptable_cities: 'Shattuckville',
      unacceptable_cities: null,
      state: 'MA',
      county: 'Franklin County',
      timezone: 'America/New_York',
      area_codes: '413',
      latitude: '42.66',
      longitude: '-72.68',
      country: 'US',
      estimated_population: '1581'
    }]);
  });
});
