import { ThreeDots } from 'react-loader-spinner';
import { Container } from './Loader.styled';

const Loader = () => {
  return (
    <Container>
      <ThreeDots color="#303f9f" />
    </Container>
  );
};

export default Loader;
