import { useSearchParams } from "react-router-dom"
import Select from "./Select"

interface OptionType{
    lable:string
    value:string
}

interface SortByPropType{
    options:OptionType[]
    type:string
}

const SortBy = ({options,type}:SortByPropType) => {
  const [searchParams,setSearchParams]=useSearchParams()
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    searchParams.set('sortBy',e.target.value)
    setSearchParams(searchParams)
  };
  const sortValue = searchParams.get("sortBy") || "";
  return (
    <Select options={options} value={sortValue} type={type} onChange={handleChange}/>
  )
}

export default SortBy