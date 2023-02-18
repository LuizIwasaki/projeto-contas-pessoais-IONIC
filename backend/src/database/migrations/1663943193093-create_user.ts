import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUser1663943193093 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //Realizar alterações: criar tabela, criar um novo atributo, deletar um atributo
    await queryRunner.createTable(
      new Table({
        name: "user",
        columns: [
          {
            name: "id",
            type: "integer",
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "nome",
            type: "varchar",
          },
          {
            name: "senha",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //Defazer as ações realizadas em UP
    await queryRunner.dropTable("user");
  }
}
