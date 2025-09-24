
import { ProductType } from '@/types/product.type';
import React from 'react'
import AddBtn from '../AddBtn/AddBtn';
import Image from 'next/image';

export default function DetailsComponent({data}:{data:ProductType}) {
  return (
    <>
      <div className="container w-[90%] md:w-[80%] mx-auto p-4 flex flex-col md:flex-row">
        <div className="w-full md:w-1/4">
          <div className="p-4">
            <Image width={500} height={500} src={data.imageCover} alt="Product image" className="w-full" />
          </div>
        </div>
        <div className="w-full md:w-3/4">
          <div className="p-4">
            <h1 className="text-2xl font-bold my-4">{data.title}</h1>
            <p>{data.description}</p>
            <p className="text-emerald-600 my-2">{data.category.name}</p>
            <div className="flex justify-between w-full my-4">
              <span>{data.price}EGP</span>
              <span>
                <i className="fas fa-star text-yellow-500"></i>
                {data.ratingsAverage}
              </span>
            </div>
          <AddBtn id={data.id}/>
          </div>
        </div>
      </div>
    </>
  );
}
