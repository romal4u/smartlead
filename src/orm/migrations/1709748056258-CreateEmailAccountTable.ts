import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateEmailAccountTable1709748056258 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'email_account',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'fromName', type: 'varchar' },
          { name: 'fromEmail', type: 'varchar' },
          { name: 'username', type: 'varchar', isUnique: true },
          { name: 'password', type: 'varchar' },
          { name: 'smtpHost', type: 'varchar' },
          { name: 'smtpPort', type: 'integer' },
          { name: 'smtpEncryption', type: 'enum', enum: ['SSL', 'TLS', 'None'], default: "'None'" },
          { name: 'messagesPerDay', type: 'integer' },
          { name: 'minTimeGap', type: 'integer' },
          { name: 'diffReplyToAddress', type: 'varchar', default: null },
          { name: 'imapUseDifferentAddress', type: 'boolean', default: false },
          { name: 'imapHost', type: 'varchar' },
          { name: 'imapPort', type: 'integer' },
          { name: 'imapEncryption', type: 'enum', enum: ['SSL', 'TLS', 'None'], default: "'None'" },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'modified_at',
            type: 'timestamp',
            default: 'now()',
            onUpdate: 'now()',
          },
        ],
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('email_account')
  }
}
