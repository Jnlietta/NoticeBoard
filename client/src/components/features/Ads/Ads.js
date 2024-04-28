import styles from './Ads.module.scss';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Row, Col, Spinner } from 'react-bootstrap';
import { getRequest, LOAD_ADS } from '../../../redux/adsRedux';
import { useSelector } from 'react-redux';
import { IMAGES_URL } from '../../../config';
import { NavLink } from "react-router-dom";


const Ads = ({ data }) => {
  const request = useSelector(state => getRequest(state, LOAD_ADS));
  const sortedAds = data.sort((a, b) => new Date(a.date) - new Date(b.date));

    
  if(!request || !request.success) return <Spinner color="primary" className="standard-box d-block me-auto ms-auto" /> 
  else return (
    <section className={styles.adverts}>
      <Button variant="primary" as={NavLink} to="/ad/add"  className="mt-4">Add advert</Button>

      <Row>
      {sortedAds.map(ad => 
        <Col key={ad._id} xs="12" md="6" lg="4" xl="3" >
          <Card style={{ width: '18rem', height: "420px", marginTop: '20px' }}>
            <Card.Img variant="top" src={`${IMAGES_URL}/${ad.photo}`} style={{ height: "70%", objectFit: "cover" }}/>
            <Card.Body>
              <Card.Title>{ad.title}</Card.Title>
              <Card.Text>{ad.location}</Card.Text>
              <Button variant="primary" as={NavLink} to={`/ad/${ad._id}`}>Read more</Button>
            </Card.Body>
          </Card>
        </Col>
      )}
      </Row>
    </section>
  );
}

export default Ads;