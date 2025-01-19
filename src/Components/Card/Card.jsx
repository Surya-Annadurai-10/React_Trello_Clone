import React, { useContext, useEffect, useRef, useState } from "react";
import styles from "./Card.module.css";
import { BsPencilFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { TasksContent } from "../../Container/MainCon/MainCon";
import { useDrag } from "react-dnd";

const Card = (props) => {
  const ctx = useContext(TasksContent);
  const [editMode, setEditMode] = useState(false);
  const textBoxRef = useRef();
  // const dragRef = useRef(null);

  const [{isDragging} , dragRef] = useDrag (() =>({
       type : "CARD" , 

       // to transfer the message ,it needs 3 informations,
         // 1 . message to get transferred.
         // 2 . index need to be added to Accepted cardlist and Deleted from fromlist
         // 3 . TypeOfList where it is taken from 
         
       item : {
         taskMessage : props.ele ,
         index : props.index ,
         typeOfList : props.typeOfList
        },
        collect : (monitor) =>({
          isDragging: !!monitor.isDragging()
          
        })
  }))


  useEffect(() => {
    if (editMode) {
      textBoxRef.current.value = props.ele;
    }
  }, [editMode]);

  const handleSave = () => {
    console.log(textBoxRef.current.value);
    ctx.dispatch({
      type: "EDIT_ITEM",
      payload: {
        typeOfList: props.typeOfList,
        index: props.index,
        newValue: textBoxRef.current.value,
      },
    });
    setEditMode(false);
  };

  const handleDelete = () => {
    console.log(props.typeOfList, props.index);
    ctx.dispatch({
      type: "DELETE_ITEM",
      payload: {
        typeOfList: props.typeOfList,
        index: props.index,
      },
    });
  };

  return (
    <>
      {editMode ? (
        <div className={styles.textBox}>
          <div>
            <textarea
              ref={textBoxRef}
              name=""
              id=""
              placeholder={"Write something.."}
            />
          </div>
          <button className={styles.addBtn} onClick={handleSave}>
            Save
          </button>
          <button
            className={styles.cancelBtn}
            onClick={() => setEditMode(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div style={{
          opacity: isDragging ? 0.5 : 1,
        }}
         ref={dragRef} className={styles.card_con}>
          <div className={styles.para}>
            <span>{props.ele}</span>
          </div>
          <div className={styles.icons}>
            <BsPencilFill onClick={() => setEditMode(true)} />
            <MdDelete onClick={handleDelete} className={styles.delete} />
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
