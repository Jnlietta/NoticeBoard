import { Form, FormControl } from 'react-bootstrap';
import clsx from 'clsx';

const SearchForm = () => {

    const handleSubmit = (e) => {
        e.preventDefault();
      };

    const handleChange = e => {
        e.preventDefault();
    };

    return (
        <Form inline onSubmit={handleSubmit} className={clsx('justify-content-center', 'align-items-center', 'd-flex', 'h-100')}>
            <FormControl
              type="text"
              placeholder="Search..."
              className={clsx('mr-sm-2', 'w-50')}
              //value={searchTerm}
              onChange={handleChange}
              style={{textAlign: 'center'}}
            />
        </Form>
    );
  };

  export default SearchForm;