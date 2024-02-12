import { type ActionFunctionArgs, json } from '@remix-run/node';
import { FormSubmission } from '~/contracts/form-submission';
import { getCookieValue } from '~/core.server/auth.server';
import { runImport } from '~/core.server/import-runner.server';
import { specFromFormSubmission } from '~/core.server/spec-from-form-submission.server';
import CrystallizeAPI from '~/core.server/use-cases/crystallize';

export const action = async ({ request }: ActionFunctionArgs) => {
    const api = await CrystallizeAPI(request);
    const post: FormSubmission = await request.json();
    const [validationRules, shapes] = await Promise.all([api.fetchValidationsSchema(), api.fetchShapes()]);
    try {
        const spec = await specFromFormSubmission(post, shapes);
        const results = await runImport(
            spec,
            {
                onItemUpdated: async (item) => {
                    const push = (stageId: string) =>
                        api.pushItemToFlow(
                            {
                                id: item.id,
                                language: item.language,
                                version: post.doPublish === true ? 'published' : 'draft',
                            },
                            stageId,
                        );

                    const validate = validationRules?.[item.shape.identifier]?.validate;
                    if (!validate) {
                        // no validation
                        if (post.validFlowStage) {
                            await push(post.validFlowStage);
                        }
                        return;
                    }
                    const valid = validate(item);
                    if (!valid) {
                        if (post.invalidFlowStage) {
                            await push(post.invalidFlowStage);
                        }
                        return;
                    }

                    if (post.validFlowStage) {
                        await push(post.validFlowStage);
                    }
                    return;
                },
            },
            {
                tenantIdentifier: api.apiClient.config.tenantIdentifier,
                skipPublication: !(post.doPublish === true),
                sessionId: getCookieValue(request, 'connect.sid'),
            },
        );

        return json(results, 200);
    } catch (err: any) {
        console.error(err);
        return json({ message: err.error }, 500);
    }
};
