import { Address as AdressType } from '@crystallize/js-api-client';

export const Address: React.FC<{ address: AdressType }> = ({ address }) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col">{address.firstName}</div>
                <div className="col">{address.lastName}</div>
            </div>
            <div className="row">
                <div className="col">{address.email}</div>
                <div className="col">{address.phone}</div>
            </div>
            <div className="row">
                {address.streetNumber && <div className="col">{address.streetNumber}</div>}
                <div className="col">{address.street}</div>
                <div className="col">{address.street2}</div>
            </div>
            <div className="row">
                {address.postalCode && <div className="col">{address.postalCode}</div>}
                {address.city && <div className="col">{address.city}</div>}
                {address.country && <div className="col">{address.country}</div>}
            </div>
        </div>
    );
};
