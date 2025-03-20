import { useEffect, useState } from "react"
import s from "./style.module.scss"
import classNames from "classnames"
import DetailsItem from "../components/Details_item/DetailsItem"
import { DataItemWithChild, getAccessM, getListQ, USER_DATA } from "store/api"
import { useAppDispatch } from "store"
import { initRowStore } from "store/slice"
import { useAppSelector } from "store/hooks"

const Main = () => {
    const {data: rowList} = getListQ(USER_DATA.id)
    const dispatch = useAppDispatch()
    const rows = useAppSelector((state) => state.rowStore.data)

    useEffect(() => {
        dispatch(initRowStore(rowList ?? null))
    },[rowList])
    
  return (  
            <>
                <ul className={s.details__body}>
                     {
                        rows?.length === 0 ?

                        <DetailsItem data={null} idParent={null} /> :

                        rows?.map((el) => <DetailsItem data={el} idParent={null} />)
                    }          
                    
                </ul>
            </>
        )  
}

export default Main