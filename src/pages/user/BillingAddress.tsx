import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react';

const BillingAddressPage = () => {
    const [sameAsShipping, setSameAsShipping] = useState(false);

    const handleCheckboxChange = () => {
        setSameAsShipping((prev) => !prev);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-semibold mb-4">Billing Address</h1>
            <div className="grid sm:grid-cols-2 gap-8">
                <div className='w-full'>
                    <h2 className="text-lg font-semibold mb-2">Billing Information</h2>
                    <Formik
                        initialValues={
                            {
                                firstName: '',
                                lastName: '',
                                address: '',
                                city: '',
                                country: '',
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
                            <Form className="space-y-4 w-full">
                                <div>
                                    <Field name="firstName" placeholder="Enter your first name" className="form-control block w-full sm:w-4/5 lg:w-3/4 xl:w-2/3" />
                                    <ErrorMessage name="firstName" />
                                </div>
                                <div>
                                    <Field name="lastName" placeholder="Enter your last name" className="form-control block w-full sm:w-4/5 lg:w-3/4 xl:w-2/3" />
                                    <ErrorMessage name="lastName" />
                                </div>
                                <div>
                                    <Field name="address" placeholder="Enter your address" className="form-control block w-full sm:w-4/5 lg:w-3/4 xl:w-2/3" />
                                    <ErrorMessage name="address" />
                                </div>
                                <div>
                                    <Field name="city" placeholder="Enter your city" className="form-control block w-full sm:w-4/5 lg:w-3/4 xl:w-2/3" />
                                    <ErrorMessage name="city" />
                                </div>
                                <div>
                                    <Field name="country" placeholder="Enter your country" className="form-control block w-full sm:w-4/5 lg:w-3/4 xl:w-2/3" />
                                    <ErrorMessage name="country" />
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-2">Shipping Information</h2>
                    <div className="flex items-center mb-2">
                        <input
                            type="checkbox"
                            className="form-checkbox mr-2"
                            checked={sameAsShipping}
                            onChange={handleCheckboxChange}
                        />
                        <label className="text-sm font-medium">Same as billing address</label>
                    </div>
                    {!sameAsShipping && (
                        <form className="space-y-4">
                            {/* Similar input fields as above */}
                        </form>
                    )}
                </div>
            </div>
            <button className="btn btn-primary mt-4">Save</button>
        </div>
    );
};

export default BillingAddressPage;
