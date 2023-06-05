import React, { useEffect, useState } from 'react'
import Header from '../Components/header/layout'
import test from '../Assets/images/future.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'
import { refreshAccessToken } from '../Components/refresher';

function Orders() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalProductData, setModalProductData] = useState([]);
  const [transactionData, setTransactionData] = useState([])
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const openModal = async (transaction) => {
    setSelectedTransaction(transaction);

    const productDataPromises = transaction.order_items.map((item) => {
      return fetchProductForModalData(item.product_id);
    });

    const productData = await Promise.all(productDataPromises);
    setModalProductData(productData);
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

      if(accessToken == ""){
        await refreshAccessToken()
        accessToken = cookies.match(/access-token=([^;]+)/)[1];
      }
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

      else {
        // refreshAccessToken()
        // window.location.reload()
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
        return jsonData;

      }

    } catch (error) {
      // Handle the exception
    }
  };

  useEffect(() => {
    fetchProfileData();

    const handleClickOutsideModal = (event) => {
      if (!event.target.closest(".bg-white")) {
        closeModal();
      }
    };

    window.addEventListener("click", handleClickOutsideModal);

    return () => {
      window.removeEventListener("click", handleClickOutsideModal);
    };
  }, []);

  const calculateTotalPrice = () => {
    if (selectedTransaction) {
      const totalPrice = selectedTransaction.order_items.reduce(
        (acc, item) => acc + Number(item.price) * item.quantity,
        0
      );
      return Number(totalPrice).toFixed(2);
    }
    return 0;
  };

  return (
    <div className="">
      <Header />
      {isModalOpen && (
        <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h1 className="text-2xl font-bold mb-4">Transaction Details</h1>
            {selectedTransaction && (
              <>
                {selectedTransaction.order_items.map((item, index) => {
                  return (
                    <div key={modalProductData[index].id}>
                      <h4 style={{ fontWeight: 'bold'}}>{modalProductData[index].name}</h4>
                      <p>Quantity: {item.quantity}</p>
                      <p>Price: {item.price}</p>
                    </div>
                  );
                })}
                <h3 style={{ fontFamily: 'Poppins', fontWeight: 'bolder' }}>Total Price: {calculateTotalPrice()}</h3>
              </>
            )}
          </div>
        </div>
      )}
      <div className="flex flex-col justify-center items-center">
        {transactionData.map((transaction) => {
          const transactionCreatedAt = new Date(transaction.created_at);
          const options = {
            timeZone: "Asia/Jakarta",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          };

          const indonesiaTime = transactionCreatedAt.toLocaleString("id-ID", options);

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
                <span className="ml-2 text-sm text-black">Created:</span>
                <span className="ml-2 text-sm text-black">{indonesiaTime.replace(/\./g, ":")}</span>
                <h3 className="hidden group-hover:block text-white absolute align-middle mt-14">
                  <FontAwesomeIcon className="px-3" icon={faFileInvoiceDollar} />
                  See Transaction Details
                </h3>
              </div>
              <p className="text-black">
                {transaction.order_items.length} item/s
              </p>
            </div>
          </a>
        )})}
      </div>
    </div>
          );
}

export default Orders;