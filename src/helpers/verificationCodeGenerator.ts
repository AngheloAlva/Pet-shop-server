export function generateVerificationCode (lenght: number = 6): string {
  let code: string = ''
  const characters: string = '1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const charactersLength: number = characters.length

  for (let i = 0; i < lenght; i++) {
    code += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return code
}
