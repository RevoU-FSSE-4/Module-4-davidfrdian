import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

const ValidationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

const initialValues = {
  email: "",
  password: "",
};

interface FormData {
  email: string;
  password: string;
}

function LoginForm() {
  const handlesubmit = (values: FormData) => {
    alert(JSON.stringify(values, null, 10));
  };

  return (
    <>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          onSubmit={handlesubmit}
        >
          <Form className="flex justify-center">
            <div className="flex flex-col p-8 w-96  border-2 p-12 mt-10">
              <h1 className="text-2xl mb-6 text-center font-semibold">Login</h1>
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
                className="bg-violet-700 p-2.5 rounded-xl text-white hover:bg-violet-200 hover:text-violet-900 hover:border-2 hover:border-violet-700 hover:font-bold mt-8 duration-150"
              >
                Submit Form
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}
export default LoginForm;
