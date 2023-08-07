import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./profile.scss";

import {
  EuiTable,
  EuiTableBody,
  EuiTableHeader,
  EuiTableHeaderCell,
  EuiTableRow,
  EuiTableRowCell,
} from "@elastic/eui";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]); // State to store the fetched data

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<User[]>("http://localhost:8000/users");
        setUsers(response.data); // Update the state with the fetched data
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="profile">
      <div className="profile-table">
        <EuiTable>
          <EuiTableHeader className="table-header">
            <EuiTableHeaderCell>S.N</EuiTableHeaderCell>
            <EuiTableHeaderCell>FirstName</EuiTableHeaderCell>
            <EuiTableHeaderCell>LastName</EuiTableHeaderCell>
            <EuiTableHeaderCell>Email</EuiTableHeaderCell>
          </EuiTableHeader>
          <EuiTableBody>
            {users.map((curValue, index) => (
              <EuiTableRow key={curValue.id}>
                <EuiTableRowCell>{index + 1}</EuiTableRowCell>
                <EuiTableRowCell>{curValue.firstName}</EuiTableRowCell>
                <EuiTableRowCell>{curValue.lastName}</EuiTableRowCell>
                <EuiTableRowCell>{curValue.email}</EuiTableRowCell>
              </EuiTableRow>
            ))}
          </EuiTableBody>
        </EuiTable>
      </div>
      <div className="profile-logout">
        <button onClick={handleLogout}>{<MdLogout />}LogOut</button>
      </div>

    </div>
  );
};

export default Profile;
