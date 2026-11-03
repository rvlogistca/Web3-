import { BrowserProvider } from "ethers";

let estadoLocal = {
  conectado: false,
  endereco: null,
  provider: null,
  signer: null,
};

export async function conectarCarteira() {
  if (!window.ethereum) {
    alert("⚠️ MetaMask não encontrada!\nInstale a extensão primeiro.");
    return null;
  }

  try {
    const contas = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    if (!contas.length) {
      alert("⚠️ Nenhuma conta foi autorizada.");
      return null;
    }

    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const endereco = await signer.getAddress();

    estadoLocal = { conectado: true, endereco, provider, signer };
    return { endereco, provider, signer };

  } catch (erro) {
    if (erro.code === 4001) {
      alert("⚠️ Você cancelou a conexão. Tente novamente.");
    } else {
      alert("Erro: " + erro.message);
    }
    return null;
  }
}

export function desconectarCarteira() {
  estadoLocal = { conectado: false, endereco: null, provider: null, signer: null };
}

if (typeof window !== "undefined" && window.ethereum) {
  window.ethereum.on("accountsChanged", (contas) => {
    if (contas.length === 0) {
      desconectarCarteira();
      location.reload();
    }
  });
  window.ethereum.on("chainChanged", () => location.reload());
}
