import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderEntity1690970093837 implements MigrationInterface {
    name = 'OrderEntity1690970093837'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."order_entity_status_enum" AS ENUM('PENDING', 'PAID', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "order_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "order_customer" character varying NOT NULL, "status" "public"."order_entity_status_enum" NOT NULL DEFAULT 'PENDING', "customer" uuid, CONSTRAINT "PK_428b558237e70f2cd8462e1bea1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cart_item_entity" ADD "order_id" uuid`);
        await queryRunner.query(`ALTER TABLE "order_entity" ADD CONSTRAINT "FK_092395d8f97382a0eaeb967a89b" FOREIGN KEY ("customer") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_item_entity" ADD CONSTRAINT "FK_43f3c76c5bb1afc268a1d93a7e1" FOREIGN KEY ("order_id") REFERENCES "order_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_item_entity" DROP CONSTRAINT "FK_43f3c76c5bb1afc268a1d93a7e1"`);
        await queryRunner.query(`ALTER TABLE "order_entity" DROP CONSTRAINT "FK_092395d8f97382a0eaeb967a89b"`);
        await queryRunner.query(`ALTER TABLE "cart_item_entity" DROP COLUMN "order_id"`);
        await queryRunner.query(`DROP TABLE "order_entity"`);
        await queryRunner.query(`DROP TYPE "public"."order_entity_status_enum"`);
    }

}
