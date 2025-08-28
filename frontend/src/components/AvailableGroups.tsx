import { getGroupsForMember } from '../functions/getGroupsForMember'
import { Group } from '@jacobjshelp/paypalztypes'
import { useContextAndErrorIfNull, UserContext } from '../contexts/UserContext'
import { useQuery } from '@tanstack/react-query'
import GroupListItem from './GroupListItem'
import { ViewMode } from './Authenticated'
import Loader from './Loader'

type AvailableGroupsProps = {
  setSelectedGroup: React.Dispatch<React.SetStateAction<number>>
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>
}

function AvailableGroups({
  setSelectedGroup,
  setViewMode,
}: AvailableGroupsProps) {
  const { info } = useContextAndErrorIfNull(UserContext)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['groups'],
    queryFn: () => {
      if (info) return getGroupsForMember(info.username, info.token)
    },
  })

  if (isError) {
    return <div>Error...</div>
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
      <h1>Your groups</h1>
      {data.map((g: Group) => {
        return (
          <GroupListItem
            key={g.id}
            name={g.name}
            onClick={() => {
              setSelectedGroup(g.id)
              setViewMode(ViewMode.GroupView)
            }}
          />
        )
      })}
    </>
  )
}

export default AvailableGroups