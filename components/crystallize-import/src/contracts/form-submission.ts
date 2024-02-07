import type { Shape } from '@crystallize/schema';
import type { Item } from '@crystallize/schema';

export interface FormSubmission {
    shape: Shape;
    folder?: Item;
    rows: Record<string, any>[];
    mapping: Record<string, string>;
    groupProductsBy?: string;
}
