import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import geo from '../json/geography.json'

const MapChart = ({ articlesByCountry, handleMarkerClicked }: { articlesByCountry: CountryCountData[], handleMarkerClicked: (country: CountryCountData) => void }) => {
  const renderMarker = (country: CountryCountData) => {
    if (
      Array.isArray(country.coords) &&
      country.coords.length === 2 &&
      typeof country.coords[0] === 'number' &&
      typeof country.coords[1] === 'number'
    ) {

      return (
        <Marker key={country.coords[0]} coordinates={country.coords} onClick={e => handleMarkerClicked(country)}>
          <circle
            r={Math.sqrt(country.count) * 3}
            fill="#FFFF00"
            stroke="#000000"
            strokeWidth={1}
            fillOpacity={1}
          />
        </Marker>
      );
    }
    return null;
  };

  return (
    <ComposableMap>
      <Geographies geography={geo}>
        {({ geographies }) => (
          <>
            {geographies.map(geo => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))}
            {articlesByCountry.map((country, i) => (
              renderMarker(country)
            ))}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};

export default MapChart;
