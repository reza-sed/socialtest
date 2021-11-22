import React, { useState } from "react";
import {
  Breadcrumbs,
  Link,
  Box,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Collapse,
} from "@mui/material";
import { CreateOutlined, Instagram, LinkedIn } from "@mui/icons-material";
import PropTypes from "prop-types";
import DataRow from "./DataRow";

const socialNetworks = [
  {
    name: "اینستاگرام",
    value: "instagram",
    icon: <Instagram />,
    renderedValue: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {<Instagram />}&nbsp;
        <span>{"اینستاگرام"}</span>
      </div>
    ),
  },
  {
    name: "لینکدین",
    value: "linkedin",
    icon: <LinkedIn />,
    renderedValue: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        {<LinkedIn />}&nbsp;
        <span>{"لینکدین"}</span>
      </div>
    ),
  },
];

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        color: "white",
        m: 1,
        borderRadius: 1,
        textAlign: "center",
        fontSize: "1rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
    PropTypes.func,
    PropTypes.object,
  ]),
};

function EditUser({ classes }) {
  const [editing, setEditing] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [socialRoutes, setSocialRoutes] = useState([]);
  const [nameObject, setNameObject] = useState({ renderedValue: "" });
  const [link, setLink] = useState("");
  const [id, setId] = useState("");

  const handleAdd = () => {
    // create new route info
    const newRoute = {
      socialInfo: nameObject,
      link,
      id,
    };

    // duplicate check
    if (
      socialRoutes.some((o) => o.link == link) ||
      socialRoutes.some((o) => o.id == id)
    ) {
      alert("مقادیر تکراری می باشند");
    } else {
      const newSocialRoutes = [...socialRoutes, newRoute];
      setSocialRoutes(newSocialRoutes);
    }

    resetForm();
  };

  const resetForm = () => {
    setNameObject({ renderedValue: "" });
    setLink("");
    setId("");
  };

  const handleCancel = () => {
    // remove everything
    resetForm();

    // close collapse
    setCollapsed(false);
  };

  const handleDelete = (routeId) => {
    const newSocialRoutes = socialRoutes.filter((o) => o.id !== routeId);
    setSocialRoutes(newSocialRoutes);
  };

  return (
    <Box
      sx={{
        padding: "3px",
      }}
    >
      <div style={{ lineHeight: "0.8", marginBottom: "10px" }}>
        <h4>حساب کاربری</h4>
        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link className="App-link" underline="hover" href="/">
            خانه
          </Link>
          <Link className="App-link" underline="hover" href="/">
            کاربر
          </Link>
          <Link className="App-link" style={{ color: "gray" }}>
            تنظیمات کاربری
          </Link>
        </Breadcrumbs>
      </div>
      <Box
        sx={{
          backgroundColor: "#263238",
          borderRadius: "10px",
          padding: "10px",
          width: 800,
        }}
      >
        <div style={{ fontSize: "0.8rem" }}>مسیر های ارتباطی</div>
        <div
          style={{
            fontSize: "0.8rem",
            color: "#B58B00",
            margin: "20px 0",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CreateOutlined sx={{ fontSize: "0.8rem" }} />
          <span>
            {editing ? (
              <Button color="secondary" variant="text">
                ویرایش مسیر ارتباطی
              </Button>
            ) : (
              <Button
                onClick={() => setCollapsed(true)}
                color="secondary"
                variant="text"
              >
                افزودن مسیر ارتباطی
              </Button>
            )}
          </span>
        </div>
        <Collapse in={collapsed}>
          <Box
            sx={{
              backgroundColor: "#686D76",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <div style={{ fontSize: "0.9rem", margin: "0 0 10px 0" }}>
              ویرایش مسیر ارتباطی توییتر
            </div>
            <form autoComplete="off">
              <Grid container spacing={0}>
                <Grid item xs>
                  <Item>
                    <FormControl fullWidth size="small">
                      <InputLabel id="type-label" color="secondary">
                        نوع
                      </InputLabel>
                      <Select
                        labelId="type-label"
                        id="typeid"
                        label="sType"
                        value={nameObject.renderedValue}
                        displayEmpty
                        onChange={(v) => {
                          const slcVal = socialNetworks.filter(
                            (o) => o.value == v.target.value
                          )[0];

                          setNameObject(slcVal);
                        }}
                        color="secondary"
                        renderValue={(value) => {
                          return nameObject.renderedValue;
                        }}
                      >
                        {socialNetworks.map((n) => (
                          <MenuItem value={n.value}>{n.name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Item>
                </Grid>
                <Grid item xs>
                  <Item>
                    <TextField
                      sx={{ width: "100%" }}
                      id="link"
                      label="لینک"
                      size="small"
                      color="secondary"
                      value={link}
                      onChange={(v) => setLink(v.target.value)}
                    />
                  </Item>
                </Grid>
                <Grid item xs>
                  <Item>
                    <TextField
                      sx={{ width: "100%" }}
                      id="social-id"
                      label="ای دی (ID)"
                      size="small"
                      color="secondary"
                      value={id}
                      onChange={(v) => setId(v.target.value)}
                    />
                  </Item>
                </Grid>
              </Grid>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  sx={{ margin: "0 2px" }}
                  color="secondary"
                  variant="outlined"
                  size="small"
                  onClick={handleCancel}
                >
                  انصراف
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  size="small"
                  onClick={handleAdd}
                >
                  ثبت مسیر
                </Button>
              </Box>
            </form>
          </Box>
        </Collapse>
        <Box
          sx={{
            backgroundColor: "#686D76",
            borderRadius: "5px",
            padding: "10px",
            marginTop: "20px",
          }}
        >
          {socialRoutes.length > 0 ? (
            socialRoutes.map((route) => (
              <DataRow handleDelete={handleDelete} routeInfo={route} />
            ))
          ) : (
            <span style={{ fontSize: "0.8rem" }}>
              داده ای برای نمایش وجود ندارد
            </span>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default EditUser;
