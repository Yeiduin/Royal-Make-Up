import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, getProducts } from "../../redux/actions";
import { Box, Container, Grid } from "@mui/material";
import { StatisticsCard } from "./StatisticsCard";
import {
  CurrencyDollarIcon,
  ArchiveBoxIcon,
  UserGroupIcon,
} from "@heroicons/react/20/solid";

export const Dashboard = () => {
  const { products, users, dashboardProducts } = useSelector((state) => state);
  const dispatch = useDispatch();

  const admins = users?.filter(user => user.type === "Admin")
  const activeUsers = users?.filter(user => user.type === "User")
  const banned = users?.filter(user => user.type === "Banned")
  const blocked = users?.filter(user => user.type === "Blocked")

  useEffect(()=>{
    dispatch(getProducts());
    dispatch(getUsers());
  }, [dispatch])

  return (
    <div className="ml-80 mt-20">
      <>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
          }}
        >
          <Container maxWidth={false}>
            <Grid container spacing={3}>
              <Grid item lg={3} sm={6} xl={3} xs={12}>
                <StatisticsCard
                  name="active products"
                  statistic={products?.length}
                  totalProducts={dashboardProducts?.length}
                  icon={<ArchiveBoxIcon className="h-5 w-5 flex-shrink-0" />}
                />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                <StatisticsCard
                  name="total users"
                  statistic={users?.length}
                  admins={admins?.length}
                  activeUsers={activeUsers?.length}
                  banned={banned?.length}
                  blocked={blocked?.length}
                  icon={<UserGroupIcon className="h-5 w-5 flex-shrink-0" />}
                />
              </Grid>
              <Grid item xl={3} lg={3} sm={6} xs={12}>
                {/* //! */}
                <StatisticsCard
                  name="sales"
                  statistic="$ 2K"
                  icon={
                    <CurrencyDollarIcon className="h-5 w-5 flex-shrink-0" />
                  }
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    </div>
  );
};
