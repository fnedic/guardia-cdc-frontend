import { useEffect, useState } from "react";
import ProtocolService from "../services/axios/ProtocolService.js";
import { useNavigate } from "react-router-dom";

export const useVideoList = () => {
  // LOGIC FOR PROTOCOL RENDERING ////////////////////////////////////////////////
  const [videoList, setVideoList] = useState();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    ProtocolService.videoList().then((r) => {
      setVideoList(r.data);
    });
  }, []);
  ///////////////////////////////////////////////////////////////////////////////

  const fetchVideoList = async () => {
    try {
      const response = await ProtocolService.videoList();
      const updatedVideoList = response.data;
      setVideoList(updatedVideoList);
    } catch (error) {
      console.error("Error fetching protocol list: ", error);
    }
  };

  const editVideo = (id) => {
    navigate(`/video/update/${id}`);
  };

  const deleteVideo = (id) => {
    setSelectedVideoId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = async () => {
    await ProtocolService.deleteVideo(selectedVideoId);
    await fetchVideoList();
    setDeleteDialogOpen(false);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  function myDate(date) {
    const myDate = new Date(date);
    const day = myDate.getDate();
    const month = myDate.getMonth() + 1;
    const year = myDate.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }

  return {
    videoList,
    deleteDialogOpen,
    editVideo,
    myDate,
    deleteVideo,
    handleDeleteConfirmed,
    handleCloseDeleteDialog,
  };
};
