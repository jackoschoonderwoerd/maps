import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Bridge, DistanceToBridge, VisitorLocation } from './maps.models';
import { MapsService } from './maps.service';

@Component({
    selector: 'app-maps',
    templateUrl: './maps.component.html',
    styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

    bridges: Bridge[] = []
    visitorLocationForm!: FormGroup;
    closestBridge: Bridge;
    visitorLocations: VisitorLocation[];
    sortedDistanceToBridges: any[]

    constructor(
        private mapsService: MapsService,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.initForm()
        this.bridges = this.mapsService.getBridges();
        this.visitorLocations = this.mapsService.getVisitorLocations()
        const successCallback = (position: GeolocationPosition) => {
            console.log(position)
        }
        const errorCallback = (error: GeolocationPositionError) => {
            console.error(error)
        }
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
            enableHighAccuracy: true
        });

        // navigator.geolocation.getCurrentPosition(successCallback, errorCallback, {
        //     enableHighAccuracy: true,
        //     timeout: 5000
        // });


        // const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback)
        // navigator.geolocation.clearWatch(watchId)
    }
    initForm() {
        this.visitorLocationForm = this.fb.group({
            lat: new FormControl(null, [Validators.required]),
            lon: new FormControl(null, [Validators.required]),
        })
    }

    submit() {
        const visitorLat = this.visitorLocationForm.value.lat;
        const visitorLon = this.visitorLocationForm.value.lon;
        const distanceToBridges: DistanceToBridge[] = []
        this.bridges.forEach((bridge: Bridge) => {
            this.distanceFromObject(bridge.lat, bridge.lon, visitorLat, visitorLon)
            distanceToBridges.push({
                name: bridge.name,
                meters: this.distanceFromObject(bridge.lat, bridge.lon, visitorLat, visitorLon)
            })
        })
        console.log(distanceToBridges);
        this.sortedDistanceToBridges = distanceToBridges.sort((a, b) => {
            return a.meters - b.meters
        })
        console.log(this.sortedDistanceToBridges)
        console.log(this.sortedDistanceToBridges[0])
        const closestBridgesArray = this.bridges.filter((bridge: Bridge) => {
            return bridge.name === this.sortedDistanceToBridges[0].name
        })
        this.closestBridge = closestBridgesArray[0]
        console.log(this.closestBridge)
    }
    distanceFromObject(latObject: number, lonObject: number, latVisitor: number, lonVisitor: number) {  // generally used geo measurement function
        var R = 6378.137; // Radius of earth in KM
        var dLat = latVisitor * Math.PI / 180 - latObject * Math.PI / 180;
        var dLon = lonVisitor * Math.PI / 180 - lonObject * Math.PI / 180;
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(latObject * Math.PI / 180) * Math.cos(latVisitor * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        console.log(Math.round(d * 1000), 'meter');
        return d * 1000; // meters
    }
    onGetClosestBridge(visitorLocation) {
        this.closestBridge = null;
        this.sortedDistanceToBridges = [];
        this.visitorLocationForm.patchValue({
            ...visitorLocation
        })
    }
}
