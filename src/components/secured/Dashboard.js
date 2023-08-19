import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Container, CssBaseline } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import ProtocolService from "./services/UserService";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Edit } from "@mui/icons-material";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    ProtocolService.getUser().then((res) => {
      setUsers(res.data);
    });
  }, []);

  const navigate = useNavigate();
  const editUser = (id) => {
    navigate(`/user/update/${id}`);
  };
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
      width: 80,
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
          sx={{ backgroundColor: "#8a96db", boxShadow: 0 }}
          variant="contained"
          size="small"
          disableElevation
          endIcon={<Edit />}
          onClick={() => editUser(params.id)}
        >
          Editar
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
          rows={users}
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
