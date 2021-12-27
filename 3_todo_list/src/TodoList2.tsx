import { useForm } from "react-hook-form"

function TodoList2() {
  const { register, watch, handleSubmit, formState } = useForm()
  const onValid = (data: any) => {
    console.log(data)
  }
  const onInValid = () => {
    alert("Error")
  }
  // console.log(watch())
  console.log(formState.errors)

  return (
    <div>
      <form
        onSubmit={handleSubmit(onValid, onInValid)}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <input
          {...register("todo", {
            required: "할 일을 입력하세요",
            minLength: {
              value: 5,
              message: "할 일을 길게 입력하세요",
            },
          })}
          type="text"
          placeholder="할 일을 입력하세요"
        />
        <input {...register("dueDate")} type="date" placeholder="언제까지?" />
        <select
          {...register("priority", {
            value: "",
            required: "중요도를 선택하세요",
          })}
        >
          <option value="" disabled hidden>
            선택해주세요
          </option>
          <option value="1">중요함</option>
          <option value="2">보통</option>
          <option value="3">안중요함</option>
        </select>
        <button>추가하기</button>
      </form>
    </div>
  )
}

export default TodoList2
