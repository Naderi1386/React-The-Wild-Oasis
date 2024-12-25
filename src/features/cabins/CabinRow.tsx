import styled from "styled-components";
import { CabinType } from "../../services/apiCabins";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./useCreateCabin";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;
//   padding-left: 3rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

interface CabinRowPropType {
  cabin: CabinType;
}
const CabinRow = ({ cabin }: CabinRowPropType) => {
  const { isDeleting, DeleteCabin } = useDeleteCabin();
  const { createCabin } = useCreateCabin();
  const {
    image,
    discount,
    name,
    maxCapacity,
    regularPrice,
    id: cabinId,
    description,
  } = cabin;
  const handleDuplicate = () => {
    const duplicatedCabin = {
      description,
      discount,
      image: String(image),
      maxCapacity,
      name: `Copy of ${name}`,
      regularPrice,
    };

    createCabin({ id: 0, newCabin: duplicatedCabin });
  };

  return (
    <>
      <Table.Row>
        <Img src={image as string} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <Modal>
            <Menus.Menu>
              <Menus.Toggle id={cabinId} />
              <Menus.List id={cabinId}>
                <Menus.MenuButton
                  onClick={handleDuplicate}
                  icon={<HiSquare2Stack />}
                >
                  Duplicate
                </Menus.MenuButton>
                <Modal.Open opens="edit-cabin">
                  <Menus.MenuButton icon={<HiPencil />}>Edit</Menus.MenuButton>
                </Modal.Open>
                <Modal.Open opens="delete">
                  <Menus.MenuButton icon={<HiTrash />}>Delete</Menus.MenuButton>
                </Modal.Open>
              </Menus.List>
            </Menus.Menu>

            <Modal.Window name="edit-cabin">
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                disabled={isDeleting}
                resourceName={`Cabin ${name}`}
                onConfirm={() => {
                  DeleteCabin(cabinId);
                }}
              />
            </Modal.Window>
          </Modal>
        </div>
      </Table.Row>
    </>
  );
};

export default CabinRow;
