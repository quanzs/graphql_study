query Search($id: ID!, $showPrice: Boolean! = false) {
  alias_1: pet(id: $id) {
    id
    name
    owner {
      name
    }
    price(unit: "$") @include(if: $showPrice)
  }
}

# 参数
{
  "id": "good",
  "showPrice": true
}