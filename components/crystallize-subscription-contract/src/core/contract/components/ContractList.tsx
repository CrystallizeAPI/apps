import { Link } from '@remix-run/react';
import { Period } from '~/core/contract/components/Period';
import { Contract } from '../types';
import { Icon, IconButton } from '@crystallize/design-system';
import { formatDate } from '~/libs';
export const ContractList: React.FC<{ contracts: Contract[] }> = ({ contracts }) => {
    return (
        <div className="mt-2 border rounded-md overflow-hidden">
            {contracts.map((contract: any, index: number) => {
                const { initial, recurring, subscriptionPlan, status } = contract;
                const willRenew = status.renewAt;
                const renewAt = formatDate(status.renewAt);
                const activeUntil = formatDate(status.activeUntil);
                const date = willRenew ? renewAt : activeUntil;
                return (
                    <details key={`${index}-${contract.id}`} className="bg-white  border-b">
                        <summary className="flex px-6 py-3">
                            <div className="flex items-center gap-2 w-full justify-between">
                                <span className="flex flex-col w-8/12 pl-4">
                                    <span className="font-medium flex relative ">
                                        <div
                                            className={`h-2 w-2 rounded-full top-2 absolute -left-4   ${
                                                willRenew ? 'bg-green-400' : 'bg-pink-500'
                                            }`}
                                        >
                                            {' '}
                                        </div>
                                        <div>
                                            {contract.customer.firstName} {contract.customer.lastName}
                                        </div>
                                    </span>
                                    <span className="text-xs font-medium italic opacity-80">
                                        {contract.customerIdentifier}
                                    </span>
                                </span>
                                <span className="text-sm">#{contract.id}</span>
                                {subscriptionPlan.name}
                                <div>
                                    <Link className="bg-purple-50" to={`/edit/${contract.id}`}>
                                        <IconButton>
                                            <Icon.Edit className="w-4 h-4" />
                                        </IconButton>
                                    </Link>
                                </div>
                            </div>
                        </summary>
                        <div className="py-4 border-t bg-yellow-50 px-6">
                            <div className="pl-3 flex shrink-0 gap-3">
                                <div className="w-1/12">
                                    <div className="border rounded-md w-full overflow-hidden">
                                        <div className="text-center bg-white pb-2 w-full">
                                            {willRenew ? (
                                                <label className="px-2 w-full block border-b text-xs py-1 font-bold bg-green-50 text-green-600">
                                                    Renew at
                                                </label>
                                            ) : (
                                                <label className="px-2 w-full block border-b text-xs py-1 font-bold bg-pink-50 text-pink-600">
                                                    Active until
                                                </label>
                                            )}
                                            <div className="text-sm pt-2">{date.year}</div>
                                            <div className="font-bold text-3xl">{date.day}</div>
                                            <div className="text-sm">{date.month}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full gap-6">
                                    {typeof initial?.price !== 'undefined' && (
                                        <span className="w-6/12">
                                            <Period period={initial} label="Initial Period" />
                                        </span>
                                    )}
                                    {typeof recurring.price !== 'undefined' && (
                                        <span className="w-6/12 ">
                                            <Period period={recurring} label="Recurring Period" />
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </details>
                );
            })}
        </div>
    );
};
