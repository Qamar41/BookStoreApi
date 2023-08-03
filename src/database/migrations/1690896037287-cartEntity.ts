import { MigrationInterface, QueryRunner } from "typeorm";

export class cartEntity1690896037287 implements MigrationInterface {
    name = 'cartEntity1690896037287'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."cart_entity_status_enum" AS ENUM('PENDING', 'COMPLETED', 'CANCELLED')`);
        await queryRunner.query(`CREATE TABLE "cart_entity" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "status" "public"."cart_entity_status_enum" NOT NULL DEFAULT 'PENDING', "bookId" integer, "userId" uuid, CONSTRAINT "PK_7ec8a182dc29da3b1df23408149" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cart_entity" ADD CONSTRAINT "FK_68a5671a307c8772126f1d8329d" FOREIGN KEY ("bookId") REFERENCES "book_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_entity" ADD CONSTRAINT "FK_8edda4b36869b45de9624747e8a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_entity" DROP CONSTRAINT "FK_8edda4b36869b45de9624747e8a"`);
        await queryRunner.query(`ALTER TABLE "cart_entity" DROP CONSTRAINT "FK_68a5671a307c8772126f1d8329d"`);
        await queryRunner.query(`DROP TABLE "cart_entity"`);
        await queryRunner.query(`DROP TYPE "public"."cart_entity_status_enum"`);
    }

}
