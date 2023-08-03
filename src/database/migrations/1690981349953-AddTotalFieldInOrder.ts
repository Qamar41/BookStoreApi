import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTotalFieldInOrder1690981349953 implements MigrationInterface {
    name = 'AddTotalFieldInOrder1690981349953'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "total" double precision NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "total"`);
    }

}
