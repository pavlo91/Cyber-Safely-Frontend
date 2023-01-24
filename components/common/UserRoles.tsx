import { Box } from '@mui/material'
import { namedOperations, useRemoveRoleMutation, UserRole as UserRoleType } from '../../types/graphql'
import { useAlert } from '../../utils/context/alert'
import { UserRole, userRoleDisplayText } from './UserRole'

type UserRolesProps = {
  roles: Pick<UserRoleType, 'id' | 'role' | 'status'>[]
  canRemove?: boolean
}

export function UserRoles({ roles, canRemove }: UserRolesProps) {
  const { pushAlert } = useAlert()

  const [removeRole] = useRemoveRoleMutation({
    refetchQueries: [namedOperations.Query.users],
  })

  return (
    <>
      {roles.map(({ id, role, status }) => (
        <Box key={id} mr={0.5}>
          <UserRole
            role={role}
            status={status}
            onDelete={
              canRemove
                ? () => {
                    pushAlert({
                      type: 'confirm',
                      title: 'Remove Role',
                      message: `Are you sure you want to remove role: "${userRoleDisplayText(role)}"?`,
                      confirm: () => {
                        removeRole({ variables: { id } })
                      },
                    })
                  }
                : undefined
            }
          />
        </Box>
      ))}
    </>
  )
}