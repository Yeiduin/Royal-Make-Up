import React from 'react'
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { ArrowDownIcon } from '@heroicons/react/20/solid'
import { CurrencyDollarIcon } from '@heroicons/react/20/solid'

export const StatisticsCard = (props) => {


    return (
        <Card
          sx={{ height: '100%' }}
          {...props}
        >
          <CardContent>
            <Grid
              container
              spacing={3}
              sx={{ justifyContent: 'space-between' }}
            >
              <Grid item>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="overline"
                >
                  {props.name}
                </Typography>
                <Typography
                  color="textPrimary"
                  variant="h4"
                >
                  {props.statistic}
                </Typography>
              </Grid>
              <Grid item>
                <Avatar
                  sx={{
                    backgroundColor: '#FBA744',
                    height: 42,
                    width: 42
                  }}
                >
                  {props.icon}
                </Avatar>
              </Grid>
            </Grid>
            <Box
              sx={{
                pt: 2,
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {/* <ArrowDownIcon color="error" className='h-5 w-5 flex-shrink-0'/>
              <Typography
                color="error"
                sx={{
                  mr: 1
                }}
                variant="body2"
              >
                12%
              </Typography>
              <Typography
                color="textSecondary"
                variant="caption"
              >
                Since last month
              </Typography> */}
            </Box>
          </CardContent>
        </Card>
      )
};