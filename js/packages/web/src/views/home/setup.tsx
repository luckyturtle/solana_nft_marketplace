import { useConnection, useStore, useWalletModal, WalletSigner, notify } from '@oyster/common';
import { useWallet } from '@solana/wallet-adapter-react';
import {
  Button,
  Col,
  Row,
  Steps,
} from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { saveAdmin } from '../../actions/saveAdmin';
import { useMeta } from '../../contexts';
import { WhitelistedCreator } from '../../models/metaplex';
import { SetupVariables } from '../../components/SetupVariables';
import { WalletAdapter } from '@solana/wallet-adapter-base';
import useWindowDimensions from '../../utils/layout';

const { Step } = Steps;

export const SetupView = () => {
  const [isInitalizingStore, setIsInitalizingStore] = useState(false);
  const [step, setStep] = useState(0);
  const connection = useConnection();
  const { width } = useWindowDimensions();
  const { store } = useMeta();
  const { setStoreForOwner } = useStore();
  const history = useHistory();
  const wallet = useWallet();
  const { setVisible } = useWalletModal();
  const connect = useCallback(
    () => (wallet.wallet ? wallet.connect().catch() : setVisible(true)),
    [wallet.wallet, wallet.connect, setVisible],
  );
  const [storeAddress, setStoreAddress] = useState<string | undefined>();

  useEffect(() => {
    const getStore = async () => {
      if (wallet.publicKey) {
        const store = await setStoreForOwner(wallet.publicKey.toBase58());
        setStoreAddress(store);
      } else {
        setStoreAddress(undefined);
      }
    };
    getStore();
  }, [wallet.publicKey]);

  const initializeStore = async () => {
    if (!wallet.publicKey) {
      return;
    }

    setIsInitalizingStore(true);

    await saveAdmin(connection, wallet, true, [//false, [
      new WhitelistedCreator({
        address: wallet.publicKey.toBase58(),
        activated: true,
      }),
    ]);

    // TODO: process errors

    await setStoreForOwner(undefined);
    await setStoreForOwner(wallet.publicKey.toBase58());

    setStep(1);
    // history.push('/admin');
  };

  const premintNFTs = async () => {
    if (!wallet.publicKey) {
      return;
    }

    const key = wallet.publicKey.toBase58();
    const ownerKey = `${process.env.NEXT_PUBLIC_STORE_OWNER_ADDRESS}`;

    if (key !== ownerKey) {
      notify({
        message: 'Only store owner can mint!',
        type: 'error',
      });
      return;
    }

    history.push(`/art/create/7`);
  };

  return (
    <>
      {!wallet.connected && (
        <p>
          <Button type="primary" className="app-btn" onClick={connect}>
            Connect
          </Button>{' '}
          to configure store.
        </p>
      )}
      {wallet.connected && !store && (
        <>
          <p>Store is not initialized yet</p>
          <p>There must be some ◎ SOL in the wallet before initialization.</p>
          <p>
            After initialization, you will be able to manage the list of
            creators
          </p>

          <p>
            <Button
              className="app-btn"
              type="primary"
              loading={isInitalizingStore}
              onClick={initializeStore}
            >
              Init Store
            </Button>
          </p>
        </>
      )}
      {wallet.connected && store && (
        <>
          {/* <p>
            To finish initialization please copy config below into{' '}
            <b>packages/web/.env</b> and restart yarn or redeploy
          </p>
          <SetupVariables
            storeAddress={storeAddress}
            storeOwnerAddress={wallet.publicKey?.toBase58()}
          /> */}
          <p>
          Are you sure? This will post Solana Pogs to mainnet and pre-mint Sol pogs!
          </p>
          <p>
            <Button
              className="app-btn"
              type="primary"
              style={{ marginRight: '1rem' }}
              onClick={premintNFTs}
            >
              Continue
            </Button>
            <Button
              onClick={() => history.push('/admin')}
            >
              Cancel
            </Button>
          </p>
          <Row style={{ paddingTop: 50, width: '100%' }}>
            <Col span={24}>
              <Steps
                progressDot
                direction={width > 768 ? 'horizontal' : 'vertical'}
                current={step}
                style={{
                  width: 'fit-content',
                  margin: '0 auto 30px auto',
                  overflowX: 'auto',
                  maxWidth: '100%',
                }}
              >
                <Step title="Init" />
                <Step title="1th" />
                <Step title="2th" />
                <Step title="3th" />
                <Step title="4th" />
                <Step title="5th" />
                <Step title="6th" />
                <Step title="7th" />
                <Step title="8th" />
                <Step title="9th" />
              </Steps>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
