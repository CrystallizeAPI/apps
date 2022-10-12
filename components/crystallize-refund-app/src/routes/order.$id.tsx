import { json, LoaderFunction } from '@remix-run/server-runtime';
import { Form, Link, useLoaderData, useTransition } from '@remix-run/react';
import CrystallizeAPI from 'src/core.server/use-cases/crystallize';
import { Address as AddressType, Order, OrderItem } from '@crystallize/js-api-client';
import { Address } from 'src/components/Address';
import { useState } from 'react';
import { ActionFunction, redirect } from '@remix-run/node';
import { Refunds } from 'src/core.server/use-cases/crystallize/pushCreditNote';
import { FaRegCreditCard } from 'react-icons/fa';

export const loader: LoaderFunction = async ({ request, params }) => {
    const api = await CrystallizeAPI(request);
    const order = await api.fetchOrderById(params.id!);
    return json({ order });
};

export const action: ActionFunction = async ({ request, params }) => {
    const body = await request.formData();
    const data = Object.fromEntries(body.entries()) as Refunds;
    const api = await CrystallizeAPI(request);
    const order = await api.fetchOrderById(params.id!);
    const creditNoteConfirmation = await api.pushCreditNote(order, data);
    return redirect(`/order/${order.id}?creditNoteConfirmation=${creditNoteConfirmation.id}`);
};

export default () => {
    const { order } = useLoaderData() as unknown as { order: Order };
    const transition = useTransition();
    const [refunds, setRefunds] = useState<Refunds>({});
    const isCredit = (order?.total?.gross || 0) < 0;

    const refundAmount = (item: OrderItem, value: string) => {
        setRefunds({
            ...refunds,
            [`${item.sku}`]: value,
        });
    };

    const totalRefund = Object.keys(refunds).reduce((memo: number, key: string) => {
        const value = parseFloat(refunds[key]);
        if (isNaN(value)) {
            return memo;
        }
        return memo + value;
    }, 0);

    const existingRefunds =
        order?.meta
            ?.filter((meta) => meta.key.includes('refund-'))
            .map((meta) => {
                return {
                    refundId: meta.key.split('-')[1],
                    amount: meta.value,
                };
            }) || [];

    const connectedOrders =
        order?.meta
            ?.filter((meta) => meta.key === 'refundFromOrder')
            .map((meta) => {
                return {
                    id: meta.value,
                };
            }) || [];

    return (
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <Link to={'/'}>Dashboard</Link>
                    </li>
                    <li className="breadcrumb-item active">Order #{order.id}</li>
                </ol>
            </nav>
            <h2>{isCredit ? 'View a Credit Note' : 'Generate a Refund'}</h2>
            <div className="row">
                <div className="col">
                    <div className="customer-fieldset">
                        <h3>
                            Customer <small>#{order.customer.identifier}</small>
                        </h3>
                        <p>
                            {order.customer.firstName} {order.customer.lastName}
                        </p>
                        {order.customer.companyName && (
                            <p>
                                <strong>Company Name</strong>: {order.customer.companyName}
                            </p>
                        )}
                    </div>
                </div>
                {order?.customer?.addresses && (
                    <div className="row">
                        {order.customer.addresses.map((address: AddressType, index: number) => {
                            return (
                                <div className="col" key={index}>
                                    <div className="address-fieldset">
                                        <h3>Address ({address.type as unknown as string})</h3>
                                        <Address address={address} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {existingRefunds.length > 0 && (
                    <div className="row">
                        {existingRefunds.map((refund) => (
                            <div key={refund.refundId} className="alert alert-danger" role="alert">
                                A refund of{' '}
                                <strong>
                                    {refund.amount} {order?.total?.currency}
                                </strong>{' '}
                                has already been issued for this order.{' '}
                                <Link to={`/order/${refund.refundId}`}>View Credit Note</Link>
                            </div>
                        ))}
                    </div>
                )}

                {connectedOrders.length > 0 && (
                    <div className="row">
                        {connectedOrders.map((order) => (
                            <div key={order.id} className="alert alert-success" role="alert">
                                This is a Credit Note generatd for Order <strong>#{order.id}</strong>.{' '}
                                <Link to={`/order/${order.id}`}>View Order</Link>
                            </div>
                        ))}
                    </div>
                )}

                <Form className="row py-4" method="post">
                    <table className="table table-striped table-hover">
                        <tbody>
                            <tr>
                                <th> </th>
                                <th>Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                                {!isCredit && <th>Refund Amount</th>}
                            </tr>
                            {order.cart.map((item: OrderItem, index: number) => {
                                const preselectRefund = [25, 50, 75, 100];
                                return (
                                    <tr key={index}>
                                        <td>
                                            <img src={item.imageUrl} width={100} />
                                        </td>
                                        <td style={{ whiteSpace: 'nowrap' }} valign="middle">
                                            {item.name}
                                        </td>
                                        <td valign="middle">{item.quantity}</td>
                                        {item.price && (
                                            <td valign="middle">
                                                {item.price.gross! * item.quantity} {item.price.currency.toUpperCase()}
                                            </td>
                                        )}
                                        {!isCredit && item.price && (
                                            <td valign="middle">
                                                <div className="input-group mb-3">
                                                    <input
                                                        type="number"
                                                        name={`${item.sku}`}
                                                        value={refunds[`${item.sku}`] ?? 0.0}
                                                        step="0.01"
                                                        className="form-control"
                                                        onChange={(e) => refundAmount(item, e.target.value)}
                                                    />
                                                    <span className="input-group-text">
                                                        {item.price.currency.toUpperCase()}
                                                    </span>
                                                </div>
                                                <div className="btn-group" role="group">
                                                    {preselectRefund.map((percent: number) => {
                                                        return (
                                                            <button
                                                                onClick={() => {
                                                                    refundAmount(
                                                                        item,
                                                                        (
                                                                            (item?.price?.gross! || 0) *
                                                                            (percent / 100)
                                                                        ).toFixed(2),
                                                                    );
                                                                }}
                                                                key={percent}
                                                                type="button"
                                                                className="btn btn-outline-primary"
                                                            >
                                                                {percent}%
                                                            </button>
                                                        );
                                                    })}
                                                </div>
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
                                    <td valign="middle">
                                        {order.total.gross} {order.total.currency.toUpperCase()}
                                    </td>
                                    {!isCredit && (
                                        <td valign="middle">
                                            <button
                                                type="submit"
                                                disabled={totalRefund <= 0 || transition.state == 'submitting'}
                                                className="btn btn-outline-dark btn-lg"
                                            >
                                                <FaRegCreditCard className={'r-icon'} />
                                                {transition.state == 'submitting' ? 'Generating' : 'Trigger'} a refund
                                                of:
                                                <strong>
                                                    {totalRefund} {order.total.currency.toUpperCase()}
                                                </strong>
                                            </button>
                                        </td>
                                    )}
                                </tr>
                            )}
                        </tbody>
                    </table>
                </Form>
            </div>
        </div>
    );
};
