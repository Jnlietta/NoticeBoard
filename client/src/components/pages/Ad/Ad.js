import styles from './Ad.module.scss';
import { useSelector } from 'react-redux';
import { getAd } from '../../../redux/adsRedux';
import { useParams, NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { IMAGES_URL } from '../../../config';
import formatDate from '../../../utils/formatDate';

const Ad = ({ isLoggedIn }) => {
    const {id} = useParams();
    const ad = useSelector(state => getAd(state, id));

    return(
        <article className={styles.advert}>
            <div className={styles.header}>
                <h2>{ad.title}</h2>
                {!isLoggedIn && 
                <div className={styles.buttons}>
                    <Button variant="outline-info" as={NavLink} to={"/ad/edit/" + id}>Edit</Button>
                    <Button variant="outline-danger">Delete</Button>
                </div>
                }
            </div>
            <img src={`${IMAGES_URL}/${ad.photo}`} alt={ad.title} className={styles.image} />
            <div className={styles.text}>
                <p className="mb-0"><span>Author: </span>{ad.seller}</p>
                <p className="mb-0"><span>Price: </span>{ad.price} $</p>
                <p className="mb-0"><span>Published: </span>{formatDate(ad.date)}</p>
                <p className="mb-0"><span>Location: </span>{ad.location}</p>
                <br />
                <p className="mb-0">{ad.content}</p>
            </div>
        </article>    
    );
};

export default Ad;