import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [currentWallet, setCurrentWallet] = useState("");
  useEffect(() => {
    checkIfWalletIsConnected(setCurrentWallet);
  }, []);

  return (
    <>
      <header className="px-4 bg-slate-100 text-black h-16 flex justify-between">
        <h1 className="text-xl flex flex-col justify-center">ScandalPrediction</h1>
        {currentWallet ? (
          <span className="flex flex-col justify-center">
            {currentWallet.substring(0, 6)}...
          </span>
        ) : (
          <button onClick={() => connectWallet(setCurrentWallet)}>
            wallet
          </button>
        )}
      </header>
      <Component {...pageProps} />
    </>
  );
}

const connectWallet = async (setCurrentWalet: (account: any) => void) => {
  try {
    const { ethereum } = window as any;
    if (!ethereum) {
      alert("Get wallet");
      return;
    }
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setCurrentWalet(accounts[0]);
  } catch (error) {
    console.log(error);
  }
};

const checkIfWalletIsConnected = async (
  setCurrentWallet: (account: any) => void
) => {
  try {
    const { ethereum } = window as any;
    console.log(ethereum || "Make sure you have MetaMask!");

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      console.log("Found an authorized account:", accounts[0]);
      setCurrentWallet(accounts[0]);
    } else {
      console.log("No authorized account found");
    }
  } catch (error) {
    console.log(error);
  }
};
