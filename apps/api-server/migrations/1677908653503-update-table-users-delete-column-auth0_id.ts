import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateTableUsersDeleteColumnAuth0Id1677908653503
  implements MigrationInterface
{
  name = 'updateTableUsersDeleteColumnAuth0Id1677908653503';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_5222bec366027bdf8b112120013"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "auth0_id"`);
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "name" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "primary_location" DROP NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "primary_location" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "auth0_id" character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_5222bec366027bdf8b112120013" UNIQUE ("auth0_id")`,
    );
  }
}
