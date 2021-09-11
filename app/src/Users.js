import * as React from "react";

import * as apiClient from "./apiClient";

const Users = () => {
  const [users, setUsers] = React.useState([]);
  console.log(users);
  const getUsers = () => apiClient.getUsers().then(setUsers);

  React.useEffect(() => {
    getUsers();
  }, []);

  const onSubmit = (event) => {
    const {
      username: { value: username },
      email: { value: email },
    } = event.currentTarget.elements;

    event.preventDefault();
    apiClient.addUser({ username, email }).then(getUsers);
  };
  const deleteUser = (id) => apiClient.deleteUser(id).then(getUsers);

  return (
    <>
      <form {...{ onSubmit }}>
        <label>
          Username
          <input name="username" required />
        </label>
        <label>
          Email
          <input name="email" type="email" required />
        </label>
        <button>Add user</button>
      </form>
      <ul>
        {users.map((user) => {
          return (
            <>
              <li key={user.username}>{user.username}</li>
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </>
          );
        })}
      </ul>
    </>
  );
};

export default Users;
