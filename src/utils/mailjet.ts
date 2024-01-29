import Mailjet from 'node-mailjet'
import { envs } from '../config/envs'

const mailJet = new Mailjet({
  apiKey: envs.MAILJET_API_KEY,
  apiSecret: envs.MAILJET_SECRET_KEY
})

interface SendEmailProps {
  to: string
  name: string
  subject: string
  text: string
  html: string
}

export const sendEmail = async ({
  name, subject, text, to, html
}: SendEmailProps): Promise<void> => {
  const request = mailJet
    .post('send', { version: 'v3.1' })
    .request({
      Messages: [
        {
          From: {
            Email: 'petshop.info.cl@gmail.com',
            Name: 'Petshop'
          },
          To: [
            {
              Email: to,
              Name: name
            }
          ],
          Subject: subject,
          TextPart: text,
          HTMLPart: html
        }
      ]
    })

  await request
}
