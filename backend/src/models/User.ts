import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("user")
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    nome: string;

    @Column()
    senha:  string;

    @Column()
    email: string;

    @Column()
    telefone: string;
}