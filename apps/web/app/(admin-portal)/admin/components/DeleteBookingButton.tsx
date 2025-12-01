"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteBooking } from "../../../actions/admin";

interface DeleteBookingButtonProps {
    bookingId: string;
    redirectTo: string;
}

export function DeleteBookingButton({ bookingId, redirectTo }: DeleteBookingButtonProps) {
    const router = useRouter();
    const [deleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this booking? This action cannot be undone.")) {
            return;
        }

        setDeleting(true);
        try {
            await deleteBooking(bookingId);
            router.push(redirectTo);
            router.refresh();
        } catch (error) {
            console.error("Delete error:", error);
            alert("An error occurred while deleting the booking.");
            setDeleting(false);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <Trash2 size={18} />
            {deleting ? "Deleting..." : "Delete"}
        </button>
    );
}
