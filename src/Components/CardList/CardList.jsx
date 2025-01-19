import React, { useContext, useRef, useState } from "react";
import styles from "./CardList.module.css";
import { TasksContent } from "../../Container/MainCon/MainCon";
import Card from "../Card/Card";
import { BsThreeDots } from "react-icons/bs";
import { useDrop } from "react-dnd";

const CardList = ({ heading, typeOfList }) => {
  const ctx = useContext(TasksContent);
  // console.log(ctx.state[typeOfList]);

  const [showTextArea , setShowTextArea] = useState(false);
  const textBoxRef = useRef(null);


  const [{isDragging} , dragRef] = useDrop(() =>({
    accept : "CARD" , 
    drop : (item) =>{
       if(item.typeOfList != typeOfList){
        ctx.dispatch ({
          type : "MOVE_ITEM",
          payload : {
            fromList : item.typeOfList,
            toList : typeOfList,
            index : item.index
          }
        })
       }
    }
  }))

  const handleAddAnotherCard = () =>{
      setShowTextArea(true);
  }

  const handleAdd = () =>{
    console.log(textBoxRef.current.value);
   ctx.dispatch({
    type: "ADD_ITEM",
    payload : {
      typeOfList : typeOfList,
      taskPara : textBoxRef.current.value
    }
   });
    
 
    setShowTextArea(false);
  }

  return (
    <div ref={dragRef} className={styles.cardList_con}>
      <div className={styles.cardList_head}>
        <h2>{heading}</h2>
        <BsThreeDots />
      </div>
      {ctx.state[typeOfList].map((ele, index) => {
        return <Card key={index} typeOfList={typeOfList} index={index} ele={ele} />;
        // return <h1>{ele}</h1>
      })}
      {
        showTextArea ? <div className={styles.textBox}>
          <div>
          <textarea ref={textBoxRef} name="" id=""  placeholder={"Write something.."}/>
          </div>
          <button className={styles.addBtn} onClick={handleAdd}>+Add</button>
          <button className={styles.cancelBtn} onClick={() => setShowTextArea(false)}>Cancel</button>
        </div>:
      <button onClick={handleAddAnotherCard} className={styles.add}>+ Add another card</button>

      }
    </div>
  );
};

export default CardList;
