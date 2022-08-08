<template>
  <div class="details" v-if="data && data.name">
    <img class="details__close" src="@/assets/close.svg" @click="emits('close')">
    <div class="details__title">{{  data.name}}</div>
    <div class="details__info">
      <img src="@/assets/weight.svg">
      <div class="details__info__text">{{ data.weight }}</div>
      <img src="@/assets/size.svg">
      <div class="details__info__text">{{ sizeEnum[data.size] }}</div>
    </div>
    <div class="details__table">
      <div class="details__table__label">Огурцы</div>
      <div class="details__table__value">
        {{ data.cucumber ? `${data.cucumber.name} (${data.cucumber.pupirki} пупырок)` : 'Нет' }}
      </div>
    </div>
    <div class="details__table">
      <div class="details__table__label">Острая</div>
      <div class="details__table__value">{{ data.spicy ? 'Да' : ' Нет' }}</div>
    </div>
    <div class="details__table">
      <div class="details__table__label">Тесто</div>
      <div class="details__table__value">{{ thicknessEnum[data.thickness] }}</div>
    </div>
    <div class="details__comment">{{ data.comment }}</div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import {
  GET_PIZZA,
  sizeEnum,
  thicknessEnum
} from '../gql'
import { IPizza } from '../types'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const emits = defineEmits(['close'])

const data = ref<IPizza | Record<string, never>>({})

const { result, onResult } = useQuery(GET_PIZZA, { id: props.id })
onResult(() => {
  data.value = result.value?.pizza
})
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

.details {
  width: 504px;
  height: 360px;
  position: absolute;
  left: calc(50% - 252px);
  top: calc(50% - 180px);
  background: white;
  border-radius: 16px;
  border: 2px solid #F2F2F2;
  font-family: 'Open Sans';
  overflow: hidden;
  padding: 56px 32px;

  &__close {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }

  &__title {
    font-weight: 600;
    font-size: 24px;
    line-height: 32px;
    color: #3F3F3F;
    margin-bottom: 27px;
  }

  &__info {
    display: flex;
    margin-bottom: 27px;

    img {
      margin-right: 7px;
    }

    &__text {
      margin-right: 16px;
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;
      color: #3F3F3F;
    }
  }

  &__table {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    &__last-child {
      margin-bottom: 24px;
    }

    &__label {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #737D8A;
    }

    &__value {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      color: #3F3F3F;
    }
  }

  &__comment {
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #737D8A;
  }
}
</style>
