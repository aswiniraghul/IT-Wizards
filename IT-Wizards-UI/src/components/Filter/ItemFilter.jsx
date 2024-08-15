import './ItemFilter.css';

const ItemFilter = ({filters = [], callbackFunc, setValue = []}) => {
  const selectFilter = ($event) => {
    const selectedFilters = $event.target.value;
    let returnSelected = [];
    let fullReturn =[];
    if (selectedFilters === 'all') {
      callbackFunc(filters.map(filter => filter.name));
      return;
    }
    if (setValue.length) returnSelected = [...setValue];
    if (returnSelected.length === filters.length) returnSelected = [];
    if (returnSelected.length && returnSelected.includes(selectedFilters)) {
      fullReturn.push(
        ...returnSelected.filter((returnCat) => returnCat !== selectedFilters)
      );
    } else {
      if (returnSelected.length) fullReturn.push(...returnSelected);
      fullReturn.push(selectedFilters);
    }
    fullReturn = fullReturn.filter((fullReCat) => fullReCat !== 'all');
    if (fullReturn.length) {
      console.log('passing back full return: ', fullReturn);
      callbackFunc(fullReturn);
    } else {
      console.log('passing back all filters: ', filters)
      callbackFunc(filters);
    }
  };
  
  return (
    <div>
      <h2>By Category</h2>
      <button 
        className={`filter-button${setValue.length === filters.length ? ' active ' : ''
      }`}
      value="all"
      onClick={selectFilter}
      >
        Select All
      </button>
      {filters.map(({id, name}) => {
        return(
          <button
            key={id}
            // className={`filter-button${setValue.length !== filters.length && setValue.includes(name) ? ' active ' :  ''}`}
            className={`filter-button${setValue.includes(name) ? ' active ' :  ''}`}
            value={name}
            onClick={selectFilter}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </button>
        )
      })}
    </div>
  );
};

export default ItemFilter;
