import * as yup from 'yup';

export const NewTransactionFormValidationSchema = yup.object().shape({
  comment: yup.string().max(25, "It's so long").required('Required'),
  amount: yup
    .string()
    .max(12, "It's so much")
    .test({
      test: v => !isNaN(Number(v)),
      message: 'Invalid number',
    })
    .required('Required'),
});
