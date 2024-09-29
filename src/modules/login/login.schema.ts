import * as yup from 'yup';

import { REQUIRED_PASSWORD, ERROR_EMAIL, REQUIRED_EMAIL } from './login.constants';

export const loginSchema = yup.object({
    password: yup.string().required(REQUIRED_PASSWORD),
    email: yup.string().email(ERROR_EMAIL).required(REQUIRED_EMAIL)
});
