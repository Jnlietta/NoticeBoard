import { Form, FormControl } from 'react-bootstrap';
import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { loadSearchAdsRequest } from "../../../redux/adsRedux";

const SearchForm = () => {
  const [ searchPhrase, setSearchPhrase ] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    e.preventDefault();
    setSearchPhrase(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loadSearchAdsRequest({searchPhrase}));
    navigate(`/ad/search/${searchPhrase}`);
  };

  return (
    <Form onSubmit={handleSubmit} className={clsx('justify-content-center', 'align-items-center', 'd-flex', 'h-100')}>
      <FormControl
        type="text"
        placeholder="Search..."
        className={clsx('mr-sm-2', 'w-50')}
        value={searchPhrase}
        onChange={handleChange}
        style={{textAlign: 'center'}}
        />
      </Form>
    );
  };

  export default SearchForm;