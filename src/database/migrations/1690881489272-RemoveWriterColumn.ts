import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveWriterColumn1690881489272 implements MigrationInterface {
    name = 'RemoveWriterColumn1690881489272'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_entity" DROP COLUMN "writer"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_entity" ADD "writer" character varying NOT NULL`);
    }

}
