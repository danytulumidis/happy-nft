export default function handler(req: any, res: any) {
    const tokenId = req.query.tokenId;
    const image_url =
      "https://raw.githubusercontent.com/Dextavision/happy-nft/main/happy_nft_frontend/public/happyNFTs/";

    res.status(200).json({
      name: "Happy NFT #" + tokenId,
      description: "Happy NFT, enjoy your NFT and your life!",
      image: image_url + tokenId + ".svg",
    });
  }