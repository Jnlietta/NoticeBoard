import { Form, FormControl } from 'react-bootstrap';
import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchForm = () => {
  const [ searchString, setSearchString ] = useState('');
  
  const navigate = useNavigate();

  const handleChange = e => {
    e.preventDefault();
    setSearchString(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/ad/search/${searchString}`);
  };

  return (
    <Form inline onSubmit={handleSubmit} className={clsx('justify-content-center', 'align-items-center', 'd-flex', 'h-100')}>
      <FormControl
        type="text"
        placeholder="Search..."
        className={clsx('mr-sm-2', 'w-50')}
        value={searchString}
        onChange={handleChange}
        style={{textAlign: 'center'}}
        />
      </Form>
    );
  };

  export default SearchForm;