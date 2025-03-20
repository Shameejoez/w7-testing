import { useEffect, useState } from "react"
import s from "./style.module.scss"
import classNames from "classnames"
import DetailsItem from "../components/Details_item/DetailsItem"
import { getAccessM, getListQ, USER_DATA } from "store/api"
import { Outlet } from "react-router-dom"

const Layout = () => {
    const [sideBar, setSideBar] = useState(false)
    const [curSide, setCurSide] = useState('Абривиатура')


    const onSetSideBar = (evt: React.MouseEvent<HTMLInputElement, MouseEvent>) => 
        evt.currentTarget.checked ? setSideBar(true): setSideBar(false)
    
    const onSetCurSide = (sideItemName: string) => {
        setCurSide(sideItemName)
    }

  return (  
<>
    <header className={classNames(s.header_panel, s.header, 'content')}>
        <nav className={classNames(s.header__nav_bar, s.header_bar)}>
            <div className={classNames(s.header_bar__list, s.left_panel)}>
                <button className={s.header_bar__btn}>
                   <img src={'icons/variant_view.svg'} alt="Настроить вид меню" />
                </button>
                <button className={s.header_bar__btn}>
                    <img src={'/icons/go_back.svg'} alt="Вернуться назад" />
                </button>
            </div>
            <ul className={classNames(s.header_bar__list, s.right_panel)}>
                <li className="input__wrapper">                     
                    <input className={s.header_bar__item} type="radio" id="view" name="header_bar"/>
                    <label htmlFor="view">Просмотр</label>
                </li>
                <li className="input__wrapper">
                    <input className={s.header_bar__item} type="radio" id="set" name="header_bar"/>
                    <label htmlFor="set">Управление</label>
                </li>  
            </ul>
        </nav>
    </header>
    <main className={s.content__wrapper}>
        <div className={classNames(s.left_side_bar, s.side_bar)}>
            <div className={classNames(s.side_bar__panel)}>
                    <input className={s.side_panel__item} type="checkbox" id="open_side" onClick={(e) => onSetSideBar(e)} />
                    <label htmlFor="open_side">Название проекта<br/><span>{curSide}</span></label>
            </div>             
            <ul className={classNames(s.side_bar__list, sideBar && s.hidden)}>
                 <li className="input__wrapper">                     
                        <input className={s.side_bar__item} type="radio" id="side_radio_1" name="side_bar"/>
                        <label htmlFor="side_radio_1" onClick={() => onSetCurSide('По проекту')}>По проекту</label>
                 </li>
                 <li className="input__wrapper">                     
                        <input className={s.side_bar__item} type="radio" id="side_radio_2" name="side_bar"/>
                        <label htmlFor="side_radio_2" onClick={() => onSetCurSide('Объекты')}>Объекты</label>
                 </li>               
            </ul>
        </div>
        <section className={s.ditails}>
            <h2 className="details__title visually-hidden">
                Детальная информация
            </h2>
            <div className="details__header">
                <h3 className={s.details__side_title}>
                <span>Строительно-монтажные работы</span>
                </h3>
                <ul className={s.details__data_params}>
                    <li className={s.details__data_items}>Уровень</li>
                    <li className={s.details__data_items}>Наименование работ</li>
                    <li className={s.details__data_items}>Основная з/п</li>
                    <li className={s.details__data_items}>Оборудование</li>
                    <li className={s.details__data_items}>Накладные расходы</li>
                    <li className={s.details__data_items}>Сметная прибыль</li>
                </ul>
            </div>
            <Outlet />
        </section>
    </main>
</>
        )  
}

export default Layout