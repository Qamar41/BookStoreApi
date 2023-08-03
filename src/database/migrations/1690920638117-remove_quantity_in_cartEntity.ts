import { MigrationInterface, QueryRunner } from "typeorm";

export class removeQuantityInCartEntity1690920638117 implements MigrationInterface {
    name = 'removeQuantityInCartEntity1690920638117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_entity" DROP CONSTRAINT "FK_8edda4b36869b45de9624747e8a"`);
        await queryRunner.query(`ALTER TABLE "cart_entity" DROP COLUMN "quantity"`);
        await queryRunner.query(`ALTER TABLE "cart_entity" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "cart_entity" ADD "owner" uuid`);
        await queryRunner.query(`ALTER TABLE "cart_entity" ADD CONSTRAINT "FK_fbb0131c2b4ea2cca040bbb4112" FOREIGN KEY ("owner") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_entity" DROP CONSTRAINT "FK_fbb0131c2b4ea2cca040bbb4112"`);
        await queryRunner.query(`ALTER TABLE "cart_entity" DROP COLUMN "owner"`);
        await queryRunner.query(`ALTER TABLE "cart_entity" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "cart_entity" ADD "quantity" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "cart_entity" ADD CONSTRAINT "FK_8edda4b36869b45de9624747e8a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
