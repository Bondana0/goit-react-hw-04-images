// import React, { Component } from 'react';
import { useEffect } from 'react';
import { StyleBackdrop, StyleModal } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ onCloys, children }) => {
 
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === `Escape`) {
        onCloys();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloys]);


   const onClickOverlay = e => {
    if (e.currentTarget === e.target) {
      onCloys();
    }
  };

  return (
    <StyleBackdrop onClick={onClickOverlay}>
      <StyleModal>{children}</StyleModal>
    </StyleBackdrop>
  );
};

Modal.propTypes = {
  onCloys: PropTypes.func.isRequired,
  children: PropTypes.any.isRequired,
};

// export class Modal extends Component {
//  handleKeyDown = evt => {
//     if (evt.code === `Escape`) {
//       this.props.onCloys();
//     }
//  };
//    onClickOverlay = evt => {
//     if (evt.target.id === 'backDrop') {
//       this.props.onCloys();
//     }
//     return;
//   };
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }
//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }
//   render() {
//     return (
//       <StyleBackdrop id="backDrop" onClick={this.onClickOverlay}>
//         <StyleModal>{this.props.children}</StyleModal>
//       </StyleBackdrop>
//     );
//   }
// }
