import { useState } from "react";
import { Formik, Field, Form, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";

const PersonalSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(3, "Please input your full name")
    .required("Required")
    .matches(/^(?:[A-Z][a-z]*\s*)+$/, "Please start your name with capital!"),
  email: Yup.string().email("Invalid email").required("Required"),
  dateOfBirth: Yup.date()
    .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
    .required("Required"),
  streetAddress: Yup.string()
    .required("Required")
    .min(5, "Your address is too short!").matches(/^(?:[A-Z][a-z]*\s*)+$/, "Please use capital for the street address"),
  city: Yup.string()
    .required("Required")
    .matches(/^(?:[A-Z][a-z]*\s*)+$/, "Please use capital for the city"),
  state: Yup.string()
    .required("Required")
    .matches(/^(?:[A-Z][a-z]*\s*)+$/, "Please use capital for the state"),
  zipCode: Yup.string()
    .required("Required")
    .matches(/^\d{5}$/, "Please fill 5 number"),
  username: Yup.string().required("Required").matches(/^(?=.*[0-9])[a-zA-Z0-9_-]{3,16}$/, "Please fill with letter and number, min 3 and max 16" ),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

const initialValues = {
  fullName: "",
  email: "",
  dateOfBirth: "",
  streetAddress: "",
  city: "",
  state: "",
  zipCode: "",
  username: "",
  password: "",
};

interface FormData {
  fullName: string;
  email: string;
  dateOfBirth: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  username: string;
  password: string;
}

function PersonalForm() {
  const [page, setpage] = useState<number>(1);
  const [fulFillOne, setFulFillOne] = useState("");
  const [fulFillTwo, setFulFillTwo] = useState("");

  const handlesubmit = (values: FormData) => {
    alert(JSON.stringify(values, null, 10));
  };

  const handlePage1 = (props: FormikProps<FormData>) => {
    if (
      props.values.fullName &&
      props.values.email &&
      props.values.dateOfBirth &&
      !props.errors.fullName &&
      !props.errors.email &&
      !props.errors.dateOfBirth
    ) {
      setFulFillOne("");
      setpage(2);
    } else {
      setFulFillOne("Form Personal Information is Not Complete");
    }
  };

  const handlePage2 = (props: FormikProps<FormData>) => {
    if (
      props.values.streetAddress &&
      props.values.city &&
      props.values.state &&
      props.values.zipCode &&
      !props.errors.streetAddress &&
      !props.errors.city &&
      !props.errors.state &&
      !props.errors.zipCode
    ) {
      setFulFillTwo("");
      setpage(3);
    } else {
      setFulFillTwo("Form Address Information is Not Complete");
    }
  };

  return (
    <>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={PersonalSchema}
          onSubmit={handlesubmit}
        >
          {(props) => (
            <Form className="flex justify-center">
              {page === 1 && (
                <div className="flex flex-col p-8 w-96  border-2 p-12 mt-10">
                  <h1 className="text-2xl mb-6 text-center font-semibold">
                    Personal Information
                  </h1>
                  <p className="text-red-500 text-center">{fulFillOne}</p>
                  <label htmlFor="fullName" className="mt-4">
                    Full Name
                  </label>
                  <Field
                    id="fullName"
                    name="fullName"
                    placeholder="Type your name here"
                    className="rounded-xl border-2 border-violet-500 px-2 py-1 focus:bg-violet-100 focus:outline-none"
                  />
                  <ErrorMessage
                    name="fullName"
                    component="div"
                    className="text-red-500"
                  />

                  <label htmlFor="email" className="mt-4">
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    placeholder="example@gmail.com"
                    type="email"
                    className="rounded-xl border-2 border-violet-500 px-2 py-1 focus:bg-violet-100 focus:outline-none"
                  />

                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />

                  <label htmlFor="dateOfBirth" className="mt-4">
                    Date Of Birth
                  </label>
                  <Field
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    className="rounded-xl border-2 border-violet-500 px-2 py-1 focus:bg-violet-100 focus:outline-none"
                  />
                  <ErrorMessage
                    name="dateOfBirth"
                    component="div"
                    className="text-red-500"
                  />

                  <button
                    type="button"
                    onClick={() => {
                      handlePage1(props);
                    }}
                    className="bg-violet-700 p-2.5 rounded-xl text-white hover:bg-violet-200 hover:text-violet-900 hover:border-2 hover:border-violet-700 hover:font-bold mt-4 duration-150"
                  >
                    Next Page
                  </button>
                </div>
              )}

              {page === 2 && (
                <div className="flex flex-col p-8 w-96  border-2 p-12 mt-10">
                  <h1 className="text-2xl mb-6 text-center font-semibold">
                    Address Information
                  </h1>
                  <p className="text-red-500 text-center">{fulFillTwo}</p>
                  <label htmlFor="streetAddress" className="mt-4">
                    Street Address
                  </label>
                  <Field
                    id="streetAddress"
                    name="streetAddress"
                    placeholder="Type your address"
                    type="text"
                    className="rounded-xl border-2 border-violet-500 px-2 py-1 focus:bg-violet-100 focus:outline-none"
                  />
                  <ErrorMessage
                    name="streetAddress"
                    component="div"
                    className="text-red-500"
                  />

                  <label htmlFor="city" className="mt-4">
                    City
                  </label>
                  <Field
                    id="city"
                    name="city"
                    placeholder="Type your city"
                    type="text"
                    className="rounded-xl border-2 border-violet-500 px-2 py-1 focus:bg-violet-100 focus:outline-none"
                  />
                  <ErrorMessage
                    name="city"
                    component="div"
                    className="text-red-500"
                  />

                  <label htmlFor="state" className="mt-4">
                    State
                  </label>
                  <Field
                    id="state"
                    name="state"
                    placeholder="Type your state"
                    type="text"
                    className="rounded-xl border-2 border-violet-500 px-2 py-1 focus:bg-violet-100 focus:outline-none"
                  />
                  <ErrorMessage
                    name="state"
                    component="div"
                    className="text-red-500"
                  />

                  <label htmlFor="zipCode" className="mt-4">
                    Zip Code
                  </label>
                  <Field
                    id="zipCode"
                    name="zipCode"
                    placeholder="Type your zip code"
                    type="number"
                    className="rounded-xl border-2 border-violet-500 px-2 py-1 focus:bg-violet-100 focus:outline-none"
                  />
                  <ErrorMessage
                    name="zipCode"
                    component="div"
                    className="text-red-500"
                  />
                  <div className="flex justify-evenly">
                    <button
                      type="button"
                      onClick={() => {
                        setpage(page - 1);
                      }}
                      className="bg-violet-700 p-2.5 rounded-xl text-white hover:bg-violet-200 hover:text-violet-900 hover:border-2 hover:border-violet-700 hover:font-bold mt-8 duration-150"
                    >
                      Previous Page
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handlePage2(props);
                      }}
                      className="bg-violet-700 p-2.5 rounded-xl text-white hover:bg-violet-200 hover:text-violet-900 hover:border-2 hover:border-violet-700 hover:font-bold mt-8 duration-150"
                    >
                      Next Page
                    </button>
                  </div>
                </div>
              )}

              {page === 3 && (
                <div className="flex flex-col p-8 w-96  border-2 p-12 mt-10">
                  <h1 className="text-2xl mb-6 text-center font-semibold">
                    Account Information
                  </h1>
                  <label htmlFor="username" className="mt-4">
                    Username
                  </label>
                  <Field
                    id="username"
                    name="username"
                    placeholder="Type your username"
                    type="text"
                    className="rounded-xl border-2 border-violet-500 px-2 py-1 focus:bg-violet-100 focus:outline-none"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500"
                  />

                  <label htmlFor="password" className="mt-4">
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    placeholder="Type your password"
                    type="password"
                    className="rounded-xl border-2 border-violet-500 px-2 py-1 focus:bg-violet-100 focus:outline-none"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />

                  <div className="flex justify-evenly">
                    <button
                      type="button"
                      onClick={() => {
                        setpage(page - 1);
                      }}
                      className="bg-violet-700 p-2.5 rounded-xl text-white hover:bg-violet-200 hover:text-violet-900 hover:border-2 hover:border-violet-700 hover:font-bold mt-8 duration-150"
                    >
                      Previous Page
                    </button>
                    <button
                      type="submit"
                      className="bg-violet-700 p-2.5 rounded-xl text-white hover:bg-violet-200 hover:text-violet-900 hover:border-2 hover:border-violet-700 hover:font-bold mt-8 duration-150"
                    >
                      Submit Form
                    </button>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default PersonalForm;
