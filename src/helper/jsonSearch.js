const recursiveHelper = (field, country, searchTerm) => {
  // case field is string or number
  if (typeof field === 'number' || 'string') {
    const formattedField = field.toString().toLowerCase();
    const formattedSearchTerm = searchTerm.toString().toLowerCase();
    const res = formattedField.includes(formattedSearchTerm); 
    if (res) {
      return country;
    } else {
      return false;
    }
  }

  // case : field is array
  if (typeof field === 'object' && Array.isArray(field)) {
    field.forEach((item) => {
      recursiveHelper(item, country, searchTerm);
    });
  }

  // case: field is object
  if (typeof field === 'object' && field !== null && !Array.isArray(field)) {
    const fieldArr = Object.values(field);
    fieldArr.forEach((item) => {
      recursiveHelper(item, country, searchTerm);
    });
  }
};

export function findCountry(searchTerm, countries) {
  const foundedCountries = [];

  for (const country of countries) {
    const countryArr = Object.values(country);
    for (const field of countryArr) {
      const res = recursiveHelper(field, country, searchTerm);
      if (res) {
        const sameCheck = foundedCountries.some(
          (item) => item.name === res.name
        );
        if (!sameCheck) {
          foundedCountries.push(res);
        }
      }
    }
  }

  return foundedCountries;
}
