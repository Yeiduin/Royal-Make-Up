import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions";
import {
  Card,
  Table,
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TablePagination,
  TableContainer,
} from "@mui/material";
import { Page } from "./UserListTools/Page";
import { Label } from "./UserListTools/Label";
import { UserListHead } from "./UserListTools/UserListHead";
import { UserListToolbar } from "./UserListTools/UserListToolbar";
import { UserMoreMenu } from "./UserListTools/UserMoreMenu";
import { ProgressCircle } from "./ProgressCircle"

export function Users() {
  const userLogged = JSON.parse(localStorage.getItem("userLogged"));
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState("asc");

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState("username");

  const [filterName, setFilterName] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { users } = useSelector((state) => state);

  const dispatch = useDispatch();

  // --- Filtro el usuario logueado --- Devuelve "No users" si no hay usuarios fuera del logueado
  const userList =
    users?.length > 1
      ? users.filter((user) => user.id !== userLogged.id)
      : ["No users"];

  useEffect(() => {
    dispatch(getUsers());
    console.log("USER LOGGED: " + userLogged.email);
  }, [dispatch]);

  // ----------------------------------------------------------------------

  const TABLE_HEAD = [
    { id: "username", label: "Username", alignRight: false },
    { id: "email", label: "Email", alignRight: false },
    { id: "type", label: "Status", alignRight: false },
    { id: "" },
  ];

  // ----------------------------------------------------------------------

  // -- Filtros y búsqueda
  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const applySortFilter = (array, comparator, query) => {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return users.filter(
        (user) =>
          user.username.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userList.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  // -- Paginado
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers =
    userList[0] === "No users"
      ? []
      : applySortFilter(userList, getComparator(order, orderBy), filterName);

  const message =
    userList[0] === "No users"
      ? "No users found"
      : (!users.length
      ? "Loading users"
      : "User not found");

  
 return (
    <div className="ml-80 mt-20">
      <Page title="User ml-80 mx-20">
        <Container>
          <Card>
            <UserListToolbar
              numSelected={selected.length}
              usersSelected={selected}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userList?.length}
                  numSelected={selected?.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row) => {
                      const { id, username, type, email, img, avatarUrl } = row;
                      const isItemSelected = selected.indexOf(id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          type="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, id)}
                            />
                          </TableCell>
                          {/* <TableCell align="left">{id}</TableCell> */}
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar alt={username} src={img !== 'https://cdn.onlinewebfonts.com/svg/img_299586.png' ? img : avatarUrl} />
                              <Typography variant="subtitle2" noWrap>
                                {username}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant="ghost"
                              color={
                                (type === "Admin" && "primary") ||
                                (type === "User" && "success") ||
                                (type === "Banned" && "warning") ||
                                (type === "Blocked" && "error")
                              }
                            >
                              {type === "User" && "Active User"}
                              {type === "Admin" && "Admin"}
                              {type === "Banned" && "Banned User"}
                              {type === "Blocked" && "Blocked User"}
                            </Label>
                          </TableCell>
                          <TableCell align="right">
                            <UserMoreMenu
                              userId={id}
                              type={type}
                              username={username}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {!users.length ? (
                <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <ProgressCircle/>
                      </TableCell>
                    </TableRow>
                  </TableBody>)
                : (!filteredUsers.length && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        {message}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ))}
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={userList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Card>
        </Container>
      </Page>
    </div>
  );
}
