import { getInvitationTemplate } from "../../../actions/invitation-templates";
import { InvitationTemplateForm } from "../../components/InvitationTemplateForm";
import { notFound } from "next/navigation";

interface EditInvitationTemplatePageProps {
    params: {
        id: string;
    };
}

export default async function EditInvitationTemplatePage({ params }: EditInvitationTemplatePageProps) {
    const template = await getInvitationTemplate(params.id);

    if (!template) {
        notFound();
    }

    return <InvitationTemplateForm initialData={template} isEditing />;
}
