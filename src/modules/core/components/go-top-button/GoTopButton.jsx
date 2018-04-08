import React from 'react';

// Import css
import './styles.scss';
import ScrollTopButton from './images/scroll_top.svg';

export class GoTopButton extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const scrollTopImg = document.getElementById('scrollTop');

    scrollTopImg.css('display', 'none');
    // When the user scrolls down 20px from the top of the document, show the button
    window.onscroll = () => {
      if (document.body.scrollTop / document.body.scrollHeight > 0.15 ||
        document.documentElement.scrollTop / document.body.scrollHeight >= 0.15) {
        scrollTopImg.css('display', 'block');
      } else {
        scrollTopImg.css('display', 'none');
      }
    };
  }

  scrollToTop() {
    document.querySelectorAll('html, body').animate({ scrollTop: 0 }, 'slow');
  }

  render() {
    return (
      <img
        id='scrollTop'
        className='img-scroll-top'
        src={ScrollTopButton}
        onClick={this.scrollToTop} />
    );
  }
}
