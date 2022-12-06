import './propertyList.css'

const PropertyList = () => {
  return (
    <div className="pList">
      <div className="pListItem">
        <img className="img4" src="https://a0.muscache.com/im/pictures/88b60044-f0e2-434b-9012-c847a8211c57.jpg?im_w=1200" />
        <div className="pListTitles">
          <h1>Hotel</h1>
        </div>
      </div>
      <div className="pListItem">
        <img className="img5" src="https://a0.muscache.com/im/pictures/miso/Hosting-50982895/original/2f6b089b-738a-4ec8-98da-7971dfd35e85.jpeg?im_w=1200" />
        <div className="pListTitles">
          <h1>Apartment</h1>
        </div>
      </div>

      <div className="pListItem">
        <img className="img6" src="https://a0.muscache.com/im/pictures/b6c028b8-42f2-4e1a-bd4a-c8b24d163ce5.jpg?im_w=960" />
        <div className="pListTitles">
          <h1>Villa</h1>
        </div>
      </div>
    </div>
  )
}

export default PropertyList
