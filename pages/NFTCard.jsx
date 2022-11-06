import React from "react";

const nftCard = ({ nft }) => {
  return (
    <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-t-lg"
          src={nft.media[0].gateway}
          alt={nft.ttitle}
        />
      </a>
      <div className="p-5">
        <a href="#">
          <h2 className="mb-2 text-2xl font-light tracking-tight text-gray-900 dark:text-white">
            {nft.title}
          </h2>
        </a>
        {/* <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {nft.description}
        </p> */}

        <p>
          {" "}
          TokenId:{" "}
          <span className="font-bold">
            {nft.id.tokenId.substr(nft.id.tokenId.length - 5)}
          </span>
        </p>
        <p>
          Contract Address:{" "}
          <span className="font-bold">
            {" "}
            {`${nft.contract.address.substr(
              0,
              4
            )}...${nft.contract.address.substr(
              nft.contract.address.length - 6
            )}`}
          </span>
        </p>
        {/* <a
          href="#"
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
       
       
        </a>
        <a
          href="#"
          className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
        
       
        </a> */}
      </div>
    </div>
  );
};

export default nftCard;
