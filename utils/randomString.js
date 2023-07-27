import { readFile, writeFile } from 'fs/promises'
import crypto from 'crypto'
import path from 'path'

export const generateAndInjectRandomString = async (envVariable) => {
  const envFilePath = path.join(process.cwd(), '..', '.env')
  const existingEnvContent = (await readFile(envFilePath, { encoding: 'utf-8' })).toString()

  // Check if envVariable already exists
  const hasExistingRandomString = existingEnvContent.includes(envVariable)
  // Generate a new random string only if it doesn't already exist
  const randomString = hasExistingRandomString ? null : crypto.randomBytes(20).toString('hex')
  // Append the new variable to the existing content
  console.log(randomString)
  const newEnvContent = hasExistingRandomString
    ? existingEnvContent
    : `${existingEnvContent.trim()}\n${envVariable}=${randomString}`

  // Write the updated content back to the .env file
  await writeFile(envFilePath, newEnvContent, { encoding: 'utf-8' })
}
