import React from 'react'

const ProductImage = ({index,data}) => {
   
  return (!! data &&
    <div className="w-full h-96">
        <img 
          src={data.images[index]}
          alt="Product"
          className="w-full h-[22rem]"
        />
    </div>
  )
}

export default ProductImage