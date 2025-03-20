import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { DataItemWithChild } from "./api";
import { addRow, deleteTemplate, editRow, searchRow } from "./utils";
import { stat } from "fs";



type RowStore = {
    data: DataItemWithChild[] | null,
    curRowForEdit: DataItemWithChild['id'] | null
}

const initialState: RowStore = {
    data: null,
    curRowForEdit: null
}
export const slazy = createSlice({
    name: 'rowStore',
    initialState,
    reducers: {
        initRowStore: (state, action: PayloadAction<DataItemWithChild[] | null>) => {
            state.data = action.payload
        },
        //знаю что данные нужно переписывать имутабельно, но что делать? 
        // Парсить все в 1 массив и добавлять ключ parent к каждому объекту? в общем уже нет времени. 
        mutationRow: (state, action: PayloadAction<DataItemWithChild>) => {
            const  {id} = action.payload
            const current = searchRow((state.data as DataItemWithChild[] ), id)

            if (current) {

            }
            
        },

        createRowInState: (state, action: PayloadAction<{parent: number, data: DataItemWithChild}>) => {
            const parentId = action.payload.parent
            const newRow = action.payload.data
            addRow((state.data as DataItemWithChild[]), parentId, newRow)
        },

        deleteTemplateWhithoutId: (state) => {
            state.data = deleteTemplate(state.data as DataItemWithChild[])
        },
        /* для того чтобы была открыта только строка редактирования  */
        setCurrentEdit: (state, action: PayloadAction<DataItemWithChild['id'] | null>) => {
            console.log(action.payload)
            state.curRowForEdit = action.payload
        },
         /* создает шаблон, для создания новой строки */
        createTemplate: (state, action: PayloadAction<number | null>) => {
            const currentId = action.payload
                        // перед созданием нового шаблоня удаляю, старый который не заполнили
            state.data = deleteTemplate(state.data as DataItemWithChild[])
            const rowTemplate: DataItemWithChild = {
                child: null,
                equipmentCosts: 0,
                estimatedProfit: 0,
                id: 0,
                machineOperatorSalary: 0,
                mainCosts: 0,
                materials: 0,
                mimExploitation: 0,
                overheads: 0,
                rowName: "",
                salary: 0,
                supportCosts: 0,
                total: 0
            }   
          

            addRow((state.data as DataItemWithChild[]), currentId, rowTemplate)
        }
   }
})


export const {initRowStore, mutationRow, createTemplate, deleteTemplateWhithoutId, setCurrentEdit, createRowInState} = slazy.actions

export default slazy.reducer