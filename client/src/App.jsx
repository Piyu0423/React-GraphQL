import { useState } from "react";
import "./App.css";
import { useQuery, useMutation, gql } from "@apollo/client";

const getUsers = gql`
  query GetUsers {
    getUsers {
      age
      name
    }
  }
`;

const getUserById = gql`
  query GetUserById($id: ID!) {
    getUserById(id: $id) {
      age
      name
    }
  }
`;

function App() {
  const {
    loading: getUsersLoading,
    error: getUsersError,
    data: getUsersData,
  } = useQuery(getUsers);

  const {
    loading: getUserByIdLoading,
    error: geyUserByError,
    data: getUserByData,
  } = useQuery(getUserById, {
    variables: { id: "1" },
  });

  if (getUsersLoading) return <p>Loading...</p>;
  if (getUsersError) return <p>Error: {error.message}</p>;
  return (
    <>
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
