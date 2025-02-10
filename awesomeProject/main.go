package main

// All Go files start with package
// Defines the namespace for the code in the file, used to organize and group code
// main package is special, because it indicates that the file belongs to an executable program

import "fmt"

func main() {
	var taskOne = "Test string"
	fmt.Print("Welcome to my Todolist App!\n")
	fmt.Println(taskOne)
	test()
}

func test() {
	fmt.Println("TEst Function inside")
}
