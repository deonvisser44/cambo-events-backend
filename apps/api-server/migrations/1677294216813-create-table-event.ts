import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableEvent1677294216813 implements MigrationInterface {
  name = 'createTableEvent1677294216813';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "event" 
      ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, 
      "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL, 
      "host_id" uuid NOT NULL, 
      "name" character varying NOT NULL, 
      "description" character varying NOT NULL, 
      "start_date" TIMESTAMP WITH TIME ZONE NOT NULL, 
      "end_date" TIMESTAMP WITH TIME ZONE NOT NULL, 
      "image_path" character varying NOT NULL, 
      "location" jsonb NOT NULL, 
      CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_42ff6901a665b1c910fb11eead6" 
      FOREIGN KEY ("host_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_42ff6901a665b1c910fb11eead6"`,
    );
    await queryRunner.query(`DROP TABLE "event"`);
  }
}
