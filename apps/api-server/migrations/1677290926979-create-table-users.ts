import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableUsers1677290926979 implements MigrationInterface {
  name = 'createTableUsers1677290926979';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" 
      ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, 
      "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, 
      "name" character varying NOT NULL, 
      "email" character varying NOT NULL, 
      "image_path" character varying NOT NULL, 
      "primary_location" jsonb NOT NULL, 
      CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
