import { json, LinksFunction, LoaderFunction, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Alert, Button, Container } from 'react-bootstrap';
import { IoIosCreate } from 'react-icons/io';
import { useState } from 'react';
import { ContractFormApp } from '~/core/contract/ContractFormApp';
import Accordion from 'react-bootstrap/Accordion';
import { Period } from '~/core/contract/components/Period';
import datepickerStyles from 'react-datepicker/dist/react-datepicker.css';
import { GrInfo } from 'react-icons/gr';
import CrystallizeAPI from 'src/core.server/use-cases/crystallize';

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: datepickerStyles }];
};

export const loader: LoaderFunction = async ({ request, params }) => {
    const api = await CrystallizeAPI(request);
    const products = await api.fetchSubscriptionCatalogue();
    return json({ products });
};

export default () => {
    const { products } = useLoaderData();
    const [state, setState] = useState({ loading: false, template: null });

    if (state.template !== null) {
        return <ContractFormApp contract={state.template} mode="create" />;
    }

    return (
        <Container>
            <Alert variant={'success'}>
                <p>In order to create a Subscription you need to pick</p>
                <ul>
                    <li>a Product</li>
                    <li>a Variant</li>
                    <li>a Plan</li>
                    <li>a Period</li>
                    <li>a Price Variant</li>
                </ul>
            </Alert>
            <Products products={products} state={state} dispatch={setState} />
        </Container>
    );
};

const Leaf: React.FC<{
    product: any;
    variant: any;
    plan: any;
    period: any;
    priceVariant: any;
    state: any;
    dispatch: Function;
}> = ({ product, variant, plan, period, priceVariant, state, dispatch }) => {
    const displayablePeriod = {
        price: priceVariant.price,
        currency: priceVariant.currency,
        period: period.recurring.period,
        unit: period.recurring.unit,
        meteredVariables: period.recurring.meteredVariables.map((meteredVariable: any) => {
            return {
                ...meteredVariable,
                tiers: meteredVariable.tiers.map((tier: any) => {
                    return {
                        ...tier,
                        price: tier.priceVariants.filter((pv: any) => pv.identifier === priceVariant.identifier)[0]
                            ?.price,
                        currency: tier.priceVariants.filter((pv: any) => pv.identifier === priceVariant.identifier)[0]
                            ?.currency,
                    };
                }),
            };
        }),
    };
    const onSelect = async () => {
        dispatch({
            ...state,
            loading: true,
        });
        const response = await fetch('/api/template/get', {
            method: 'POST',
            body: JSON.stringify({
                productPath: product.path,
                variantId: variant.id,
                planIdentifier: plan.identifier,
                periodId: period.id,
                priceVariant: priceVariant.identifier,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const body = await response.json();
            dispatch({
                ...state,
                loading: false,
                template: body.template,
            });
        }
    };

    return (
        <>
            <Period period={displayablePeriod} />
            <Alert variant={'info'}>
                <GrInfo /> * this is the recurring period information here.
            </Alert>
            <Button variant="primary" size="sm" disabled={state.loading} onClick={() => onSelect()}>
                <IoIosCreate /> Create a new contract
            </Button>
        </>
    );
};

const Products: React.FC<{ products: any[]; state: any; dispatch: Function }> = ({ products, state, dispatch }) => {
    return (
        <Accordion>
            {products.map((product: any, index: number) => {
                return (
                    <Accordion.Item eventKey={product.id} key={product.id}>
                        <Accordion.Header>{product.name} - Product</Accordion.Header>
                        <Accordion.Body>
                            <Accordion>
                                <Variants product={product} state={state} dispatch={dispatch} />
                            </Accordion>
                        </Accordion.Body>
                    </Accordion.Item>
                );
            })}
        </Accordion>
    );
};

const Variants: React.FC<{ product: any; state: any; dispatch: Function }> = ({ product, state, dispatch }) => {
    return (
        <Accordion>
            {product.variants.map((variant: any) => {
                return (
                    <Accordion.Item eventKey={variant.id} key={variant.id}>
                        <Accordion.Header>{variant.name} - Variant</Accordion.Header>
                        <Accordion.Body>
                            <Accordion>
                                <Plans product={product} variant={variant} state={state} dispatch={dispatch} />
                            </Accordion>
                        </Accordion.Body>
                    </Accordion.Item>
                );
            })}
        </Accordion>
    );
};

const Plans: React.FC<{ product: any; variant: any; state: any; dispatch: Function }> = ({
    product,
    variant,
    state,
    dispatch,
}) => {
    return (
        <Accordion>
            {variant.subscriptionPlans?.map((plan: any) => {
                return (
                    <Accordion.Item eventKey={plan.identifier} key={plan.identifier}>
                        <Accordion.Header>{plan.name} - Plan</Accordion.Header>
                        <Accordion.Body>
                            <Accordion>
                                <Periods
                                    product={product}
                                    variant={variant}
                                    plan={plan}
                                    state={state}
                                    dispatch={dispatch}
                                />
                            </Accordion>
                        </Accordion.Body>
                    </Accordion.Item>
                );
            })}
        </Accordion>
    );
};

const Periods: React.FC<{ product: any; variant: any; plan: any; state: any; dispatch: Function }> = ({
    product,
    variant,
    plan,
    state,
    dispatch,
}) => {
    return (
        <Accordion>
            {plan.periods?.map((period: any) => {
                return (
                    <Accordion.Item eventKey={period.id} key={period.id}>
                        <Accordion.Header>{period.name} - Period</Accordion.Header>
                        <Accordion.Body>
                            <Accordion>
                                <PriceVariants
                                    product={product}
                                    variant={variant}
                                    plan={plan}
                                    period={period}
                                    state={state}
                                    dispatch={dispatch}
                                />
                            </Accordion>
                        </Accordion.Body>
                    </Accordion.Item>
                );
            })}
        </Accordion>
    );
};

const PriceVariants: React.FC<{
    product: any;
    variant: any;
    plan: any;
    period: any;
    state: any;
    dispatch: Function;
}> = ({ product, variant, plan, period, state, dispatch }) => {
    return (
        <Accordion>
            {period.initial?.priceVariants?.map((priceVariant: any) => {
                return (
                    <Accordion.Item key={priceVariant.identifier} eventKey={priceVariant.identifier}>
                        <Accordion.Header>Initial - {priceVariant.identifier} - Price Variant</Accordion.Header>
                        <Accordion.Body>
                            <Leaf
                                product={product}
                                variant={variant}
                                plan={plan}
                                period={period}
                                priceVariant={priceVariant}
                                state={state}
                                dispatch={dispatch}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                );
            })}
            {period.recurring?.priceVariants?.map((priceVariant: any) => {
                return (
                    <Accordion.Item key={priceVariant.identifier} eventKey={priceVariant.identifier}>
                        <Accordion.Header>Recurring - {priceVariant.identifier} - Price Variant</Accordion.Header>
                        <Accordion.Body>
                            <Leaf
                                product={product}
                                variant={variant}
                                plan={plan}
                                period={period}
                                priceVariant={priceVariant}
                                state={state}
                                dispatch={dispatch}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                );
            })}
        </Accordion>
    );
};
