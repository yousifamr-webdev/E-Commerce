import getAllCategories from '@/api/allCategories.api'
import React from 'react'
import CategorySwiper from '../CategorySwiper/CategorySwiper';

export default async function CategorySlider() {

  const { data } = await getAllCategories();

  return (
      <><CategorySwiper data={data} /></>
  )
}
