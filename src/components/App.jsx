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
      this.setState({ loader: true,});
      try {const list = await fetchImg(name, page);
           this.setState(state => ({
        imgList: [...state.imgList, ...list.hits],
        totalImg: list.totalHits,
        showBtn:page < Math.ceil(this.totalImg / 12)
      }));}
      catch(){}
      finaly{ this.setState({ loader: false,});}
      

     
    }



    
  }

  searchQuery = name => {
    this.setState({ name, page: 1 , imgList: [] });
  };

  onLoad = () => {
    this.setState(state => ({ page: state.page + 1 }));
  };

  // searchQuery = async (name, page = 1) => {
  //   this.setState({ loader: true });

  //   const list = await fetchImg(name, page);

  //   this.setState({
  //     imgList: list.hits,
  //     name: name,
  //     page: page,
  //     totalImg: list.totalHits,
  //     loader: false,
  //   });

  //   setTimeout(() => {
  //     window.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
  //   }, 0);
  // };

  // onLoad = async () => {
  //   await this.setState(state => ({ page: (state.page += 1), loader: true }));

  //   const { name, page } = this.state;
  //   const resp = await fetchImg(name, 1);

  //   this.setState(state => ({
  //     imgList: [...state.imgList, ...resp.hits],
  //     loader: false,
  //   }));

  //   setTimeout(() => {
  //     window.scrollBy({ top: window.innerHeight - 260, behavior: 'smooth' });
  //   }, 0);
  // };

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
      page,
      totalImg,
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
        {loader &&
          <Loader />}
        
        {  showBtn && <Button onClick={this.onLoad} />}
        {showModal && (
          <Modal onShow={this.toggleModal}>
            <img src={largeImg} alt={tag} />
          </Modal>
        )}
      </Container>
    );
  }
}
