import { MigrationInterface, QueryRunner } from "typeorm";

export class cartItemEntity1690903458645 implements MigrationInterface {
    name = 'cartItemEntity1690903458645'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_entity" DROP CONSTRAINT "FK_68a5671a307c8772126f1d8329d"`);
        await queryRunner.query(`CREATE TABLE "cart_item_entity" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL, "cartId" integer, "bookId" integer, CONSTRAINT "PK_78ae62a20293127e6032c631762" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cart_entity" DROP COLUMN "bookId"`);
        await queryRunner.query(`ALTER TABLE "cart_item_entity" ADD CONSTRAINT "FK_eabcbd5dff337a605c509c85abf" FOREIGN KEY ("cartId") REFERENCES "cart_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_item_entity" ADD CONSTRAINT "FK_66356b82a8d458598b20f28f3d4" FOREIGN KEY ("bookId") REFERENCES "book_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_item_entity" DROP CONSTRAINT "FK_66356b82a8d458598b20f28f3d4"`);
        await queryRunner.query(`ALTER TABLE "cart_item_entity" DROP CONSTRAINT "FK_eabcbd5dff337a605c509c85abf"`);
        await queryRunner.query(`ALTER TABLE "cart_entity" ADD "bookId" integer`);
        await queryRunner.query(`DROP TABLE "cart_item_entity"`);
        await queryRunner.query(`ALTER TABLE "cart_entity" ADD CONSTRAINT "FK_68a5671a307c8772126f1d8329d" FOREIGN KEY ("bookId") REFERENCES "book_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
