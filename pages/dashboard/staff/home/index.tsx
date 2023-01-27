import CalendarIcon from '@mui/icons-material/CalendarMonthOutlined'
import { Box, Grid, InputAdornment, MenuItem, Select, Stack, Typography } from '@mui/material'
import 'chartjs-adapter-date-fns'
import { useState } from 'react'
import { CumulativeChartCard } from '../../../../components/chart/CumulativeChartCard'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { useStatsForStaffQuery } from '../../../../types/graphql'

function Home() {
  const [days, setDays] = useState(14)

  const { data } = useStatsForStaffQuery({
    variables: { days },
  })

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack direction="row" alignItems="center">
            <Typography variant="h5" flexGrow={1}>
              Stats
            </Typography>
            <Select
              value={days}
              variant="outlined"
              onChange={(e) => setDays(e.target.value as number)}
              startAdornment={
                <InputAdornment position="start">
                  <CalendarIcon />
                </InputAdornment>
              }
            >
              <MenuItem value={7}>Last week</MenuItem>
              <MenuItem value={14}>Last 2 weeks</MenuItem>
              <MenuItem value={30}>Last month</MenuItem>
              <MenuItem value={60}>Last 2 months</MenuItem>
            </Select>
          </Stack>
        </Grid>
        <Grid item xs={12} sm={6}>
          <CumulativeChartCard
            fillHeight
            title="Total Users*"
            data={data?.statsOfCreatedUsers.stats}
            total={data?.statsOfCreatedUsers.total}
            helper="*Users that confirmed their e-mail address"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CumulativeChartCard
            fillHeight
            title="Total Teams"
            data={data?.statsOfCreatedTeams.stats}
            total={data?.statsOfCreatedTeams.total}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CumulativeChartCard
            fillHeight
            title="Total Members*"
            data={data?.statsOfCreatedMembers.stats}
            total={data?.statsOfCreatedMembers.total}
            helper="*Members with an active member role"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CumulativeChartCard
            fillHeight
            title="Total Parents*"
            data={data?.statsOfCreatedParents.stats}
            total={data?.statsOfCreatedParents.total}
            helper="*Parents with an active parent role"
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default withDashboardLayout(Home, {
  title: 'Home',
})
