namespace TODO {
  type GetTodoResponse = ITodo[];
  type GetTodoRequest = void;

  type PostTodoResponse = ITodo[];
  type PostTodoRequest = ITodo;

  type DeleteTodoResponse = ITodo;
  type DeleteTodoRequest = ITodo;

  type EditTodoResponse = ITodo;
  type EditTodoRequest = ITodo;
}
