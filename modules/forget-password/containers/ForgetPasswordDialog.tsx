import React, { useState } from 'react'
import { Dialog, DialogOverlay, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/shadui/dialog'
import EmailForm from '../components/EmailForm/EmailForm';
import OtpForm from '../components/OtpForm/OtpForm';
import PasswordForm from '../components/PasswordForm/PasswordForm';

const ForgetPasswordDialog = ({
  isDialogOpen,
  onClose,
  stage,
  setStage
}: {
  isDialogOpen: boolean;
  onClose: () => void;
  stage: number;
  setStage: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const [email, setEmail] = useState("");
    const handleNextStage = () => {
      setStage((prevStage) => prevStage + 1);
    }
    return (
    <div >
    <Dialog open={isDialogOpen} onOpenChange={onClose}>
        <DialogOverlay />
        <DialogContent className= 'bg-white w-[300px] sm:w-[550px]'>
        <DialogHeader>
            <DialogTitle className='text-1xl sm:text-2xl text-center sm:text-left text-custom-green font-bold mb-2'>FORGOT PASSWORD</DialogTitle>
        </DialogHeader>
          {stage === 1 && <EmailForm onClose={onClose} onSuccess={handleNextStage} setEmail={setEmail} />}
          {stage === 2 && <OtpForm onClose={onClose} onSuccess={handleNextStage} email={email}/>}
          {stage === 3 && <PasswordForm onClose={onClose} email={email}/>}
        </DialogContent>
    </Dialog>
    </div>
    )
}

export default ForgetPasswordDialog

