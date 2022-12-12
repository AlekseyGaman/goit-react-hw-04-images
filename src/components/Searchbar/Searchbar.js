// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { FaSearch } from 'react-icons/fa';
import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

class Searchbar extends Component {
  state = {
    imageName: '',
  };

  handleChange = event => {
    this.setState({ imageName: event.currentTarget.value.toLowerCase() });
  };

  handelSubmit = event => {
    event.preventDefault();

    if (this.state.imageName.trim() === '') {
      toast.error('Oops, type something');
    }
    this.props.onSubmit(this.state.imageName);

    // this.reset();
  };

  // reset = () => {
  //   this.setState({ imageName: '' });
  // };

  render() {
    return (
      <SearchbarHeader>
        <SearchForm onSubmit={this.handelSubmit}>
          <SearchFormButton type="submit">
            <FaSearch size={30} />
          </SearchFormButton>

          <SearchFormInput
            type="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}
export default Searchbar;
