import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

export default function LocationSelect(props) {
  const handleChange = (e) => {
    props.setLocation(e.target.value);
  };

  return (
    <FormControl fullWidth sx={{ marginTop: "40px" }}>
      <InputLabel id="demo-simple-select-label">지역</InputLabel>
      <Select
        data-cy='location-select'
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.location}
        label="지역"
        onChange={(e) => handleChange(e)}
      >
        <MenuItem 
          data-cy="seoul"
          value={"seoul"}>서울</MenuItem>
        <MenuItem 
          data-cy="jeju"
          value={"jeju"}>제주</MenuItem>
        <MenuItem value={"busan"}>부산</MenuItem>
        <MenuItem value={"daegu"}>대구</MenuItem>
        <MenuItem value={"gyeonggi"}>경기</MenuItem>
        <MenuItem value={"incheon"}>인천</MenuItem>
        <MenuItem value={"gangwon"}>강원</MenuItem>
        <MenuItem value={"chungnam"}>충청남도</MenuItem>
        <MenuItem value={"chungbuk"}>충청북도</MenuItem>
        <MenuItem value={"gyeongbuk"}>경상북도</MenuItem>
        <MenuItem value={"gyeongnam"}>경상남도</MenuItem>
        <MenuItem value={"jeonnam"}>전라남도</MenuItem>
        <MenuItem value={"jeonbuk"}>전라북도</MenuItem>
        <MenuItem value={"ulsan"}>울산</MenuItem>
        <MenuItem value={"sejong"}>세종</MenuItem>
        <MenuItem value={"daejeon"}>대전</MenuItem>
      </Select>
    </FormControl>
  );
}
