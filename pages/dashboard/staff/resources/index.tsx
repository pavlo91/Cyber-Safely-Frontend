import AddIcon from '@mui/icons-material/AddOutlined'
import { Button } from '@mui/material'
import { DataGridActions, DataGridViewer, InferColType } from '../../../../components/common/DataGridViewer'
import { SearchBar } from '../../../../components/common/SearchBar'
import { withDashboardLayout } from '../../../../components/dashboard/Layout'
import { CreateCategoryForm } from '../../../../components/forms/CreateCategoryForm'
import { CreateResourceForm } from '../../../../components/forms/CreateResourceForm'
import { ResourcesQuery, namedOperations, useCreateCategoryMutation, useCreateResourceMutation, useResourcesQuery } from '../../../../schema'
import { useAlert } from '../../../../utils/context/alert'

const columns: InferColType<ResourcesQuery['resources']> = [
  {
    width: 200,
    field: 'title',
    headerName: 'Title',
  },
  {
    width: 300,
    field: 'subTitle',
    headerName: 'Sub Title',
  },
  {
    width: 250,
    field: 'url',
    headerName: 'URL',
  },
  {
    width: 350,
    field: 'category',
    headerName: 'Category',
    sortable: false,
    valueGetter(params) {
        return params.row.category?.name
    },
  },
  {
    width: 150,
    field: 'createdAt',
    headerName: 'Created',
    valueFormatter(params) {
      return new Date(params.value).toLocaleString()
    },
  },
]

function Resources() {
  const { pushAlert } = useAlert()

  const query = useResourcesQuery()

  const [ createResource ] = useCreateResourceMutation({
    refetchQueries: [namedOperations.Query.resources],
  });

  const [ createCategory ] = useCreateCategoryMutation({
    refetchQueries: [namedOperations.Query.categories],
  });

  return (
    <DataGridViewer
      title="Resources"
      query={query}
      columns={columns}
      data={query.data?.resources}
      initialSortModel={{ field: 'createdAt', sort: 'desc' }}
      actions={
        <DataGridActions>
          <Button
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => {
              pushAlert({
                type: 'custom',
                title: 'Create Resource',
                content: CreateResourceForm,
                result: (input: any) => {
                  createResource({ variables: { input } })
                },
              })
            }}
          >
            Create Resource
          </Button>

          <Button
            fullWidth
            startIcon={<AddIcon />}
            onClick={() => {
              pushAlert({
                type: 'custom',
                title: 'Create Category',
                content: CreateCategoryForm,
                result: (input: any) => {
                  createCategory({ variables: { input } })
                },
              })
            }}
          >
            Create Category
          </Button>

          <SearchBar onSearch={(search) => query.refetch({ filter: { ...query.variables?.filter, search } })} />
        </DataGridActions>
      }
    />
  )
}

export default withDashboardLayout(Resources, {
  title: 'Resources',
})
