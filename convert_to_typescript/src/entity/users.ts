import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column( { unique:true , length:32 , nullable:false } )
    username: string;

    @Column( {length:32 , nullable:false } )
    password: string;

    @Column( {length:32 , nullable:false } )
    email: string;

}
