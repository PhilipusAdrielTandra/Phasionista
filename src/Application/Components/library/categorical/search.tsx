import { useEffect, useState } from "react";
import { setProducts } from "../../../Redux/product-slice";
import { store } from "../../../Redux/store";

const ShopSearch = () => {
  const [search, setSearch] = useState("")
  const fetchSearchData = async (search) => {
    try {
      const response = await fetch(`http://localhost:3014/product/search`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: search })
      });

      if (response.ok) {
        const jsonData = await response.json();
        store.dispatch(setProducts(jsonData));
      }

      else {
        // refreshAccessToken()
        // window.location.reload()
      }

    } catch (error) {
      // Handle the exception
    }
  };

  useEffect(() => {
    fetchSearchData(search);
  }, [search]);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearch(query);
  };

    return (
      <div className="sidebar-widget">
        <h4 className="pro-sidebar-title">Search </h4>
        <div className="pro-sidebar-search mb-50 mt-25">
          <form className="pro-sidebar-search-form" action="#">
            <input type="text" placeholder="Search here..." value={search} onChange={handleSearchChange}/>
            <button>
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default ShopSearch;
  