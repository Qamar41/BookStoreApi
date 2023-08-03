import { MigrationInterface, QueryRunner } from "typeorm";

export class AddFieldInOrder1690983008450 implements MigrationInterface {
    name = 'AddFieldInOrder1690983008450'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "order_entity" DROP COLUMN "created_at"`);
    }

}
