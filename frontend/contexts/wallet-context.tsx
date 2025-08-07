"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { ethers } from "ethers";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface WalletContextProps {
  address: string | null;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  showInstallModal: boolean;
  closeInstallModal: () => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [showInstallModal, setShowInstallModal] = useState(false);

  const connectWallet = useCallback(async () => {
    setIsConnecting(true);
    try {
      if (!(window as any).ethereum) {
        setShowInstallModal(true);
        setIsConnecting(false);
        return;
      }
      const provider = new ethers.BrowserProvider((window as any).ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
        toast({
          title: "✅ Wallet connected",
          description: `Connected: ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
        });
      } else {
        toast({
          title: "❌ Wallet connection failed",
          description: "No accounts found.",
        });
      }
    } catch (err) {
      toast({
        title: "❌ Wallet connection failed",
        description: (err as Error).message || "Unknown error",
      });
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setAddress(null);
  }, []);

  const closeInstallModal = () => setShowInstallModal(false);

  return (
    <WalletContext.Provider value={{ address, isConnecting, connectWallet, disconnectWallet, showInstallModal, closeInstallModal }}>
      {children}
      <Dialog open={showInstallModal} onOpenChange={setShowInstallModal}>
        <DialogContent className="z-[9999]">
          <DialogHeader>
            <DialogTitle>MetaMask Not Detected</DialogTitle>
            <DialogDescription>
              To use wallet features, you need to install the MetaMask extension in your browser.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button asChild variant="outline">
              <a href="https://metamask.io/download.html" target="_blank" rel="noopener noreferrer">
                Download MetaMask
              </a>
            </Button>
            <Button variant="secondary" onClick={closeInstallModal}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
