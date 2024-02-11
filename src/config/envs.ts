import 'dotenv/config'
import { get } from 'env-var'

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  CLIENT_URL: get('CLIENT_URL').required().asString(),
  DATABASE_URL: get('DATABASE_URL').required().asString(),
  STRIPE_PUBLIC_KEY: get('STRIPE_PUBLIC_KEY').required().asString(),
  STRIPE_SECRET_KEY: get('STRIPE_SECRET_KEY').required().asString()
}
