import ButtonB from './ButtonB'
import {useLocation} from "react-router-dom";

const ButtonAdd = ({ onAdd, showAdd }) => {
const location = useLocation()
    return (
        <div className={"button"}>

            {location.pathname === '/' && (
        <ButtonB
          color={showAdd ? 'red' : '#858080'}
          text={showAdd ? 'Close' : 'Add'}
          onClick={onAdd}
        />
      )}
        </div>
    );
}

export default ButtonAdd;