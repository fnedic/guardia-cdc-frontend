import { useEffect, useState } from "react";
import UserService from "../services/axios/UserService.js";
import { useNavigate } from "react-router-dom";

export const useUserList = () => {
  const [userList, setUserList] = useState([]);
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    UserService.getUserList().then((res) => {
      setUserList(res.data);
    });
  }, []);

  const editUser = (id) => {
    navigate(`/user/update/${id}`);
  };

  const fetchUserList = async () => {
    try {
      const response = await UserService.getUserList();
      const updateUserList = response.data;
      setUserList(updateUserList);
    } catch (error) {
      console.error("Error al obtener lista de usuarios: ", error);
    }
  };

  const deleteUser = (id) => {
    setSelectedUserId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    await UserService.deleteUser(selectedUserId);
    await fetchUserList();
    setDeleteDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  return {
    userList,
    deleteDialogOpen,
    editUser,
    deleteUser,
    handleDeleteConfirmed,
    handleCloseDeleteDialog,
  };
};
