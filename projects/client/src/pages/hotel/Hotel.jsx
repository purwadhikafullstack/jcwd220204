import './hotel.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'

const Hotel = () => {
  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)

  const photos = [
    {
      src: 'https://a0.muscache.com/im/pictures/miso/Hosting-561802559680367004/original/61b37aed-f84b-4e36-ae9b-f7fa6a63ec1e.jpeg?im_w=1200',
    },
    {
      src: 'https://a0.muscache.com/im/pictures/miso/Hosting-561802559680367004/original/aaad4e5b-b7df-4cf5-a5b5-192ba9c85e8a.jpeg?im_w=1200',
    },
    {
      src: 'https://a0.muscache.com/im/pictures/miso/Hosting-561802559680367004/original/9121b738-e717-4348-a1e8-ac42059ebdf7.jpeg?im_w=1200',
    },
    {
      src: 'https://a0.muscache.com/im/pictures/miso/Hosting-561802559680367004/original/41b83933-3075-4a84-88b1-c38ea60d0c88.jpeg?im_w=1200',
    },
    {
      src: 'https://a0.muscache.com/im/pictures/miso/Hosting-561802559680367004/original/5b8aab8f-d63b-4961-8fc3-e8b1a3894ebd.jpeg?im_w=1200',
    },
    {
      src: 'https://a0.muscache.com/im/pictures/miso/Hosting-561802559680367004/original/6faa739f-ba5d-4113-82e3-a29f02b55721.jpeg?im_w=1200',
    },
  ]

  const handleOpen = (i) => {
    setSlideNumber(i)
    setOpen(true)
  }

  const handleMove = (direction) => {
    let newSlideNumber

    if (direction === 'l') {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1
    }

    setSlideNumber(newSlideNumber)
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon icon={faCircleXmark} className="close" onClick={() => setOpen(false)} />
            <FontAwesomeIcon icon={faCircleArrowLeft} className="arrow" onClick={() => handleMove('l')} />
            <div className="sliderWrapper">
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={() => handleMove('r')} />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">Cikini Menteng Apartment</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Daerah Khusus Ibu Kota Jakarta, Indonesia</span>
          </div>
          <span className="hotelDistance">Excellent location – 500m from center</span>
          <span className="hotelPriceHighlight">Book a stay over $114 at this property and get a free airport taxi</span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img onClick={() => handleOpen(i)} src={photo.src} alt="" className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Monas View</h1>
              <p className="hotelDesc">strategic location close to shopping centers and tourist attractionse.</p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a 2-night stay!</h1>
              <span> this property has an excellent location score of 9.8!</span>
              <h2>
                <b>Rp. 3.200.000</b> (2 nights)
              </h2>
              <button>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>
    </div>
  )
}

export default Hotel
