import { useState, useEffect } from 'react';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import Searchbar from './Components/Searchbar';
import ImageGallery from './Components/ImageGallery';
import Button from './Components/Button';
import Modal from './Components/Modal';

import imagesApi from './Components/services/images-api';

export default function App() {
  const [images, setImages] = useState([]);
  const [imageForModal, setImageForModal] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(
    prevSearchQuery => {
      if (!searchQuery) {
        return;
      }

      if (prevSearchQuery === searchQuery) {
        return;
      }

      fetchImages();
    },
    [searchQuery],
  );

  const onChangeQuery = query => {
    setImages([]);
    setCurrentPage(1);
    setSearchQuery(query);
    setError(null);
  };

  const onChangeModalImg = img => {
    setImageForModal(img);
    toggleModal();
  };

  const fetchImages = () => {
    const options = { searchQuery, currentPage };

    setIsLoading(true);

    imagesApi
      .fetchImages(options)
      .then(newImages => {
        setImages([...images, ...newImages]);
        setCurrentPage(currentPage + 1);
      })
      .catch(error => setError(error))
      .finally(() => setIsLoading(false));
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const shouldRenderLoadMoreButton = images.length >= 12 && !isLoading;
  const totalImages = images.length;

  return (
    <>
      <Searchbar onSubmit={onChangeQuery} />
      <ImageGallery images={images} onClick={onChangeModalImg} />
      {isLoading && (
        <Loader type="Puff" color="#00BFFF" height={100} width={100} />
      )}
      {error && <p>Oops...</p>}
      {shouldRenderLoadMoreButton && (
        <Button onClick={fetchImages} totalImages={totalImages} />
      )}
      {showModal && <Modal onClose={toggleModal} image={imageForModal} />}
    </>
  );
}
