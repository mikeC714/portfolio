import fortHenry from "./imgs/maryland/Fort-McHenry.webp";
import baltimore from "./imgs/maryland/baltimore.jpg";
import crab from "./imgs/maryland/maryland_crab.jpg"; 
import bay from "./imgs/maryland/chesapeake_bay.webp";

const Fort = () => <img src={fortHenry}  className="locationImg"/>
const Bmore = () => <img src={baltimore} className="locationImg"/>
const Crab = () => <img src={crab} className="locationImg"/>
const Bay = () => <img src={bay} className="locationImg"/>

export{ Fort, Bmore, Crab, Bay };
