export function initWallet() {
  return typeof window !== 'undefined' && !!window.ethereum
}

export async function connectWallet() {
  if (!initWallet()) return null
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    return accounts[0] || null
  } catch (err) {
    console.warn('Erro:', err)
    return null
  }
}
