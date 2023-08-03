import { MigrationInterface, QueryRunner } from "typeorm";

export class TagEntity1690616283404 implements MigrationInterface {
    name = 'TagEntity1690616283404'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag_entity" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_98efc66e2a1ce7fa1425e21e468" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag_entity_books_book_entity" ("tag_entity_id" integer NOT NULL, "book_entity_id" integer NOT NULL, CONSTRAINT "PK_4d86a99548df78dd94241dde50a" PRIMARY KEY ("tag_entity_id", "book_entity_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_da165efac51e36b4d7d7896cd9" ON "tag_entity_books_book_entity" ("tag_entity_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_9a8e7eec9ef1906f8efae1c549" ON "tag_entity_books_book_entity" ("book_entity_id") `);
        await queryRunner.query(`CREATE TABLE "book_entity_tags_tag_entity" ("book_entity_id" integer NOT NULL, "tag_entity_id" integer NOT NULL, CONSTRAINT "PK_deb7ba3aa188ea7e93e9b206276" PRIMARY KEY ("book_entity_id", "tag_entity_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d90965c00b1e56256b961350d4" ON "book_entity_tags_tag_entity" ("book_entity_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_859fb3a1b657059bfcd2a83508" ON "book_entity_tags_tag_entity" ("tag_entity_id") `);
        await queryRunner.query(`ALTER TABLE "tag_entity_books_book_entity" ADD CONSTRAINT "FK_da165efac51e36b4d7d7896cd92" FOREIGN KEY ("tag_entity_id") REFERENCES "tag_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tag_entity_books_book_entity" ADD CONSTRAINT "FK_9a8e7eec9ef1906f8efae1c5492" FOREIGN KEY ("book_entity_id") REFERENCES "book_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_entity_tags_tag_entity" ADD CONSTRAINT "FK_d90965c00b1e56256b961350d4c" FOREIGN KEY ("book_entity_id") REFERENCES "book_entity"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_entity_tags_tag_entity" ADD CONSTRAINT "FK_859fb3a1b657059bfcd2a835089" FOREIGN KEY ("tag_entity_id") REFERENCES "tag_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_entity_tags_tag_entity" DROP CONSTRAINT "FK_859fb3a1b657059bfcd2a835089"`);
        await queryRunner.query(`ALTER TABLE "book_entity_tags_tag_entity" DROP CONSTRAINT "FK_d90965c00b1e56256b961350d4c"`);
        await queryRunner.query(`ALTER TABLE "tag_entity_books_book_entity" DROP CONSTRAINT "FK_9a8e7eec9ef1906f8efae1c5492"`);
        await queryRunner.query(`ALTER TABLE "tag_entity_books_book_entity" DROP CONSTRAINT "FK_da165efac51e36b4d7d7896cd92"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_859fb3a1b657059bfcd2a83508"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d90965c00b1e56256b961350d4"`);
        await queryRunner.query(`DROP TABLE "book_entity_tags_tag_entity"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9a8e7eec9ef1906f8efae1c549"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_da165efac51e36b4d7d7896cd9"`);
        await queryRunner.query(`DROP TABLE "tag_entity_books_book_entity"`);
        await queryRunner.query(`DROP TABLE "tag_entity"`);
    }

}
