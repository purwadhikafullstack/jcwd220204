import './featured.css'

const Featured = () => {
  return (
    <div className="featured">
      <div className="featuredItem">
        <img src="https://media.istockphoto.com/id/500798563/photo/city-skyline-at-sunset-jakarta-indonesia.jpg?s=612x612&w=0&k=20&c=6v7sNMfwW56F5TxfvXH7lEh7nZynm1aRSK3fF0lICjU=" />
        <div className="featuredTitles">
          <h1>Jakarta</h1>
          <h2>123 properties</h2>
        </div>
      </div>

      <div className="featuredItem">
        <img src="https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit19201280gsm/events/2022/05/30/fcc57780-6615-421d-9a9f-259edaa9505a-1653879739524-e93fd20d0e9c8b3944cf5057ef07e692.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Bali</h1>
          <h2>200 properties</h2>
        </div>
      </div>
      <div className="featuredItem">
        <img src="https://asset.kompas.com/crops/yejbAG5BVJAudCyNgIM_mZCw_xU=/0x0:1003x669/750x500/data/photo/2021/09/26/615070d94add1.jpg" alt="" className="featuredImg" />
        <div className="featuredTitles">
          <h1>Bandung</h1>
          <h2>100 properties</h2>
        </div>
      </div>
    </div>
  )
}

export default Featured
