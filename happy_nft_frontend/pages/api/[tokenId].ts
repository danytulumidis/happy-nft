export default function handler(req: any, res: any) {
    const tokenId = req.query.tokenId;
    console.log(tokenId);
    
    const image_url =
      "https://raw.githubusercontent.com/Dextavision/happy-nft/main/happy_nft_frontend/public/happyNFTs/happyNFT_";

    res.status(200).json({
      name: "Happy NFT #" + tokenId,
      description: "Happy NFT, enjoy your NFT and your life!",
      image: image_url + tokenId + ".svg",
    });
  }