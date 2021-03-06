import React from "react";
import { Formik } from "formik";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import {
  TextField,
  FormControl,
  FormHelperText,
  Select,
  InputLabel,
  Input
} from "@material-ui/core";
import styled from "styled-components";
import { renderOptions, getUser } from "../../../services/helpers";
import FormButtons from "../../atoms/FacilityFormButtons";
// @ts-ignore
import { isEmpty } from "lodash";
import InputError from "../../atoms/InputError";
import Ac from "../../atoms/Ac";

export function Form(props: any) {
  let {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    handleBlur,
    isSubmitting,
    setFieldValue,
    fromAdd,
    roles
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <FormWrapper>
        <Grid container spacing={3}>
          <Grid item sm={12} md={12}>
            <FormControl className="mfl-max-width">
              <TextField
                value={values.name}
                name="name"
                label="Name"
                placeholder="Enter Name"
                error={errors.name && touched.name}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-describedby="component-error-text"
              />

              {errors.name && touched.name && (
                <InputError error={errors.name} for="name"></InputError>
              )}
            </FormControl>
          </Grid>
          <Grid item sm={12} md={12}>
            <FormControl className="mfl-max-width">
              <TextField
                disabled={!fromAdd}
                value={values.username}
                name="username"
                label="Username"
                placeholder="Enter Username"
                error={errors.username && touched.username}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-describedby="component-error-text"
              />
              {errors.username && touched.username && (
                <InputError error={errors.username} for="username"></InputError>
              )}
            </FormControl>
          </Grid>
          <Grid item sm={12} md={12}>
            <FormControl className="mfl-max-width">
              <TextField
                value={values.email}
                name="email"
                label="Email"
                placeholder="Enter Email"
                error={errors.email && touched.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-describedby="component-error-text"
              />
              {errors.email && touched.email && (
                <InputError error={errors.email} for="email"></InputError>
              )}
            </FormControl>
          </Grid>
          <Ac
            role={getUser().role}
            action="user:update"
            allowed={() => (
              <Grid item sm={12} md={12}>
                <InputLabel htmlFor="facilityType">User Group</InputLabel>
                <FormControl className="mfl-max-width">
                  <Select
                    data-test="role"
                    value={values.role}
                    onBlur={handleBlur}
                    error={errors.role && touched.role}
                    onChange={(e: any) => setFieldValue("role", e.target.value)}
                    inputProps={{
                      id: "role",
                      name: "role"
                    }}
                  >
                    {renderOptions(roles, "name")}
                  </Select>
                  {errors.role && touched.role && (
                    <InputError error={errors.role} for="role" />
                  )}
                </FormControl>
              </Grid>
            )}
          />

          {fromAdd && (
            <>
              <Grid item sm={12} md={12}>
                <FormControl className="mfl-max-width">
                  <TextField
                    type="password"
                    value={values.password}
                    name="password"
                    label="Password"
                    placeholder="Enter Password"
                    error={errors.password && touched.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby="component-error-text"
                  />
                  {errors.password && touched.password && (
                    <InputError
                      error={errors.password}
                      for="password"
                    ></InputError>
                  )}
                </FormControl>
              </Grid>
              <Grid item sm={12} md={12}>
                <FormControl className="mfl-max-width">
                  <TextField
                    type="password"
                    value={values.confirmPassword}
                    name="confirmPassword"
                    label="Password"
                    placeholder="Confirm Password"
                    error={errors.confirmPassword && touched.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    aria-describedby="component-error-text"
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <InputError
                      error={errors.confirmPassword}
                      for="confirmPassword"
                    ></InputError>
                  )}
                </FormControl>
              </Grid>
            </>
          )}
        </Grid>
      </FormWrapper>
    </form>
  );
}

const FormWrapper = styled.div`
  padding: 1rem;
`;

export default Form;
