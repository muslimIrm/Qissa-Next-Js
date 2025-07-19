
import { IoMdAdd } from "react-icons/io";
import Fab from '@mui/material/Fab';

function FabButton({ isHidden }) {
    return (

        <Fab color="primary" aria-label="add" className={` !fixed !bottom-15 !right-16${isHidden? "hidden": ""}`}>
            <IoMdAdd />
        </Fab>
    );
}


module.exports = FabButton