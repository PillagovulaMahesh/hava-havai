import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { Airport } from "./entity/Airport";
import { City } from "./entity/City";
import { Country } from "./entity/Country";

createConnection().then(async connection => {
  const app = express();
  app.use(express.json());

  app.get('/airport/:iata_code', async (req, res) => {
    const iata_code = req.params.iata_code;
    const airportRepository = connection.getRepository(Airport);

    const airport = await airportRepository.findOne({
      where: { iata_code },
      relations: ["city", "city.country"]
    });

    if (!airport) {
      return res.status(404).json({ error: "Airport not found" });
    }

    const response = {
      airport: {
        id: airport.id,
        icao_code: airport.icao_code,
        iata_code: airport.iata_code,
        name: airport.name,
        type: airport.type,
        latitude_deg: airport.latitude_deg,
        longitude_deg: airport.longitude_deg,
        elevation_ft: airport.elevation_ft,
        address: {
          city: {
            id: airport.city.id,
            name: airport.city.name,
            country_id: airport.city.country_id,
            is_active: airport.city.is_active,
            lat: airport.city.lat,
            long: airport.city.long
          },
          country: airport.city.country ? {
            id: airport.city.country.id,
            name: airport.city.country.name,
            country_code_two: airport.city.country.country_code_two,
            country_code_three: airport.city.country.country_code_three,
            mobile_code: airport.city.country.mobile_code,
            continent_id: airport.city.country.continent_id
          } : null
        }
      }
    };

    res.json(response);
  });

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });
}).catch(error => console.log(error));
