import React from 'react';
import { getUser, removeUserSession } from '../../Utils/Common';

function Dashboard(props) {
  const user = getUser();
 
  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push('/login');
  }
 
  return (
    <div style={{margin: '0 auto', fontSize:'26px', paddingTop:'40%'}}>
      Здравствуйте, {user.name}!<br /><br />
      <div >
      <input style={{background: 'whitesmoke', color: 'black', width: '170px', margin: '0 auto'}} type="button" onClick={handleLogout} value="Выйти"  />
      </div>
    </div>
  );
}
 
export default Dashboard;