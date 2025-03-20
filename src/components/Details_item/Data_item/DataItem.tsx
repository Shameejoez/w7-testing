import classNames from "classnames"
import s from "./style.module.scss"
import { DetailsItemInputData } from "store/api"

type DataItemProps = {
    inputName: keyof DetailsItemInputData
    dataItem: number | string,
    isRender?: boolean
    setInputData: (arg: keyof DetailsItemInputData, value: string) => void
    value: string
}

 const DataItem = ({dataItem, isRender, setInputData, inputName, value} : DataItemProps) => {
    const isNew = isRender ?? false;


    const onChangeSetItemData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputData(inputName, e.target.value)
    }

   return (
        <>
           {
            isNew ? 
                <div className={s.details_item__input_wrapper}>
                    <input className={classNames(s.details_item__write)} value={value} type="text" onChange={(e) => onChangeSetItemData(e)} />
                </div>
                :
                <p className={s.details_item__data}>
                    {dataItem}
                </p> 
           } 
        </>
   )

}



export default DataItem