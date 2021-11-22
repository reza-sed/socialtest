import { useFormik } from "formik";
import {
  TextField,
  Select,
  Button,
  InputLabel,
  FormControl,
  MenuItem,
  Grid,
} from "@mui/material";
import React from "react";
import * as yup from "yup";
import { SocialNetwork, SocialNetworkInfo } from "./Types";

const validationSchema = yup.object({});

interface EditUserFormikProps {
  socialNetworks: SocialNetworkInfo[];
}

export default function EditUserFormik({
  socialNetworks,
}: EditUserFormikProps) {
  const formik = useFormik({
    initialValues: {
      identification: "",
      link: "",
      channel: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="form-container">
      <form className="formik-form" onSubmit={formik.handleSubmit}>
        <Grid container spacing={0}>
          <Grid item xs>
            <FormControl fullWidth size="small">
              <InputLabel id="channelNameId">نوع</InputLabel>
              <Select
                labelId="channelNameId"
                id="demo-simple-select"
                value={formik.values.channel}
                name="channel"
                label="نوع"
                onChange={formik.handleChange}
              >
                {socialNetworks.map((n) => (
                  <MenuItem value={n.value}>{n.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              id="identificationId"
              name="identification"
              label="ای دی (ID)"
              size="small"
              value={formik.values.identification}
              onChange={formik.handleChange}
              error={
                formik.touched.identification &&
                Boolean(formik.errors.identification)
              }
              helperText={
                formik.touched.identification && formik.errors.identification
              }
            />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              id="linkId"
              name="link"
              label="لینک"
              size="small"
              value={formik.values.link}
              onChange={formik.handleChange}
              error={formik.touched.link && Boolean(formik.errors.link)}
              helperText={formik.touched.link && formik.errors.link}
            />
          </Grid>
        </Grid>
        <div className="formik-form__buttons">
          <Button
            sx={{ margin: "0 2px" }}
            color="secondary"
            variant="outlined"
            size="small"
            // onClick={handleCancel}
          >
            انصراف
          </Button>
          <Button
            color="secondary"
            variant="contained"
            size="small"
            // onClick={handleAdd}
          >
            ثبت مسیر
          </Button>
        </div>
      </form>
    </div>
  );
}
