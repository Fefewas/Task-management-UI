import React from "react";
import axios from "axios";

const SelectUserForm = () => {
  const [Users, setUsers] = React.useState([]);
  React.useEffect(() => {
    const fetchGetUsers = async () => {
      try {
        const response = await axios.get("http://localhost:7000/users");
        const users = response.data;
        setUsers(users);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };
    fetchGetUsers();
  }, []);
  return (
    <>
      {Users.sort((a, b) => a.fullName.localeCompare(b.fullName)).map(
        (User) => {
          return (
            <option key={"card-" + User._id} value={User._id}>
              {User.fullName}
            </option>
          );
        }
      )}
    </>
  );
};

export default SelectUserForm;
