import { Modal } from "@/components/ui/Modal";

const EquipmentMediaModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <>
      <Modal className="h-max" show={open} onHide={onClose}>
        <div className="flex w-full flex-col">
          <span className="text-2xl font-semibold">Mídias</span>
          <span>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry&apos;s standard dummy
            text ever since the 1500s, when an unknown printer took a galley of
            type and scrambled it to make a type specimen book. It has survived
            not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of Lorem Ipsum.
          </span>
        </div>
      </Modal>
    </>
  );
};

export default EquipmentMediaModal;
