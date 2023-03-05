import { Component } from 'react';
import { Container } from './App.styled';
import { GlobalStyle } from './GlobalStyle';

import { fetchImg } from '../services/imgApi';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';
import Modal from './Modal';

export class App extends Component {
  state = {
    imgList: [],
    page: null,
    name: '',
    totalImg: null,
    loader: false,
    showModal: false,
    largeImg: '',
    tag: '',
  };

  searchQuery = async (name, page = 1) => {
    this.setState({ loader: true });

    const list = await fetchImg(name, page);

    this.setState({
      imgList: list.hits,
      name: name,
      page: page,
      totalImg: list.totalHits,
      loader: false,
    });
  };

  onLoad = async () => {
    this.setState(state => ({ page: (state.page += 1), loader: true }));

    const { name, page } = this.state;
    const resp = await fetchImg(name, page);
    console.log(resp);

    this.setState(state => ({
      imgList: [...state.imgList, ...resp.hits],
      loader: false,
    }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onClickImg = (link, tag) => {
    this.setState({ largeImg: link, tag });
    this.toggleModal();
  };

  render() {
    const { imgList, page, totalImg, loader, showModal, largeImg, tag } =
      this.state;
    return (
      <Container>
        <GlobalStyle />
        <Searchbar onSubmit={this.searchQuery} />
        <ImageGallery list={imgList} onClick={this.onClickImg} />
        {loader ? (
          <Loader />
        ) : (
          page &&
          imgList.length !== totalImg && <Button onClick={this.onLoad} />
        )}

        {showModal && (
          <Modal onShow={this.toggleModal}>
            <img src={largeImg} alt={tag} />
          </Modal>
        )}
      </Container>
    );
  }
}
