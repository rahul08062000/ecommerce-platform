const ProductsFeed=({product})=>{
    const {title,description,images,price,category} = product;

    return (
        <>
       <div className="w-56 h-72 p-4 m-3 border border-gray-100 bg-gray rounded-md  hover:shadow-lg bg-gray-50 ">
        <img  alt=""
          className="rounded-md  w-[190px] h-[180px]"
          src={
           images[0]
          }
        />

        <h2 className="text-xl font-semibold py-1">{title}</h2>
        <h3 className="cuisines text-sm text-gray-500 ">{category}</h3>
        <h3 className="cuisines text-sm text-gray-500 ">{price}</h3>
        <h4 className="distance text-sm"> {description}</h4>
      </div>
       </>
    )
}

export default ProductsFeed;