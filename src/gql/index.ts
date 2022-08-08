import { gql } from 'graphql-tag'

export const CREATE_PIZZA = gql`
  mutation CreatePizzaMutation($input: PizzaEdit!) {
    create_pizza(
      input: $input
    )
  }
`

export const EDIT_PIZZA = gql`
  mutation EditPizzaMutation($input: PizzaEdit!, $id: ID!) {
    edit_pizza(
      input: $input,
      id: $id
    )
  }
`

export const DELETE_PIZZA = gql`
  mutation DeletePizzaMutation($id: ID!) {
    delete_pizza(
      id: $id
    )
  }
`

export const PIZZA_LIST = gql`
  query PizzaList {
    pizza_list {
      items {
        id
        name
        cucumber {
          name
        }
        size
        thickness
        spicy
        create_time
      }
      count
    }
  }
`

export const GET_PIZZA = gql`
  query GetPizza ($id: ID!){
    pizza (id: $id) {
      id
      name
      cucumber {
        id
        name
        pupirki
      }
      size
      thickness
      spicy
      weight
      comment
    }
  }
`

export const CUCUMBER_LIST = gql`
  query {
    cucumber_list {
      items {
        id
        name
      }
      count
    }
  }
`

export const sizeEnum: Record<'SIZE_23' | 'SIZE_25' | 'SIZE_30', string> = {
  SIZE_23: '23 см',
  SIZE_25: '25 см',
  SIZE_30: '30 см'
}

export const thicknessEnum: Record<'THICK' | 'THIN' | 'ULTRA_THIN', string> = {
  THICK: 'Толстое',
  THIN: 'Тонкое',
  ULTRA_THIN: 'Ультратонкое'
}
