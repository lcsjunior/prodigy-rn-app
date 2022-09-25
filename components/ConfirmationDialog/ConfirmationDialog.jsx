import { useDeferredPromise } from '@hooks/use-deferred-promise';
import { useDisclose } from '@hooks/use-disclosure';
import { forwardRef, useImperativeHandle, useState } from 'react';
import { Button, Dialog, Paragraph, Portal } from 'react-native-paper';

function ConfirmationDialog(props, ref) {
  const { isOpen, onOpen, onClose } = useDisclose(false);
  const [title, setTitle] = useState(null);
  const [message, setMessage] = useState(null);
  const { defer, deferRef } = useDeferredPromise(null);

  const handleConfirm = () => {
    deferRef.resolve(true);
    onClose();
  };

  const handleCancel = () => {
    onClose();
    deferRef.resolve(false);
  };

  const confirm = (options) => {
    setTitle(options?.title || 'Confirm');
    setMessage(options?.message || 'Are you ready?');
    onOpen();
    return defer().promise;
  };

  useImperativeHandle(ref, () => ({
    confirm,
  }));

  return (
    <Portal>
      <Dialog visible={isOpen} onDismiss={handleCancel}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleCancel}>Cancel</Button>
          <Button onPress={handleConfirm}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
const EnhancedConfirmationDialog = forwardRef(ConfirmationDialog);

export { EnhancedConfirmationDialog as ConfirmationDialog };
