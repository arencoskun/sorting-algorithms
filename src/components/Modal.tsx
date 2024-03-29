import { ScriptProps } from "next/script";
import Button from "./Button";
import Typography from "./Typography";
import { useEffect, useState } from "react";

interface ModalProps extends ScriptProps {
  title: string;
  id: string;
  hidden: boolean;
  onCloseButtonClicked?: () => void;
  disableBg?: boolean;
  buttonDisabled?: boolean;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

export default function Modal({ children, ...props }: ModalProps) {
  return (
    <div>
      {/* Backdrop */}
      <div
        className={`${
          !props.modalVisible || props.disableBg ? "hidden" : ""
        } fixed inset-0 opacity-50 bg-black z-40`}
      ></div>
      {/* Modal */}
      <div
        id={props.id}
        data-modal-backdrop="static"
        aria-hidden="true"
        className={`${
          !props.modalVisible ? "hidden" : ""
        } fixed inset-0 overflow-y-auto overflow-x-hidden flex items-center justify-center z-50`}
      >
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <div className="relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative rounded-lg shadow bg-gray-300">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-600">
                <Typography>{props.title}</Typography>
              </div>
              <div className="p-4 md:p-5 space-y-4">{children}</div>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-600 rounded-b justify-end">
                <Button
                  color="blue"
                  onClick={() => {
                    props.setModalVisible(false);
                    if (props.onCloseButtonClicked)
                      props.onCloseButtonClicked();
                  }}
                  disabled={props.buttonDisabled}
                >
                  OK
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
