import { useDispatch } from "react-redux";
import { CONFIRMATION_MODAL_CLOSE_TYPES } from "../../../utils/globalConstantUtil";
import { showNotification } from "../headerSlice";
import { deleteTemplate } from "../../template/templateSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../../../utils/constants";

function ConfirmationModalBody({ extraObject, closeModal }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { message, type, index, navigateTo } = extraObject;

  const proceedWithYes = async () => {
    if (type === CONFIRMATION_MODAL_CLOSE_TYPES.TEMPLATE_DELETE) {
      // positive response, call api or dispatch redux function
      try {
        const token = localStorage.getItem("accessToken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.patch(
          `${API}/DeleteTemplate/Delete/${index}`,
          config
        );
        if (response?.status === 200) {
          // localStorage.setItem("user", JSON.stringify(response.data));
          // dispatch(sliceLeadDeleted(true));
          dispatch(
            showNotification({ message: response.data.message, status: 1 })
          );
          if (navigateTo) {
            navigate(navigateTo);
          }
          // navigate("/app/dashboard");
        } else {
          dispatch(
            showNotification({
              message: response.data.message,
              status: 0,
            })
          );
        }
      } catch (error) {
        console.log(error);
        if (error.status === 409) {
          localStorage.clear();
          window.location.href = "/login";
        } else {
          dispatch(
            showNotification({
              message: error.response.data.message,
              status: 0,
            })
          );
        }
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
