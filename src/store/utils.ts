import { DataItemWithChild } from "./api";



export const addRow = (multiRow: DataItemWithChild[], 
        searchedId: DataItemWithChild['id'] | null, newRow: DataItemWithChild ) => {
            /* просто пушем в корневой если нет Родительсого id  */
    if (!searchedId) {
        return multiRow.push(newRow)
       
    }
            /* ищем родительский объект по id */
    const stack = [...multiRow]

    while(stack.length > 0) {
        const current = stack.pop()

        if (current?.id === searchedId) {
            return current.child?.unshift(newRow)
        }

        if(current?.child) {
            for(let i = 0; i < current.child.length; i++) {
                stack.push(current.child[i])
            }
          
        }
    }

    return null
}

export const searchRow = (multiRow: DataItemWithChild[], 
        searchedId: DataItemWithChild['id'],) => {

    const stack = [...multiRow]
        
    while(stack.length > 0) {
        const current = stack.pop()

        if (current?.id === searchedId) {
            return current
        }

        if(current?.child) {
            stack.concat(current.child)
        }

    }

    return null
}

export const deleteTemplate = (multiRow: DataItemWithChild[]) => {
    
    const stack = [...multiRow]

    while(stack.length > 0) {
        const current = stack.pop()
       
        if (current?.child && current?.child?.length > 0) {
            current.child = current.child.filter((el) => el.id !== 0) 
                 
            for(let i = 0; i < current.child.length; i++) {
                stack.push(current.child[i])
            }          
        }
      
    }

    return multiRow
}

export const editRow = (multiRow: DataItemWithChild[], 
    searchedId: DataItemWithChild['id'] | null, editRow: DataItemWithChild ) => {
    
    const stack = [...multiRow]

    while(stack.length > 0) {
        const current = stack.pop()
       
        if (current?.id === searchedId) {
            for (let key in editRow) {
                
             
              }

            } else { 
                if (current?.child) {
                  for(let i = 0; i < current.child.length; i++) {
                        stack.push(current.child[i])
                    }         
                }

        }
      
    }

    return multiRow
}