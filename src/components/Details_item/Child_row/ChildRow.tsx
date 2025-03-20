import { DataItemWithChild } from "store/api"
import DetailsItem from "../DetailsItem"

type ChildItemProps = {
    data: DataItemWithChild
    isEditOrNew?: boolean
    idParent: number | null
}

const ChildRow = ({data, idParent}:ChildItemProps) => {
   return <DetailsItem idParent={idParent} data={data}/>
}



export default ChildRow