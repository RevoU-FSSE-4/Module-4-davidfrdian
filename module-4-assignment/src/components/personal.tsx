import { useState } from "react";
import { Formik, Field, Form, ErrorMessage, FormikProps } from "formik";
import * as Yup from "yup";

const PersonalSchema = Yup.object().shape({
  fullName: Yup.string().min(3, "Too Short!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  dateOfBirth: Yup.date()
    .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
    .required("Required"),
  streetAddress: Yup.string().required("Required"),
  city: Yup.string().required("Required"),
  state: Yup.string().required("Required"),
  zipCode: Yup.string().required("Required").matches(/^\d{5}$/
, "Please fill 5 number"  ),
  username: Yup.string().required("Required"),
  password: Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'),
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

  const handlesubmit = (values: FormData, ) => {
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

  switch (page) {
    case 1:
      break;

    case 2:
      break;

    default:
      break;
  }

  return (
    <>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={PersonalSchema}
          onSubmit={handlesubmit}
        >
          {(props) => (
            <Form>
              {page === 1 && (
                <div>
                  <p>{fulFillOne}</p>
                  <label htmlFor="fullName">Full Name</label>
                  <Field
                    id="fullName"
                    name="fullName"
                    placeholder="Type your name here"
                  />
                  <ErrorMessage name="fullName" component="div" />

                  <label htmlFor="email">Email</label>
                  <Field
                    id="email"
                    name="email"
                    placeholder="example@gmail.com"
                    type="email"
                  />

                  <ErrorMessage name="email" component="div" />

                  <label htmlFor="dateOfBirth">Date Of Birth</label>
                  <Field id="dateOfBirth" name="dateOfBirth" type="date" />
                  <ErrorMessage name="dateOfBirth" component="div" />

                  <button
                    type="button"
                    onClick={() => {
                      handlePage1(props);
                    }}
                  >
                    Next Page
                  </button>
                </div>
              )}

              {page === 2 && (
                <div>
                  <p>{fulFillTwo}</p>
                  <label htmlFor="streetAddress">Street Address</label>
                  <Field
                    id="streetAddress"
                    name="streetAddress"
                    placeholder="Type your address"
                    type="text"
                  />
                  <ErrorMessage name="streetAddress" component="div" />

                  <label htmlFor="city">City</label>
                  <Field
                    id="city"
                    name="city"
                    placeholder="Type your city"
                    type="text"
                  />
                  <ErrorMessage name="city" component="div" />

                  <label htmlFor="state">State</label>
                  <Field
                    id="state"
                    name="state"
                    placeholder="Type your state"
                    type="text"
                  />
                  <ErrorMessage name="state" component="div" />

                  <label htmlFor="zipCode">Zip Code</label>
                  <Field
                    id="zipCode"
                    name="zipCode"
                    placeholder="Type your zip code"
                    type="number"
                  />
                  <ErrorMessage name="zipCode" component="div" />

                  <button
                    type="button"
                    onClick={() => {
                      setpage(page - 1);
                    }}
                  >
                    Previous Page
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      handlePage2(props);
                    }}
                  >
                    Next Page
                  </button>
                </div>
              )}

              {page === 3 && (
                <div>
                  <label htmlFor="username">Username</label>
                  <Field
                    id="username"
                    name="username"
                    placeholder="Type your username"
                    type="text"
                  />
                  <ErrorMessage name="username" component="div" />

                  <label htmlFor="password">Password</label>
                  <Field
                    id="password"
                    name="password"
                    placeholder="Type your password"
                    type="password"
                  />
                  <ErrorMessage name="password" component="div" />

                  <button
                    type="button"
                    onClick={() => {
                      setpage(page - 1);
                    }}
                  >
                    Previous Page
                  </button>
                  <button type="submit">Submit Form</button>
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

// export const PersonalForm = () => (
//     <div>
//       <h1>Personal Information</h1>
//       <Formik
//         initialValues={{
//           fullName: "",
//           email: "",
//           dateOfBirth: "",
//         }}
//         validationSchema={PersonalSchema}
//         onSubmit={(values, actions: any) => {
//           console.log('Form submitted with values:', values);
//         }}
//       >
//         {({ errors, touched }) => (
//           <Form>
//             <Field
//               name="fullName"
//               type="text"
//               placeholder="Type your name here"
//             />
//             {errors.fullName && touched.fullName ? (
//               <div>{errors.fullName}</div>
//             ) : null}
//             <Field
//               name="email"
//               type="email"
//               placeholder="Type your email here"
//             />
//             {errors.email && touched.email ? <div>{errors.email}</div> : null}
//             <Field name="dateOfBirth" type="date" />
//             {errors.dateOfBirth && touched.dateOfBirth ? (
//               <div>{errors.dateOfBirth}</div>
//             ) : null}
//             <button type="submit">Next Page</button>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
