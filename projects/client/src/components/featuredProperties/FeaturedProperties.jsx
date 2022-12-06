import './featuredProperties.css'

const FeaturedProperties = () => {
  return (
    <div className="fp">
      <div className="fpItem">
        <img className="img1" src="https://a0.muscache.com/im/pictures/be8c589b-eb16-4df1-8592-65e97e7041e5.jpg?im_w=720" />
        <span className="fpName">Villa Kalyani</span>
        <span className="fpCity">Bali, Indonesia</span>
        <span className="fpPrice">Starting from Rp. 2.100.000</span>
        <div className="fpRating">
          <button>9.2</button>
          <span>Exceptional</span>
        </div>
      </div>
      <div className="fpItem">
        <img className="img2" src="https://a0.muscache.com/im/pictures/46fabe09-74f8-4c8b-a421-ebae7b2eeacc.jpg?im_w=960" />
        <span className="fpName">Villa LeGa</span>
        <span className="fpCity">Seminyak, Bali</span>
        <span className="fpPrice">Starting from Rp. 2.000.000</span>
        <div className="fpRating">
          <button>9.0</button>
          <span>Exceptional</span>
        </div>
      </div>
      <div className="fpItem">
        <img className="img3" src="https://a0.muscache.com/im/pictures/miso/Hosting-36922462/original/e736da0f-a9a4-4fd0-9ee8-e61d8838d458.jpeg?im_w=1200" />
        <span className="fpName">Panoramic View In Sudirman Suite Apart & Near MRT</span>
        <span className="fpCity">Jakarta, Indonesia</span>
        <span className="fpPrice">Starting from Rp. 1. 500. 000</span>
        <div className="fpRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
      <div className="fpItem">
        <img className="img7" src="https://a0.muscache.com/im/pictures/349d3649-0611-438a-a365-f2d344ad66a6.jpg?im_w=960" alt="" className="fpImg" />
        <span className="fpName">Loft Superb View</span>
        <span className="fpCity">Jakarta, Indonesia</span>
        <span className="fpPrice">Starting from Rp. 1.200.000</span>
        <div className="fpRating">
          <button>8.9</button>
          <span>Excellent</span>
        </div>
      </div>
    </div>
  )
}

export default FeaturedProperties
