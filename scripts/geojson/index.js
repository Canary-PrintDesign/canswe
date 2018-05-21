const inputFile = process.argv[2]
const csv = require('csvtojson');
const fs = require('fs');
const crypto = require('crypto');

class GeoJSON {
  constructor(features) {
    this.features = features;
    this.type = "FeatureCollection"
  }

  get toJson() {
    return {
      "features": this.feature.toJson,
      "type": this.type
    }
  }
}

class Feature {
  constructor(data) {
    this.type = "Feature";
    this.properties = new Properties(data);
    this.geometry = new Geometry(data);
    this.id = crypto.createHash('md5').update(data.dealer_name).digest('hex')
  }

  get toJson() {
    return {
      type: this.type,
      properties: this.properties,
      geometry: this.geometry
    }
  }
}

class Properties {
  constructor(data) {
    Object.keys(data).forEach((key) => {
      this[key] = data[key];
    });
  }
}

class Geometry {
  constructor(data) {
    this.coordinates = [parseFloat(data.longitude), parseFloat(data.latitude)];
    this.type = "Point"
  }
}

let features = [];

csv()
  .fromFile(inputFile)
  .on('json', (jsonObj) => {
    features.push(new Feature(jsonObj));
  })
  .on('done', (error) => {
    fs.writeFile('./geo-json.json', JSON.stringify(new GeoJSON(features)), (err) => {
      if (err) return console.error(err);

      console.info("Data saved", "./geo-json.json");
    });
  });
