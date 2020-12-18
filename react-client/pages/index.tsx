import Head from 'next/head'
import { useEffect, useState } from 'react'
import OrderItem from '../components/orderItem'
import OrderForm from '../components/orderForm'
import http from '../http';

export default function Home() {
  const [fetched, setFetched] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (fetched) return;

    http.get('orders').then(res => {
      setOrders(res.data);
    })

    setFetched(true);
  });

  const onSaved = (order) => {
    setOrders([order, ...orders]);
  }

  return (
    <div className="container">
      <Head>
        <title>Orders</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col col-md-5 m-5">
            <div className="text-right"><OrderForm onSaved={onSaved}/></div>
            {orders.map(order => (<OrderItem order={order} key={order.id}/>))}
            {orders.length === 0 && (
              <div className="text-muted p-3 mt-3 border"><i>No Order Found</i></div>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
