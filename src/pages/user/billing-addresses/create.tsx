import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';
import { ActionFunctionArgs, json, redirect, useFetcher } from 'react-router-dom';
import BillingAddress from '../../../models/billing-address';

const BillingAddressCreatePage = () => {
    const fetcher = useFetcher()

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
                            email: Yup.string().email().required(),
                            phone: Yup.string().required(),
                            address: Yup.string().required(),
                            city: Yup.string().required(),
                            country: Yup.string().required(),
                            postalCode: Yup.string().required(),
                        })
                    }
                    onSubmit={(values) => {
                        fetcher.submit(values, {
                            method: 'POST',
                            action: '/user/billing-addresses/create'
                        })
                    }}
                >
                    {({ isSubmitting }: FormikProps<any>) => (
                        <Form className='space-y-4'>
                            <div className='grid md:grid-cols-2 gap-6 w-full'>

                                <div>
                                    <Field name="firstName" placeholder="Enter your first name" className="form-control w-full" />
                                    <ErrorMessage name="firstName" component="small" className="text-red-500 lowercase" />
                                </div>
                                <div>
                                    <Field name="lastName" placeholder="Enter your last name" className="form-control w-full" />
                                    <ErrorMessage name="lastName" component="small" className="text-red-500 lowercase" />
                                </div>
                                <div>
                                    <Field name="email" type="email" placeholder="Enter your email address" className="form-control w-full" />
                                    <ErrorMessage name="email" component="small" className="text-red-500 lowercase" />
                                </div>
                                <div>
                                    <Field name="phone" type="phone" placeholder="Enter your phone number" className="form-control w-full" />
                                    <ErrorMessage name="phone" component="small" className="text-red-500 lowercase" />
                                </div>
                                <div>
                                    <Field name="address" placeholder="Enter your address" className="form-control w-full" />
                                    <ErrorMessage name="address" component="small" className="text-red-500 lowercase" />
                                </div>
                                <div>
                                    <Field name="city" placeholder="Enter your city" className="form-control w-full" />
                                    <ErrorMessage name="city" component="small" className="text-red-500 lowercase" />
                                </div>
                                <div>
                                    <Field name="country" placeholder="Enter your country" className="form-control w-full" />
                                    <ErrorMessage name="country" component="small" className="text-red-500 lowercase" />
                                </div>
                                <div>
                                    <Field name="postalCode" placeholder="Enter your postal code" className="form-control w-full" />
                                    <ErrorMessage name="postalCode" component="small" className="text-red-500 lowercase" />
                                </div>

                            </div>

                            <button type='submit' className="btn btn-primary disabled:!bg-opacity-50" disabled={isSubmitting}>Save</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default BillingAddressCreatePage;

export const action = async ({ request } : ActionFunctionArgs) => {
    try {
        const data = await request.formData()

        // instantiate billing address from form data
        const billingAddress = BillingAddress.fromJson({
            firstName: data.get('firstName') as string,
            lastName: data.get('lastName') as string,
            email: data.get('email') as string,
            phone: data.get('phone') as string,
            address: data.get('address') as string,
            city: data.get('city') as string,
            country: data.get('country') as string,
            postalCode: data.get('postalCode') as string,
        })

        await billingAddress.save()

        return redirect('/user/billing-addresses')
    } catch (error: any) {
        throw json({ message: error.message })
    }
}
