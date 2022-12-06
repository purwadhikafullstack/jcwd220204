import './searchItem.css'

const SearchItem = () => {
  return (
    <div className="searchItem">
      <img src="https://a0.muscache.com/im/pictures/miso/Hosting-561802559680367004/original/61b37aed-f84b-4e36-ae9b-f7fa6a63ec1e.jpeg?im_w=960" alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">Cikini Menteng Apartments, Jakarta</h1>
        <span className="siDistance">500m from center</span>
        <span className="siTaxiOp">Free Breakfast</span>
        <span className="siSubtitle">Studio Apartment with Air conditioning</span>
        <span className="siFeatures">Entire studio • 1 bathroom • 21m² 1 full bed</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="Facility">Facility : Wifi, Swiming pool, lobby area</span>
      </div>
      <div className="siDetails">
        <div className="siRating">
          <span>Excellent</span>
          <button>8.9</button>
        </div>
        <div className="siDetailTexts">
          <span className="siPrice">Rp. 1.700.000</span>
          <span className="siTaxOp">Includes taxes and fees</span>
          <button className="siCheckButton">See availability</button>
        </div>
      </div>
    </div>
  )
}

export default SearchItem
