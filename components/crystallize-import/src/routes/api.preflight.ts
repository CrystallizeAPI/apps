import { JSONItem } from '@crystallize/import-utilities';
import { type ActionFunctionArgs, json } from '@remix-run/node';
import { specFromFormSubmission } from '~/core.server/spec-from-form-submission.server';
import CrystallizeAPI from '~/core.server/use-cases/crystallize';

type Results = {
    validCount: number;
    errorCount: number;
    errors: {
        item: JSONItem;
        errors: any[];
    }[];
};
export const action = async ({ request }: ActionFunctionArgs) => {
    const api = await CrystallizeAPI(request);
    const [validationRules, shapes] = await Promise.all([api.fetchValidationsSchema(), api.fetchShapes()]);
    try {
        const spec = await specFromFormSubmission(await request.json(), shapes);
        const items = spec.items ?? [];

        const results = items.reduce(
            (memo: Results, item) => {
                const validate = validationRules?.[item.shape]?.validate;
                if (!validate) {
                    return {
                        ...memo,
                        validCount: memo.validCount + 1,
                    };
                }
                const valid = validate(item);

                if (!valid) {
                    return {
                        ...memo,
                        errorCount: memo.errorCount + 1,
                        errors: [
                            ...memo.errors,
                            {
                                item,
                                errors: [...(validate.errors ?? [])],
                            },
                        ],
                    };
                }

                return {
                    ...memo,
                    validCount: memo.validCount + 1,
                };
            },
            {
                validCount: 0,
                errorCount: 0,
                errors: [],
            },
        );
        return json({ results }, 200);
    } catch (err: any) {
        console.error(err);
        return json({ message: err.error }, 500);
    }
};
