import cppLogo from "./imgs/cplusplus-original.svg"; 
import type {HxW} from "../types/HxW.d.ts";


const CppLogo = ({ h, w }:HxW) => <img src={cppLogo} height={h ?? 60}width={w ?? 60} />
const CLogo = ({ h, w }:HxW) => <img src={cppLogo} height={h ?? 60}width={w ?? 60} />

export { CppLogo, CLogo };
          
