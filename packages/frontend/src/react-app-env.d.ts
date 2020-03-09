/// <reference types="react-scripts" />

export interface Geometry {
    Type: string,
    Coordinates: number[]
}

export interface Device {
    ID: string,
    Name: string,
    Active: boolean,
    Geometry: Geometry,
    Share: string,
    Date: string,
    Temperature: number,
    Battery: number
}

export interface DevicesProps {
    devices: Device[]
}
