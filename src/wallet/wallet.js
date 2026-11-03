export function initWallet() {
  return !!window.ethereum
}

export async function connectWallet() {
  if (!window.ethereum) return null
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    return accounts[0]
  } catch {
    return null
  }
}
