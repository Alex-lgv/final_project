import { Navigate } from 'react-router-dom';
import FormSearch from './../../components/forms/formSearch/FormSearch';

const Search = () => {
  if (!localStorage.getItem('token')) {
    return <Navigate to="/authorization" />;
  } else return <FormSearch />;
};

export default Search;
