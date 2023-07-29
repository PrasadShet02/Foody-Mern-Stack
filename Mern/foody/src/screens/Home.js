import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const [search, setSearch] = useState('');

  const loadData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/foodData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      setFoodItem(data[0]);
      setFoodCat(data[1]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Navbar />
      <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
        <div className="carousel-indicators">
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
          <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner" id="carousel">
          <div className="carousel-item active">
            <img src="https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100" alt="" style={{ height: "500px", objectFit: "fill" }} />
          </div>
          <div className="carousel-item">
            <img src="https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" className="d-block w-100" alt="" style={{ height: "500px", objectFit: "fill" }} />
          </div>
          <div className="carousel-item">
            <img src="https://images.pexels.com/photos/3928854/pexels-photo-3928854.png?auto=compress&cs=tinysrgb&w=600" className="d-block w-100" alt="" style={{ height: "500px", objectFit: "fill" }}/>
          </div>
        </div>
        <div className='carousel-caption' style={{ zIndex: "10" }}>
          <div className="d-flex justify-content-center">
            <input className="form-control me-2 text-white" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
            {/* <button className="btn btn-outline-success text-white" type="submit">Search</button> */}
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className='container'>
        {foodCat.length !== 0 ? (
          foodCat.map((cat) => {
            return (
              <div className='row mb-3' key={cat._id}>
                <div className='fs-3 m-3'>{cat.CategoryName}</div>
                <hr />
                {foodItem.length !== 0 ? (
                  foodItem
                    .filter((item) => (item.CategoryName === cat.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())))
                    .map((filteredItem) => {
                      return (
                        <div key={filteredItem._id} className='col-12 col-md-6 col-lg-3'>
                          <Card foodItem = {filteredItem} options = {filteredItem.options[0]}/>
                        </div>
                      );
                    })
                ) : (
                  <div>'Empty'</div>
                )}
              </div>
            );
          })
        ) : (
          <div>'Empty'</div>
        )}
      </div>
      <Footer />
    </>
  );
}