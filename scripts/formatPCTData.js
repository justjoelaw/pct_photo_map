const fs = require('fs');

const filePath = '../frontend/public/waypoints/Full_PCT_Simplified.geojson';

fs.readFile(filePath, 'utf8', (err, fileData) => {
  if (err) {
    console.error('Error reading input JSON file:', err);
    return;
  }

  try {
    const data = JSON.parse(fileData);
    const coordinates = data.features[0].geometry.coordinates;
    const fomattedCoordinates = coordinates.map((item) => {
      return {
        latitude: item[1],
        longitude: item[0],
      };
    });

    const jsonData = JSON.stringify(fomattedCoordinates);

    const outputFilePath = './pct_markers.json';

    fs.writeFile(outputFilePath, jsonData, 'utf8', (err) => {
      if (err) {
        console.error('Error writing JSON file:', err);
      } else {
        console.log('JSON file has been saved.');
      }
    });
  } catch (error) {
    console.error('Error parsing input JSON:', error);
  }
});
