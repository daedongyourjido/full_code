import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";
export default function WithdrawButton(props) {
  return (
    <div
      style={{
        display: "flex",
        marginTop: "10px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack direction="row" spacing={2}>
        <Button
          variant="outlined"
          sx={{
            borderColor: "#045369",
            color: "#045369",
            width: "35ch",
          }}
          onClick={() => {
            if (!props.pw) {
              props.setPwEmpty(true);
            }
            if (props.pw && props.pwWrong === false) {
              axios
                .post(
                  "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
                  {
                    DML: "DELETE",
                    table: "user",
                    where: `id='${sessionStorage._key}'`,
                  },
                )
                .then((res) => {
                  props.setChanged(true);
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }}
        >
          비밀번호 변경
        </Button>
      </Stack>
    </div>
  );
}
