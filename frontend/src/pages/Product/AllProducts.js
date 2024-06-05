import React, { Fragment, useEffect, useState } from 'react';
import ProductCard from '../Product/ProductCard';
import Pagination from '../pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Tooltip from 'rc-tooltip';
import 'rc-tooltip/assets/bootstrap_white.css'

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState([null]);
  const [priceChanged, setPriceChanged] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [price, setPrice] = useState([1, 200000]);
  const [loading, setLoading] = useState(true); // New loading state
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const itemsPerPage = 6; // Set the number of items per page
  
  const categories = [  
    'Honda',
    'Scooter',
    'Tvs',
    'Plusure'
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true); // Set loading to true when starting fetch
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/products`
      );
      const data = await response.json();
      setProducts(data.products);

      // Extract unique categories from products
      const uniqueCategories = [...new Set(data.products.map(product => product.category))];
      setCategory(uniqueCategories);
      setLoading(false); // Set loading to false after fetch completes
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Apply filters based on category and name
    let filtered = products;

    const categoryFilter = searchParams.get('category');
    const nameFilter = searchParams.get('name');
    const priceFilter = searchParams.get('price');
    if (priceFilter) {
      filtered = filtered.filter(product => product.price.toLowerCase().includes(priceFilter.toLowerCase()));
    }
    if (categoryFilter) {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    if (nameFilter) {
      filtered = filtered.filter(product => product.name.toLowerCase().includes(nameFilter.toLowerCase()));
    }

    setFilteredProducts(filtered);
  }, [searchParams, price, products]);

  const handleCategoryClick = (category) => {
    // Update the URL with the selected category
    setSearchParams({ category, page: 1 });
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <Fragment>
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-3">
            {/* Side Navigation Filter Section */}
            <div className="dish-box">
              <div className="card-body">
                <h5 className="card-title">Filter by Category</h5>
                <div className='mt-5'>
                  <h3 className='mb-3'> Price</h3>
                  <div className="px-5" onMouseUp={() => setPriceChanged(price)}>
                    <Slider
                      range={true}
                      marks={{
                        1: " 1",
                        200000: " 200,000"
                      }}
                      min={1}
                      key={price}
                      max={200000}
                      defaultValue={price}
                      onChange={(price) => {
                        setPrice(price)
                      }}
                      handleRender={
                        renderProps => {
                          return (
                            <Tooltip overlay={`${renderProps.props['aria-valuenow']}`} >
                              <div {...renderProps.props}> </div>
                            </Tooltip>
                          )
                        }
                      }
                    />
                  </div>
                </div>
                <hr className="my-5" />
                <div className='mt-5'>
                  <h3 className='mb-3'> Category</h3>
                  <ul className="list-group">
                    {categories.map(category => (
                      <li
                        style={{ cursor: "pointer", listStyleType: "none" }}
                        key={category}
                        className={`list-group-item1 ${searchParams.get('category') === category ? 'active' : ''}`}
                        onClick={() => handleCategoryClick(category)}
                      >
                        {category}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              {/* <hr className="my-1" /> */}
            </div>
          </div>

          {/* Product Display Section */}
          <div className="col-lg-9 details">
            <h1 id="products_heading">Latest Products</h1>
            <div className="row">
              {loading ? (
                <p>Loading...</p> // Loading message
              ) : (
                currentProducts.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))
              )}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredProducts.length / itemsPerPage)}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AllProducts;
