import rustLogo from "./imgs/rust-original.svg";
import rustCrab from "./imgs/rust-crab.png";
import type {HxW} from "../types/HxW.d.ts";

const RustLogo = ({ h, w }:HxW) => <img src={rustLogo} height={h ?? 60} width={w ?? 60} />
const RustCrab = () => (
	<div className="crabWalker">
		<img className="crab" src={rustCrab} />
	</div>
)


export { RustLogo, RustCrab }



