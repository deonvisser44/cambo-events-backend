import { MigrationInterface, QueryRunner } from 'typeorm';

export class updateUserAndEventTablesOnDeleteActions1679102150380
  implements MigrationInterface
{
  name = 'updateUserAndEventTablesOnDeleteActions1679102150380';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "saved_event" DROP CONSTRAINT "FK_6ed2a8337605d9597b4be4bef7b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "saved_event" DROP CONSTRAINT "FK_ff72a3841c7e764f287552fe6d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_42ff6901a665b1c910fb11eead6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "saved_event" ADD CONSTRAINT "FK_6ed2a8337605d9597b4be4bef7b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "saved_event" ADD CONSTRAINT "FK_ff72a3841c7e764f287552fe6d2" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_42ff6901a665b1c910fb11eead6" FOREIGN KEY ("host_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "event" DROP CONSTRAINT "FK_42ff6901a665b1c910fb11eead6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "saved_event" DROP CONSTRAINT "FK_ff72a3841c7e764f287552fe6d2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "saved_event" DROP CONSTRAINT "FK_6ed2a8337605d9597b4be4bef7b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "event" ADD CONSTRAINT "FK_42ff6901a665b1c910fb11eead6" FOREIGN KEY ("host_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "saved_event" ADD CONSTRAINT "FK_ff72a3841c7e764f287552fe6d2" FOREIGN KEY ("event_id") REFERENCES "event"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "saved_event" ADD CONSTRAINT "FK_6ed2a8337605d9597b4be4bef7b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
