
// return (
//     <>
//         <h1>Filter</h1>
//         <SearchFilter onChange={onChangeSetSearchTerm} />
//         <br />
//         <CategoryFilter 
//         categories={categories}
//         dothing={onChangeSetSelectedCategories}
//         setValue={categoryFilter}
//         />
//         <br />
//         <div className="items-wrapper">
//             {dataToFilterAndDisplay
//             .filter((item) => {
//                 console.log(item);
//                 console.log(categoryFilter);
//                 if (
//                     !categoryFilter.length || 
//                     categoryFilter.length === categories.length
//                 )
//                 return true;
//                 let filterOut = false;
//                 item.categories.filter((itemCategory) => {
//                     if (filterOut) return true;
//                     filterOut = categoryFilter.includes(itemCategory);
//                 });
//                 return filterOut;
//             })
//             .filter((item) => {
//                 if (!searchTerm) return true;
//                 return item.description
//                 .toLowerCase()
//                 .includes(searchTerm.toLowerCase());
//             })
//             .map((item, index) => (
//                 <article key={item.description + index} className="item-card card">
//                     <header>
//                         <span className="item-description">{item.description}</span>
//                     </header>
//                     <div className="item-details">
//                         <p>${item.price}</p>
//                     </div>
//                     <div className="item-categories pill-box">
//                         {item.categories.map((category, index) => (
//                             <span
//                             key={category + index}
//                             className={`item-category pill ${category}`}
//                             >
//                                 {category}
//                             </span>
//                         ))}
//                     </div>
//                 </article>
//             ))}
//         </div>
//     </>
// );
// };


// const [searchTerm, setSearchTerm] = useState('');
// const [categoryFilter, setCategory] = useState([]);

// const onChangeSetSelectedCategories = (categoryArray) => {
//     if (categoryArray.length) setCategoryFilter([...categoryArray]);
//     else setCategoryFilter([]);
// };