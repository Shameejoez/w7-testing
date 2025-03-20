import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiUrl = 'http://185.244.172.108:8081'

type UserData = {
        id: number,
        rowName: string
}

type DataItem = {
    equipmentCosts: number,
    estimatedProfit: number,                     
    id: number,
    machineOperatorSalary: number,
    mainCosts: number,
    materials: number,
    mimExploitation: number,
    overheads: number,
    rowName: string,
    salary: number,
    supportCosts: number,
    total: number
}

export type CreateRowRequest = {
    useId: UserData['id'],
    body: Omit<DataItem, 'id' | 'total'> & { parentId: DataItem['id'] | null}
}

type UpdateRowRequest = { 
     userId: number,
     rowId: DataItem['id'],
     body: Omit<DataItem, 'id' | 'total'> 
    }

type AccessRowMutationResponse = {
    changed: DataItem[],
    current: DataItem
}

export type DataItemWithChild = {
    child:
      null | DataItemWithChild [], 
} & DataItem

type DeleteRowData = {
    userId: UserData['id'],
    rowId: DataItem['id']}

export const USER_DATA: UserData = {
    id: 149717,
    rowName: '89d8c419-75b8-4627-b36b-d5cf65cedcfc'
}

export type DetailsItemInputData = Pick<DataItemWithChild, 'rowName' | 'salary' | 'equipmentCosts' | 'overheads' | 'estimatedProfit'>


export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: apiUrl}),
    endpoints: (build) => ({
        gainAccess: build.mutation<UserData, void>({
            query: () => ({
                url: '/v1/outlay-rows/entity/create',
                method: 'POST'
            }),
            transformResponse: (response: UserData) => response
        }),

        getList: build.query<DataItemWithChild[], UserData['id']>({
            query: ( id ) => ({
                url: `/v1/outlay-rows/entity/${id}/row/list`
            })
        }),

        deleteRow: build.mutation< AccessRowMutationResponse, DeleteRowData>({
            query: ({rowId, userId}) => ({
                url: `/v1/outlay-rows/entity/${userId}/row/${rowId}/delete`,
                method: 'POST'
            }),

            transformResponse: (response: AccessRowMutationResponse) => response
        }),

        updateRow: build.mutation<AccessRowMutationResponse, UpdateRowRequest>({
            query: ({userId, rowId, body}) =>  ({
                url: `/v1/outlay-rows/entity/${userId}/row/${rowId}/update`,
                method: 'POST',
                body: body
            }),
            transformResponse: (response: AccessRowMutationResponse) => response
        }),

        createRowInEntity: build.mutation<AccessRowMutationResponse, CreateRowRequest>({
            query: ({body, useId}) => ({
                url: `/v1/outlay-rows/entity/${useId}/row/create`,
                method: 'POST',
                body: body

            }),
            transformErrorResponse: (response: any) => {
                return response
            },
            transformResponse: (response: AccessRowMutationResponse) => {
                console.log(response)

                return response
            }
        })
    })
})


export const { 
    useGainAccessMutation : getAccessM,
    useGetListQuery : getListQ,
    useDeleteRowMutation: deleteRowM,
    useUpdateRowMutation: updateRowM,
    useCreateRowInEntityMutation: createRowM,
 } = api;