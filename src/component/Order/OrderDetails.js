import React, { useEffect } from "react";
import "./orderDetails.css";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link, useParams } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { id } = useParams();
  const { error, loading, order } = useSelector((state) => state.orderDetails);

  useEffect(() => {
    if (id) {
      dispatch(getOrderDetails(id));
    }
  }, [id]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error]);

  return (
    <>
      {loading ? (
        <>
        <Loader />
        </>
      ) : order?._id &&(
         (
          <>
            <MetaData title="Order Details" />
            <div className="orderDetailsPage">
              <div className="orderDetailsContainer">
                <Typography component="h1">Order #{order && order?._id}</Typography>
                <Typography>Shipping Info</Typography>

                <div className="orderDetailsContainerBox">
                  <div>
                    <p>Name:</p>
                    <span>{order?.user && order?.user.name}</span>
                  </div>

                  <div>
                    <p>Phone:</p>
                    <span>{order?.shippingInfo && order?.shippingInfo.phoneNo}</span>
                  </div>

                  <div>
                    <p>Address:</p>
                    <span>
                      {order?.shippingInfo &&
                        `${order?.shippingInfo.address}, ${order?.shippingInfo.city}, ${order?.shippingInfo.state}, ${order?.shippingInfo.pinCode}, ${order?.shippingInfo.country}`}
                    </span>
                  </div>
                </div>

                <Typography>Payment</Typography>
                <div className="orderDetailsContainerBox">
                  <div className={order?.paymentInfo && order?.paymentInfo?.status === "succeeded" ? "greenColor" : "redColor"}>
                    <p>{order?.paymentInfo?.status === "succeeded" ? "PAID" : "NOT PAID"}</p>
                  </div>

                  <div>
                    <p>Amount:</p>
                    <span>{order?.totalPrice && order?.totalPrice}</span>
                  </div>
                </div>

                <Typography>Order Status</Typography>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p className={order?.orderStatus && order?.orderStatus === "Delivered" ? "greenColor" : "redColor"}>{order?.orderStatus && order?.orderStatus}</p>
                  </div>
                </div>
              </div>

              <div className="orderDetailsCartItems">
                <Typography>Order Items:</Typography>
                <div className="orderDetailsCartItemsContainer">
                  {order?.orderItems &&
                    order?.orderItems.map((item) => (
                      <div key={item.id}>
                        <img src={item.image} alt="Product" />
                        <Link to={`/product/${item?.product}`}>{item.name}</Link>
                      { console.log("item=>",item)}
                       
                        <span>
                          {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </>
        )
      )}
    </>
  );
};

export default OrderDetails;
