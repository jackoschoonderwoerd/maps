import { Injectable } from '@angular/core';
import { Bridge, VisitorLocation } from './maps.models';



@Injectable({
    providedIn: 'root'
})
export class MapsService {

    bridges: Bridge[] = [
        {
            name: 'kattenburgerbrug',
            lat: 52.37090906572085,
            lon: 4.914433782223264
        },
        {
            name: 'kortjewantsbrug',
            lat: 52.3710425705383,
            lon: 4.912714462611846
        },
        {
            name: 'scharrebiersluis',
            lat: 52.37031356414785,
            lon: 4.911695496276736
        },
    ]
    visitorLocations: VisitorLocation[] = [
        {
            lat: 52.37090906572085,
            lon: 4.914433782223264
        },
        {
            lat: 52.3710425705383,
            lon: 4.912714462611846
        },
        {
            lat: 52.37031356414785,
            lon: 4.911695496276736
        },
    ]

    constructor() { }

    getBridges() {
        return this.bridges;
    }
    getVisitorLocations() {
        return this.visitorLocations;
    }
}
