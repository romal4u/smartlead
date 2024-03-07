import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { EmailAccount } from './EmailAccount'

@Entity({ name: 'send_email_log' })
export class EmailLogs {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  account_id: number

  @Column()
  emailHash: string

  @ManyToOne(() => EmailAccount)
  @JoinColumn({ name: 'account_id' })
  account: EmailAccount

  @Column()
  to_email: string

  @Column()
  subject: string

  @Column()
  email_content: string

  @Column()
  is_open: number

  @Column()
  created_at: Date

  @Column()
  modified_at: Date
}
