import classNames from "classnames"
import s from "./style.module.scss"
import { useEffect, useState } from "react"
import DetailsPanel from "./Details_panel/DetailsPanel"
import DataItem from "./Data_item/DataItem"
import { createRowM, DataItemWithChild, DetailsItemInputData, CreateRowRequest, USER_DATA } from "store/api"
import ChildRow from "./Child_row/ChildRow"
import { useAppDispatch } from "store"
import { createRowInState, createTemplate, deleteTemplateWhithoutId, setCurrentEdit } from "store/slice"
import { useAppSelector } from "store/hooks"



type DetailsItemProps = {
    data: DataItemWithChild | null
    idParent: number | null
}


const DetailsItem = ({data, idParent}: DetailsItemProps) => {
    const currenData: DetailsItemInputData = {
        rowName: data?.rowName.length === 0 ? 'Без названия' : (data?.rowName as string),
        salary: data?.salary ?? 0,
        equipmentCosts: data?.equipmentCosts ?? 0,
        overheads: data?.overheads ?? 0,
        estimatedProfit:  data?.estimatedProfit ?? 0
    }
    const [isEdit, setEdit] = useState(false)
    const currentEdit = useAppSelector((state) => state.rowStore.curRowForEdit)
    const dispatch = useAppDispatch()
    const [createRow, {data: rowReq, isSuccess: RowSuccess}] = createRowM()
    const [itemData, setItemData] = 
    useState<CreateRowRequest['body']>({   
        rowName: '', //из инпута
        equipmentCosts: 0,  //из инпута
        estimatedProfit: 0, //из инпута
        overheads: 0,   //из инпута
        salary: 0,      //из инпута
        parentId: idParent,
        machineOperatorSalary: 0,
        mainCosts: 0,
        materials: 0,
        mimExploitation: 0,
        supportCosts: 0
    })

    useEffect(() => {
        if (currentEdit === data?.id) {
            setEdit(true)
        } else {

            setEdit(false)
        }
        if(data?.id === 0) {
            setEdit(true)
        }
        if(!data) {
            setEdit(true)
        }
    },[currentEdit])


    const onEnterSend = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && isEdit) {
            console.log('iter')
            setEdit(false)
            console.log(itemData)
            createRow({ body: itemData, useId: USER_DATA.id })
        }
          
    }

    const onSetInputData = (currentInput: keyof DetailsItemInputData, value: string ) => {
        setItemData({...itemData, [currentInput]: value})
    }

    
    const onSetEdit = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {   
        if (e.detail === 2) {
            dispatch(deleteTemplateWhithoutId())
            console.log(currentEdit)
            currentEdit === data?.id ? dispatch(setCurrentEdit(null)) : dispatch(setCurrentEdit(data?.id as number))
            setEdit(!isEdit)
        }
    }

    const hanleCreateTemplateRow = () => {
        if (data) {
            dispatch(createTemplate(data.id))  
        }
    
    }

    return (
        <li className={classNames(s.details__item, "details_item")} onKeyDown={(e) => onEnterSend(e)}> 
            <div className={classNames(s.details_item__content, (isEdit && s.edit))} onClick={(e) => onSetEdit(e)}>
                <DetailsPanel isHidden={isEdit} onCreateRow={hanleCreateTemplateRow} />
                { 
                    (Object.entries(currenData)).map((el) => 
                    <DataItem inputName={el[0] as keyof DetailsItemInputData} dataItem={el[1]} 
                        isRender={isEdit} setInputData={onSetInputData} 
                        value={String(itemData[`${el[0] as keyof CreateRowRequest['body']}`])}/>)
                }
            </div>       
            <ul className={s.details__sub_list}>
                {data?.child &&
                   data.child.map((el) => <ChildRow idParent={data.id} data={el}/>) 
                }
            </ul>                                                                                    
        </li>
    )
}


export default DetailsItem