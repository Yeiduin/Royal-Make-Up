import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions";
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
import { Iconify } from "./SharedTools/Iconify";
import { Page } from "./UserListTools/Page";
import { ListHead } from "./SharedTools/ListHead";
import { ProductListToolbar } from "./ProductListTools/ProductListToolbar";
import { ProductMoreMenu } from "./ProductListTools/ProductMoreMenu";
import { ProgressCircle } from "./SharedTools/ProgressCircle";

export const Products = () => {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { dashboardProducts } = useSelector((state) => state);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // ----------------------------------------------------------------------
  //--- NOMBRES DE LAS COLUMNAS. Al hacer click en una columna se convierte en la columna con el Sort habilitado
  const TABLE_HEAD = [
    { id: "name", label: "Name", alignRight: false },
    { id: "brand", label: "Brand", alignRight: false },
    { id: "price", label: "Price", alignRight: false },
    { id: "discount", label: "Discount", alignRight: false },
    { id: "totalPrice", label: "Final Price", alignRight: false },
    { id: "stock", label: "Stock", alignRight: false },
    { id: "disabled", label: "Status", alignRight: false },
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
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const applySortFilter = (array, comparator, query) => {
    const stabilizedThis = array?.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return dashboardProducts?.filter(
        (user) => user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    }
    return stabilizedThis.map((el) => el[0]);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = dashboardProducts.map((n) => n.id);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dashboardProducts.length) : 0;

  const filteredProducts =
  dashboardProducts[0] === "No products"
      ? []
      : applySortFilter(dashboardProducts, getComparator(order, orderBy), filterName);

  const message =
  dashboardProducts[0] === "No products"
      ? "No products found"
      : !dashboardProducts.length
      ? "Loading products"
      : "Product not found";

  return (
    <div className="ml-80 mt-20 mb-10">
      <Page title="User ml-80 mx-20">
        <Container>
          <Card>
            <ProductListToolbar
              numSelected={selected.length}
              productsSelected={selected}
              filterName={filterName}
              onFilterName={handleFilterByName}
            />

            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={dashboardProducts?.length}
                  numSelected={selected?.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredProducts
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row) => {
                      
                      // --- Nombre de propiedades del modelo Product
                      const {
                        id,
                        name,
                        brand,
                        price,
                        image,
                        discount,
                        totalPrice,
                        stock,
                        disable,                        
                      } = row;

                      const isItemSelected = selected.indexOf(id) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          type="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                          sx={{ border: "black" }}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, id)}
                              sx={{
                                '&.Mui-checked': {
                                  color: "orange",
                                }
                              }}
                      
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack
                              direction="row"
                              alignItems="center"
                              spacing={2}
                            >
                              <Avatar
                                sx={{ width: 28, height: 28 }}
                                alt={name}
                                src={image}
                              />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>

                          <TableCell align="left">
                            <span className="capitalize">{brand}</span>
                          </TableCell>
                          <TableCell align="left">$ {price.toFixed(2)}</TableCell>
                          <TableCell align="left">{discount} %</TableCell>
                          <TableCell align="left">$ {totalPrice.toFixed(2)}</TableCell>
                          <TableCell align="left">{stock}</TableCell>
                          <TableCell align="left">
                            {!disable ? (
                              <Iconify
                                icon="fluent:presence-available-10-regular"
                                sx={{
                                  color: "green",
                                  width: 20,
                                  height: 20,
                                }}
                              />
                            ) : (
                              <Iconify
                                icon="fluent:presence-blocked-10-regular"
                                sx={{
                                  color: "red",
                                  width: 20,
                                  height: 20,
                                }}
                              />
                            )}
                          </TableCell>
                          <TableCell align="right">
                            <ProductMoreMenu id={id} product={row}/>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={9} />
                    </TableRow>
                  )}
                </TableBody>

                {!dashboardProducts.length ? (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={9} sx={{ py: 3 }}>
                        <ProgressCircle />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                ) : (
                  !filteredProducts.length && (
                    <TableBody>
                      <TableRow>
                        <TableCell align="center" colSpan={9} sx={{ py: 3 }}>
                          {message}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  )
                )}
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={dashboardProducts?.length}
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
};
