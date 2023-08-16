import React from 'react';
import { StyledImageItem, StyledImageItemImg } from './ImageGalleryItem.styled';

// export class ImageGallerytem extends Component {
//   onImageClick = evt => {
//     const id = evt.currentTarget.id;
//     this.props.onPicture(id);
//   };

//   render() {
//     const { item } = this.props;

//     return (
//       <StyledImageItem className="gallery-item">
//         <StyledImageItemImg
//           src={item.webformatURL}
//           alt={item.tags}
//           onClick={this.onImageClick}
//           id={item.id}
//         ></StyledImageItemImg>
//       </StyledImageItem>
//     );
//   }
// }
export const ImageGalleryItem = ({ item, onPicture }) => {
  const onImageClick = evt => {
    const id = evt.currentTarget.id;

    onPicture(id);
  };

  return (
    <StyledImageItem className="gallery-item">
      <StyledImageItemImg
        src={item.webformatURL}
        alt={item.tags}
        onClick={onImageClick}
        id={item.id}
      ></StyledImageItemImg>
    </StyledImageItem>
  );
};
