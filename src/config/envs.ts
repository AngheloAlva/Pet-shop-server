import 'dotenv/config'
import { get } from 'env-var'

export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  NODE_ENV: get('NODE_ENV').required().asString(),
  CLIENT_URL: get('CLIENT_URL').required().asString(),
  DATABASE_URL: get('DATABASE_URL').required().asString()
}
