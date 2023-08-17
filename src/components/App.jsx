import React, { useState, useEffect } from 'react';
import { StyledApp } from './AppStyled';
import { Searchbars } from './Searchbar/Searchbar';

import { imagesFetch } from 'components/Api';
import { Style } from './Style';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';

const perPage = 12;


export const App = () => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoadMoreBtn, setShowLoadMoreBtne] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery) {
      const fetchData = async () => {
        try {
          setIsLoading(true);
          const response = await imagesFetch(searchQuery, page, perPage);
          setImages(prevImages => {
            return [...prevImages, ...response.data.hits];
          });

          if (response.data.hits.length === perPage) {
            setShowLoadMoreBtne(true);
          } else if (response.data.hits.length !== perPage) {
            setShowLoadMoreBtne(false);
          }

          if (page === 1) {
            setImages(response.data.hits);
          }
        } catch (error) {
        } finally {
          setTimeout(() => {
            setIsLoading(false);
          }, 1000);
        }
      };

      fetchData();
    }
  }, [searchQuery, page]);

  const onSubmit = search => {
    setSearchQuery(search);
    setPage(1);
  };

  const onLoadMoreClick = search => {
    setPage(prevPage => prevPage + 1);
  };

  const onPicture = index => {
    const picture = images.filter(image => image.id === +index);

    onClickModalOpen(largeImageURL);
    setLargeImageURL(picture[0].largeImageURL);
  };

  const onClickModalOpen = () => {
    setShowModal(!showModal);
  };

  return (
    <StyledApp>
      <Searchbars
        onButtonSubmit={onSubmit}
        onLoadMoreClick={onLoadMoreClick}
        items={images}
        showLoadMoreBtn={showLoadMoreBtn}
        onPicture={onPicture}
      />
      {showModal && (
        <Modal onCloys={onClickModalOpen}>
          {<img src={largeImageURL} alt={''}></img>}
        </Modal>
        )}
        <Style />
       <Loader isLoading={isLoading} />
    </StyledApp>
  );
};
