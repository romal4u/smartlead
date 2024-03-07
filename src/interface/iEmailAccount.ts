export interface iEmailAccountData {
  fromName: string
  fromEmail: string
  username: string
  password: string
  smtpHost: string
  smtpPort: number
  smtpEncryption: 'SSL' | 'TLS' | 'None'
  messagesPerDay: number
  minTimeGap: number
  diffReplyToAddress: string
  imapSettings: {
    imapUseDifferentAddress: boolean
    imapHost: string
    imapPort: number
    imapEncryption: 'SSL' | 'TLS' | 'None'
  }
}

export interface iEmailBody {
  to: string, 
  subject: string, 
  emailContent: string
}
