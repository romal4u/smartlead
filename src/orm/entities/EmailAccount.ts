import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { EmailLogs } from './EmailLog'

enum EncryptionMethod {
  SSL = 'SSL',
  TLS = 'TLS',
  None = 'None',
}

@Entity()
export class EmailAccount {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  fromName: string

  @Column()
  fromEmail: string

  @Column()
  username: string

  @Column()
  password: string

  @Column()
  smtpHost: string

  @Column()
  smtpPort: number

  @Column({
    type: 'enum',
    enum: EncryptionMethod,
    default: EncryptionMethod.None,
  })
  smtpEncryption: EncryptionMethod

  @Column()
  messagesPerDay: number

  @Column()
  minTimeGap: number

  @Column()
  diffReplyToAddress: string

  @Column()
  imapUseDifferentAddress: boolean

  @Column()
  imapHost: string

  @Column()
  imapPort: number

  @Column({
    type: 'enum',
    enum: EncryptionMethod,
    default: EncryptionMethod.None,
  })
  imapEncryption: EncryptionMethod

  @Column()
  created_at: Date

  @Column()
  modified_at: Date

  @OneToMany(() => EmailLogs, (emailLog) => emailLog.account)
  emailLogs: EmailLogs[]
}
