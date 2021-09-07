import React, { useEffect, useState } from 'react';
import { ArtCard } from '../../components/ArtCard';
import { Button, Layout, Row, Col, Card, Divider, Pagination, Select } from 'antd';
import Masonry from 'react-masonry-css';
import { Link } from 'react-router-dom';
import { useCreatorArts, useUserArts } from '../../hooks';
import { useMeta } from '../../contexts';
import { CardLoader } from '../../components/MyLoader';
import { useWallet } from '@solana/wallet-adapter-react';

const { Content } = Layout;
const { Option } = Select;

export enum ArtistViewState {
  Metaplex = '0',
  Owned = '1',
  Created = '2',
}

export const ArtistsView = () => {
  const { connected, publicKey } = useWallet();
  const ownedMetadata = useUserArts();
  const createdMetadata = useCreatorArts(publicKey?.toBase58() || '');
  const { metadata, isLoading } = useMeta();
  const [activeKey, setActiveKey] = useState(ArtistViewState.Metaplex);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  const items =
    // activeKey === ArtistViewState.Owned
      // ? 
      // ownedMetadata.map(m => m.metadata);
      // : activeKey === ArtistViewState.Created
      // ? createdMetadata
      // : 
      metadata;

  useEffect(() => {
    if (connected) {
      setActiveKey(ArtistViewState.Owned);
    } else {
      setActiveKey(ArtistViewState.Metaplex);
    }
  }, [connected, setActiveKey]);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  }

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
    <Layout style={{ margin: 0, marginTop: 30, alignItems: 'center' }}>
      <h1 className="art-title">
        Solana Pog Gallery
      </h1>
      <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
        <Col style={{ width: '100%', marginTop: 10 }}>
          <Row style={{justifyContent: 'space-evenly'}}>
            <Col style={{marginBottom: '1rem'}}>
              <Card>
                Background
              </Card>
              <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Col>
            <Col style={{marginBottom: '1rem'}}>
              <Card>
                Aura
              </Card>
              <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Col>
            <Col style={{marginBottom: '1rem'}}>
              <Card>
                Pog/Slammer
              </Card>
              <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Col>
            <Col style={{marginBottom: '1rem'}}>
              <Card>
                Pattern
              </Card>
              <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Col>
            <Col style={{marginBottom: '1rem'}}>
              <Card>
                Symbol
              </Card>
              <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Col>
            <Col style={{marginBottom: '1rem'}}>
              <Card>
                Texture
              </Card>
              <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
                <Option value="jack">Jack</Option>
                <Option value="lucy">Lucy</Option>
                <Option value="disabled" disabled>
                  Disabled
                </Option>
                <Option value="Yiminghe">yiminghe</Option>
              </Select>
            </Col>
          </Row>
          <Divider />
          <Row style={{justifyContent: 'center'}}>
            <Col style={{margin: '2rem 0 1rem'}}>
              <Button
                // disabled={loading}
                // onClick={async () => {
                //   setLoading(true);
                //   await convertMasterEditions(
                //   setLoading(false);
                // }}
                style={{width: 200}}
              >
                {/* {loading ? (
                  <Spin />
                ) : ( */}
                  <span>Search</span>
                {/* )} */}
              </Button>
            </Col>
          </Row>
        </Col>
        <Col style={{ width: '100%', marginTop: 10 }}>
          <Row>
            {artworkGrid}
          </Row>
        </Col>
      </Content>
      <Pagination
        defaultCurrent={1}
        total={200}
        showSizeChanger
      />
    </Layout>
  );
};
// import { Col, Layout } from 'antd';
// import React from 'react';
// import Masonry from 'react-masonry-css';
// import { Link } from 'react-router-dom';
// import { ArtistCard } from '../../components/ArtistCard';
// import { useMeta } from '../../contexts';

// const { Content } = Layout;

// export const ArtistsView = () => {
//   const { whitelistedCreatorsByCreator } = useMeta();
//   const breakpointColumnsObj = {
//     default: 4,
//     1100: 3,
//     700: 2,
//     500: 1,
//   };

//   const items = Object.values(whitelistedCreatorsByCreator);

//   const artistGrid = (
//     <Masonry
//       breakpointCols={breakpointColumnsObj}
//       className="my-masonry-grid"
//       columnClassName="my-masonry-grid_column"
//     >
//       {items.map((m, idx) => {
//         const id = m.info.address;
//         return (
//           <Link to={`/artists/${id}`} key={idx}>
//             <ArtistCard
//               key={id}
//               artist={{
//                 address: m.info.address,
//                 name: m.info.name || '',
//                 image: m.info.image || '',
//                 link: m.info.twitter || '',
//               }}
//             />
//           </Link>
//         );
//       })}
//     </Masonry>
//   );

//   return (
//     <Layout style={{ margin: 0, marginTop: 30 }}>
//       <Content style={{ display: 'flex', flexWrap: 'wrap' }}>
//         <Col style={{ width: '100%', marginTop: 10 }}>{artistGrid}</Col>
//       </Content>
//     </Layout>
//   );
// };
