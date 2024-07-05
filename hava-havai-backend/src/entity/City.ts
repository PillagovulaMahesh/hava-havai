import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from "typeorm";
import { Country } from "./Country";
import { Airport } from "./Airport";

@Entity()
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Country)
    @JoinColumn({ name: "country_id" })
    country: Country;

    @Column()
    is_active: boolean;

    @Column("decimal")
    lat: number;

    @Column("decimal")
    long: number;

    @OneToMany(() => Airport, airport => airport.city)
    airports: Airport[];
}
