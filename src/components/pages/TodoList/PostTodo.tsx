"use client";
import React, { useState } from "react";
import scss from "./PostTodo.module.scss";
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
  useGetTodoQuery,
} from "@/redux/api/v1/todo";
import AddProduct from "./AddProduct";

const PostTodo = () => {
  const { data } = useGetTodoQuery();
  const [putData] = useEditTodoMutation();
  const [deleteData] = useDeleteTodoMutation();

  const [editMode, setEditMode] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<any>(null);

  const deleteItem = async (_id: string) => {
    try {
      await deleteData(_id);
      console.log("Item deleted");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (item: any) => {
    setEditMode(true);
    setEditItem(item);
  };

  const saveEdit = async () => {
    try {
      const { _id, ...data } = editItem;
      const response = await putData({ _id, ...data });
      console.log("Item updated:", response);
      setEditMode(false);
      setEditItem(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditItem({
      ...editItem,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className={scss.PostTodo}>
      <div className="container">
        <div className={scss.content}>
          <h1>NIKE PRO</h1>
          <AddProduct />
          <div className={scss.bigBlock}>
            {data
              ?.slice()
              .reverse()
              .map((item, index) => (
                <div className={scss.card} key={index}>
                  {editMode && editItem?._id === item._id ? (
                    <div className={scss.edit}>
                      <input
                        type="text"
                        name="image"
                        value={editItem.image}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="name"
                        value={editItem.name}
                        onChange={handleChange}
                      />
                      <input
                        type="text"
                        name="price"
                        value={editItem.price}
                        onChange={handleChange}
                      />
                      <button style={{ height: "30px" }} onClick={saveEdit}>
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className={scss.block}>
                      <img src={item.image} alt="" />
                      <p>{item.name}</p>
                      <p>{item.price}</p>
                      <button
                        className={scss.btn1}
                        onClick={() => deleteItem(item._id)}
                      >
                        Delete
                      </button>
                      <button
                        className={scss.btn2}
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostTodo;
