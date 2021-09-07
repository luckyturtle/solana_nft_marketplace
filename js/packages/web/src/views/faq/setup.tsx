// import { useStore, useWalletModal } from '@oyster/common';
// import { useWallet } from '@solana/wallet-adapter-react';
import { Button } from 'antd';
// import { useCallback, useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useMeta } from '../../contexts';

export const SetupView = () => {
  // const { store } = useMeta();
  // const history = useHistory();
  // const wallet = useWallet();
  // const { setVisible } = useWalletModal();
  // const connect = useCallback(
  //   () => (wallet.wallet ? wallet.connect().catch() : setVisible(true)),
  //   [wallet.wallet, wallet.connect, setVisible],
  // );

  return (
    <>
      <h1 className="art-title">
        FAQ
      </h1>
      <h2>
        General Questions
      </h2>
      <br />
      <div className="info-header">Q: What is the Solarian NFT project?</div>
      <div className="info-content">A: We are the first generative on-chain NFTs on <a>Solana</a>: Solarian robots originating from Solaria Prime.</div>
      <br />
      <div className="info-header">Q: How many NFTs will you sell?</div>
      <div className="info-content">A: There will never be more than 10.000 Solarians.</div>
      <br />
    </>
  );
};
