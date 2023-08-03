import type { MigrationInterface, QueryRunner } from 'typeorm';

export class pointsAdded1690566194652 implements MigrationInterface {
  name = 'pointsAdded1690566194652';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ADD "points" integer NOT NULL DEFAULT '100'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "points"`);
  }
}
