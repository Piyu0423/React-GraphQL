import { useState } from "react";
import "./App.css";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      age
      name
    }
  }
`;

const GET_USER_BY_ID = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      age
      name
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
    }
  }
`;

function App() {
  const [user, setUser] = useState({});
  const {
    loading: getUsersLoading,
    error: getUsersError,
    data: getUsersData,
  } = useQuery(GET_USERS);

  const {
    loading: getUserByIdLoading,
    error: geyUserByError,
    data: getUserByData,
  } = useQuery(GET_USER_BY_ID, {
    variables: { id: "1" },
  });

  const [createUser] = useMutation(CREATE_USER);
  if (getUsersLoading) return <p>Loading...</p>;
  if (getUsersError) return <p>Error: {error.message}</p>;

  const handleCreateUser = async () => {
    createUser({
      variables: { name: user.name, age: Number(user.age), isMarried: false },
    });
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="Name..."
          onChange={(e) =>
            setUser((prev) => ({ ...prev, name: e.target.value }))
          }
        />
        <input
          type="number"
          placeholder="Age..."
          onChange={(e) =>
            setUser((prev) => ({ ...prev, age: e.target.value }))
          }
        />
        <button onClick={() => handleCreateUser()}>Create User</button>
      </div>
      {getUserByIdLoading ? (
        <p>Loading....</p>
      ) : (
        <>
          <h1>Choosen User</h1>
          <p>{getUserByData.getUserById.name}</p>
          <p>{getUserByData.getUserById.age}</p>
        </>
      )}

      <h1>Users</h1>
      {getUsersData.getUsers.map((user, index) => (
        <div key={index}>
          <p>{user.name}</p>
          <p>{user.age}</p>
        </div>
      ))}
      <div></div>
    </>
  );
}

export default App;
