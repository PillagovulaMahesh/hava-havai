import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { City } from "./City";

@Entity()
export class Airport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    icao_code: string;

    @Column()
    iata_code: string;

    @Column()
    name: string;

    @Column()
    type: string;

    @Column("decimal")
    latitude_deg: number;

    @Column("decimal")
    longitude_deg: number;

    @Column("int")
    elevation_ft: number;

    @ManyToOne(() => City, city => city.airports)
    @JoinColumn({ name: "city_id" })
    city: City;
}
