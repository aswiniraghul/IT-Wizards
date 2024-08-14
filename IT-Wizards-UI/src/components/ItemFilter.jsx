const ItemFilter = ({onChange}) => {
    return (
        <div>
            <h1>Filter Items by Description below</h1>
            <input type='text' onChange={onChange} placeholder='Click here to filter'/>
        </div>
    )
}


export default ItemFilter;
