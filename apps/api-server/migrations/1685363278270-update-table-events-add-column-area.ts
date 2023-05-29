import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateTableEventsAddColumnArea1685363278270
  implements MigrationInterface
{
  name = 'updateTableEventsAddColumnArea1685363278270';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event" ADD COLUMN "area" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "area"`);
  }
}
