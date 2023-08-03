import { MigrationInterface, QueryRunner } from "typeorm";

export class bookEntity1690615942480 implements MigrationInterface {
    name = 'bookEntity1690615942480'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_settings" DROP CONSTRAINT "FK_19f4e08665a1f4bbbb7d5631f35"`);
        await queryRunner.query(`CREATE TABLE "book_entity" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "writer" character varying NOT NULL, "price" integer NOT NULL, "cover_image" character varying NOT NULL, "writer_user_id" uuid, CONSTRAINT "PK_3ea5638ccafa8799838e68fad46" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_settings" ADD CONSTRAINT "FK_4ed056b9344e6f7d8d46ec4b302" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_entity" ADD CONSTRAINT "FK_aa7f331c9ddcfaa21c4c3096e6f" FOREIGN KEY ("writer_user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_entity" DROP CONSTRAINT "FK_aa7f331c9ddcfaa21c4c3096e6f"`);
        await queryRunner.query(`ALTER TABLE "user_settings" DROP CONSTRAINT "FK_4ed056b9344e6f7d8d46ec4b302"`);
        await queryRunner.query(`DROP TABLE "book_entity"`);
        await queryRunner.query(`ALTER TABLE "user_settings" ADD CONSTRAINT "FK_19f4e08665a1f4bbbb7d5631f35" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
