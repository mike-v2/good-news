const path = require("path");
const fs = require('fs');
const data = require('../json/country-centroids.json');

// @ts-ignore
const simplifiedData = data.features.map(feature => {
  return {
    ISO: feature.properties.ISO,
    COUNTRY: feature.properties.COUNTRY,
    coordinates: feature.geometry.coordinates
  };
});

const outputPath = path.join(__dirname, '../json/country_coordinates.json');

fs.writeFileSync(outputPath, JSON.stringify(simplifiedData, null, 2));

