import Dropdown from 'react-bootstrap/Dropdown';
import GlobalContext from '@/context/GlobalContext';
import { useContext } from 'react';
import useApiHelper from '@/api';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

function Profile() {
  const gContext = useContext(GlobalContext);
  const api = useApiHelper();
  const router = useRouter();


  const handleLogout = () => {
    api.signOut().then(res => {
      router.push('/sign-in')
      gContext.setIsLoggedIn(false);
      Cookies.remove('accessToken')
    }).catch(error => {
      gContext.setIsLoggedIn(false);
      Cookies.remove('accessToken')
    })
  }

  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        {gContext?.user?.username}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#">Profile</Dropdown.Item>
        <Dropdown.Item onClick={handleLogout} href="#">Logout</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Profile;