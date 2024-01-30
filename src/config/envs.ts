import 'dotenv/config'
import { get } from 'env-var'

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  NODE_ENV: get('NODE_ENV').required().asString(),
  CLIENT_URL: get('CLIENT_URL').required().asString(),
  SECRET_KEY: get('SECRET_KEY').required().asString(),
  DATABASE_URL: get('DATABASE_URL').required().asString(),
  MAILJET_API_KEY: get('MAILJET_API_KEY').required().asString(),
  STRIPE_PUBLIC_KEY: get('STRIPE_PUBLIC_KEY').required().asString(),
  STRIPE_SECRET_KEY: get('STRIPE_SECRET_KEY').required().asString(),
  MAILJET_SECRET_KEY: get('MAILJET_SECRET_KEY').required().asString()
}
