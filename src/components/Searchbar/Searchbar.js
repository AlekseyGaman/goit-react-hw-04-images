import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = ({ onSubmit }) => {
  const [imageName, setImageName] = useState('');

  const handleChange = event => {
    setImageName(event.currentTarget.value.toLowerCase());
  };

  const handelSubmit = event => {
    event.preventDefault();

    if (imageName.trim() === '') {
      toast.error('Oops, type something');
    }
    onSubmit(imageName);

    // reset();
  };

  // const reset = () => {
  //   setImageName('');
  // };

  return (
    <SearchbarHeader>
      <SearchForm onSubmit={handelSubmit}>
        <SearchFormButton type="submit">
          <FaSearch size={30} />
        </SearchFormButton>

        <SearchFormInput
          type="search"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
        />
      </SearchForm>
    </SearchbarHeader>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
