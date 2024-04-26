import { useState } from "react";
import { Formik, Field, Form, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

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

const initialValues = {
  name: "",
  email: "",
  password: "",
};

interface FormData {
  name: string;
  email: string;
  password: string;
}

function RegistrationForm() {
  const [page, setpage] = useState<number>(1);
  const [fulFillOne, setFulFillOne] = useState("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();

  // async function onSubmit(e: any) {
  //   e.preventDefault();

  //
  async function handlesubmit(e: FormData) {
    alert(JSON.stringify(e, null, 10));
    setName(e.name);
    setEmail(e.email)
    setPassword(e.password)
    navigate("/login");

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          "name": name,
          "email": email,
          "password": password
      })
    };

    try {
      const response = await fetch(
        "https://library-crud-sample.vercel.app/api/user/register",
        options
      );
      // handle kalo error harus ngapain
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log(data);

      // next move
      setTimeout(() => {
        alert("Register Success");
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handlePage1 = (props: FormikProps<FormData>) => {
    if (
      props.values.name &&
      props.values.email &&
      !props.errors.name &&
      !props.errors.email
    ) {
      setFulFillOne("");
      setpage(2);
    } else {
      setFulFillOne("Form Personal Information is Not Complete");
    }
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await fetch('https://library-crud-sample.vercel.app/api/user/profile');
  //     const data = await response.json();
  //     // Update component state with fetched data
  //     console.log(data)
  //   };

  //   fetchData();
  // }, []);

  return (
    <>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          onSubmit={handlesubmit}
        >
          {(props) => (
            <Form className="flex justify-center">
              {page === 1 && (
                <div className="flex flex-col p-8 w-96  border-2 p-12 mt-10">
                  <h1 className="text-2xl mb-6 text-center font-semibold">
                    Register Your Account
                  </h1>
                  <p className="text-red-500 text-center">{fulFillOne}</p>
                  <label htmlFor="fullName" className="mt-4">
                    Full Name
                  </label>
                  <Field
                    id="name"
                    name="name"
                    placeholder="Type your name here"
                    className="rounded-xl border-2 border-violet-500 px-2 py-1 focus:bg-violet-100 focus:outline-none"
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
                    Create your own password
                  </h1>

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

export default RegistrationForm;
