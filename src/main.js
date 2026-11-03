import './style.css'
import { initWallet, connectWallet } from './wallet/wallet.js'

document.addEventListener('DOMContentLoaded', () => {
  initWallet()
  const connectBtn = document.getElementById('connectBtn')
  const status = document.getElementById('status')

  connectBtn.addEventListener('click', async () => {
    status.textContent = 'Conectando...'
    const address = await connectWallet()
    if (address) {
      status.textContent = '✅ Conectado!'
      document.getElementById('walletInfo').innerHTML = `Carteira:<br><small>${address}</small>`
    } else {
      status.textContent = '⚠️ Instale o MetaMask'
    }
  })
})
