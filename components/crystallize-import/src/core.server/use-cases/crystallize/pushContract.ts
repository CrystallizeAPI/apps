import { ClientInterface, createSubscriptionContractManager } from '@crystallize/js-api-client';
import dayjs from 'dayjs';
import { z } from 'zod';
import { Contract, ContractError } from '~/core/contract/types';

const floatifyPrice = (period: any) => {
    return {
        ...period,
        price: parseFloat(period.price),
        currency: period.currency.toUpperCase(),
        meteredVariables: period.meteredVariables.map((variable: any) => {
            const { identifier, name, unit, ...rest } = variable;
            return {
                ...rest,
                tiers: variable.tiers.map((tier: any) => {
                    return {
                        ...tier,
                        price: parseFloat(tier.price),
                        currency: tier.currency.toUpperCase(),
                    };
                }),
            };
        }),
    };
};

const normalizeContract = (contract: Contract): Contract => {
    const { period: rPeriod, unit: rUnit, ...recurring } = contract.recurring;
    const cleanReccuring = floatifyPrice(recurring);

    const cleanAddresses = contract.addresses?.map((address: any) => {
        const { id, ...rest } = address;
        Object.keys(rest).forEach((key: string) => {
            if (rest[key] === null) {
                delete rest[key];
            }
        });
        return {
            ...rest,
        };
    });

    if (!contract.initial) {
        return {
            recurring: cleanReccuring,
            addresses: cleanAddresses,
        };
    }

    const { period: iPeriod, unit: iUnit, ...initial } = contract.initial;
    const cleanInitial = floatifyPrice(initial);

    return {
        initial: cleanInitial,
        recurring: cleanReccuring,
        addresses: cleanAddresses,
    };
};

function wrapException(exception: any | z.ZodError): ContractError[] {
    let errors: any[] = [];
    if (exception.issues) {
        for (const issue of exception.issues) {
            errors.push({ path: issue.path.join('.'), message: issue.message });
        }
    } else {
        console.log(exception);
        console.log(exception.errors[0].extensions);
        errors.push({ path: 'fatal', message: exception.message ?? exception.errors[0].message });
    }
    return errors;
}

export async function updateContract(
    apiClient: ClientInterface,
    contractId: string,
    contract: Contract,
): Promise<{ contract: Contract; errors: ContractError[] }> {
    const cleanUpdateContract = normalizeContract(contract);
    const manager = createSubscriptionContractManager(apiClient);
    try {
        await manager.update(contractId, cleanUpdateContract);
        return {
            errors: [],
            contract,
        };
    } catch (exception) {
        return { errors: wrapException(exception), contract };
    }
}

export async function createContract(
    apiClient: ClientInterface,
    contract: Contract,
): Promise<{ contract: Contract; errors: ContractError[] }> {
    const cleanUpdateContract = normalizeContract(contract);
    const manager = createSubscriptionContractManager(apiClient);
    try {
        console.log({
            ...cleanUpdateContract,
            customerIdentifier: contract.customerIdentifier,
            item: contract.item,
            tenantId: apiClient.config.tenantId,
            subscriptionPlan: contract.subscriptionPlan,
            status: {
                activeUntil: dayjs(contract.status?.activeUntil).toDate() ?? new Date(),
                renewAt: dayjs(contract.status?.renewAt).toDate() ?? new Date(),
                price: cleanUpdateContract.recurring.price,
                currency: cleanUpdateContract.recurring.currency,
            },
        });
        const data = await manager.create({
            ...cleanUpdateContract,
            customerIdentifier: contract.customerIdentifier,
            item: contract.item,
            tenantId: apiClient.config.tenantId,
            subscriptionPlan: contract.subscriptionPlan,
            status: {
                activeUntil: dayjs(contract.status?.activeUntil).toDate() ?? new Date(),
                renewAt: dayjs(contract.status?.renewAt).toDate() ?? new Date(),
                price: cleanUpdateContract.recurring.price,
                currency: cleanUpdateContract.recurring.currency,
            },
        });
        return {
            errors: [],
            contract: {
                ...contract,
                id: data.id,
            },
        };
    } catch (exception) {
        return { errors: wrapException(exception), contract };
    }
}
