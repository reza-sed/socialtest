import * as classes from "./DataRow.module.css";
import { Create, Delete } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { SocialNetworkInfo, SocialRoute } from "./Types";
import React, { useState } from "react";

type DataRowProps = {
  routeInfo: SocialRoute;
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
};

export default function DataRow({
  routeInfo,
  handleDelete,
  handleEdit,
}: DataRowProps) {
  const [deleteDialogOpened, setDeleteDialogOpened] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  const { socialInfo, link, id } = routeInfo;

  const handleClose = (isDelete: boolean) => {
    setDeleteDialogOpened(false);

    if (isDelete) {
      if (confirmation === "تایید") {
        handleDelete(id);
      }
    }
  };

  return (
    <div
      style={{
        fontSize: "0.8rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        className="info"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {socialInfo.icon} {socialInfo.name}
        </span>
        <span>ای دی (ID): {id}</span>
        <span>
          لینک: <span style={{ color: "#B58B00" }}>{link}</span>
        </span>
      </div>
      <div>
        <Button
          variant="text"
          color="secondary"
          size="small"
          onClick={() => handleEdit(id)}
        >
          <Create />
          ویرایش
        </Button>
        <Button
          onClick={() => setDeleteDialogOpened(true)}
          variant="text"
          color="error"
          size="small"
        >
          <Delete />
          حذف
        </Button>
      </div>
      <Dialog
        // sx={{ backgroundColor: "#263238" }}
        PaperProps={{
          style: {
            backgroundColor: "#686D76",
          },
        }}
        open={deleteDialogOpened}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          آیا از حذف این مورد اطمینان دارید؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            برای حذف مسیر ارتباطی مورد نظر کلمه تایید را وارد کنید
            <TextField
              fullWidth
              placeholder="تایید"
              size="small"
              value={confirmation}
              onChange={(v) => {
                setConfirmation(v.target.value);
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="text"
            color="secondary"
            onClick={() => handleClose(false)}
          >
            انصراف
          </Button>
          <Button
            variant="text"
            color="error"
            onClick={() => handleClose(true)}
            autoFocus
            disabled={confirmation !== "تایید"}
          >
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
