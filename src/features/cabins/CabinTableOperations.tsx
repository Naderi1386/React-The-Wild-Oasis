import Filter from "../../ui/Filter"
import SortBy from "../../ui/SortBy";
import TableOperations from "../../ui/TableOperations"


const CabinTableOperations = () => {
  return (
    <TableOperations>
      <Filter
        options={[
          { lable: "All", value: "all" },
          { lable: "No Discount", value: "no-discount" },
          { lable: "With Discount", value: "with-discount" },
        ]}
        filterField="discount"
      />
      <SortBy
      type="white"
        options={[
          { lable: "Sort By Name (A-Z)", value: "name-asc" },
          { lable: "Sort By Name (Z-A)", value: "name-desc" },
          { lable: "Sort By Price (low first)", value: "regularPrice-asc" },
          { lable: "Sort By Price (high first)", value: "regularPrice-desc" },
          { lable: "Sort By Capacity (low first)", value: "maxCapacity-asc" },
          { lable: "Sort By Capacity (high first)", value: "maxCapacity-desc" },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations