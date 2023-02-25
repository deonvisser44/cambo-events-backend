import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateTableEventAlterColumnCategory1677301545587
  implements MigrationInterface
{
  name = 'updateTableEventAlterColumnCategory1677301545587';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "category" SET DEFAULT '{}'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event" ALTER COLUMN "category" DROP DEFAULT`,
    );
  }
}
