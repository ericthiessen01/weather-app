// import {useState} from 'react'
// import { AsyncPaginate } from 'react-select-async-paginate'

// export default function Search({onSearchChange}) {
//     const [search, setSearch] = useState(null)

//     const searchOptions = {
//         method: 'GET',
//         headers: {
//             'X-RapidAPI-Key': import.meta.env.VITE_GEODB_API_KEY,
//             'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
//         }
//     };

//     function handleOnChange(searchData) {
//         setSearch(searchData)
//         onSearchChange(searchData)
//     }

//     function loadOptions(value) {
//         return(
//         fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=100000&namePrefix=${value}`, searchOptions)
//             .then(response => response.json())
//             .then(response => {
//                 return {
//                     options: response.data.map((city) => {
//                         return {
//                             value: `${city.latitude} ${city.longitude}`,
//                             label: `${city.name}, ${city.countryCode}`
//                         }
//                     })
//                 }
//             })
//             .catch(err => console.error(err))
//     )}

//   return (
//     <AsyncPaginate 
//         placeholder="Search for city"
//         debounceTimeout={2000}
//         value={search}
//         onChange={handleOnChange}
//         loadOptions={loadOptions}
//     />
//   )
// }
