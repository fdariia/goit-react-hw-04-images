import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getImage } from 'services/imageApi';
import css from './ImageGallery.module.css';
import Loader from 'components/Loader';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Button from 'components/Button';
import Modal from 'components/Modal';

const ImageGallery = ({ query }) => {
  const [hits, setHits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [totalHits, setTotalHits] = useState(0);

  useEffect(() => {
    if (query === '') {
      return;
    }
    setIsLoading(true);
    setPage(1);

    getImage(query, page)
      .then(response => {
        setHits(response.data.hits);
        setIsLoading(false);
        setTotalHits(response.data.totalHits);
      })
      .catch(error => console.log(error));
  }, [query]);

  useEffect(() => {
    if (page === 1) {
      return;
    }
    setIsLoading(true);

    getImage(query, page)
      .then(response => {
        setHits(hits => [...hits, ...response.data.hits]);
        // setHits(prevHits => [...prevHits, ...response.data.hits]);
        setIsLoading(false);
        setTotalHits(response.data.totalHits);
      })
      .catch(error => console.log(error));
  }, [page]);

  const clickLoadMore = () => {
    setPage(page => page + 1);
    // setPage(prevPage => prevPage + 1);
  };

  const clickImage = url => {
    setShowModal(true);
    setLargeImageURL(url);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      {isLoading && <Loader />}
      <ul className={css.imageGallery}>
        {hits.map(({ id, webformatURL, tags, largeImageURL }) => (
          <ImageGalleryItem
            key={id}
            url={webformatURL}
            alt={tags}
            onClick={clickImage}
            largeImageURL={largeImageURL}
          />
        ))}
      </ul>

      {totalHits > 12 * page && (
        <Button onClickLoadMore={clickLoadMore}>
          {isLoading ? 'Loading...' : 'Load more'}
        </Button>
      )}

      {showModal && (
        <Modal onClose={closeModal}>
          <img src={largeImageURL} alt="" />
        </Modal>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};

export default ImageGallery;
