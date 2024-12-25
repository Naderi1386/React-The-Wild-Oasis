import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import useCabins from "./useGetCabins";
import Table from "../../ui/Table";
import { CabinType } from "../../services/apiCabins";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

const CabinTable = () => {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";

  const finallCabins =
    filterValue === "all"
      ? cabins
      : filterValue === "no-discount"
      ? cabins?.filter((c) => c.discount === 0)
      : cabins?.filter((c) => c.discount > 0);

  const sortBy = searchParams.get("sortBy") || "name-asc";
  const [field, direction] = sortBy.split("-");

  const modifier = direction === "asc" ? 1 : -1;
  const sortedCabins =
    field === "name"
      ? finallCabins?.sort((a, b) => a.name.localeCompare(b.name) * modifier)
      : field === "regularPrice"
      ? finallCabins?.sort(
          (a, b) => (a.regularPrice - b.regularPrice) * modifier
        )
      : field === "maxCapacity" &&
        finallCabins?.sort(
          (a, b) => (a.maxCapacity - b.maxCapacity) * modifier
        );

  if (isLoading) return <Spinner />;
  if (!cabins?.length) return <Empty resource="Cabins" />;

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
          <div></div>
        </Table.Header>
        <Table.Body
          dataType="cabin"
          data={sortedCabins as CabinType[]}
          renderCabin={(cabin: CabinType) => (
            <CabinRow cabin={cabin} key={cabin.id} />
          )}
        />
      </Table>
    </Menus>
  );
};

export default CabinTable;
