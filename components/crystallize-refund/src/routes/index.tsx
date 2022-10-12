import { json, LoaderFunction } from '@remix-run/server-runtime';
import { Link, useLoaderData } from '@remix-run/react';
import CrystallizeAPI from 'src/core.server/use-cases/crystallize';
import { Address, Order } from '@crystallize/js-api-client';
import { OrderCard } from 'src/components/OrderCard';
import { DebounceInput } from 'react-debounce-input';
import { useState } from 'react';
import { FaFunnelDollar } from 'react-icons/fa';

export const loader: LoaderFunction = async ({ request }) => {
    const api = await CrystallizeAPI(request);
    const orders = await api.fetchAllOrders();
    return json({ orders });
};

const filter = (order: Order, query: string, type: 'orders' | 'credits'): boolean => {
    if ((order?.total?.gross || 0) >= 0 && type === 'credits') {
        return false;
    }
    if ((order?.total?.gross || 0) < 0 && type === 'orders') {
        return false;
    }

    const text = `${order.customer.firstName} ${order.customer.lastName} ${order.customer.identifier} ${
        order.customer.companyName
    }
                  ${order?.customer?.addresses
                      ?.map(
                          (address: Address) =>
                              `${address.firstName} ${address.lastName} ${address.email} ${address.phone} ${address.state} ${address.city} ${address.country}`,
                      )
                      .join(' ')}
                  ${order.id} 
                  ${order.cart.map((item) => item.name).join(' ')}
                  `.toLowerCase();

    if (query === '') {
        return true;
    }
    return text.includes(query.toLowerCase());
};

export default () => {
    const { orders } = useLoaderData();
    const [search, setSearch] = useState('');
    const [searchFor, setSearchFor] = useState<'orders' | 'credits'>('orders');
    const results = orders.filter((order: Order) => filter(order, search, searchFor));
    const isOnlyOrders = searchFor === 'orders';
    const isOnlyCredits = searchFor === 'credits';

    return (
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to={'/'}>Refunds</Link>
                    </li>
                </ol>
            </nav>
            <div className="row py-2">
                <div className="col">
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaFunnelDollar />
                        </span>
                        <DebounceInput
                            minLength={2}
                            debounceTimeout={150}
                            className="form-control form-control-lg"
                            placeholder="Search for..."
                            onChange={(event) => setSearch(event.target.value)}
                        />
                        <button
                            className={`btn btn-${isOnlyOrders ? '' : 'outline-'}dark`}
                            type="button"
                            onClick={() => {
                                setSearchFor('orders');
                            }}
                        >
                            Order
                        </button>
                        <button
                            className={`btn btn-${isOnlyCredits ? '' : 'outline-'}dark`}
                            type="button"
                            onClick={() => {
                                setSearchFor('credits');
                            }}
                        >
                            Credit Notes
                        </button>
                    </div>
                </div>
            </div>

            {results.length === 0 && (
                <div className="alert alert-warning" role="alert">
                    Sorry no results for the search <strong>{search}</strong>.
                </div>
            )}

            {results.length > 0 && (
                <div className="row g-4">
                    {results.map((order: Order) => {
                        return (
                            <div className="col" key={order.id}>
                                <OrderCard order={order} />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
