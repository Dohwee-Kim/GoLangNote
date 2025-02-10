package main

// All Go files start with package
// Defines the namespace for the code in the file, used to organize and group code
// main package is special, because it indicates that the file belongs to an executable program

import (
	"container/list"
	"fmt"
)

func main() {
	taskOne := "Test string" //new declaration
	newList := []string{"task1", "task2", "task3"}

	fmt.Print("Welcome to my Todolist App!\n")
	fmt.Println(taskOne)
	fmt.Println("Tasks list: ", newList)

	loopLearning()
}

func test() {
	fmt.Println("TEst Function inside")
}

func loopLearning() {
	testList := []string{}
	dq := list.New()

	//testList.append("task1")
	//testList.append("task2") 파이썬 처럼 이렇게 사용 불가능
	testList = append(testList, "task1") //이렇게 새로 할당해야한다
	//dq.Pushback("new_element1")
	//dq.Pushback("new_element1")
	dq.PushBack("new_element1")
	dq.PushBack("new_element2")

	fmt.Println("slice List : ", testList) //slice List :  [task1]
	fmt.Println("dq List:", dq)            //dq List: &{{0x140000a6120 0x140000a6150 <nil> <nil>} 2} 주소값을 반환
}
