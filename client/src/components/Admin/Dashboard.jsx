import React from "react";
import { Box, Container, Grid } from '@mui/material';
import { StatisticsCard } from './StatisticsCard';
import { useSelector } from 'react-redux';
import { CurrencyDollarIcon, ArchiveBoxIcon, UserGroupIcon } from '@heroicons/react/20/solid'

export const Dashboard = () => {

    const { products, users } = useSelector(state=>state)


    return(
        <div className="ml-80 mt-20">
        <>
    
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <StatisticsCard name="PRODUCTS" statistic={products?.length} icon={<ArchiveBoxIcon className='h-5 w-5 flex-shrink-0' />}/>
            
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <StatisticsCard name="USERS" statistic={users?.length} icon={<UserGroupIcon className='h-5 w-5 flex-shrink-0' />}/>
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <StatisticsCard name="SALES" statistic="$ 2K" icon={<CurrencyDollarIcon className='h-5 w-5 flex-shrink-0' />}/>
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
        </div>
    )
}