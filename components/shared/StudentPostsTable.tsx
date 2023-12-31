import CheckIcon from '@mui/icons-material/CheckCircleOutlined'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import FilterIcon from '@mui/icons-material/FilterAltOutlined'
import NotifyIcon from '@mui/icons-material/NotificationsOutlined'
import OpenIcon from '@mui/icons-material/OpenInNewOutlined'
import {
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  InputAdornment,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material'
import { LinkProps } from 'next/link'
import { useQueryParam } from '../../helpers/hooks'
import {
  AnalysisItemSeverityEnum,
  PostsQuery,
  namedOperations,
  useExecuteActionMutation,
  usePostsQuery,
  useSimulateNewFlaggedPostMutation,
} from '../../schema'
import { useAlert } from '../../utils/context/alert'
import { useUser } from '../../utils/context/auth'
import { AvatarWithName } from '../common/AvatarWithName'
import { DataGridActions, DataGridViewer, InferColType } from '../common/DataGridViewer'
import { DropDownButton } from '../common/DropDownButton'
import { PlatformChip } from '../common/PlatformChip'
import { SeverityImage } from '../common/SeverityImage'

export function PostActions({ postId, url }: { postId: string; url: string }) {
  const { pushAlert } = useAlert()

  const [executeAction] = useExecuteActionMutation({
    refetchQueries: [namedOperations.Query.posts, namedOperations.Query.post],
  })

  return (
    <DropDownButton>
      <MenuItem component="a" target="_blank" href={url}>
        <ListItemIcon>
          <OpenIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Open Link</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          executeAction({ variables: { type: 'MARK_AS_ACCEPTABLE', postId } })
        }}
      >
        <ListItemIcon>
          <CheckIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Mark as Acceptable</ListItemText>
      </MenuItem>
      <MenuItem
        sx={(theme) => ({ color: theme.palette.error.main })}
        onClick={() => {
          executeAction({ variables: { type: 'MARK_AS_NOT_ACCEPTABLE', postId } })
        }}
      >
        <ListItemIcon>
          <CheckIcon fontSize="small" color="error" />
        </ListItemIcon>
        <ListItemText>Mark as Not Acceptable</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem
        onClick={() => {
          executeAction({ variables: { type: 'NOTIFY_STUDENT', postId } })
        }}
      >
        <ListItemIcon>
          <NotifyIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Notify Student</ListItemText>
      </MenuItem>
      <MenuItem
        sx={(theme) => ({ color: theme.palette.error.main })}
        onClick={() => {
          pushAlert({
            type: 'confirm',
            title: 'Confirm',
            message: 'Are you sure you want to take this post down?',
            confirm: () => {
              executeAction({ variables: { type: 'TAKE_DOWN_POST', postId } })
            },
          })
        }}
      >
        <ListItemIcon>
          <DeleteIcon fontSize="small" color="error" />
        </ListItemIcon>
        <ListItemText>Take Down Post</ListItemText>
      </MenuItem>
    </DropDownButton>
  )
}

const columns: InferColType<PostsQuery['posts']> = [
  {
    width: 250,
    field: 'name',
    headerName: 'Name',
    renderCell(params) {
      return <AvatarWithName src={params.row.user.avatar?.url} name={params.row.user.name} />
    },
  },
  {
    width: 250,
    field: 'school',
    headerName: 'School',
    renderCell(params) {
      const schools = params.row.schools.map((e) => e.name)

      if (schools.length <= 1) {
        return schools[0]
      }

      return (
        <Tooltip title={schools.join(', ')}>
          <Typography variant="inherit">{schools[0] + ', +' + (schools.length - 1)}</Typography>
        </Tooltip>
      )
    },
  },
  {
    width: 300,
    field: 'text',
    sortable: false,
    headerName: 'Text',
  },
  {
    width: 150,
    field: 'platform',
    sortable: false,
    headerName: 'Platform',
    renderCell(params) {
      if (!params.row.platform) {
        return '-'
      }
      return <PlatformChip platform={params.row.platform} />
    },
  },
  {
    width: 100,
    field: 'media',
    sortable: false,
    headerName: 'Media',
    valueGetter(params) {
      return params.row.media.length
    },
  },
  {
    width: 100,
    field: 'severity',
    sortable: false,
    headerName: 'Severity',
    renderCell(params) {
      return <SeverityImage severity={params.row.severity} />
    },
  },
  {
    width: 100,
    field: 'manualReview',
    sortable: false,
    headerName: 'Manual Review',
    renderCell(params) {
      return <Checkbox checked={params.row.manualReview} />
    },
  },
  {
    width: 250,
    field: 'reasons',
    sortable: false,
    headerName: 'Reasons',
    renderCell(params) {
      if (!params.row.flag || params.row.flag.reasons.length === 0) {
        return '-'
      }

      return (
        <Stack spacing={0}>
          {params.row.flag.reasons.map((e, index) => (
            <Typography key={String(index)} variant="body2">
              {e}
            </Typography>
          ))}
        </Stack>
      )
    },
  },
  {
    width: 250,
    field: 'latestAction',
    sortable: false,
    headerName: 'Latest Action',
  },
  {
    width: 200,
    field: 'actions',
    type: 'actions',
    renderCell(params) {
      return <PostActions url={params.row.url} postId={params.row.id} />
    },
  },
]

type StudentPostsTableProps = {
  userId?: string
  schoolId?: string
  href?: (postId: string) => LinkProps['href']
}

export function StudentPostsTable({ userId, schoolId, href }: StudentPostsTableProps) {
  const [severity, setSeverity] = useQueryParam('severity', 'string')

  const query = usePostsQuery({
    variables: {
      userId,
      schoolId,
      filter: { severity: severity as AnalysisItemSeverityEnum },
    },
  })

  const [simulate] = useSimulateNewFlaggedPostMutation({
    refetchQueries: [namedOperations.Query.posts],
  })

  const { role } = useUser()

  return (
    <DataGridViewer
      title="Posts"
      query={query}
      columns={columns}
      data={query.data?.posts}
      href={href ? (e) => href(e.id) : undefined}
      actions={
        <DataGridActions>
          {!!userId && (role === 'STAFF' || role === 'ADMIN' || role === 'COACH') && (
            <ButtonGroup>
              <Button
                onClick={() => {
                  simulate({ variables: { input: { userId, severe: false } } })
                }}
              >
                Simulate Low Flagged
              </Button>
              <Button
                onClick={() => {
                  simulate({ variables: { input: { userId, severe: true } } })
                }}
              >
                Simulate High Flagged
              </Button>
            </ButtonGroup>
          )}
          <Select
            variant="outlined"
            value={severity === undefined ? '-' : severity}
            onChange={(e) => setSeverity(e.target.value === '-' ? undefined : e.target.value)}
            startAdornment={
              <InputAdornment position="start">
                <FilterIcon fontSize="small" />
              </InputAdornment>
            }
          >
            <MenuItem value="-">All Posts</MenuItem>
            <MenuItem value="NONE">No Issue Posts</MenuItem>
            <MenuItem value="LOW">Warning Posts</MenuItem>
            <MenuItem value="HIGH">Critical Posts</MenuItem>
          </Select>
        </DataGridActions>
      }
    />
  )
}
