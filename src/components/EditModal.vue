<template>
  <div class="edit" v-if="data && data.name">
    <div class="edit__header">
      <div class="edit__header__title">
        {{ props.id ? 'Редактировать' : 'Создать' }} пиццу
      </div>
      <img class="edit__header__close" src="@/assets/close.svg" @click="emits('close')">
    </div>
    <div class="edit__form">
      <div class="edit__form__label">Название пиццы</div>
      <input v-model="data.name" class="edit__form__input">
      <div class="edit__form__label">Описание вкуса</div>
      <input v-model="data.comment" placeholder="Введите комментарий" class="edit__form__input">
      <div class="edit__form__middle-block">
        <div>
          <div class="edit__form__label">Размер пиццы</div>
          <div class="edit__form__choose choose">
            <div
              v-for="item in Object.keys(sizeEnum)"
              :key="item"
              class="choose__item"
              :class="{active: data.size === item}"
              @click="data.size = item"
            >
              {{ sizeEnum[item] }}
            </div>
          </div>
        </div>
        <div class="edit__form__weight">
          <div class="edit__form__label">Масса</div>
          <input type="number" class="edit__form__input" v-model="data.weight">
          <span>г.</span>
        </div>
      </div>
      <div class="edit__form__label">Тесто</div>
      <div class="edit__form__choose choose">
        <div
          v-for="item in Object.keys(thicknessEnum)"
          :key="item"
          class="choose__item"
          :class="{active: data.thickness === item}"
          @click="data.thickness = item"
        >
          {{ thicknessEnum[item] }}
        </div>
      </div>
      <div class="edit__form__label">Огурцы</div>
      <div class="edit__form__select">
        <select v-if="cucumbers.items" v-model="data.cucumber.id">
          <option v-for="cucumber in cucumbers.items" :key="cucumber.id" v-bind:value="cucumber.id">
            {{ cucumber.name }}
          </option>
        </select>
      </div>
      <input type="checkbox" v-model="data.spicy">
      <span>Острая</span>
      <div class="edit__form__save" @click="save">Сохранить</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useQuery, useMutation } from '@vue/apollo-composable'
import {
  CREATE_PIZZA,
  EDIT_PIZZA,
  GET_PIZZA,
  CUCUMBER_LIST,
  sizeEnum,
  thicknessEnum
} from '../gql'
import {
  IPizza,
  IPizzaInput,
  ICucumberList
} from '../types'

const props = defineProps({
  id: {
    type: Number,
    default: 0
  }
})

const emits = defineEmits(['close', 'save'])

const data = ref<IPizza | Record<string, never>>({})
const cucumbers = ref<ICucumberList | Record<string, never>>({})

if (props.id) {
  const { result, onResult } = useQuery(GET_PIZZA, { id: props.id })
  onResult(() => {
    data.value = { ...result.value?.pizza, cucumber: { ...result.value?.pizza.cucumber } }
  })
} else {
  data.value = {
    id: 0,
    name: '',
    comment: '',
    size: 'SIZE_23',
    thickness: 'THICK',
    spicy: false,
    weight: 0,
    cucumber: {
      id: 0,
      name: '',
      pupirki: 0
    }
  }
}

const { result: cucumbersResult, onResult: onCucumbersResult } = useQuery(CUCUMBER_LIST)
onCucumbersResult(() => {
  cucumbers.value = cucumbersResult.value.cucumber_list
})

const { mutate: createPizza } = useMutation(CREATE_PIZZA)
const { mutate: editPizza } = useMutation(EDIT_PIZZA)

const save = () => {
  const inputData: IPizzaInput = {
    name: data.value.name,
    phone: 'phone',
    comment: data.value.comment,
    size: data.value.size,
    thickness: data.value.thickness,
    spicy: data.value.spicy,
    weight: data.value.weight,
    cucumber_type_id: data.value.cucumber?.id || 0
  }

  if (props.id) {
    editPizza({ input: inputData, id: props.id })
  } else {
    createPizza({ input: inputData })
  }

  emits('save')
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

.edit {
  width: 504px;
  height: 542px;
  position: absolute;
  left: calc(50% - 252px);
  top: calc(50% - 371px);
  background: white;
  border-radius: 16px;
  border: 2px solid #F2F2F2;
  font-family: 'Open Sans';
  overflow: hidden;

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #EDEDED;
    padding: 12px 24px;

    &__title {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #3F3F3F;
    }

    &__close {
      cursor: pointer;
    }
  }

  &__form {
    padding: 24px;

    &__label {
      margin-bottom: 8px;
      font-weight: 400;
      font-size: 13px;
      line-height: 18px;
      color: #737D8A;
    }

    &__input {
      width: 100%;
      margin-bottom: 16px;
      height: 30px;
    }

    &__middle-block {
      display: flex;

      & > div {
        width: 50%;
      }
    }

    &__weight {
      input {
        width: 80%;
      }

      span {
        padding: 5px;
        border: 1px solid #F2F2F2;
        height: 32px;
      }
    }

    &__select {
      select {
        width: 100%;
        height: 30px;
        margin-bottom: 16px;
      }
    }

    &__save {
      cursor: pointer;
      margin-top: 24px;
      margin-left: auto;
      width: min-content;
      padding: 7px 24px;
      background: #00704B;
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: #FFFFFF;
      border-radius: 8px;
    }
  }
}

.choose {
  display: flex;

  &__item {
    padding: 6px 12px;
    background: #F2F2F2;
    font-weight: 400;
    font-size: 12px;
    line-height: 18px;
    color: #3F3F3F;
    border-radius: 2px;
    cursor: pointer;
    margin-bottom: 16px;

    &.active {
      background: #00704B;
      color: white;
    }
  }
}
</style>
