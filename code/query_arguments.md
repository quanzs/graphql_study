query ExampleQuery {
  pet(id: "10085") {
    id
    name
    owner {
      name
    }
    price(unit: "$")
  } 
}
