import { getTestimonial } from "../../../../actions/testimonials";
import { TestimonialForm } from "../../components/TestimonialForm";
import { notFound } from "next/navigation";

export default async function EditTestimonialPage({ params }: { params: { id: string } }) {
    const testimonial = await getTestimonial(params.id);
    
    if (!testimonial) {
        notFound();
    }

    return <TestimonialForm initialData={testimonial} isEditing />;
}
