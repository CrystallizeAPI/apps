import { Order } from '@crystallize/js-api-client';
import { Link } from '@remix-run/react';
import { RiRefundFill } from 'react-icons/ri';

export const OrderCard: React.FC<{ order: Order }> = ({ order }) => {
    const isCredit = (order?.total?.gross || 0) < 0;
    return (
        <div className="card text-center">
            <div className="card-header">
                <h2 className="h6">
                    {isCredit ? 'Credit Note' : 'Order'} #{order.id}
                </h2>
            </div>
            <div className="card-body">
                <h3 className="card-title h6">
                    {order.customer.firstName} {order.customer.lastName} (#{order.customer.identifier})
                </h3>

                {order.cart.length > 0 && (
                    <table className="table table-striped table-hover">
                        <tbody>
                            <tr>
                                <th> </th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                            {order.cart.map((item: any, index: number) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                            <img src={item.imageUrl} width={100} />
                                        </td>
                                        <td style={{ whiteSpace: 'nowrap' }}>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        {item.price && (
                                            <td>
                                                {item.price.gross! * item.quantity} {item.price.currency.toUpperCase()}
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}
                            {order.total && (
                                <tr>
                                    <th colSpan={3} align="right">
                                        Total
                                    </th>
                                    <td>
                                        {order.total.gross} {order.total.currency.toUpperCase()}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}

                <Link to={`/order/` + order.id} className="btn btn-dark">
                    <RiRefundFill color="white" className="r-icon" />
                    {!isCredit ? 'Refund' : 'View'}
                </Link>
            </div>
            <div className="card-footer text-muted">
                {isCredit ? 'Refunded' : 'Ordered'} on {new Date(order.createdAt).toLocaleDateString('en-US')}
            </div>
        </div>
    );
};
