import { getContactMessage } from '@/app/actions/contact-messages';
import { CMSForm } from '@/components/admin/cms/CMSForm';
import { schemas } from '@/lib/cms/schema';

export default async function ViewContactMessagePage({ params }: { params: { id: string } }) {
    let item = null;
    let error = null;

    try {
        item = await getContactMessage(params.id);
    } catch (e: any) {
        error = e.message || 'Failed to load message';
    }

    if (error || !item) {
        return <div className="p-8 text-red-500">Error: {error || 'Message not found'}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Contact Message Details</h1>
                <p className="text-slate-500">View message content</p>
            </div>

            <CMSForm
                schema={schemas.contact_message}
                initialData={item}
                submitLabel={undefined} // Hide submit button as it's view-only/read-only schema
                backUrl="/admin/cms/contact-messages"
            />
        </div>
    );
}
