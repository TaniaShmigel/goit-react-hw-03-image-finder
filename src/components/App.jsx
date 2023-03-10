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
    page: 1,
    name: '',
    totalImg: null,
    loader: false,
    showModal: false,
    showBtn: false,
    largeImg: '',
    tag: '',
  };

  async componentDidUpdate(_, prevState) {
    const { name, page } = this.state;

    if (prevState.name !== name || prevState.page !== page) {
      this.setState({ loader: true });

      try {
        const list = await fetchImg(name, page);

        this.setState(state => ({
          imgList: [...state.imgList, ...list.hits],
          showBtn: page < Math.ceil(list.totalHits / 12),
        }));
      } catch (error) {
        return error;
      } finally {
        this.setState({ loader: false });
      }
    }
  }
  searchQuery = name => {
    this.setState({ name, page: 1, imgList: [] });
  };

  onLoad = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  onClickImg = (link, tag) => {
    this.setState({ largeImg: link, tag });
    this.toggleModal();
  };

  render() {
    const {
      imgList,

      loader,
      showModal,
      showBtn,
      largeImg,
      tag,
    } = this.state;
    return (
      <Container>
        <GlobalStyle />
        <Searchbar onSubmit={this.searchQuery} />
        <ImageGallery list={imgList} onClick={this.onClickImg} />
        {loader && <Loader />}

        {showBtn && <Button onClick={this.onLoad} />}

        {showModal && (
          <Modal onShow={this.toggleModal}>
            <img src={largeImg} alt={tag} />
          </Modal>
        )}
      </Container>
    );
  }
}
