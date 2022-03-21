import Image from 'next/image'

const NFTCard = (props: { nftID: number }) => {
    const { nftID } = props;
    const baseURL = "https://raw.githubusercontent.com/Dextavision/happy-nft/main/happy_nft_frontend/public/happyNFTs/happyNFT_";

    return(
        <div className="flip max-w-sm mx-auto rounded-xl sm:flex sm:items-center sm:space-y-0 shadow-slate-50/40 gradient-border shadow-inner">
            <div className="flip-content">
                <div className="flip-front flex items-center justify-center">
                    <p className="text-2xl">Hover to see your NFT</p>
                </div>
                <div className="flip-back flex items-center justify-center rounded-xl">
                    <Image src={baseURL + nftID.toString() + ".svg"} width={500} height={500} alt="NFT"></Image>
                </div>
            </div>
        </div>
    );
}

export default NFTCard;