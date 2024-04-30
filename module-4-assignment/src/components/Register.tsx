import React from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();

  const initialValues: FormData = {
    name: "",
    email: "",
    password: "",
  };

  const ValidationSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Please input your full name")
      .required("Required")
      .matches(/^(?:[A-Z][a-z]*\s*)+$/, "Please start your name with capital!"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("No password provided.")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  const handleSubmit = async (
    values: FormData,
    actions: FormikHelpers<FormData>
  ) => {
    try {
      const response = await axios.post(
        "https://library-crud-sample.vercel.app/api/user/register",
        JSON.stringify(FormData)
      );
      console.log(response.data);
      navigate("/login");
      alert("Your Registration Success!");
      actions.setSubmitting(false);
    } catch (error) {
      alert("Registration Error");
      console.error("Error:", error);
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="flex justify-center">
          <div className="flex flex-col p-8 w-96  border-2 p-12 mt-10">
            <h1 className="text-2xl mb-6 text-center font-semibold">
              Register Your Account
            </h1>
            <label htmlFor="name" className="mt-4">
              Full Name
            </label>
            <Field
              id="name"
              name="name"
              placeholder="Type your name here"
              className="rounded-xl border-2 border-violet-500 px-2 py-1 focus:bg-violet-100 focus:outline-none"
              type="text"
            />
            <ErrorMessage
              name="name"
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

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-violet-700 p-2.5 rounded-xl text-white hover:bg-violet-200 hover:text-violet-900 hover:border-2 hover:border-violet-700 hover:font-bold mt-8 duration-150"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
