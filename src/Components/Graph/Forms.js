import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { device } from "../../StyledComponents/Device";

const FormParent = styled.div`
  margin-bottom: 2rem;
  margin-top: 2rem;

  & .form_child {
    display: flex;
  }

  .submitBtn {
    margin-top: 1rem;
    font-weight: 600;
    background: #0f1218;
    border: none;
    padding: 8px 20px;
    color: white;
    font-size: 12px;
    text-transform: uppercase;
    cursor: pointer;
  }

  @media ${device.laptop} {
  }
`;

const EntryParent = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 3rem;

  & label {
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 600;
    margin-bottom: 7px;
  }

  input {
    padding: 7px 10px;
    font-size: 14px;
  }
`;

const validate = (values) => {
  const errors = {};

  if (new Date(values.fromdate).getTime() > new Date().getTime()) {
    console.log(
      new Date(values.fromdate).getTime(),
      new Date().getTimezoneOffset()
    );
    errors.fromdate = "Date more than the present date";
  }

  return errors;
};

function FormSection(props) {
  const formik = useFormik({
    initialValues: {
      page: "",
      pagesize: "",
      fromdate: "",
      todate: "",
    },
    validate,
    onSubmit: (values) => {
      const formData = new FormData();
      for (var key in values) {
        if (values[key] !== "") {
          if (key === "fromdate" || key === "todate") {
            formData.append(key, new Date(values[key]).getTime() / 1000);
          } else {
            formData.append(key, values[key]);
          }
        }
      }
      const asString = new URLSearchParams(formData).toString();
      if (asString !== "") {
        props.callback(asString);
      } else {
        props.callback("");
      }

      console.log(values, asString);
    },
  });
  return (
    <FormParent>
      <form onSubmit={formik.handleSubmit}>
        <div className="form_child">
          <EntryParent>
            <label htmlFor="page">Page</label>
            <input
              id="page"
              name="page"
              type="number"
              placeholder="Enter page"
              onChange={formik.handleChange}
              value={formik.values.page}
            />
          </EntryParent>

          <EntryParent>
            <label htmlFor="pagesize">Page Size</label>
            <input
              id="pagesize"
              name="pagesize"
              type="number"
              placeholder="Enter page number"
              onChange={formik.handleChange}
              value={formik.values.pagesize}
            />
          </EntryParent>

          <EntryParent>
            <label htmlFor="fromdate">From Date</label>
            <input
              id="fromdate"
              name="fromdate"
              type="date"
              placeholder="dd-mm-yyyy"
              min="1990-01-01"
              onChange={formik.handleChange}
              value={formik.values.fromdate}
            />
            {formik.errors.fromdate ? (
              <div>{formik.errors.fromdate}</div>
            ) : null}
          </EntryParent>

          <EntryParent>
            <label htmlFor="todate">To Date</label>
            <input
              id="todate"
              name="todate"
              type="date"
              placeholder="dd-mm-yyyy"
              min="1990-01-01"
              onChange={formik.handleChange}
              value={formik.values.todate}
            />
          </EntryParent>
        </div>

        <button className="submitBtn" type="submit">
          Run
        </button>
      </form>
    </FormParent>
  );
}

export default FormSection;

//new Date("2021-03-16").getTime() / 1000
