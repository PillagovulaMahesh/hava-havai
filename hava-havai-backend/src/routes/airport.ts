import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Airport } from '../entity/Airport';

const router = Router();

router.get('/:iata_code', async (req: Request, res: Response) => {
  const { iata_code } = req.params;

  try {
    const airportRepository = getRepository(Airport);
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
