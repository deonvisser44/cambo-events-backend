import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateTableEventAlterColumnImage1677300442080
  implements MigrationInterface
{
  name = 'updateTableEventAlterColumnImage1677300442080';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event" RENAME COLUMN "image_path" TO "image"`,
    );
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "image"`);
    await queryRunner.query(`ALTER TABLE "event" ADD "image" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "image"`);
    await queryRunner.query(
      `ALTER TABLE "event" ADD "image" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" RENAME COLUMN "image" TO "image_path"`,
    );
  }
}
