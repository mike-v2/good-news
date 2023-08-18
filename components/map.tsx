import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker
} from "react-simple-maps";
import geo from '../json/geography.json'

const MapChart = ({ articlesByCountry }: { articlesByCountry: CountryCountData[] }) => {
  const renderMarker = (country: CountryCountData, i: number) => {
    if (
      Array.isArray(country.coords) &&
      country.coords.length === 2 &&
      typeof country.coords[0] === 'number' &&
      typeof country.coords[1] === 'number'
    ) {
      return (
        <Marker key={i} coordinates={country.coords}>
          <circle
            r={Math.sqrt(country.count) * 3}
            fill="#FF5722"
            stroke="#DF3702"
            strokeWidth={0.2}
            fillOpacity={0.4}
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
              renderMarker(country, i)
            ))}
          </>
        )}
      </Geographies>
    </ComposableMap>
  );
};

export default MapChart;
