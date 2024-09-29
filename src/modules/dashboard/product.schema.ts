import * as yup from 'yup';

export const filterSchema = yup.object({
    selectCategory: yup.string(),
    minPrice: yup
        .number()
        .min(0)
        .nullable()
        .test('', 'От < До', (value, context) => {
            if (!value && !context.parent.maxPrice) return true;
            if (value && value < context.parent.maxPrice) return true;
            return false;
        }),
    maxPrice: yup
        .number()
        .min(0)
        .nullable()
        .test('', 'От < До', (value, context) => {
            if (!value && !context.parent.minPrice) return true;
            if (value && value > context.parent.minPrice) return true;
            return false;
        })
});
