import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import { device } from "../../StyledComponents/Device";
import { ErrorMessage } from "../../StyledComponents/Layout";

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
  @media ${device.tablet} {
    .form_child {
      flex-direction: column;
    }
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

  @media ${device.tablet} {
    input {
      margin-bottom: 1rem;
    }
  }
`;

const validate = (values) => {
  const errors = {};
  if (dateLimit(values.fromdate)) {
    errors.fromdate = "Date more than the present date";
  }
  if (dateLimit(values.todate)) {
    errors.todate = "Date more than the present date";
  }
  if (toDateLimit(values)) {
    errors.todate = "To Date should be more than From Date";
  }
  return errors;
};

const dateLimit = (start) => {
  return new Date(start).getTime() > new Date().getTime();
};

const toDateLimit = (obj) => {
  if (obj.fromdate !== "" && obj.todate !== "") {
    return new Date(obj.todate).getTime() < new Date(obj.fromdate).getTime();
  } else {
    return false;
  }
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
              min="1"
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
              min="1"
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
              <ErrorMessage>{formik.errors.fromdate}</ErrorMessage>
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
            {formik.errors.todate ? (
              <ErrorMessage>{formik.errors.todate}</ErrorMessage>
            ) : null}
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
