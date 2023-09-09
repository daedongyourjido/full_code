import { KakaoMap } from "./map.js";
import "./main.css";
import Bar from "../../modules/layout/bar.js";

function Main() {
  return (
    <div className="root" data-cy="main">
      <Bar main={true} />
      <KakaoMap />
    </div>
  );
}

export default Main;
