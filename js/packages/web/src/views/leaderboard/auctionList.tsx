import React, { useEffect, useState } from 'react';
import { ArtCard } from '../../components/ArtCard';
import {
  Layout,
  Row,
  Divider,
  Col,
  Card,
  Tabs,
  Tag,
  Pagination,
  Skeleton,
  List,
} from 'antd';
import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';
import { useCreatorArts, useUserArts } from '../../hooks';
import { useMeta } from '../../contexts';
import { ArtContent } from '../../components/ArtContent';
import { MetaAvatar } from '../../components/MetaAvatar';
import { CardLoader } from '../../components/MyLoader';
import { ViewOn } from '../../components/ViewOn';
import { useArt, useExtendedArt } from '../../hooks';
import { ArtType } from '../../types';
import { shortenAddress, useConnection } from '@oyster/common';
import { useWallet } from '@solana/wallet-adapter-react';

const { TabPane } = Tabs;

const { Content } = Layout;

export enum AuctionListViewState {
  Metaplex = '0',
  Owned = '1',
  Created = '2',
}

export const AuctionListView = () => {
  const { connected, publicKey } = useWallet();
  const ownedMetadata = useUserArts();
  const createdMetadata = useCreatorArts(publicKey?.toBase58() || '');
  const { metadata, isLoading } = useMeta();
  const [activeKey, setActiveKey] = useState(AuctionListViewState.Metaplex);
  const breakpointColumnsObj = {
    default: 1
  };

  const items =
      metadata;

  useEffect(() => {
    if (connected) {
      setActiveKey(AuctionListViewState.Owned);
    } else {
      setActiveKey(AuctionListViewState.Metaplex);
    }
  }, [connected, setActiveKey]);

  const artworkGrid = (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {!isLoading
        ? items.map((m, idx) => {
            const id = m.pubkey;
            const art = useArt(id);
            const { ref, data } = useExtendedArt(id);

            const description = data?.description;
            const attributes = data?.attributes;

            const tag = (
              <div className="info-header">
                <Tag color="blue">UNVERIFIED</Tag>
              </div>
            );

            const unverified = (
              <>
                {tag}
                <div style={{ fontSize: 12 }}>
                  <i>
                    This artwork is still missing verification from{' '}
                    {art.creators?.filter(c => !c.verified).length} contributors before it
                    can be considered verified and sellable on the platform.
                  </i>
                </div>
                <br />
              </>
            );                    

            let badge = '';
            if (art.type === ArtType.NFT) {
              badge = 'Unique';
            } else if (art.type === ArtType.Master) {
              badge = 'NFT 0';
            } else if (art.type === ArtType.Print) {
              badge = `${art.edition} of ${art.supply}`;
            }
                      
            return (
              <div className="auction-container" style={{marginBottom: '1rem'}}>
              <Row ref={ref} key={idx}>
                <Col xs={{ span: 24 }} md={{ span: 12 }} style={{ padding: '30px' }}>
                  <ArtContent
                    style={{ width: 300 }}
                    height={300}
                    width={300}
                    className="artwork-image"
                    pubkey={id}
                    active={true}
                    allowMeshRender={true}
                  />
                </Col>
                {/* <Divider /> */}
                <Col
                  xs={{ span: 24 }}
                  md={{ span: 12 }}
                  style={{ textAlign: 'left', fontSize: '1.4rem' }}
                >
                  <Row>
                    <div style={{ fontWeight: 700, fontSize: '4rem' }}>
                      {art.title || <Skeleton paragraph={{ rows: 0 }} />}
                    </div>
                  </Row>
                  <Row>
                    <Col span={6}>
                      <h6>Royalties</h6>
                      <div className="royalties">
                        {((art.seller_fee_basis_points || 0) / 100).toFixed(2)}%
                      </div>
                    </Col>
                    <Col span={12}>
                      <ViewOn id={id} />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h6 style={{ marginTop: 5 }}>Created By</h6>
                      <div className="creators">
                        {(art.creators || []).map((creator, idx) => {
                          return (
                            <div
                              key={idx}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: 5,
                              }}
                            >
                              <MetaAvatar creators={[creator]} size={64} />
                              <div>
                                <span className="creator-name">
                                  {creator.name ||
                                    shortenAddress(creator.address || '')}
                                </span>
                                <div style={{ marginLeft: 10 }}>
                                  {tag}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <h6 style={{ marginTop: 5 }}>Edition</h6>
                      <div className="art-edition">{badge}</div>
                    </Col>
                  </Row>
                </Col>
                <Col span="12">
                  <Divider />
                  {art.creators?.find(c => !c.verified) && unverified}
                  <br />
                  <div className="info-header">ABOUT THE CREATION</div>
                  <div className="info-content">{description}</div>
                  <br />
                </Col>
                <Col span="12">
                  {attributes && (
                    <>
                      <Divider />
                      <br />
                      <div className="info-header">Attributes</div>
                      <List size="large" grid={{ column: 4 }}>
                        {attributes.map(attribute => (
                          <List.Item>
                            <Card title={attribute.trait_type}>
                              {attribute.value}
                            </Card>
                          </List.Item>
                        ))}
                      </List>
                    </>
                  )}
                </Col>
              </Row>
              </div>
            );
          })
        : [...Array(10)].map((_, idx) => <CardLoader key={idx} />)}
    </Masonry>
  );

  return (
    <Layout style={{ margin: 0, alignItems: 'center' }}>
      <h1 className="art-title">
        Solana Pog Leaderboard
      </h1>
      <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Col style={{ width: '100%', marginTop: 10 }}>
          <Row>
            {artworkGrid}
          </Row>
        </Col>
      </Content>
      <Pagination
        defaultCurrent={1}
        total={200}
        showSizeChanger={false}
      />
    </Layout>
  );
};