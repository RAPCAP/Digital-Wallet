import * as yup from 'yup';

export const NewCardFormValidationSchema = yup.object().shape({
  cardName: yup.string().max(20, "It's so long").required('Required'),
  initialAmount: yup
    .string()
    .max(9, "It's so much")
    .test({
      test: v => !isNaN(Number(v)),
      message: 'Invalid number',
    })
    .required('Required'),
});
