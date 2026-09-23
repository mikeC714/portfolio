import fortHenry from "./imgs/Fort-McHenry.webp";
import baltimore from "./imgs/baltimore.jpg";
import crab from "./imgs/maryland_crab.jpg"; 
import bay from "./imgs/chesapeake_bay.webp";

const Fort = () => <img src={fortHenry}  className="locationImg"/>
const Bmore = () => <img src={baltimore} className="locationImg"/>
const Crab = () => <img src={crab} className="locationImg"/>
const Bay = () => <img src={bay} className="locationImg"/>

export{ Fort, Bmore, Crab, Bay };
