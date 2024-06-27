import { useDispatch } from "react-redux";
import { CONFIRMATION_MODAL_CLOSE_TYPES } from "../../../utils/globalConstantUtil";
import { showNotification } from "../headerSlice";
import { deleteTemplate } from "../../template/templateSlice";
import { useNavigate } from "react-router-dom";

function ConfirmationModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, type, index, navigateTo } = extraObject;

  const proceedWithYes = async () => {
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.TEMPLATE_DELETE) {
      // positive response, call api or dispatch redux function
      dispatch(deleteTemplate({ index }));
      dispatch(showNotification({ message: "Template Deleted!", status: 1 }));

      if (navigateTo) {
        navigate(navigateTo);
      }
    }
    closeModal();
  };

  return (
    <>
      <p className=" text-xl mt-8 text-center">{message}</p>

      <div className="modal-action mt-12">
        <button className="btn btn-outline   " onClick={() => closeModal()}>
          Cancel
        </button>

        <button
          className="btn btn-primary w-36"
          onClick={() => proceedWithYes()}
        >
          Yes
        </button>
      </div>
    </>
  );
}

export default ConfirmationModalBody;
