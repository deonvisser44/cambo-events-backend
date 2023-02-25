import { MigrationInterface, QueryRunner } from 'typeorm';

export class createTableSavedEvents1677304419725 implements MigrationInterface {
  name = 'createTableSavedEvents1677304419725';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "saved_event" 
      ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), 
      "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
      "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), 
      "user_id" uuid NOT NULL, 
      "event_id" uuid NOT NULL, 
      CONSTRAINT "PK_507dafcd83e184e647ce16c5de1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "saved_event" ADD CONSTRAINT "FK_6ed2a8337605d9597b4be4bef7b" 
      FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "saved_event" ADD CONSTRAINT "FK_ff72a3841c7e764f287552fe6d2" 
      FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "saved_event" DROP CONSTRAINT "FK_ff72a3841c7e764f287552fe6d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "saved_event" DROP CONSTRAINT "FK_6ed2a8337605d9597b4be4bef7b"`,
    );
    await queryRunner.query(`DROP TABLE "saved_event"`);
  }
}
