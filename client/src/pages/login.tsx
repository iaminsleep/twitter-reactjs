import * as React from 'react';

import { Formik, Form } from 'formik';
import { Box, Button } from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';

import { useLoginMutation } from '../generated/graphql';
import { toErrorMap } from './utils/toErrorMap';
import { useRouter } from 'next/router';
import { withUrqlClient } from 'next-urql';
import { createUrqlClient } from './utils/createUrqlClient';

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
    const router = useRouter();
    const [, login] = useLoginMutation();
    return (
        <Wrapper variant="regular">
            <Formik
                initialValues={{ username: "", password: "" }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await login(values);
                    if(response.data?.login.errors) // optional chaining allows to access deep nested properties 
                    {
                        setErrors(toErrorMap(response.data.login.errors));
                    } else if(response.data?.login.user) {
                        // worked
                        router.push('/');
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="username"
                            placeholder="username"
                            label="Username"
                        />
                        <Box mt={4}>
                        <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                        />
                        </Box>
                        <Button
                            mt={4}
                            type="submit"
                            isLoading={ isSubmitting }
                            color="white"
                            backgroundColor="teal"
                        >Login
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default withUrqlClient(createUrqlClient)(Login); // server-side rendering is not enabled because data here is static