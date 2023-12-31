import AddIcon from '@mui/icons-material/AddOutlined'
import { Button } from '@mui/material'
import { AvatarWithName } from '../../../../components/common/AvatarWithName'
import { DataGridActions, DataGridViewer, InferColType } from '../../../../components/common/DataGridViewer'
import { SearchBar } from '../../../../components/common/SearchBar'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { CreateSchoolForm } from '../../../../components/forms/CreateSchoolForm'
import { SchoolsQuery, namedOperations, useCreateSchoolMutation, useSchoolsQuery } from '../../../../schema'
import { useAlert } from '../../../../utils/context/alert'

const columns: InferColType<SchoolsQuery['schools']> = [
  {
    width: 250,
    field: 'name',
    headerName: 'Name',
    renderCell(params) {
      return <AvatarWithName type="school" src={params.row.logo?.url} name={params.row.name} />
    },
  },
  {
    width: 200,
    field: 'phone',
    headerName: 'Phone',
  },
  {
    width: 350,
    field: 'address',
    headerName: 'Address',
    valueGetter(params) {
      return params.row.address?.formatted
    },
  },
  {
    width: 150,
    field: 'memberCount',
    headerName: 'Members',
  },
  {
    width: 200,
    field: 'createdAt',
    headerName: 'Joined',
    valueFormatter(params) {
      return new Date(params.value).toLocaleString()
    },
  },
]

function Schools() {
  const { pushAlert } = useAlert()

  const query = useSchoolsQuery()

  const [createSchool] = useCreateSchoolMutation({
    refetchQueries: [namedOperations.Query.schools],
  })

  return (
    <DataGridViewer
      title="Schools"
      query={query}
      columns={columns}
      data={query.data?.schools}
      href={(e) => ({
        pathname: '/dashboard/staff/schools/[schoolId]',
        query: { schoolId: e.id },
      })}
      initialSortModel={{ field: 'createdAt', sort: 'desc' }}
      actions={
        <DataGridActions>
          <Button
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => {
              pushAlert({
                type: 'custom',
                title: 'Create School',
                content: CreateSchoolForm,
                result: (input) => {
                  createSchool({ variables: { input } })
                },
              })
            }}
          >
            Create School
          </Button>
          <SearchBar onSearch={(search) => query.refetch({ filter: { ...query.variables?.filter, search } })} />
        </DataGridActions>
      }
    />
  )
}

export default withDashboardLayout(Schools, {
  title: 'Schools',
})
