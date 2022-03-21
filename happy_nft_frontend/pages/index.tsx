import type { NextPage } from 'next'
import Head from 'next/head'
import { BigNumber, Contract, ethers, providers, utils } from "ethers";
import InfoCard from '../components/InfoCard'
import Web3Modal from "web3modal";
import React, { useEffect, useRef, useState } from 'react';
import { abi, NFT_ADDRESS } from '../constants';
import NFTCard from '../components/NFTCard';
import LoadingSpinner from '../components/LoadingSpinner';

const Home: NextPage = () => {
  const zero = BigNumber.from(0);
  const [walletConnected, setWalletConnected] = useState(false);
  const [mintedNFTs, setMintedNFTs] = useState(zero);
  const [maximumNFTs, setMaximumNFTs] = useState(zero);
  const [loading, setLoading] = useState(false);
  const [nftID, setNftID] = useState(0);
  
  const web3ModalRef: any = useRef();

  const getUserNFT = async () => {
    try {
      const provider = await getProviderOrSigner();
      const happyNFTContract = new Contract(
        NFT_ADDRESS,
        abi,
        provider
      );
      
      const signer: any = await getProviderOrSigner(true);
      const userAddress = await signer.getAddress();

      const nftID = await happyNFTContract.ownerNFT(userAddress);

      setNftID(nftID);
    } catch (error) {
      console.log(error);
    }
  };

  const getNFTsMintedCount = async () => {
    try {
      const provider = await getProviderOrSigner();
      const happyNFTContract = new Contract(
        NFT_ADDRESS,
        abi,
        provider
      );
        
      const maxNFTCount = await happyNFTContract.maxSupply();
      
      setMaximumNFTs(maxNFTCount);
    } catch (error) {
      console.log(error);
    }
  };

  const getMintedNFTs = async () => {
    try {
      const provider = await getProviderOrSigner();
      const happyNFTContract = new Contract(
        NFT_ADDRESS,
        abi,
        provider
      );
        
      const mintedNFTs = await happyNFTContract.nftIds();
      
      setMintedNFTs(mintedNFTs);
    } catch (error) {
      console.log(error);
    }
  };

  const mintNFT = async () => {
    try {
      const signer = await getProviderOrSigner(true);
      const happyNFTContract = new Contract(
        NFT_ADDRESS,
        abi,
        signer
      );

      const tx = await happyNFTContract.mint({
        value: utils.parseEther("0.01"),
      });

      setLoading(true);
      await tx.wait();
      setLoading(false);

    } catch (err) {
      console.error(err);
    }
  };

  const getProviderOrSigner = async (needSigner: boolean = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Rinkeby network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Change the network to Rinkeby");
      throw new Error("Change network to Rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  const connectWallet = async () => {
    try {
      await getProviderOrSigner();
      setWalletConnected(true);
    } catch(error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(!walletConnected) {
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      setLoading(true);
      
      connectWallet();
      getNFTsMintedCount();
      getMintedNFTs();
      getUserNFT();

      setLoading(false);
    }
  },[walletConnected]);

  return (
    <div className="bg-gradient-to-t from-gray-900 to-cyan-800 text-white">
      <Head>
        <title>Happy NFT Collection</title>
        <meta name="description" content="Welcome to the Happy NFT collection!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-around items-center min-h-screen">
        <h1 className="text-9xl pb-2 font-extrabold bg-clip-text text-transparent bg-gradient-to-r  from-violet-500 to-orange-500">Happy NFT Collection</h1>
        <p className="text-2xl text-glow">5 limited Happy NFTs to show your happiness to the world!</p>

        <div className="flex flex-col items-center">
          <button className="px-9 py-5 text-2xl text-orange-600 font-semibold border border-orange-200 hover:text-white hover:bg-orange-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 transition hover:-translate-y-2 duration-300 ease-in-out hover:scale-100 shadow-inner shadow-slate-50/50">Mint NFT</button>
          <p className="text-gray-400">One NFT per Address</p>
        </div>
        {
          loading ? <LoadingSpinner /> :
          <React.Fragment>
            <div className="flex flex-col items-center">
              <h2 className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-orange-500 font-semibold">Your Happy NFT</h2>
              <NFTCard nftID={nftID} />
            </div>
              <div className="flex flex-row gap-10">
                <InfoCard info="NFTs minted" tokenAmount={mintedNFTs.toNumber()}/>
                <InfoCard info="Maximum NFTs" tokenAmount={maximumNFTs.toNumber()}/>
              </div>
          </React.Fragment>
        }
      </main>

      <footer className="absolute inset-x-0 bottom-0">
        <p className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-orange-500  max-w-full w-80 mx-auto text-center">Made with &#10084; by Dany Tulumidis</p>
      </footer>
    </div>
  )
}

export default Home
