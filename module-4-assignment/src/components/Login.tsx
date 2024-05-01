import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";


interface Login {
  email: string;
  password: string;
}

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

const LoginForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: Login, { setSubmitting }: any) => {
    try {
      const response = await fetch(
        "https://library-crud-sample.vercel.app/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/categories");
      }
    } catch (error) {
      console.error("Login error:", error);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
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
                disabled={isSubmitting}
                className="bg-violet-700 p-2.5 rounded-xl text-white hover:bg-violet-200 hover:text-violet-900 hover:border-2 hover:border-violet-700 hover:font-bold mt-8 duration-150"
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
