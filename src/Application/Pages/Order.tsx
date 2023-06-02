import React, { useEffect, useState } from 'react'
import Header from '../Components/header/layout'
import test from '../Assets/images/future.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'

function Orders() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProductData, setModalProductData] = useState([]);
  const [transactionData, setTransactionData] = useState([])
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
    transaction.order_items.forEach((item) => {
      fetchProductForModalData(item.product_id);
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const fetchProfileData = async () => {
    const cookies = document.cookie;
    const match = cookies.match(/access-token=([^;]+)/);

    let accessToken = null;
    if (match) {
      accessToken = match[1]; // Extract the cookie value
    }

    try {
      const response = await fetch(`http://localhost:3012/order/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const jsonData = await response.json();
        setTransactionData(jsonData);
      }

    } catch (error) {
      // Handle the exception
    }
  };

  const fetchProductForModalData = async (id : any) => {
    const cookies = document.cookie;
    const match = cookies.match(/access-token=([^;]+)/);

    let accessToken = null;
    if (match) {
      accessToken = match[1]; // Extract the cookie value
    }

    try {
      const response = await fetch(`http://localhost:3014/product/item/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (response.ok) {
        const jsonData = await response.json();
        setModalProductData(jsonData);

      }

    } catch (error) {
      // Handle the exception
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <div className="">
      <Header />
      {isModalOpen && (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Transaction Details</h1>
            {selectedTransaction && (
              <>
                {selectedTransaction.order_items.map((item) => {
                  return (
                    <div key={modalProductData.id}>
                      <h4>Product: {modalProductData.name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: {item.price}</p>
                    </div>
                  );
                })}
                <p>Total Price: {selectedTransaction.totalPrice}</p>
              </>
            )}
            <p onClick={closeModal}>Close Modal</p>
          </div>
        </div>
      )}
      <div className="flex flex-col justify-center items-center">
        {transactionData.map((transaction) => {
          const totalPrice = Number(transaction.order_items.reduce(
            (acc, item) => acc + item.price,
            0
          )).toFixed(2);

          return (
            <a
            href="#"
            onClick={() => openModal(transaction)}
            className="flex flex-col items-center border border-gray-200 rounded-lg shadow md:flex-row hover:bg-black my-7 md:min-w-[50rem] max-w-md group"
            key={transaction.id}
          >
            <img
              className="object-cover rounded-t-lg h-full w-80 md:rounded-none md:rounded-l-lg"
              src={test}
              alt=""
            />
            <div className="flex flex-col justify-between p-4 leading-normal">
              <div className="group:hover:hidden flex items-center">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
                  {transaction.id}
                </h5>
                <span className="ml-2 text-sm text-black">{transaction.created_at}</span>
                <h3 className="hidden group-hover:block text-white absolute align-middle mt-14">
                  <FontAwesomeIcon className="px-3" icon={faFileInvoiceDollar} />
                  See Transaction Details
                </h3>
              </div>
              <p className="text-black">
                {transaction.order_items.length} item/s
              </p>
              <p className="text-left text-black">Total Price: RP {totalPrice}</p>
            </div>
          </a>
        )})}
      </div>
    </div>
          );
}

export default Orders;