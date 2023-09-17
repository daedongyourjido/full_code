import { KakaoMap } from "./map.js";
import "@styles/views/main/main.css";
// import Bar from "../../modules/layout/bar.js";
import Bar from "@modules/layout/bar";


function Main() {
  return (
    <div className="root" data-cy="main">
      <Bar main={true} />
      <KakaoMap />
    </div>
  );
}

export default Main;
