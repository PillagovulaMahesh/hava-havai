import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Country {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    country_code_two: string;

    @Column()
    country_code_three: string;

    @Column()
    mobile_code: number;

    @Column()
    continent_id: number;
}
