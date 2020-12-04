import { IData } from "./interfaces";
const testDataSet = require('../src/data.json');

// find all data elements whose zip property is exactly queryZip or begins with queryZip
export function byZip (queryZip: string): IData[] {
    const filtered = testDataSet.filter((data: IData) => {
        return data.zip.match(queryZip)?.['input'] ? true : false;
    });

    return filtered;
}

// find all data elements whose primary_city property is exactly queryName or begins with queryName
export function byName (queryName: string): IData[] {
    const filtered = testDataSet.filter((data: IData) => {
        return data.primary_city.match(queryName)?.['input'] ? true : false;
    });

    return filtered;
}

// find closest city by coords, throw error if no city found
export function byCoords (lat: string, long: string): IData[] {
    
    const parsedLat = Number(lat);
    const parsedLong = Number(long);
    let smallestDiff = Infinity;
    let closestCity: Partial<IData> = {};

    testDataSet.forEach((data: IData) => {
        const diff = Math.abs(parsedLat - Number(data.latitude)) + Math.abs(parsedLong - Number(data.longitude));
        if (diff < smallestDiff) {
            smallestDiff = diff;
            closestCity = data;
        }
    });

    /* 
        if we get here, either our data set is empty or parsing to number failed resulting in NaN
        which will cause boolean evaluation to never return true. Seeing as there must be some closest
        city, we throw an error in this case that none is found
    */
    if (!Object.keys(closestCity)) {
        throw new Error('Encountered error while parsing');
    }

    return [closestCity as IData];
}