import goLogo from "./imgs/go-original.svg"; 
import gopherGif from "./imgs/gopher-workout.gif";
import type {HxW} from "../types/HxW.d.ts";

const GoLogo = ({ h, w }:HxW) => <img src={goLogo} height={h ?? 60} width={w ?? 60} />
const GoGif = ({ h, w }:HxW) => <img className="golangGif" src={gopherGif} height={h ?? 60} width={w ?? 60} />

export { GoLogo, GoGif };
