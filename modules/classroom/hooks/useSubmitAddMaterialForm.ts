import { toast } from "sonner";
import { useAddMaterialMutation } from "@/shared/redux/rtk-apis/materials/materials.api";
import { TAddMaterialForm } from "../components/AddMaterialDialog/AddMaterialForm.types";

const useSubmitAddMaterialForm = () => {
    const [addMaterial]=useAddMaterialMutation()

    const submitAddMaterialForm = async (formData: TAddMaterialForm, id: string ) => {
        try {
            const formDataPayload = new FormData();
            formDataPayload.append("title", formData.title);
            formDataPayload.append("instruction", formData.instruction);
            formDataPayload.append("file", formData.file);
      
            await addMaterial({ id, formData: formDataPayload }).unwrap();
            toast.success("Success", {
                description: 'New material has been added successfully.',
            });
            return true
        } catch (error) {
            toast.error("Failed to add material", {
                description: "Something went wrong",
            });
            return false
        }
    };
    return {submitAddMaterialForm}
}

export default useSubmitAddMaterialForm 