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
  console.log("🚀 Aplicação Web3 inicializada");
  
  // Verifica se já há carteira conectada ao carregar a página
  const estado = getEstadoCarteira();
  if (estado.conectado) {
    console.log("✅ Carteira já conectada:", estado.endereco);
    atualizarInterfaceConectada(estado.endereco);
  } else {
    console.log("🔌 Nenhuma carteira conectada");
    atualizarInterfaceDesconectada();
  }
}

/**
 * Atualiza UI quando carteira está conectada
 */
export function atualizarInterfaceConectada(endereco) {
  const btnConectar = document.querySelector('#btn-conectar');
  const btnDesconectar = document.querySelector('#btn-desconectar');
  const displayEndereco = document.querySelector('#endereco-carteira');
  
  if (btnConectar) btnConectar.style.display = 'none';
  if (btnDesconectar) btnDesconectar.style.display = 'inline-block';
  if (displayEndereco) displayEndereco.textContent = `✅ ${endereco.slice(0, 6)}...${endereco.slice(-4)}`;
}

/**
 * Atualiza UI quando carteira está desconectada
 */
export function atualizarInterfaceDesconectada() {
  const btnConectar = document.querySelector('#btn-conectar');
  const btnDesconectar = document.querySelector('#btn-desconectar');
  const displayEndereco = document.querySelector('#endereco-carteira');
  
  if (btnConectar) btnConectar.style.display = 'inline-block';
  if (btnDesconectar) btnDesconectar.style.display = 'none';
  if (displayEndereco) displayEndereco.textContent = '';
}

// Inicializa quando a página estiver pronta
document.addEventListener('DOMContentLoaded', inicializarApp);
