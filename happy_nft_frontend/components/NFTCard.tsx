import Image from 'next/image'

const NFTCard = (props: { nftAddress: string }) => {
    const { nftAddress } = props;

    return(
        <div className="flip max-w-sm mx-auto rounded-xl sm:flex sm:items-center sm:space-y-0 shadow-slate-50/40 gradient-border shadow-inner">
            <div className="flip-content">
                <div className="flip-front flex items-center">
                    <p className="text-2xl">Hover to see your NFT</p>
                </div>
                <div className="flip-back flex items-center justify-center">
                    <Image src="/../happyNFTs/happyNFT_1.svg" width={500} height={500} alt="NFT"></Image>
                </div>
            </div>
        </div>
    );
}

export default NFTCard;