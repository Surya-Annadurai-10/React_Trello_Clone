import React, { createContext, useReducer } from 'react'
import styles from './MainCon.module.css'
import CardList from '../../Components/CardList/CardList';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const TasksContent = createContext();

const MainCon = () => {
  
    const initialData = {
        pending : ["pending","api calls" , "ui design "],
        inProgress : ["in progress","api calls" ,"ui design"],
        completed : ["completed","api calls" , "ui design"]
    }

    const reducerfn = (state , {type,payload}) =>{
         switch (type){
            case 'ADD_ITEM':

            console.log(payload);
                return {
                   ...state , 
                   [payload.typeOfList] : [...state[payload.typeOfList] , payload.taskPara]
                    
                };
            case 'EDIT_ITEM':
              
             const taskArrCopyForEdit = [...state[payload.typeOfList]]
             taskArrCopyForEdit.splice(payload.index , 1 , payload.newValue);

                return {
                    ...state , 
                    [payload.typeOfList] : taskArrCopyForEdit
                };
            case 'DELETE_ITEM':

            const taskArrCopyForDelete = [...state[payload.typeOfList]];
            taskArrCopyForDelete.splice(payload.index , 1);
                return {
                    ...state , 
                    [payload.typeOfList] : taskArrCopyForDelete

                };
            case 'MOVE_ITEM':
                 // To Move the data from fromlist to tolist includes 5 steps:
                 //1 . Take a copy of fromlist and as well as toList
                 //2 . Find the item to be moved using payload.index 
                 //3 . Add the item to the ToList 
                 //4 . Delete the item from the fromList 
                 //5 .Update the fromList and toList in the useReducer state

                 // Step1 :  Take a copy of fromlist and as well as toList

                 const fromListCopy = [...state[payload.fromList]]
                 const toListCopy = [...state[payload.toList]]

                // Step 2 : Find the item to be moved using payload.index 
                const itemTobeMoved = state[payload.fromList][payload.index];

                // Step 3 : Add the item to the ToList 
                  toListCopy.push(itemTobeMoved);
               
                // Step 4 :  Delete the item from the fromList 
                  fromListCopy.splice(payload.index , 1)

                // Step 5 :
                return {
                    ...state , 
                    [payload.fromList] : fromListCopy,
                    [payload.toList] : toListCopy
                };         
         } 
    }

    const [state , dispatch] = useReducer(reducerfn , initialData);
   

  return (

    <TasksContent.Provider value={{state ,dispatch}}>
      <DndProvider backend={HTML5Backend}>
      <div className={styles.main_con}>
            <CardList heading={"Pending"} typeOfList = {"pending"} />
            <CardList heading={"In Progress"} typeOfList = {"inProgress"}  />
            <CardList heading={"Completed" } typeOfList = {"completed"} />
        </div>
      </DndProvider>
    </TasksContent.Provider>
  )
}

export default MainCon