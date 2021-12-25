package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
)

func getInput(filepath string) []int {
	var input []int
	file, err := os.Open(filepath)

	if err != nil {
		fmt.Println(err)
	}
	defer file.Close()

	scanner := bufio.NewScanner(file)

	for scanner.Scan() {
		value, _ := strconv.Atoi(scanner.Text())
		input = append(input, value)
	}

	return input
}

func summate(valuesPtr *[]int) int {
	values := *valuesPtr
	var sum int

	for _, value := range values {
		sum += value
	}

	return sum
}

func getIncreases(valuesPtr *[]int) int {
	values := *valuesPtr
	var increases int

	for i := 1; i < len(values); i++ {
		if values[i-1] < values[i] {
			increases++
		}
	}

	return increases
}

func getWindowSums(valuesPtr *[]int, size int) []int {
	values := *valuesPtr
	var windowSums []int

	for i := size - 1; i < len(values); i++ {
		window := values[(i - size + 1) : i+1]
		windowSums = append(windowSums, summate(&window))
	}

	return windowSums
}

func main() {
	input := getInput("./inputs/day1input.txt")
	windowedSums := getWindowSums(&input, 3)

	// Part 1
	fmt.Println(getIncreases(&input))

	// Part 2 :)
	fmt.Println(getIncreases(&windowedSums))
}
