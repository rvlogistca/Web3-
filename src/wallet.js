
import { BrowserProvider } from "ethers";

export async function conectarCarteira() {
  if (!window.ethereum) {
    throw new Error("MetaMask não encontrada.");
  }

  const contas = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  if (!contas.length) {
    throw new Error("Nenhuma conta autorizada.");
  }

  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return {
    endereco: await signer.getAddress(),
    provider,
    signer,
  };
}

export async function desconectarCarteira() {
  // A MetaMask não oferece desconexão programática.
  // Remova a sessão local da aplicação.
}
