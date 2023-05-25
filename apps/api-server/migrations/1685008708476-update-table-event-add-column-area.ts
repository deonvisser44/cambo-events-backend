import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateTableEventAddColumnArea1685008708476
  implements MigrationInterface
{
  name = 'updateTableEventAddColumnArea1685008708476';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event" ADD "area" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "area"`);
  }
}
