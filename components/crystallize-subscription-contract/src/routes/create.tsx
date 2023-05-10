import { json, LinksFunction, LoaderFunction, redirect } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useState } from 'react';
import { ContractFormApp } from '~/core/contract/ContractFormApp';
import { Period } from '~/core/contract/components/Period';
import datepickerStyles from 'react-datepicker/dist/react-datepicker.css';
import CrystallizeAPI from 'src/core.server/use-cases/crystallize';
import { Button } from '@crystallize/design-system';
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
        <div>
            <div>
                <p>In order to create a Subscription you need to pick</p>
                <ul>
                    <li>a Product</li>
                    <li>a Variant</li>
                    <li>a Plan</li>
                    <li>a Period</li>
                    <li>a Price Variant</li>
                </ul>
            </div>
            <Products products={products} state={state} dispatch={setState} />
        </div>
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
            <Period period={displayablePeriod} label="Recurring period" />
            <Button variant="elevate" disabled={state.loading} onClick={() => onSelect()}>
                Create a new contract
            </Button>
        </>
    );
};

const Products: React.FC<{ products: any[]; state: any; dispatch: Function }> = ({ products, state, dispatch }) => {
    return (
        <div>
            {products.map((product: any, index: number) => {
                return (
                    <details key={product.id}>
                        <summary>{product.name} - Product</summary>
                        <div>
                            <div>
                                <Variants product={product} state={state} dispatch={dispatch} />
                            </div>
                        </div>
                    </details>
                );
            })}
        </div>
    );
};

const Variants: React.FC<{ product: any; state: any; dispatch: Function }> = ({ product, state, dispatch }) => {
    return (
        <div>
            {product.variants.map((variant: any) => {
                return (
                    <details key={variant.id}>
                        <summary>{variant.name} - Variant</summary>
                        <div>
                            <div>
                                <Plans product={product} variant={variant} state={state} dispatch={dispatch} />
                            </div>
                        </div>
                    </details>
                );
            })}
        </div>
    );
};

const Plans: React.FC<{ product: any; variant: any; state: any; dispatch: Function }> = ({
    product,
    variant,
    state,
    dispatch,
}) => {
    return (
        <div>
            {variant.subscriptionPlans?.map((plan: any) => {
                return (
                    <details key={plan.identifier}>
                        <summary>{plan.name} - Plan</summary>
                        <div>
                            <div>
                                <Periods
                                    product={product}
                                    variant={variant}
                                    plan={plan}
                                    state={state}
                                    dispatch={dispatch}
                                />
                            </div>
                        </div>
                    </details>
                );
            })}
        </div>
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
        <div>
            {plan.periods?.map((period: any) => {
                return (
                    <details key={period.id}>
                        <summary>{period.name} - Period</summary>
                        <div>
                            <div>
                                <PriceVariants
                                    product={product}
                                    variant={variant}
                                    plan={plan}
                                    period={period}
                                    state={state}
                                    dispatch={dispatch}
                                />
                            </div>
                        </div>
                    </details>
                );
            })}
        </div>
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
        <div>
            {period.initial?.priceVariants?.map((priceVariant: any) => {
                return (
                    <details key={priceVariant.identifier}>
                        <summary>Initial - {priceVariant.identifier} - Price Variant</summary>
                        <div>
                            <Leaf
                                product={product}
                                variant={variant}
                                plan={plan}
                                period={period}
                                priceVariant={priceVariant}
                                state={state}
                                dispatch={dispatch}
                            />
                        </div>
                    </details>
                );
            })}
            {period.recurring?.priceVariants?.map((priceVariant: any) => {
                return (
                    <details key={priceVariant.identifier}>
                        <summary>Recurring - {priceVariant.identifier} - Price Variant</summary>
                        <div>
                            <Leaf
                                product={product}
                                variant={variant}
                                plan={plan}
                                period={period}
                                priceVariant={priceVariant}
                                state={state}
                                dispatch={dispatch}
                            />
                        </div>
                    </details>
                );
            })}
        </div>
    );
};
