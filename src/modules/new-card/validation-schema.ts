import * as yup from 'yup';

export const NewCardFormValidationSchema = yup.object().shape({
  cardName: yup.string().max(25, "It's so long").required('Required'),
  initialAmount: yup
    .string()
    .max(12, "It's so much")
    .test({
      test: v => !isNaN(Number(v)),
      message: 'Invalid number',
    })
    .required('Required'),
});
