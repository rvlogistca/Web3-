/**
 * 🦊 Módulo de Conexão com MetaMask
 */

// Estado da carteira
let estado = {
  conectado: false,
  endereco: null,
  provider: null
};

/**
 * Conectar carteira MetaMask
 */
export async function conectarCarteira() {
  try {
    // Verifica se MetaMask está instalado
    if (!window.ethereum) {
      alert("🦊 Instale a MetaMask para continuar!");
      return null;
    }

    // Solicita acesso à conta
    const contas = await window.ethereum.request({
      method: 'eth_requestAccounts'
    });

    const endereco = contas[0];
    
    // Atualiza estado
    estado.conectado = true;
    estado.endereco = endereco;
    estado.provider = window.ethereum;

    console.log("✅ Carteira conectada:", endereco);
    
    return { endereco };
  } catch (erro) {
    console.error("❌ Erro ao conectar:", erro);
    return null;
  }
}

/**
 * Desconectar carteira
 */
export function desconectarCarteira() {
  estado.conectado = false;
  estado.endereco = null;
  estado.provider = null;
  console.log("🦊 Carteira desconectada");
}

/**
 * Obter estado atual da carteira
 */
export function getEstadoCarteira() {
  return { ...estado };
}

// Escuta mudança de conta na MetaMask
if (window.ethereum) {
  window.ethereum.on('accountsChanged', (contas) => {
    if (contas.length === 0) {
      // Usuário desconectou
      desconectarCarteira();
      if (window.atualizarInterfaceDesconectada) {
        window.atualizarInterfaceDesconectada();
      }
    } else {
      // Usuário trocou de conta
      estado.endereco = contas[0];
      if (window.atualizarInterfaceConectada) {
        window.atualizarInterfaceConectada(estado.endereco);
      }
    }
  });
}
