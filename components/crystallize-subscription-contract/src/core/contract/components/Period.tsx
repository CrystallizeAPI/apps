import React from 'react';
import { Tag } from '@crystallize/design-system';

export const Period: React.FC<{ period: any; label: string }> = ({ period, label }) => {
    return (
        <div className="bg-yellow-50 flex rounded-md gap-8 ">
            <div className="w-full bg-white rounded border">
                <div className="justify-end  px-4">
                    <h3 className="font-medium text-xs text-gray-500 w-full py-1 border-b">{label}</h3>
                    <div className="flex flex-col py-2">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold">{period.price}</span>
                            <Tag size="xs" variant="default">
                                {period.currency.toUpperCase()}{' '}
                            </Tag>{' '}
                        </div>
                        {period.period && period.unit && (
                            <div className="font-medium italic text-gray-500 text-xs">
                                / {period.period} {period.unit}
                            </div>
                        )}
                    </div>
                </div>
                {period.meteredVariables?.map((meteredVariable: any) => {
                    return (
                        <div className="px-4 " key={meteredVariable.id}>
                            <div className="border-t py-3 w-full">
                                <div className="flex justify-between w-full">
                                    <span className="text-xs font-medium text-gray-500">{meteredVariable.name}</span>
                                    <span className="text-xs font-medium text-gray-500">
                                        {meteredVariable.tierType}
                                    </span>
                                </div>

                                {meteredVariable.tiers.map((tier: any, tierIndex: number) => {
                                    const to = meteredVariable.tiers[tierIndex + 1]?.threshold || '';

                                    return (
                                        <div
                                            key={`tier${tierIndex}`}
                                            className="flex justify-between text-sm py-1 rounded-sm px-2 child even:bg-gray-100"
                                        >
                                            <div className="text-sm font-bold text-gray-500">
                                                <span>{tier.threshold}</span>
                                                {to && <span> {to}</span>}
                                            </div>
                                            <span>
                                                <span className="text-sm font-bold text-gray-500">{tier.price}</span>
                                                <Tag size="xs" className="mx-1">
                                                    {tier.currency?.toUpperCase()}
                                                </Tag>
                                                <span className="text-xs italic font-medium text-gray-500">
                                                    / per {meteredVariable.unit}
                                                </span>
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
