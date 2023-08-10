import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useUtils = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { questions, counter } = useSelector((state) => state.questions);

  return {
    dispatch,
    navigate,
    user,
    questions,
    counter,
  };
};

export default useUtils;
