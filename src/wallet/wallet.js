/**
 * 🦊 Conexão com MetaMask / Web3
 * Gerencia conexão, desconexão e eventos da carteira
 */

import { BrowserProvider } from "ethers";

// Estado local da conexão
let estadoLocal = {
  conectado: false,
  endereco: null,
  provider: null,
  signer: null,
};

/**
 * Conecta a carteira MetaMask
 * @returns {Promise<{endereco: string, provider: BrowserProvider, signer: Signer}|null>}
 */
export async function conectarCarteira() {
  // Verifica se MetaMask está instalada
  if (!window.ethereum) {
    alert("⚠️ MetaMask não encontrada!\nInstale a extensão primeiro.");
    return null;
  }

  try {
    // Solicita acesso às contas
    const contas = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    if (!contas.length) {
      alert("⚠️ Nenhuma conta foi autorizada.");
      return null;
    }

    // Cria provider e signer
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const endereco = await signer.getAddress();

    // Atualiza estado
    estadoLocal = { conectado: true, endereco, provider, signer };
    console.log("✅ Carteira conectada:", endereco);
    
    return { endereco, provider, signer };

  } catch (erro) {
    // Tratamento de erros específicos
    if (erro.code === 4001) {
      alert("⚠️ Você cancelou a conexão. Tente novamente.");
    } else if (erro.code === -32002) {
      alert("⏳ Já existe uma solicitação pendente — verifique sua MetaMask.");
    } else {
      alert("❌ Erro: " + erro.message);
    }
    return null;
  }
}

/**
 * Desconecta a carteira e limpa o estado
 */
export function desconectarCarteira() {
  estadoLocal = { conectado: false, endereco: null, provider: null, signer: null };
  console.log("🔌 Carteira desconectada");
}

/**
 * Retorna o estado atual da conexão
 */
export function getEstadoCarteira() {
  return { ...estadoLocal };
}

/**
 * Escuta eventos da carteira
 */
if (typeof window !== "undefined" && window.ethereum) {
  // Conta trocada ou desconectada
  window.ethereum.on("accountsChanged", (contas) => {
    if (contas.length === 0) {
      desconectarCarteira();
      location.reload();
    }
  });

  // Rede trocada → recarrega para atualizar
  window.ethereum.on("chainChanged", () => location.reload());
}
