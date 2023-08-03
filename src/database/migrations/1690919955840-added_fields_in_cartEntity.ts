import { MigrationInterface, QueryRunner } from "typeorm";

export class addedFieldsInCartEntity1690919955840 implements MigrationInterface {
    name = 'addedFieldsInCartEntity1690919955840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_entity" ADD "cart_owner" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_entity" DROP COLUMN "cart_owner"`);
    }

}
