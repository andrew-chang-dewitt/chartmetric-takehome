export async function getAccount(
  data: Array<Record<string, string>>,
  id: string
): Promise<void | Record<string, string>> {
  // all routes should have an `account_id` param
  // parse data for a match
  return data.filter((row) => row.account_id === id)[0]
}

export default {
  getAccount,
}
