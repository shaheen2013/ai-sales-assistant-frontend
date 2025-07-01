"use client";

import {
  Marker,
  Geography,
  Geographies,
  ComposableMap,
} from "react-simple-maps";

const CustomMarker = ({
  bgColor,
  color,
}: {
  bgColor: string;
  color: string;
}) => (
  <svg
    width="34"
    height="34"
    viewBox="0 0 34 34"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.7">
      <rect
        y="0.0917969"
        width="33.3333"
        height="33.3333"
        rx="16.6667"
        fill="#F0EDFC"
      />
      <rect
        x="6.66669"
        y="6.75781"
        width="20"
        height="20"
        rx="10"
        fill={bgColor}
      />
      <rect
        x="13.3334"
        y="13.4258"
        width="6.66667"
        height="6.66667"
        rx="3.33333"
        fill={color}
      />
    </g>
  </svg>
);

const MapChart = ({ data }: any) => {
  return (
    <div className="flex transform lg:-translate-x-12">
      <ComposableMap>
        <defs>
          {/* Dotted pattern for countries */}
          <pattern
            id="dot"
            x="0"
            y="0"
            width="4"
            height="4"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="3" cy="3" r="1" fill="#BDC0C5" />
          </pattern>
          {/* Radial gradients for markers */}
          <radialGradient
            id="gradUS"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#007BFF" />
            <stop offset="100%" stopColor="#ADD8E6" />
          </radialGradient>
          <radialGradient
            id="gradCanada"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#FFA500" />
            <stop offset="100%" stopColor="#FFD700" />
          </radialGradient>
          <radialGradient
            id="gradUK"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#6F42C1" />
            <stop offset="100%" stopColor="#E6E6FA" />
          </radialGradient>
          <radialGradient
            id="gradGermany"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#28A745" />
            <stop offset="100%" stopColor="#98FB98" />
          </radialGradient>
          <radialGradient
            id="gradBangladesh"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#DC3545" />
            <stop offset="100%" stopColor="#FF6347" />
          </radialGradient>
        </defs>
        <g>
          <Geographies geography="https://unpkg.com/world-atlas@2.0.2/countries-110m.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "url(#dot)",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    hover: {
                      fill: "url(#dot)",
                      stroke: "#FFFFFF",
                      strokeWidth: 0.75,
                      outline: "none",
                    },
                    pressed: {
                      fill: "url(#dot)",
                      stroke: "#FFFFFF",
                      strokeWidth: 0,
                      outline: "none",
                    },
                  }}
                />
              ))
            }
          </Geographies>
          {data.map((country: any, index: number) => (
            <Marker key={index} coordinates={[country.lon, country.lat]}>
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
