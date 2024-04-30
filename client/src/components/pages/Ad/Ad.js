import styles from './Ad.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getAd, removeAd, removeAdRequest } from '../../../redux/adsRedux';
import { useParams, NavLink, Navigate } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { IMAGES_URL } from '../../../config';
import formatDate from '../../../utils/formatDate';
import { useState } from 'react';
import { getUser, selectorIsLoggedIn } from '../../../redux/authRedux';

const Ad = () => {
    const {id} = useParams();
    const ad = useSelector(state => getAd(state, id));

    const sellerAdLogin = ad.seller.login;
    const userData = useSelector(getUser);

    const isLoggedIn = useSelector(selectorIsLoggedIn);
    let isAuthor = false;

    // if advertisement is created by logged user
    if(sellerAdLogin === userData.login) {
        isAuthor = true;
    }

    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    const removeAdModal = e => {
        e.preventDefault();
        dispatch(removeAdRequest({id}));
        dispatch(removeAd(id));
    };

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);

    if(!ad) return <Navigate to="/" />
    else return(
        <article className={styles.advert}>

            <div className={styles.header}>
                <h2>{ad.title}</h2>

                {isLoggedIn && isAuthor &&
                    <div className={styles.buttons}>
                        <Button variant="outline-info" as={NavLink} to={"/ad/edit/" + id}>Edit</Button>
                        <Button variant="outline-danger" onClick={handleShowModal} >Delete</Button>
                    </div>
                }

            </div>

            <img src={`${IMAGES_URL}/${ad.photo}`} alt={ad.title} className={styles.image} />

            <div className={styles.author}>
                <p className="mb-0"><span>Author: </span>{ad.seller.login}</p>
                <img src={`${IMAGES_URL}/${ad.seller.avatar}`} alt={ad.seller.login} className={styles.avatar} />
            </div>

            <div className={styles.text}>
                <p className="mb-0"><span>Phone: </span>{ad.seller.phone}</p>
                <p className="mb-0"><span>Price: </span>{ad.price} $</p>
                <p className="mb-0"><span>Published: </span>{formatDate(ad.date)}</p>
                <p className="mb-0"><span>Location: </span>{ad.location}</p>
                <br />
                <p className="mb-0">{ad.content}</p>
            </div>

            <Modal
                show={showModal}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This operation will completely remove this advertisement from the app. 
                    Are you sure you want to do that?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
                    <Button variant="danger" onClick={removeAdModal}>Remove</Button>
                </Modal.Footer>
            </Modal>

        </article>    
    );
};

export default Ad;