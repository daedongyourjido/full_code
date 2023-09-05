import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";

// changePw와 resetPw에서 사용하는 비밀번호 변경 버튼

export default function ResetPwButton(props) {
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
            width: "32ch",
          }}
          onClick={async () => {
            if (!props.pw) props.setEmpty(true);
            else if (props.pw) props.setEmpty(false);
            if (!props.pwCheck) props.setEmpty(true);
            else if (props.pwCheck) props.setEmpty(false);
            if (props.pw !== props.pwCheck) props.setPwDup(true);
            else if (props.pw === props.pwCheck) {
              if (props.pw && props.pwCheck) {
                // 입력 정보 유효한지 확인됨. (입력여부 / 비번 재확인)
                // db 접근
                try {
                  await axios.post(
                    "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
                    {
                      DML: "UPDATE",
                      table: "user",
                      set: `password = '${props.pw}'`,
                      where: `id=${sessionStorage._key}`,
                    },
                  );
                } catch (e) {
                  console.log("resetpw error", e);
                } finally {
                  props.setPwDup(false);
                  props.setChanged(true);
                }
              }
            }
          }}
        >
          비밀번호 변경
        </Button>
      </Stack>
    </div>
  );
}
