export type CrystallizeCartItem = {
    imageUrl: string;
    name: string;
    sku: string;
    subTotal: {
        currency: string;
        net: number;
        gross: number;
    };
};

export type CrystallizeProduct = {
    id: string;
    name: string;
    variants: {
        sku: string;
    }[];
};

export type CrystallizeOrder = {
    orderId: string;
    createdAt: string;
    cart: CrystallizeCartItem[];
    payment: {
        properties: {
            value: string;
            property: string;
        }[];
        provider: string;
    }[];
    customer: {
        identifier: string;
    };
    invalidLabels: CrystallizeOrderLabel[];
};

export type CrystallizeOrderSearchNode = {
    node: CrystallizeOrder;
};

export type CrystallizeOrderLabel = 'missing-payment-information' | 'incomplete-payment-information';

export type CrystallizeCustomerLabel = 'missing-address' | 'missing-street-number';

export type CrystallizeCustomer = {
    addresses: {
        type: string;
        city: string;
        country: string;
        postalCode: string;
        street: string;
        streetNumber: string;
    }[];
    email: string;
    identifier: string;
    phone: string;
    firstName: string;
    lastName: string;
    orders?: CrystallizeOrder[];
    invalidLabels: CrystallizeCustomerLabel[];
};

export type CrystallizeCustomerSearchNode = {
    node: CrystallizeCustomer;
};
