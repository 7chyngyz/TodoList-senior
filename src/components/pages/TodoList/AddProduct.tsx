import React from "react";
import scss from "./AddProduct.module.scss";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePostTodoMutation } from "@/redux/api/v1/todo";

const AddProduct = () => {
  const { register, handleSubmit } = useForm<ITodo>();
  const [postTodoMutation] = usePostTodoMutation();

  const onSubmit: SubmitHandler<ITodo> = async (data) => {
    await postTodoMutation(data);
  };

  return (
    <div className={scss.AddProduct}>
      <div className="container">
        <div className={scss.content}>
          <h1>Add Product</h1>
          <form onClick={handleSubmit(onSubmit)}>
            <input
              placeholder="username"
              type="text"
              {...register("name", { required: true })}
            />
            <input
              placeholder="price"
              type="text"
              {...register("price", { required: true })}
            />
            <input
              placeholder="image"
              type="text"
              {...register("image", { required: true })}
            />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
