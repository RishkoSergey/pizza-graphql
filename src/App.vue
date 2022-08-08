<template>
  <div class="pizza">
    <div class="pizza__header" />
    <div class="pizza__container">
      <div class="pizza__title">
        Список пицц
      </div>
      <div class="pizza__info">
        <div class="pizza__info__count">
          Найдено {{ pizzaList.count }} супер-пицц
        </div>
        <div class="pizza__info__button" @click="openModal(0)">
          Добавить пиццу
        </div>
      </div>
      <div v-if="pizzaList && pizzaList.items" class="pizza__list">
        <div class="item headers">
          <div class="item__id">#</div>
          <div class="item__buttons">&nbsp;</div>
          <div class="item__name">Название</div>
          <div class="item__cucumber">Огурцы</div>
          <div class="item__thickness">Тесто</div>
          <div class="item__size">Размер</div>
          <div class="item__spicy">Острая пицца</div>
          <div class="item__date">Дата создания шедевра</div>
        </div>
        <div
          v-for="pizza in pizzaList.items"
          :key="pizza.id"
          class="pizza__list__item item"
        >
          <div class="item__id">{{ pizza.id }}</div>
          <div class="item__buttons">
            <img src="@/assets/edit.svg" @click="openModal(pizza.id)">
            <img src="@/assets/delete.svg" @click="deleteItem(pizza.id)">
          </div>
          <div class="item__name" @click="openDetailsModal(pizza.id)">{{ pizza.name }}</div>
          <div class="item__cucumber">{{ pizza.cucumber ? pizza.cucumber.name : 'Нет' }}</div>
          <div class="item__thickness">{{ thicknessEnum[pizza.thickness] }}</div>
          <div class="item__size">{{ sizeEnum[pizza.size] }}</div>
          <div class="item__spicy">{{ pizza.spicy ? 'Да' : 'Нет' }}</div>
          <div class="item__date">{{ formatDate(pizza.create_time) }}</div>
        </div>
      </div>
    </div>
  </div>
  <EditModal v-if="showModal" :id="currentId" @close="closeModal" @save="save" />
  <PizzaDetails v-if="showDetailsModal" :id="currentDetailsId" @close="showDetailsModal = false" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  DELETE_PIZZA,
  PIZZA_LIST,
  sizeEnum,
  thicknessEnum
} from './gql'
import { IPizzaList } from './types'
import EditModal from './components/EditModal.vue'
import PizzaDetails from './components/PizzaDetails.vue'

const pizzaList = ref<IPizzaList | Record<string, never>>({})

const { result, onResult, refetch } = useQuery(PIZZA_LIST)
onResult(() => {
  pizzaList.value = result.value.pizza_list
})

const formatDate = (str: string) => {
  const date = new Date(str)
  return `${('0' + date.getDate()).slice(-2)}.${('0' + (date.getMonth() + 1)).slice(-2)}.${date.getFullYear()}`
}

const { mutate: deletePizza } = useMutation(DELETE_PIZZA)

const deleteItem = (id: number) => {
  deletePizza({ id })
  refetch()
}

const showModal = ref(false)
const currentId = ref(0)

const showDetailsModal = ref(false)
const currentDetailsId = ref(0)

const openModal = (id: number) => {
  currentId.value = id
  showModal.value = true
}

const openDetailsModal = (id: number) => {
  currentDetailsId.value = id
  showDetailsModal.value = true
}

const closeModal = () => {
  showModal.value = false
  currentId.value = 0
}

const save = () => {
  showModal.value = false
  refetch()
  currentId.value = 0
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

.pizza {
  min-height: 100vh;
  font-family: 'Open Sans';
  padding-bottom: 70px;
  position: relative;

  &__header {
    width: 100%;
    height: 93px;
    background-color: #00704B;
    margin-bottom: 40px;
  }

  &__container {
    padding: 0 32px;
  }

  &__title {
    margin-bottom: 32px;
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: #3F3F3F;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;

    &__count {
      font-weight: 400;
      font-size: 14px;
      line-height: 120%;
      color: #3F3F3F;
    }

    &__button {
      background: #00704B;
      border-radius: 8px;
      padding: 7px 16px;
      cursor: pointer;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #FFFFFF;
    }
  }

  &__list {
    border-left: 1px solid #F2F2F2;
    border-top: 1px solid #F2F2F2;
    width: 100%;
    max-width: 100%;
  }
}

.item {
  display: flex;
  width: 100%;
  max-width: 100%;
  height: min-content;
  & > div {
    width: 8%;
    padding: 16px;
    border-right: 1px solid #F2F2F2;
    border-bottom: 1px solid #F2F2F2;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #3F3F3F;
  }

  &__name {
    font-weight: 600 !important;
    font-size: 14px !important;
    line-height: 20px !important;
    color: #00704B !important;
    cursor: pointer;
  }

  &__name, &__cucumber, &__thickness {
    width: 20% !important;
  }

  &__buttons {
    & > img {
      margin-right: 16px;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }
    }
  }
}

.headers {
  background-color: #F2F2F2;
  & > div {
    padding: 12px 16px;
    // min-width: 8%;
    font-weight: 400;
    font-size: 12px;
    line-height: 120%;
    color: #737D8A;
  }
}
</style>
