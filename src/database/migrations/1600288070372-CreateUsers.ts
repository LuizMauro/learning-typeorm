import {MigrationInterface, QueryRunner, Table} from "typeorm";

export default class CreateUsers1600288070372 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: "use_users",
                    columns: [
                        {
                        name: 'useID',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                    },{
                        name: "useName",
                        type: 'varchar(100)',
                        isNullable: false
                    },{
                      name: "useEmail",
                      type: 'varchar(100)',
                      isNullable: false,
                      isUnique: true
                    },
                    {
                        name: "usePasswordHash",
                        type: "varchar",
                        isNullable: false
                    },{
                        name: "useDateCreated",
                        type: "timestamp",
                        default: "now()",
                    },{
                        name: "useDateUpdated",
                        type: "timestamp",
                        default: "now()",
                    }

                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('usu_Users');
    }

}
