import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import fetch from "node-fetch";
import NFTCard from "./NFTCard";

const Home = () => {
  const [walletAddr, setWalletAddr] = useState("");
  const [collection, setCollectionAddr] = useState("");
  const [NFTs, setNFTs] = useState([]);
  const [fetchForCollection, setFetchForCollection] = useState(false);

  const API_KEY = process.env.ALCHEMY_API_KEY;
  let nfts;

  const fetchNFTs = async () => {
    console.log("Fetching NFTs...");
    const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${API_KEY}/getNFTs`;

    // Example Address to fetch # 0xf323CbF22ADB495d5486F8385cC008C7BD418364
    if (!collection.length) {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };
      const fetchURL = `${baseURL}?owner=${walletAddr}`;

      nfts = await fetch(fetchURL, requestOptions)
        .then((response) => response.json())
        .catch((error) => console.log("error", error));
    } else {
      const fetchURL = `${baseURL}?owner=${walletAddr}&contractAddresess%5B%5D=${collection}`;

      nfts = await fetch(fetchURL, requestOptions)
        .then((response) => response.json())
        .catch((error) => console.log("error", error));
    }
    if (nfts) {
      console.log(nfts);
      setNFTs(nfts.ownedNfts);
    }
  };

  const fetchNFTsForCollection = async () => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    const baseURL = `https://eth-mainnet.alchemyapi.io/nft/v2/${API_KEY}/getNFTsForCollection`;

    const fetchURL = `${baseURL}?contractAddress=${collection}&withMetada=${"true"}`;

    nfts = await fetch(fetchURL, requestOptions)
      .then((response) => response.json())
      .catch((error) => console.log("error", error));

    if (nfts) {
      console.log(nfts);
      setNFTs(nfts.nfts);
    }
  };

  return (
    <>
      <div className="container mx-auto max-w-5xl mt-5 flex h-12">
        <input
          onChange={(e) => {
            setWalletAddr(e.target.value);
          }}
          value={walletAddr}
          type={"text"}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Add your wallter address"
        />
        <input
          onChange={(e) => {
            setCollectionAddr(e.target.value);
          }}
          value={collection}
          type={"text"}
          className="bg-gray-50  border mx-2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-2/3 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Add the collection address"
        />
        <div className="flex w-2/4">
          <label className="ml-2text-sm w-1/2 font-medium text-gray-400 dark:text-gray-500">
            <input
              type="checkbox"
              onChange={(e) => {
                setFetchForCollection(e.target.checked);
              }}
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            Check for Collection?
          </label>
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              fetchForCollection ? fetchNFTsForCollection() : fetchNFTs();
            }}
          >
            Find NFTs!
          </button>
        </div>
      </div>

      <div className="flex min-h-screen flex-col items-center justify-center py-2">
        <div className="grid grid-rows-4 mt-50 grid-flow-col gap-4">
          {NFTs.length > 0 &&
            NFTs.map((nft, index) => {
              return <NFTCard nft={nft} key={index} />;
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
