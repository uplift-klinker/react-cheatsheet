import * as Yup from 'yup';

export const TodoValidation = Yup.object().shape({
    title: Yup.string().required()
})