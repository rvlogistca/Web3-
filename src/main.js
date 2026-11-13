/**
 * 🚀 Arquivo principal — Inicialização da Aplicação
 */

// Importa funções do módulo da carteira
import { conectarCarteira, desconectarCarteira, getEstadoCarteira } from './wallet.js';

// Torna funções disponíveis globalmente para uso nos botões HTML
window.conectarCarteira = conectarCarteira;
window.desconectarCarteira = desconectarCarteira;

/**
 * Inicializa a aplicação
 */
function inicializarApp() {
  console.log("✅ Aplicação Web3 inicializada");

  // Verifica se já há carteira conectada ao carregar a página
  const estado = getEstadoCarteira();
  if (estado.conectado) {
    console.log("✅ Carteira já conectada:", estado.endereco);
    atualizarInterfaceConectada(estado.endereco);
  } else {
    console.log("ℹ️ Nenhuma carteira conectada");
    atualizarInterfaceDesconectada();
  }
}

/**
 * Atualiza UI quando carteira está conectada
 */
export function atualizarInterfaceConectada(endereco) {
  const btnConectar = document.getElementById('btnConnect');
  const displayEndereco = document.getElementById('wAddr');
  const wStatus = document.getElementById('wStatus');
  
  if (btnConectar) {
    btnConectar.textContent = "✅ " + endereco.slice(0, 6) + "...";
    btnConectar.classList.add("on");
  }
  if (displayEndereco) {
    displayEndereco.textContent = endereco;
  }
  if (wStatus) {
    wStatus.textContent = "Conectado ✅";
  }
}

/**
 * Atualiza UI quando carteira está desconectada
 */
export function atualizarInterfaceDesconectada() {
  const btnConectar = document.getElementById('btnConnect');
  const displayEndereco = document.getElementById('wAddr');
  const wStatus = document.getElementById('wStatus');
  
  if (btnConectar) {
    btnConectar.textContent = "🦊 Conectar Carteira";
    btnConectar.classList.remove("on");
  }
  if (displayEndereco) {
    displayEndereco.textContent = "Não conectado";
  }
  if (wStatus) {
    wStatus.textContent = "Aguardando conexão...";
  }
}

// Inicializa quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", inicializarApp);
