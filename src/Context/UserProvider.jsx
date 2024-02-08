import React, {useEffect, useState } from 'react';
import UserContext from './UserContext'
import {getCurrentUser} from '../auth/auth';


const UserProvider = ({Children}) => {
  const [user, setUser] = useState('');

  // fetch server from current user
  useEffect(() => {
    return () => {
      const users = getCurrentUser();
      setUser(users);
    }
  }, [])

  return (
    <UserContext.Provider value={user}>
        {Children}
    </UserContext.Provider>
  );
}

export default UserProvider;
