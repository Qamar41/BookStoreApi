import { MigrationInterface, QueryRunner } from "typeorm";

export class cartEnum1691056851155 implements MigrationInterface {
    name = 'cartEnum1691056851155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."cart_entity_status_enum" RENAME TO "cart_entity_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."cart_entity_status_enum" AS ENUM('PENDING', 'USED', 'CANCELLED')`);
        await queryRunner.query(`ALTER TABLE "cart_entity" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "cart_entity" ALTER COLUMN "status" TYPE "public"."cart_entity_status_enum" USING "status"::"text"::"public"."cart_entity_status_enum"`);
        await queryRunner.query(`ALTER TABLE "cart_entity" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`DROP TYPE "public"."cart_entity_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."cart_entity_status_enum_old" AS ENUM('PENDING', 'COMPLETED', 'CANCELLED')`);
        await queryRunner.query(`ALTER TABLE "cart_entity" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "cart_entity" ALTER COLUMN "status" TYPE "public"."cart_entity_status_enum_old" USING "status"::"text"::"public"."cart_entity_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "cart_entity" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`DROP TYPE "public"."cart_entity_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."cart_entity_status_enum_old" RENAME TO "cart_entity_status_enum"`);
    }

}
