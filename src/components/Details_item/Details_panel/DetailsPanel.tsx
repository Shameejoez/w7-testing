import classNames from "classnames"
import s from "./style.module.scss"
import { useAppDispatch } from "store"
import { setCurrentEdit } from "store/slice"

type DetailsPanelProps = {
    delete?: boolean,
    isHidden?: boolean
    onCreateRow: () => void
}

const DetailsPanel = ({isHidden, onCreateRow}: DetailsPanelProps) => {
    const dispatch = useAppDispatch()
    
    const onClickCreateRow = () => {
        dispatch(setCurrentEdit(null)) 
        console.log('add')
        onCreateRow()
    }
return (
    <div className={classNames(s.details_item__btn_panel)}>
        <div className={classNames(s.details_item__btn_wrapper , (isHidden && 'visually-hidden'))}>
            <button className={classNames(s.details_item__btn, s.edit)} onClick={onClickCreateRow}>
                <img src="/icons/file.svg" alt="Добавить"/>
            </button>
            <button className={classNames(s.details_item__btn, s.delete)}>
                <img src="/icons/Trash_fill.svg" alt="Удалить" />
            </button>
        </div>                                      
    </div>
    )
}


export default DetailsPanel