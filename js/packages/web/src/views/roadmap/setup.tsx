// import { useStore, useWalletModal } from '@oyster/common';
// import { useWallet } from '@solana/wallet-adapter-react';
import { Row, Button, Col, Card, Layout } from 'antd';
import { CheckOutlined } from '@ant-design/icons';
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

  const { Content } = Layout

  return (
    <>
      <h1 className="art-title">
        SOLANA POG ROADMAP
      </h1>
      <Card>
        <h2>
          MAY 2021
        </h2>
      </Card>
      <div className="auction-container" style={{marginBottom: '3rem', maxWidth: '50%'}}>
        <Content>
          <Row>
            <Col span={4} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <CheckOutlined />
            </Col>
            <Col span={20}>
            <div style={{ width: '100%' }}>
              <>
                <div
                  className="info-header"
                  style={{
                    margin: '12px 0',
                    fontSize: 18,
                  }}
                >
                Finish all 1800 robot parts.
                </div>
              </>
            </div>
            </Col>
          </Row>
        </Content>
      </div>
      <Card>
        <h2>
          JUNE 2021
        </h2>
      </Card>
      <div className="auction-container" style={{marginBottom: '3rem', maxWidth: '50%'}}>
        <Content>
          <Row>
            <Col span={4} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <CheckOutlined />
            </Col>
            <Col span={20}>
            <div style={{ width: '100%' }}>
              <>
                <div
                  className="info-header"
                  style={{
                    margin: '12px 0',
                    fontSize: 18,
                  }}
                >
                Provide escrow marketplace via smart contract. Holders earn a share of txn fees.
                </div>
              </>
            </div>
            </Col>
          </Row>
        </Content>
      </div>
      <Card>
        <h2>
          AUGUST 2021
        </h2>
      </Card>
      <div className="auction-container" style={{marginBottom: '3rem', maxWidth: '50%'}}>
        <Content>
          <Row>
            <Col span={4} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <CheckOutlined />
            </Col>
            <Col span={20}>
            <div style={{ width: '100%' }}>
              <>
                <div
                  className="info-header"
                  style={{
                    margin: '12px 0',
                    fontSize: 18,
                  }}
                >
                Set up a general NFT marketplace for Solana.
                </div>
              </>
            </div>
            </Col>
          </Row>
        </Content>
      </div>
      <div className="auction-container" style={{marginBottom: '3rem', maxWidth: '40%'}}>
        <div
          className="info-header"
          style={{
            margin: '12px 0',
            fontSize: 18,
          }}
        >
          <h2>
          THE FUTURE IS GLORIOUS
          </h2>
        </div>
      </div>
      <Button
        type="primary"
        size="large"
        className="action-btn"
        style={{ marginTop: 20, maxWidth: '50%' }}
      >
      MINT SUCCESSFULLY COMPLETED!
      </Button>
    </>
  );
};
