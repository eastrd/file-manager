package main

import (
	"fmt"
	"net/http"
)

func main() {

	// root := RootPath()
	// paths, err := root.List()
	// if err != nil {
	// 	panic(err)
	// }
	// fmt.Printf("%+v", paths)

	http.HandleFunc("/", handler)
	http.ListenAndServe(":12345", nil)
}

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Yo sup")
}
