import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import {
  Container,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Button } from "@mui/material";
import { useProtocolList } from "./../../hooks/useProtocolList";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import ProtocolService from "../secured/services/ProtocolService.js";

export default function Dashboard() {
  const { protocolArray, fetchProtocolList } = useProtocolList(); // Agrega la función fetchProtocolList para actualizar la lista
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProtocolId, setSelectedProtocolId] = useState(null);

  const deleteProtocol = (id) => {
    setSelectedProtocolId(id);
    setDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirmed = async () => {
    await ProtocolService.deleteProtocol(selectedProtocolId);
    await fetchProtocolList(); // Actualiza la lista después de borrar
    setDeleteDialogOpen(false); // Cierra el diálogo
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };
  const columns = [
    {
      field: "title",
      headerName: "Título",
      width: 350,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "protocolGroup",
      headerName: "Grupo",
      width: 180,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "publicationDate",
      headerName: "Publicado",
      width: 150,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "views",
      headerName: "Vistas",
      typeof: "number",
      width: 100,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 150,
      editable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <Button
          sx={{ backgroundColor: "#ff8080", boxShadow: 0 }}
          variant="contained"
          size="small"
          disableElevation
          endIcon={<Delete />}
          onClick={() => deleteProtocol(params.id)}
        >
          Borrar
        </Button>
      ),
    },
  ];

  return (
    <Container
      component="main"
      sx={{
        marginTop: 5,
        marginBottom: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CssBaseline />
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="delete-dialog-title"
      >
        <DialogTitle id="delete-dialog-title">Confirmar Borrado</DialogTitle>
        <DialogContent>
          ¿Estás seguro de que deseas borrar este protocolo?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirmed} color="primary">
            Borrar
          </Button>
        </DialogActions>
      </Dialog>
      {protocolArray && (
        <Box sx={{ width: "85%" }}>
          <DataGrid
            sx={{
              boxShadow: 3,
              border: 2,
              borderColor: "#799A3D",
              "& .MuiDataGrid-cell:hover": {
                color: "#283583",
              },
            }}
            rows={protocolArray}
            columns={[...columns]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
              filter: {
                filterModel: {
                  items: [],
                  quickFilterValues: [""],
                },
              },
            }}
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            slots={{ toolbar: GridToolbar }}
            slotProps={{
              toolbar: {
                showQuickFilter: true,
                quickFilterProps: { debounceMs: 500 },
              },
            }}
            pageSizeOptions={[10, 20, 30, 40]}
          />
        </Box>
      )}
    </Container>
  );
}
