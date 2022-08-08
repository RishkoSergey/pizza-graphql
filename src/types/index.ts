/* eslint-disable camelcase */
export interface IPizzaList {
  items: {
    id: number
    name: string
    cucumber: {
      name: string
    } | null
    size: 'SIZE_23' | 'SIZE_25' | 'SIZE_30'
    thickness: 'THICK' | 'THIN' | 'ULTRA_THIN'
    spicy: boolean
    create_time: string
  }[]
  count: number
}

export interface IPizza {
  id: number
  name: string
  cucumber: {
    id: number
    name: string
    pupirki: number
  } | null
  size: 'SIZE_23' | 'SIZE_25' | 'SIZE_30'
  thickness: 'THICK' | 'THIN' | 'ULTRA_THIN'
  spicy: boolean
  weight: number
  comment: string
}

export interface IPizzaInput {
  name: string
  phone: string
  comment: string
  size: 'SIZE_23' | 'SIZE_25' | 'SIZE_30'
  thickness: 'THICK' | 'THIN' | 'ULTRA_THIN'
  spicy: boolean
  weight: number
  cucumber_type_id: number
}

export interface ICucumberList {
  items: {
    id: number
    name: string
  }[]
  count: number
}
