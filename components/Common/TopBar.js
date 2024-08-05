import { ApiContext } from "@/app/context/ApiContext";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import ConfirmationModal from "./ConfirmationModal";
import { CHATSESSION_API } from "@/app/util/constant";

const TopBar = ({ barImg, title, wdt, htd, padding, currentChatSession }) => {
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const router = useRouter();
  const { getApiData, postApiData } = useContext(ApiContext);
  console.log(currentChatSession)


  const handleDelete = (item) => {
    setItemToDelete(item);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setItemToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      const data = {
        session_key: itemToDelete?.session_key,
        client_id: itemToDelete?.client_id,
        status:0,
      }
      await postApiData(CHATSESSION_API.updateStatus, data);
      handleClose();
    }
    router.refresh()

  };

  return (
    <div className={`chat-top-bar ${padding ? "mb--30" : ""}`}>
      <div className="section-title">
        <div className="icon">
          <Image src={barImg} width={wdt} height={htd} alt="Icon" />
        </div>
        <h6 className="title">{title}</h6>
      </div>
      <div className="dropdown history-box-dropdown">
        <button
          type="button"
          className="more-info-icon dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="fa-regular fa-ellipsis"></i>
        </button>
        <ul className="dropdown-menu style-one">
          {/* <li>
            <a className="dropdown-item" href="#">
              <i className="fa-sharp fa-solid fa-arrows-rotate"></i> Regenerate
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              <i className="fa-sharp fa-solid fa-tag"></i> Pin Chat
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              <i className="fa-solid fa-file-lines"></i> Rename
            </a>
          </li> */}
          {/* <li>
            <a className="dropdown-item" href="#">
              <i className="fa-solid fa-share-nodes"></i> Share
            </a>
          </li> */}
          <li>
            <a className="dropdown-item delete-item" href="#" onClick={() => handleDelete(currentChatSession)}>
              <i className="fa-solid fa-trash-can"></i> Delete Chat
            </a>
          </li>
        </ul>
      </div>
      {itemToDelete && (
        <ConfirmationModal
          show={showModal}
          handleClose={handleClose}
          handleDelete={handleConfirmDelete}
          title={itemToDelete.title}
        // description={itemToDelete.description}
        />
      )}
    </div>
  );
};

export default TopBar;
