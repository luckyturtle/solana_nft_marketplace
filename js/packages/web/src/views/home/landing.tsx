import {
  Button,
  Row,
  Col,
  Layout,
} from 'antd';
import { ArtCard } from '../../components/ArtCard';
import Masonry from 'react-masonry-css';
import { CardLoader } from '../../components/MyLoader';
import { Link, useHistory } from 'react-router-dom';
import { useMeta } from '../../contexts';
const { Content } = Layout;

export const LandingView = () => {
  const { metadata, isLoading } = useMeta();
  
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
                <img className="item-img" src={`/img/1.png`}  />
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
      </Content>
    </>
  );
};
