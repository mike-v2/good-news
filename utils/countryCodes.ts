const countryData: CoordinateData[] = require('../json/country_coordinates.json');

function twoLetterCountryCodeToFullName(twoLetter: string): string {
  const entry = countryData.find(d => d.ISO.toLocaleLowerCase() === twoLetter);
  if (entry) {
    return entry.COUNTRY;
  }

  return '';
}

export { twoLetterCountryCodeToFullName }