import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';

const BillingAddressCreatePage = () => {

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Billing Address</h1>

            <div className='w-full sm:col-span-2'>
                <h2 className="text-lg font-semibold mb-2">Billing Information</h2>
                <Formik
                    initialValues={
                        {
                            firstName: '',
                            lastName: '',
                            email: '',
                            phone: '',
                            address: '',
                            city: '',
                            country: '',
                            postalCode: '',
                        }
                    }
                    validationSchema={
                        Yup.object({
                            firstName: Yup.string().required(),
                            lastName: Yup.string().required(),
                            address: Yup.string().required(),
                            city: Yup.string().required(),
                            country: Yup.string().required(),
                        })
                    }
                    onSubmit={(values, actions) => {
                        // handle form submission
                    }}
                >
                    {(props: FormikProps<any>) => (
                        <Form className='space-y-4'>
                            <div className='grid md:grid-cols-2 gap-6 w-full'>

                                <div>
                                    <Field name="firstName" placeholder="Enter your first name" className="form-control w-full" />
                                    <ErrorMessage name="firstName" />
                                </div>
                                <div>
                                    <Field name="lastName" placeholder="Enter your last name" className="form-control w-full" />
                                    <ErrorMessage name="lastName" />
                                </div>
                                <div>
                                    <Field name="email" type="email" placeholder="Enter your email address" className="form-control w-full" />
                                    <ErrorMessage name="email" />
                                </div>
                                <div>
                                    <Field name="phone" type="phone" placeholder="Enter your phone number" className="form-control w-full" />
                                    <ErrorMessage name="phone" />
                                </div>
                                <div>
                                    <Field name="address" placeholder="Enter your address" className="form-control w-full" />
                                    <ErrorMessage name="address" />
                                </div>
                                <div>
                                    <Field name="city" placeholder="Enter your city" className="form-control w-full" />
                                    <ErrorMessage name="city" />
                                </div>
                                <div>
                                    <Field name="country" placeholder="Enter your country" className="form-control w-full" />
                                    <ErrorMessage name="country" />
                                </div>

                            </div>

                            <button className="btn btn-primary">Save</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default BillingAddressCreatePage;
