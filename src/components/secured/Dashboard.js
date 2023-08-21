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
import { Delete, Edit } from "@mui/icons-material";
import { useUserList } from "../../hooks/useUserList";

export default function Dashboard() {
  const {
    userList,
    editUser,
    deleteDialogOpen,
    handleCloseDeleteDialog,
    handleDeleteConfirmed,
    deleteUser,
  } = useUserList();

  const columns = [
    {
      field: "name",
      headerName: "Nombre",
      width: 100,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "lastname",
      headerName: "Apellido",
      width: 100,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "dni",
      headerName: "DNI",
      typeof: "number",
      width: 110,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "medicalRegistration",
      headerName: "Matrícula",
      typeof: "number",
      width: 110,
      editable: false,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "status",
      headerName: "Estado",
      width: 120,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "role",
      headerName: "Rol",
      width: 85,
      editable: false,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "actions",
      headerName: "Acciones",
      width: 250,
      editable: false,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <>
          <Button
            sx={{ backgroundColor: "#8a96db", boxShadow: 0, marginRight: 1.5 }}
            variant="contained"
            size="small"
            disableElevation
            endIcon={<Edit />}
            onClick={() => editUser(params.id)}
          >
            Editar
          </Button>
          <Button
            sx={{ backgroundColor: "#ff8080", boxShadow: 0 }}
            variant="contained"
            size="small"
            disableElevation
            endIcon={<Delete />}
            onClick={() => deleteUser(params.id)}
          >
            Borrar
          </Button>
        </>
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
        style={{ textAlign: "center" }}
      >
        <DialogTitle id="delete-dialog-title">Confirmar Borrado</DialogTitle>
        <DialogContent>¿Desea borrar el usuario?</DialogContent>
        <DialogActions style={{ justifyContent: "center" }}>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteConfirmed} color="error">
            Borrar
          </Button>
        </DialogActions>
      </Dialog>
      <Box sx={{ width: "95%" }}>
        <DataGrid
          sx={{
            boxShadow: 3,
            border: 2,
            borderColor: "#799A3D",
            "& .MuiDataGrid-cell:hover": {
              color: "#283583",
            },
          }}
          rows={userList}
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
          pageSizeOptions={[5, 10, 20, 30]}
        />
      </Box>
    </Container>
  );
}
