// import { useConnection, useStore, useWalletModal, WalletSigner } from '@oyster/common';
// import { useWallet } from '@solana/wallet-adapter-react';
import {
  Button,
  Row,
  Col,
  Layout,
  Space,
} from 'antd';
import { ArtCard } from '../../components/ArtCard';
import Masonry from 'react-masonry-css';
import { CardLoader } from '../../components/MyLoader';
import { CheckOutlined } from '@ant-design/icons';
import { useCallback, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { saveAdmin } from '../../actions/saveAdmin';
import { useMeta } from '../../contexts';
import { SP } from 'next/dist/next-server/lib/utils';
const { Content } = Layout;

// import { WhitelistedCreator } from '../../models/metaplex';
// import { SetupVariables } from '../../components/SetupVariables';
// import { WalletAdapter } from '@solana/wallet-adapter-base';

export const SetupView = () => {
  // const [isInitalizingStore, setIsInitalizingStore] = useState(false);
  // const connection = useConnection();
  const { store } = useMeta();
  // const { setStoreForOwner } = useStore();
  const { metadata, isLoading } = useMeta();
  const history = useHistory();
  // const wallet = useWallet();
  // const { setVisible } = useWalletModal();
  // const connect = useCallback(
  //   () => (wallet.wallet ? wallet.connect().catch() : setVisible(true)),
  //   [wallet.wallet, wallet.connect, setVisible],
  // );
  // const [storeAddress, setStoreAddress] = useState<string | undefined>();

  // useEffect(() => {
  //   const getStore = async () => {
  //     if (wallet.publicKey) {
  //       const store = await setStoreForOwner(wallet.publicKey.toBase58());
  //       setStoreAddress(store);
  //     } else {
  //       setStoreAddress(undefined);
  //     }
  //   };
  //   getStore();
  // }, [wallet.publicKey]);

  // const initializeStore = async () => {
  //   if (!wallet.publicKey) {
  //     return;
  //   }

  //   setIsInitalizingStore(true);

  //   await saveAdmin(connection, wallet, false, [
  //     new WhitelistedCreator({
  //       address: wallet.publicKey.toBase58(),
  //       activated: true,
  //     }),
  //   ]);

  //   // TODO: process errors

  //   await setStoreForOwner(undefined);
  //   await setStoreForOwner(wallet.publicKey.toBase58());

  //   history.push('/admin');
  // };
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  
  const items = metadata;

  const artworkGrid = (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {!isLoading
        ? items.map((m, idx) => {
            const id = m.pubkey;
            return (
              <Link to={`/art/${id}`} key={idx}>
                <ArtCard
                  key={id}
                  pubkey={m.pubkey}
                  preview={false}
                  height={250}
                  width={250}
                />
              </Link>
            );
          })
        : [...Array(10)].map((_, idx) => <CardLoader key={idx} />)}
    </Masonry>
  );

  return (
    <>
      <Content style={{width: '100%'}}>
      {/* <Card title={"Title"}>Value</Card>
      <CheckOutlined /> */}
      <Row>
        <Col span={14}>
          <div className="auction-container" style={{ margin: 0 }}>
            <div style={{ width: '100%', marginTop: '2rem' }}>
              <>
                <h1 className="art-subtitle">
                  These are Solana Pogs.<br />
                  These are the furture.
                </h1>
                <p>
                We are the first generative on-chain NFTs on Solana: Solarian robots originating from Solaria Prime. When you purchase your Solarian, it will be assembled from 200 different traits/attributes with varying rarities based on the transaction hash.
                </p>
                <Button
                  type="primary"
                  size="large"
                  className="action-btn"
                  style={{ marginTop: 20 }}
                >
                MINT SUCCESSFULLY COMPLETED!
                </Button>
              </>
            </div>
          </div>
        </Col>
        <Col span={10}>
          <div style={{ width: '100%' }}>
            <div
              className="image-stack"
              style={{
                margin: '12px auto',
                fontSize: 18,
                width: '10rem',
                height: '10rem',
              }}
            >
              <div className="stack-item">
                <img className="item-img" src="http://visiontrader.chileracing.net/dist/Pogs/Backgrounds/background0.png"  />
              </div>
              <div className="stack-item">
                <img className="item-img" src="http://visiontrader.chileracing.net/dist/Pogs/Auras/aura4.png" />
              </div>
              <div className="stack-item">
                <img className="item-img" src="http://visiontrader.chileracing.net/dist/Pogs/Pogs/pog0.png" />
              </div>
              <div className="stack-item">
                <img className="item-img" src="http://visiontrader.chileracing.net/dist/Pogs/Patterns/pattern1a.png" />
              </div>
              <div className="stack-item">
                <img className="item-img" src="http://visiontrader.chileracing.net/dist/Pogs/Symbols/symbol1a.png" />
              </div>
              <div className="stack-item">
                <img className="item-img" src="http://visiontrader.chileracing.net/dist/Pogs/Textures/texture2.png" />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Col>
        <div className="auction-container" style={{ margin: 0, marginTop: '3rem' }}>
          <div style={{ width: '100%', marginTop: '2rem' }}>
            {artworkGrid}
          </div>
        </div>
      </Col>
      <Col style={{
        textAlign: 'center',
        marginTop: '1rem',
      }}>
      SOLANA POGS: The first NFTs on Solana!
      </Col>
      </Content>
    </>
  );
};
