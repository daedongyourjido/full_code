import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import axios from "axios";

// changePw와 resetPw에서 사용하는 비밀번호 변경 버튼

export default function ChangeButton(props) {
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
            if (!props.name) props.setEmpty(true);
            else {
                props.setEmpty(false);
                props.setChanged(true);
                try {
                    console.log(props)
                    await axios.post(
                        "https://beyhjxqxv3.execute-api.us-east-2.amazonaws.com/default/2023-c-capstone-DAO",
                        {
                            DML: "UPDATE",
                            table: "user",
                            set: `nickname = '${props.name}'`,
                            where: `id=${sessionStorage._key}`,
                        },
                    );
                    sessionStorage.setItem('name', props.name)
                } catch (e) {
                    console.log(e)
                }
            }
          }}
        >
          닉네임 변경
        </Button>
      </Stack>
    </div>
  );
}
