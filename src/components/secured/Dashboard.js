import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Container, CssBaseline } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import UserService from "./services/UserService";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
    width: 220,
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "dni",
    headerName: "DNI",
    typeof: "number",
    width: 100,
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "medicalRegistration",
    headerName: "Matrícula",
    typeof: "number",
    width: 80,
    editable: false,
    align: "center",
    headerAlign: "center",
  },

  {
    field: "status",
    headerName: "Estado",
    width: 100,
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "role",
    headerName: "Rol",
    width: 100,
    editable: false,
    align: "center",
    headerAlign: "center",
  },
];

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserService.getUser().then((res) => {
      setUsers(res.data);
    });
  }, []);
  const navigate = useNavigate();
  const editUser = (id) => {
    navigate(`/user/update/${id}`);
  };

  return (
    <Container component="main" sx={{ marginTop: 5, marginBottom: 5 }}>
      <CssBaseline />
      <Box sx={{ height: 400, width: "100%" }}>
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
          columns={[
            ...columns,
            {
              field: "actions",
              headerName: "Acciones",
              width: 120,
              renderCell: (params) => (
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => editUser(params.id)}
                >
                  Editar
                </Button>
              ),
            },
          ]}
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
    </Container>
  );
}
