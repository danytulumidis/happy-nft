import type { NextPage } from 'next'
import Head from 'next/head'
import { BigNumber, Contract, ethers, providers, utils } from "ethers";
import InfoCard from '../components/InfoCard'
import NFTCard from '../components/NFTCard';

const Home: NextPage = () => {
  return (
    <div className="bg-gradient-to-t from-gray-900 to-cyan-800 text-white">
      <Head>
        <title>Happy NFT Collection</title>
        <meta name="description" content="Welcome to the Happy NFT collection!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col justify-around items-center min-h-screen">
        <h1 className="text-9xl pb-2 font-extrabold bg-clip-text text-transparent bg-gradient-to-r  from-violet-500 to-orange-500">Happy NFT Collection</h1>

        <div className="flex flex-col items-center">
          <button className="px-9 py-5 text-2xl text-orange-600 font-semibold border border-orange-200 hover:text-white hover:bg-orange-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-orange-600 focus:ring-offset-2 transition hover:-translate-y-2 duration-300 ease-in-out hover:scale-100 shadow-inner shadow-slate-50/50">Mint NFT</button>
          <p className="text-gray-400">One NFT per Address</p>
        </div>
        <div className="flex flex-col items-center">
          <h2 className="bg-clip-text text-transparent bg-gradient-to-r  from-violet-500 to-orange-500 font-semibold">Your Happy NFT</h2>
          <NFTCard nftAddress="" />
        </div>
        <div className="flex flex-row gap-10">
          <InfoCard info="NFTs minted" tokenAmount={1}/>
          <InfoCard info="Maximum NFTs" tokenAmount={1}/>
        </div>
      </main>

      <footer className="absolute inset-x-0 bottom-0">
        <p className="font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-orange-500  max-w-full w-80 mx-auto text-center">Made with &#10084; by Dany Tulumidis</p>
      </footer>
    </div>
  )
}

export default Home
