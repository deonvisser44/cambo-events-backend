import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateTableEventsAddColumnCategories1677295565565
  implements MigrationInterface
{
  name = 'updateTableEventsAddColumnCategories1677295565565';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" ADD "category" text array`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "category"`);
  }
}
