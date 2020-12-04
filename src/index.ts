import { IData, IEvent } from './interfaces';
import { byCoords, byName, byZip } from './utils';

/**
    I'll assume that our incoming events are HTTP requests that have been
    processed to have the following structure.

    e.g.

    {
        queryParams: {
            zipCode: '123'
        }
    }
*/
export async function handler (event: IEvent): Promise<IData[]> {
    /* 
        check for queryParams in no particular order, i.e. zip&name may be included,
        but for no particular reason, only zip will be evaluated
    */
    if (event.queryParams.zip) {
        const filtered = byZip(event.queryParams.zip);
        return filtered;
    }

    if (event.queryParams.name) {
        const filtered = byName(event.queryParams.name);
        return filtered;
    }

    if (event.queryParams.lat && event.queryParams.long) {
        const filtered = byCoords(event.queryParams.lat, event.queryParams.long);
        return filtered;
    }
    throw new Error('Unrecognized query parameter combination');
};
  