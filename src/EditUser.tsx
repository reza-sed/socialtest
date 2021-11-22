import React, { useEffect, useState } from "react";
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
import { CreateOutlined, Instagram, LinkedIn, Add } from "@mui/icons-material";
import DataRow from "./DataRow";
import { SocialNetwork, SocialNetworkInfo, SocialRoute } from "./Types";
import * as socialService from "./DataService";

const socialNetworks = [
  {
    name: "اینستاگرام",
    value: SocialNetwork.Instagram,
    icon: <Instagram />,
    renderedValue: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          fontSize: "0.8rem",
          color: "white",
        }}
      >
        {<Instagram />}&nbsp;
        <span>{"اینستاگرام"}</span>
      </div>
    ),
  },
  {
    name: "لینکدین",
    value: SocialNetwork.LinkedIn,
    icon: <LinkedIn />,
    renderedValue: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          fontSize: "0.8rem",
          color: "white",
        }}
      >
        {<LinkedIn />}&nbsp;
        <span>{"لینکدین"}</span>
      </div>
    ),
  },
];

function EditUser() {
  const [editing, setEditing] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [socialRoutes, setSocialRoutes] = useState<SocialRoute[]>([]);
  const [nameObject, setNameObject] = useState<SocialNetworkInfo>({
    renderedValue: "",
  });
  const [link, setLink] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    socialService.get();
  });

  const handleAdd = () => {
    // create new route info
    const newRoute = {
      socialInfo: nameObject,
      link,
      id,
    };

    // duplicate check
    if (
      socialRoutes.some((o) => o.link === link) ||
      socialRoutes.some((o) => o.id === id)
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

    // reset editing mode
    setEditing(false);

    // close collapse
    setCollapsed(false);
  };

  const handleDelete = (routeId: string) => {
    const newSocialRoutes = socialRoutes.filter((o) => o.id !== routeId);
    setSocialRoutes(newSocialRoutes);
  };

  const handleEdit = (routeId: string) => {
    const onEditingRoute = socialRoutes.filter((o) => o.id === routeId)[0];

    // set form
    setNameObject(onEditingRoute.socialInfo);
    setLink(onEditingRoute.link);
    setId(onEditingRoute.id);

    setEditing(true);
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
          {editing ? (
            <CreateOutlined sx={{ fontSize: "0.8rem" }} />
          ) : (
            <Add sx={{ fontSize: "0.8rem" }} />
          )}
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
              {editing
                ? `ویرایش مسیر ارتباطی ${nameObject.name}`
                : "افزودن مسیر ارتباطی"}
            </div>
            <form autoComplete="off">
              <Grid container spacing={1}>
                <Grid item xs>
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
                          (o) =>
                            o.value ===
                            (v.target.value as unknown as SocialNetwork)
                        )[0];

                        setNameObject(slcVal as SocialNetworkInfo);
                      }}
                      color="secondary"
                      renderValue={(value) => {
                        return nameObject.renderedValue;
                      }}
                    >
                      {socialNetworks.map((n) => (
                        <MenuItem sx={{ fontSize: "0.8rem" }} value={n.value}>
                          {n.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs>
                  <TextField
                    sx={{ width: "100%" }}
                    id="link"
                    label="لینک"
                    size="small"
                    color="secondary"
                    value={link}
                    onChange={(v) => setLink(v.target.value)}
                    inputProps={{
                      style: {
                        color: "white",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    sx={{ width: "100%" }}
                    id="social-id"
                    label="ای دی (ID)"
                    size="small"
                    color="secondary"
                    value={id}
                    onChange={(v) => setId(v.target.value)}
                    inputProps={{
                      style: { color: "white" },
                    }}
                  />
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  margin: "5px 0",
                }}
              >
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
              <DataRow
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                routeInfo={route}
              />
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
