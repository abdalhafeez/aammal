import { formatDistance, subDays } from "date-fns"
function ItemDate({ item }) {
  return (
    <div className="post-date text-muted">
      {formatDistance(subDays(new Date(item.createdAt), 0), Date.now(), {
        addSuffix: true,
      })}
    </div>
  )
}

export default ItemDate
