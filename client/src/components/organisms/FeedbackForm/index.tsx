import React from "react";
import { Formik } from "formik";
import { feedbackSchema } from "./schema";
import {
  Grid,
  FormControl,
  TextField,
  FormHelperText,
  InputLabel,
  Select
} from "@material-ui/core";
import { renderOptions } from "../../../services/helpers";
import Button from "../../atoms/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import TextInput from "../../atoms/TextInput";
import InputError from "../../atoms/InputError";

function index(props: Props) {
  const { onSubmit, feedbackTypes } = props;
  const initialValues = {
    name: "",
    message: "",
    email: "",
    feedbackType: 1
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={feedbackSchema}
      onSubmit={onSubmit}
      render={({
        handleSubmit,
        errors,
        values,
        touched,
        handleBlur,
        handleChange,
        setFieldValue,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={12}>
              <TextInput
                label="Name"
                value={values.name}
                name="name"
                placeholder="Enter Your Name"
                error={errors.name}
                touched={touched.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <TextInput
                label="Email"
                value={values.email}
                name="email"
                placeholder="Enter Your Email"
                error={errors.email}
                touched={touched.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <InputLabel htmlFor="feedbackType">Feedback Type</InputLabel>
              <FormControl className="mfl-max-width">
                <Select
                  data-test="feedbackType"
                  value={values.feedbackType}
                  onBlur={handleBlur}
                  error={
                    touched.feedbackType &&
                    typeof errors.feedbackType != "undefined"
                  }
                  onChange={(e: any) =>
                    setFieldValue("feedbackType", e.target.value)
                  }
                  inputProps={{
                    id: "feedbackType",
                    name: "feedbackType"
                  }}
                >
                  {renderOptions(feedbackTypes, "feedback_type")}
                </Select>
                {errors.feedbackType && touched.feedbackType && (
                  <InputError error={errors.feedbackType} for="feedbackType" />
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <FormControl className="mfl-max-width">
                <TextField
                  rows={4}
                  multiline
                  value={values.message}
                  name="message"
                  label="message"
                  placeholder="Type Message"
                  error={
                    touched.message && typeof errors.message != "undefined"
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  aria-describedby="component-error-text"
                />
                {errors.message && touched.message && (
                  <InputError error={errors.message} for="message" />
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Button
                style={{ marginLeft: "0px" }}
                disabled={isSubmitting}
                theme="secondary"
                icon={<FontAwesomeIcon icon={faPaperPlane} />}
                data-test="feedbackBtn"
              >
                {isSubmitting ? "Submitting" : "Submit Feedback"}
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    />
  );
}

export default index;

type Props = {
  onSubmit: any;
  feedbackTypes: Array<any>;
};
