import { MigrationInterface, QueryRunner } from 'typeorm'

export class AlterLogTableAddTrackColumn1709792032170 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('Alter table send_email_log add is_open tinyint(1) default 0')
    await queryRunner.query('Alter table send_email_log add emailHash varchar(100) default NULL')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
