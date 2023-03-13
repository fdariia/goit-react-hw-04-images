import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getImage } from 'services/imageApi';
import css from './ImageGallery.module.css';
import Loader from 'components/Loader';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Modal from 'components/Modal';

class ImageGallery extends Component {
  state = {
    hits: [],
    isLoading: false,
    page: 1,
    showModal: false,
    largeImageURL: '',
    totalHits: 0,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.query !== this.props.query) {
      this.setState({ isLoading: true, page: 1 });
      getImage(this.state.page, this.props.query)
        .then(response => {
          this.setState({
            hits: response.data.hits,
            isLoading: false,
            totalHits: response.data.totalHits,
          });
        })
        .catch(error => console.log(error));
    }

    if (prevState.page !== this.state.page) {
      this.setState({ isLoading: true });
      getImage(this.state.page, this.props.query)
        .then(response => {
          this.setState(prevState => ({
            hits: [...prevState.hits, ...response.data.hits],
            isLoading: false,
          }));
        })
        .catch(error => console.log(error));
    }
  }

  onClickLoadMore = () => {
    this.setState({ page: this.state.page + 1 });
  };

  // toggleModal =()=> {
  //   this.setState(({showModal}) => ({showModal: !showModal}))
  // }

  onClickImage = url => {
    this.setState({ showModal: true, largeImageURL: url });
  };

  onCloseModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { isLoading, hits, page, totalHits, showModal, largeImageURL } =
      this.state;
    return (
      <>
        {isLoading && <Loader />}
        <ul className={css.imageGallery}>
          {hits.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              url={webformatURL}
              alt={tags}
              onClick={this.onClickImage}
              largeImageURL={largeImageURL}
            />
          ))}
        </ul>

        {totalHits > 12 * page && (
          <Button onClickLoadMore={this.onClickLoadMore}>
            {isLoading ? 'Loading...' : 'Load more'}
          </Button>
        )}

        {showModal && (
          <Modal onClose={this.onCloseModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ImageGallery;
