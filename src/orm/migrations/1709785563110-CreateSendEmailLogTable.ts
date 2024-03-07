import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'

export class CreateSendEmailLogTable1709785563110 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'send_email_log',
        columns: [
          { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
          { name: 'account_id', type: 'int' },
          { name: 'to_email', type: 'varchar' },
          { name: 'subject', type: 'varchar' },
          { name: 'email_content', type: 'text' },
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

    await queryRunner.createForeignKey(
      'send_email_log',
      new TableForeignKey({
        columnNames: ['account_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'email_account',
        onDelete: 'CASCADE',
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
