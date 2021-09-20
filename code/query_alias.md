query ExampleQuery {
  alias_1: pet(id: "11086") {
    id
    name
    owner {
      name
    }
    price(unit: "$")
  }
  alias_2: pet(id: "11096") {
    id
    name
    owner {
      name
    }
    price(unit: "$")
  } 
}
