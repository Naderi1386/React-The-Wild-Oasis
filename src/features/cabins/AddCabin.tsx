import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import { initialCabin } from "./InitialCabin";

const AddCabin = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add a new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm cabinToEdit={initialCabin} />
        </Modal.Window>
      </Modal>
    </div>
  );
};

// const AddCabin = () => {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <>
//       <Button onClick={() => setIsOpenModal((old) => !old)}>
//         {isOpenModal ? "Close" : "Add new cabin"}
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={()=>{setIsOpenModal(false)}}>
//           <CreateCabinForm onClose={()=>{setIsOpenModal(false)}} cabinToEdit={initialCabin} />
//         </Modal>
//       )}
//     </>
//   );
// };

export default AddCabin;
