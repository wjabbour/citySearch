type queryString = 'zip' | 'name' | 'lat' | 'long';

export interface IEvent {
    queryParams: { [Q in queryString]?: string }
}

export interface IData {
    zip: string;
    primary_city: string;
    latitude: string;
    longitude: string;
}