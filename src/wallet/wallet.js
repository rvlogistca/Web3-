// Verifica se MetaMask/provedor está disponível
export function initWallet() {
  return typeof window !== 'undefined' && !!window.ethereum
}

// Conecta a carteira e retorna o endereço ou null
export async function connectWallet() {
  if (!initWallet()) return null

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts'
    })
    return accounts[0] || null
  } catch (err) {
    // Usuário negou conexão ou erro de rede
    console.warn('Erro ao conectar carteira:', err.message)
    return null
  }
}

// Opcional: Trocar de rede automaticamente
export async function switchNetwork(chainId = '0x1') {
  if (!initWallet()) return false
  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }]
    })
    return true
  } catch (err) {
    console.warn('Rede indisponível:', err)
    return false
  }
}
