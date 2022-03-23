import Image from 'next/image'
import { BASE_URL } from '../constants';

const NFTCard = (props: { nftID: number }) => {
    const { nftID } = props;
    const baseURL: string = BASE_URL;

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