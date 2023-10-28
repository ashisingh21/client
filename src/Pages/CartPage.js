import React, { useEffect, useState } from 'react'
import Layout from '../Components/Layout/Layout'
import { useCart } from '../Context/Cart'
import { useAuth } from '../Context/Auth'
import { Link, Navigate, useNavigate } from 'react-router-dom'

const CartPage = () => {

    const [auth, setAuth] = useAuth()
    const [cart, setCart] = useCart([])
    const [quan, setQuan] = useState(1)

    const [delivery, setDelivery] = useState('')
    const navigate = useNavigate()




    const checkDelivery = () => {
        // Create a new Date object to represent the current date and time
        const today = new Date();

        today.setDate(today.getDate() + 5)

        // Get the year, month, and day components of the current date
        const year = today.getFullYear();
        const month = today.getMonth(); // Months are zero-based, so add 1
        const day = today.getDate();
        const allMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        // Format the date as a string (in the format YYYY-MM-DD)
        const formattedDate = `${day.toString().padStart(2, '0')}-${allMonth[month]}-${year}`;
        setDelivery(formattedDate)

    }
    const setTotal = () => {
        let myCart = [...cart];
        // let totalAmount = myCart.reduce((total, product) => total + product.price, 0)
        let totalAmount = 0;
        myCart.map((c) => { totalAmount = totalAmount + c.price })

        return totalAmount.toLocaleString("en-US", {
            style: "currency",
            currency: "INR"
        });


    }

    useEffect(() => {

        checkDelivery()
    }, [])




    const removeProduct = (id) => {
        let myCart = [...cart];
        let indexOfRemoveProduct = myCart.findIndex(item => item._id === id);
        myCart.splice(indexOfRemoveProduct, 1)
        localStorage.setItem('cartInLocal', JSON.stringify(myCart));
        setCart(myCart)
    }
    return (
        <Layout>

            <div className='container'>

                <div className='row'>
                    <div className='col-md-8'>
                        <ul className="m-4 list-group ">
                            {cart?.map((p) => (
                                <li className="list-group-item shadow my-4">
                                    <div className="d-flex media align-items-lg-center flex-column flex-lg-row p-3">
                                        <img src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} alt="Generic placeholder image" width={200} className="ml-lg-5 " />
                                        <div className="media-body px-2">
                                            <h5 className="mt-0 font-weight-bold mb-2">{p.name}</h5>
                                            <h6 className="font-weight-bold my-2">Category:  {p.category.name}</h6>
                                            <h6 className="font-weight-bold my-2">Quantity:  {quan}</h6>
                                            <p className="font-italic text-muted mb-0 small">{p.description}</p>
                                            <div className="d-flex align-items-center justify-content-between mt-1">


                                                <h6 className="font-weight-bold my-2">Price: &#8377; {p.price}</h6>
                                                <ul className="list-inline small">
                                                    <li className="list-inline-item m-0"><i className="fa fa-star text-success" /></li>
                                                    <li className="list-inline-item m-0"><i className="fa fa-star text-success" /></li>
                                                    <li className="list-inline-item m-0"><i className="fa fa-star text-success" /></li>
                                                    <li className="list-inline-item m-0"><i className="fa fa-star text-success" /></li>
                                                    <li className="list-inline-item m-0"><i className="fa fa-star-o text-gray" /></li>
                                                </ul>
                                            </div>
                                            <button className='btn btn-danger' onClick={(e) => removeProduct(p._id)}>Remove</button>
                                        </div>

                                    </div>

                                </li>

                                // <div className='card d-flex p-3 my-4'>
                                //     <img style={{ width: '250px', height: '250px', objectFit: 'contain' }} className='card-img-top' src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`} alt='Card image cap' />

                                //     <div className='w-75'>
                                //         <div>{p.name}</div>
                                //         <div>{p.description}</div>
                                //     </div>
                                // </div>

                            ))}
                        </ul>
                    </div>
                    <div className='col-md-4'>
                        <div class="widget p-4 my-3">
                            <h2 class="widget-title mb-2">Order Summary</h2>

                            <h5 className=''>Total Items : {cart.length} Products</h5>
                            <h3 className='text-bold'>Total : {setTotal()}</h3>

                            <h5 style={{ fontSize: '13px' }} className='text-bold'>Expected Delivery : {delivery}</h5>

                            {auth?.token ? <><button className='py-3 px-4  my-4 '>Proceed to Checkout</button></> : <><button onClick={(e) => navigate('/login')} className='py-3 px-4  my-4 '>Login to Checkout</button></>}

                        </div>


                    </div>
                </div>
                {/* </> : <><h2>Please Login to Checkout</h2>
                    <button className='btn text-bold' onClick={() => { navigate('/login') }}>Login Now</button></>} */}

            </div>


        </Layout>
    )
}

export default CartPage