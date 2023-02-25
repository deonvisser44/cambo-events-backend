import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateTableUsersAddColumnAuth0Id1677312263551
  implements MigrationInterface
{
  name = 'updateTableUsersAddColumnAuth0Id1677312263551';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "image_path"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "auth0_id" character varying(255)`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_5222bec366027bdf8b112120013" UNIQUE ("auth0_id")`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "image" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "image"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_5222bec366027bdf8b112120013"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "auth0_id"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "image_path" character varying NOT NULL`,
    );
  }
}
