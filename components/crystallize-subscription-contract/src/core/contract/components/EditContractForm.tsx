import { Address } from '@crystallize/js-api-client';
import { Link } from '@remix-run/react';
import { AddressForm } from './AddressForm';
import { useContract } from '../provider';
import { FormEvent } from 'react';
import { SubscriptionForm } from './SubscriptionForm';
import { Button, IconButton, Icon } from '@crystallize/design-system';
import { formatDate } from '~/libs';

export const EditContractForm: React.FC<{ submit: (event: FormEvent<HTMLFormElement>) => void }> = ({ submit }) => {
    const { state, dispatch } = useContract();
    const { contract } = state;
    const { status, customerIdentifier, customer } = contract;
    const willRenew = status.renewAt;
    const renewAt = formatDate(status.renewAt);
    const activeUntil = formatDate(status.activeUntil);
    const date = willRenew ? renewAt : activeUntil;
    console.log({ contract });
    return (
        <form method="post" onSubmit={submit} className="min-h-[100vh]">
            <div>
                <div className="flex items-center gap-6 justify-between border-b pb-3 mb-6 pt-6">
                    <div className="flex items-center gap-6">
                        <Link to="/">
                            <IconButton variant="elevate">
                                <Icon.Arrow className="rotate-90 w-4 h-4" />
                            </IconButton>
                        </Link>
                        <span className="font-medium"> #{contract.id}</span>
                    </div>
                    <Button intent="action" size="sm" type="submit" disabled={state.loading}>
                        Save the changes
                    </Button>
                </div>

                <div className="flex gap-6 items-stretch">
                    <div className="w-36 bg-white shadow border rounded-md  overflow-hidden">
                        <div className="text-center w-full h-full relative flex flex-col ">
                            {willRenew ? (
                                <label className="px-2 w-full block border-b text-xs py-1 font-bold bg-green-50 text-green-600">
                                    Renew at
                                </label>
                            ) : (
                                <label className="px-2 w-full block border-b text-xs py-1 font-bold bg-pink-50 text-pink-600">
                                    Active until
                                </label>
                            )}
                            <div className="h-full flex  pb-2 flex-col items-center justify-center">
                                <div className="pt-2 text-lg">{date.year}</div>
                                <div className="font-bold text-5xl">{date.day}</div>
                                <div className="text-lg">{date.month}</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-md border shadow px-6 py-6 w-5/12">
                        <div>
                            {!customer && <p>No Customer Information</p>}
                            {customer && (
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-500 text-xs">Identifier</span>
                                        <span>{customerIdentifier}</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-500 text-xs">Name</span>
                                        <div>
                                            {customer.firstName} {customer.lastName}
                                        </div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-500 text-xs">Phone</span>
                                        <span> {customer.phone}</span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="font-medium text-gray-500 text-xs">Email</span>
                                        <span>{customer.email}</span>
                                    </div>
                                    {customer.companyName && (
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-500 text-xs">Company</span>
                                            <span>{customer.companyName}</span>
                                        </div>
                                    )}
                                    {customer.taxNumber && (
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-500 text-xs">Tax number</span>
                                            <span> {customer.taxNumber}</span>
                                        </div>
                                    )}
                                    <div className="col-span-2 pt-2 mt-2">
                                        <a
                                            href={`https://pim.crystallize.com/en/${customerIdentifier}`}
                                            target="_blank"
                                        >
                                            <Button as="span" size="sm" prepend={<Icon.Users />}>
                                                Go to customer
                                            </Button>
                                        </a>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        {contract.addresses?.map((address: Address, index: number) => {
                            return (
                                <AddressForm
                                    key={`address-${index}`}
                                    addressIndex={index}
                                    type={`${address.type}`}
                                    value={address}
                                    onChange={(property: string, value: string) =>
                                        dispatch.updateAddress(index, { [property]: value })
                                    }
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="mt-6">
                    <SubscriptionForm />
                </div>
            </div>
        </form>
    );
};
