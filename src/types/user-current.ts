export type UserCurrent = {
  name: string,
  email: string,
  id: string,
  balance: number,
  userAccess: Array<{ Access: { name: string } }>,
  token: string
}