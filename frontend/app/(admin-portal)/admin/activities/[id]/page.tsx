import { getActivity } from "../../../../actions/activities";
import { ActivityForm } from "../../components/ActivityForm";
import { notFound } from "next/navigation";

export default async function EditActivityPage({ params }: { params: { id: string } }) {
    const activity = await getActivity(params.id);

    if (!activity) {
        notFound();
    }

    return <ActivityForm initialData={activity} isEditing />;
}
