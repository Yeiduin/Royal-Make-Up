import { useNavigate } from 'react-router-dom';


export const useNav = () => {

  const navigate = useNavigate();

  const goHome = () => {
    navigate("/home");
  }

  const redirectPage = (id) => {
    navigate(`/listproducts/${id}`);
  }

  const goBack = () => {
    navigate(-1);
  }

  const redirectDetails = (id) => {
    navigate(`/details/${id}`);
  }


  return ({ goHome, goBack, redirectDetails, redirectPage })
}
