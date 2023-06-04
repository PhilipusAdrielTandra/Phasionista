import { Fragment, useState, useEffect } from 'react';
import Paginator from 'react-hooks-paginator';
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom"
import { getSortedProducts } from '../Components/productHelper';
import SEO from "../Pages/SEO";
import Header from "../Components/header/layout";
import ShopSidebar from '../Components/library/librarySidebar';
import ShopTopbar from '../Components/library/libraryTopbar';
import ShopProducts from '../Components/library/libraryProducts';
import Footer from '../Components/footer';

const ShopGridStandard = () => {
    const [layout, setLayout] = useState('grid three-column');
    const [sortType, setSortType] = useState('');
    const [sortValue, setSortValue] = useState('');
    const [filterSortType, setFilterSortType] = useState('');
    const [filterSortValue, setFilterSortValue] = useState('');
    const [offset, setOffset] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentData, setCurrentData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const { products } = useSelector((state: any) => state.product);

    const pageLimit = 15;
    let { pathname } = useLocation();

    const getLayout = (layout: any) => {
        setLayout(layout)
    }

    const getSortParams = ({sortType, sortValue}: any) => {
        console.log(sortType)
        console.log(sortValue)
        setSortType(sortType);
        setSortValue(sortValue);
    }

    const getFilterSortParams = ({sortType, sortValue}: any) => {
        setFilterSortType(sortType);
        setFilterSortValue(sortValue);
    }

    useEffect(() => {
        let sortedProducts = getSortedProducts(products, sortType, sortValue);
        const filterSortedProducts = getSortedProducts(sortedProducts, filterSortType, filterSortValue);
        sortedProducts = filterSortedProducts;
        setSortedProducts(sortedProducts);
        setCurrentData(sortedProducts.slice(offset, offset + pageLimit));
    }, [offset, products, sortType, sortValue, filterSortType, filterSortValue ]);

    return (
        <Fragment>
            <SEO
                titleTemplate="Shop Page"
                description="Shop page of flone react minimalist eCommerce template."
            />

            <Header>

                <div className="shop-area pt-95 pb-100">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 order-2 order-lg-1">
                                <ShopSidebar products={products} getSortParams={getSortParams} sideSpaceClass="mr-30"/>
                            </div>
                            <div className="col-lg-9 order-1 order-lg-2">
                                <ShopTopbar getLayout={getLayout} getFilterSortParams={getFilterSortParams} productCount={products.length} sortedProductCount={currentData.length} />

                                <ShopProducts layout={layout} products={currentData} />

                                <div className="pro-pagination-style text-center mt-30">
                                    <Paginator
                                        totalRecords={sortedProducts.length}
                                        pageLimit={pageLimit}
                                        pageNeighbours={2}
                                        setOffset={setOffset}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        pageContainerClass="mb-0 mt-0"
                                        pagePrevText="«"
                                        pageNextText="»"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Header>
            <Footer></Footer>
        </Fragment>
    )
}


export default ShopGridStandard;