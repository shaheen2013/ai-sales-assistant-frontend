"use client";

import React from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const data = [
    { name: 'United States', lon: -100.445882, lat: 39.7837304, percentage: 50, bgColor: "#C2E4FF", color: '#2196f3', gradientId: 'gradUS' },
    { name: 'Canada', lon: -106.3468, lat: 56.1304, percentage: 40, bgColor: "#FFE0C2", color: '#FFB056', gradientId: 'gradCanada' },
    { name: 'UK', lon: -3.2765753, lat: 54.7023545, percentage: 29, bgColor: "#CCC0FC", color: '#654CE6', gradientId: 'gradUK' },
    { name: 'Germany', lon: 10.4515, lat: 51.1657, percentage: 21, bgColor: "#c0fde0", color: '#13c56b', gradientId: 'gradGermany' },
    { name: 'Bangladesh', lon: 90.3563, lat: 23.6850, percentage: 11, bgColor: "#fcc0c0", color: '#ed5e5e', gradientId: 'gradBangladesh' },
];

const CustomMarker = ({ bgColor, color }: { bgColor: string, color: string }) => (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g opacity="0.7">
            <rect y="0.0917969" width="33.3333" height="33.3333" rx="16.6667" fill="#F0EDFC" />
            <rect x="6.66669" y="6.75781" width="20" height="20" rx="10" fill={bgColor} />
            <rect x="13.3334" y="13.4258" width="6.66667" height="6.66667" rx="3.33333" fill={color} />
        </g>
    </svg>
);

const MapChart = () => {
    return (
        <div className='flex transform -translate-x-12'>
            <ComposableMap
            >
                <defs>
                    {/* Dotted pattern for countries */}
                    <pattern id="dot" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
                        <circle cx="3" cy="3" r="1" fill="#BDC0C5" />
                    </pattern>
                    {/* Radial gradients for markers */}
                    <radialGradient id="gradUS" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#007BFF" />
                        <stop offset="100%" stopColor="#ADD8E6" />
                    </radialGradient>
                    <radialGradient id="gradCanada" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#FFA500" />
                        <stop offset="100%" stopColor="#FFD700" />
                    </radialGradient>
                    <radialGradient id="gradUK" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#6F42C1" />
                        <stop offset="100%" stopColor="#E6E6FA" />
                    </radialGradient>
                    <radialGradient id="gradGermany" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#28A745" />
                        <stop offset="100%" stopColor="#98FB98" />
                    </radialGradient>
                    <radialGradient id="gradBangladesh" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="#DC3545" />
                        <stop offset="100%" stopColor="#FF6347" />
                    </radialGradient>
                </defs>
                <g>
                    <Geographies geography="https://unpkg.com/world-atlas@2.0.2/countries-110m.json">
                        {({ geographies }) =>
                            geographies.map(geo => (
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    style={{
                                        default: { fill: 'url(#dot)', stroke: '#FFFFFF', strokeWidth: 0.75, outline: 'none' },
                                        hover: { fill: 'url(#dot)', stroke: '#FFFFFF', strokeWidth: 0.75, outline: 'none' },
                                        pressed: { fill: 'url(#dot)', stroke: '#FFFFFF', strokeWidth: 0, outline: 'none' }
                                    }}
                                />
                            ))
                        }
                    </Geographies>
                    {data.map(country => (
                        <Marker key={country.name} coordinates={[country.lon, country.lat]}>
                            {/* <circle r={country.percentage / 10} fill={`url(#${country.gradientId})`} /> */}
                            <CustomMarker bgColor={country.bgColor} color={country.color} />
                        </Marker>
                    ))}
                </g>
            </ComposableMap>
        </div>
    );
};

export default MapChart;