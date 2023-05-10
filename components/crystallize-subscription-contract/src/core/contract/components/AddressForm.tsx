import { Address } from '@crystallize/js-api-client';
import { ContractError } from './Error';
import { Input } from '@crystallize/design-system';
export const AddressForm: React.FC<{
    type: string;
    value: Address | null;
    addressIndex: number;
    onChange: Function;
}> = ({ type, value, addressIndex, onChange }) => {
    return (
        <div className="grid grid-cols-3 gap-4  rounded mb-6 ">
            <div className="col-span-3 font-medium text-sm text-gray-500">Address {type}</div>
            <div className="bg-white rounded shadow">
                <label htmlFor="firstName" className="pt-2 block w-full px-6 text-xs font-medium text-gray-500">
                    First name
                </label>
                <input
                    id="firstName"
                    className="block w-full pb-3 px-6 pt-1 placeholder:italic text-sm font-medium !outline-none"
                    placeholder="Luke"
                    type="text"
                    value={value?.firstName || ''}
                    onChange={(event) => onChange('firstName', event.target.value)}
                />
                <ContractError path={`addresses.${addressIndex}.firstName`} />
            </div>
            <div className="bg-white rounded shadow">
                <label htmlFor="lastname" className="pt-2 block w-full px-6 text-xs font-medium text-gray-500">
                    Last name
                </label>
                <input
                    id="lastName"
                    className="block w-full pb-3 px-6 pt-1 placeholder:italic text-sm font-medium !outline-none"
                    placeholder="Skywalker"
                    type="text"
                    value={value?.lastName || ''}
                    onChange={(event) => onChange('lastName', event.target.value)}
                />
                <ContractError path={`addresses.${addressIndex}.lastName`} />
            </div>
            <div className="bg-white rounded shadow">
                <label htmlFor="street" className="pt-2 block w-full px-6 text-xs font-medium text-gray-500">
                    Street
                </label>
                <input
                    id="street"
                    className="block w-full pb-3 px-6 pt-1 placeholder:italic text-sm font-medium !outline-none"
                    placeholder="Street"
                    type="text"
                    value={value?.street || ''}
                    onChange={(event) => onChange('street', event.target.value)}
                />
                <ContractError path={`addresses.${addressIndex}.street`} />
            </div>
            <div className="bg-white rounded shadow">
                <label htmlFor="street2" className="pt-2 block w-full px-6 text-xs font-medium text-gray-500">
                    Street Complement
                </label>
                <input
                    id="street2"
                    className="!px-4 !py-2 block"
                    type="text"
                    placeholder="apt 4-2"
                    value={value?.street2 || ''}
                    onChange={(event) => onChange('street2', event.target.value)}
                />
                <ContractError path={`${addressIndex}.street2`} />
            </div>
            <div className="bg-white rounded shadow">
                <label htmlFor="streetNumber" className="pt-2 block w-full px-6 text-xs font-medium text-gray-500">
                    Street Numer
                </label>
                <input
                    id="streetNumber"
                    className="block w-full pb-3 px-6 pt-1 placeholder:italic text-sm font-medium !outline-none"
                    type="text"
                    placeholder="42"
                    value={value?.streetNumber || ''}
                    onChange={(event) => onChange('streetNumber', event.target.value)}
                />
                <ContractError path={`addresses.${addressIndex}.streetNumber`} />
            </div>
            <div className="bg-white rounded shadow">
                <label htmlFor="zipcode" className="pt-2 block w-full px-6 text-xs font-medium text-gray-500">
                    Zipcode
                </label>
                <input
                    id="zipcode"
                    className="block w-full pb-3 px-6 pt-1 placeholder:italic text-sm font-medium !outline-none"
                    type="text"
                    placeholder="321"
                    value={value?.postalCode || ''}
                    onChange={(event) => onChange('postalCode', event.target.value)}
                />
                <ContractError path={`${addressIndex}.postalCode`} />
            </div>
            <div className="bg-white rounded shadow">
                <label htmlFor="city" className="pt-2 block w-full px-6 text-xs font-medium text-gray-500">
                    City
                </label>
                <input
                    id="city"
                    className="block w-full pb-3 px-6 pt-1 placeholder:italic text-sm font-medium !outline-none"
                    type="text"
                    placeholder="Freetown"
                    value={value?.city || ''}
                    onChange={(event) => onChange('city', event.target.value)}
                />
                <ContractError path={`addresses.${addressIndex}.city`} />
            </div>
            <div className="bg-white rounded shadow">
                <label htmlFor="country" className="pt-2 block w-full px-6 text-xs font-medium text-gray-500">
                    Country
                </label>{' '}
                <input
                    id="country"
                    className="block w-full pb-3 px-6 pt-1 placeholder:italic text-sm font-medium !outline-none"
                    type="text"
                    placeholder="Tatooine"
                    value={value?.country || ''}
                    onChange={(event) => onChange('country', event.target.value)}
                />
                <ContractError path={`addresses.${addressIndex}.country`} />
            </div>
            <div className="bg-white rounded shadow">
                <label htmlFor="state" className="pt-2 block w-full px-6 text-xs font-medium text-gray-500">
                    State/Province
                </label>
                <input
                    id="state"
                    className="block w-full pb-3 px-6 pt-1 placeholder:italic text-sm font-medium !outline-none"
                    type="text"
                    placeholder="Outskirts"
                    value={value?.state || ''}
                    onChange={(event) => onChange('state', event.target.value)}
                />
                <ContractError path={`addresses.${addressIndex}.state`} />
            </div>
        </div>
    );
};
