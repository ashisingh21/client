import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { useAuth } from '../../Context/Auth'
import UserDashboard from './UserDashboard';
import axios from 'axios';

const Orders = () => {
    const [auth] = useAuth();
    const [orders, setOrders] = useState([])

    const fetchOrders = async () => {
        try {
            const res = await axios.get('/api/v1/auth/order-data', {
                params: {
                    id: auth?.user?._id
                }
            })
            if (res) {
                setOrders(res.data.orders)
                // console.log(res.data)
            }
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        if (auth?.token) { fetchOrders() }
    }, [auth?.token])
    return (
        <>
            <UserDashboard>
                <h1>Orders</h1>
                {orders.map((o) => (

                    <>
                        {orders?.map((o, i) => {
                            return (
                                <div className="border shadow">
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Status</th>
                                                <th scope="col">Buyer</th>
                                                <th scope="col"> date</th>
                                                <th scope="col">Payment</th>
                                                <th scope="col">Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{i + 1}</td>
                                                <td>{o?.status}</td>
                                                <td>{o?.buyer?.name}</td>
                                                <td>{moment(o?.createAt).fromNow()}</td>
                                                <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                                <td>{o?.products?.length}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className="container">
                                        {o?.products?.map((p, i) => (
                                            <div className="row mb-2 p-3 card flex-row" key={p._id}>
                                                <div className="col-md-4">
                                                    <img
                                                        src={`/api/v1/product/product-photo/${p._id}`}
                                                        className="card-img-top"
                                                        alt={p.name}
                                                        style={{ objectFit: 'contain' }}
                                                        height={"100px"}
                                                    />
                                                </div>
                                                <div className="col-md-8">
                                                    <p>{p.name}</p>
                                                    <p>{p.description.substring(0, 30)}</p>
                                                    <p>Price : {p.price}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </>
                ))}



            </UserDashboard>
        </>
    )
}

export default Orders