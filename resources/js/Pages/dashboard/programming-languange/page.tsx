import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import { toast } from 'sonner'; // Import toast dari sonner untuk notifikasi

// Import komponen UI dari shadcn
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

// Interface untuk tipe data Programming
interface Programming {
    id: number;
    name: string;
}

// Interface untuk props komponen
interface Props {
    programmings: Programming[]; // Array of Programming yang diterima dari controller
}

export default function Dashboard({ programmings }: Props) {
    // State Management menggunakan useState
    const [isOpen, setIsOpen] = useState(false); // State untuk dialog form
    const [isDeleteOpen, setIsDeleteOpen] = useState(false); // State untuk dialog delete
    const [editingId, setEditingId] = useState<number | null>(null); // State untuk menyimpan ID yang sedang diedit
    const [deletingId, setDeletingId] = useState<number | null>(null); // State untuk menyimpan ID yang akan dihapus
    const [formData, setFormData] = useState({
        name: '', // State untuk form input
    });

    // Handler untuk submit form (create dan update)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            // Jika ada editingId, berarti update data
            router.put(`/dashboard/languange/${editingId}`, formData, {
                onSuccess: () => {
                    setIsOpen(false); // Tutup dialog
                    setEditingId(null); // Reset editingId
                    setFormData({ name: '' }); // Reset form
                    toast.success('Berhasil Edit Programming Language'); // Tampilkan notifikasi
                },
            });
        } else {
            // Jika tidak ada editingId, berarti create data baru
            router.post('/dashboard/languange', formData, {
                onSuccess: () => {
                    setIsOpen(false);
                    setFormData({ name: '' });
                    toast.success('Berhasil Tambah Programming Language Baru');
                },
            });
        }
    };

    // Handler untuk membuka modal form
    const openModal = (programming: Programming | null = null) => {
        if (programming) {
            // Jika ada data programming, berarti mode edit
            setEditingId(programming.id);
            setFormData({ name: programming.name });
        } else {
            // Jika tidak ada data, berarti mode create
            setEditingId(null);
            setFormData({ name: '' });
        }
        setIsOpen(true);
    };

    // Handler untuk membuka dialog konfirmasi delete
    const openDeleteDialog = (id: number) => {
        setDeletingId(id);
        setIsDeleteOpen(true);
    };

    // Handler untuk proses delete
    const handleDelete = () => {
        if (deletingId) {
            router.delete(`/dashboard/languange/${deletingId}`, {
                onSuccess: () => {
                    setIsDeleteOpen(false); // Tutup dialog delete
                    setDeletingId(null); // Reset deletingId
                    toast.success('Berhasil Hapus Programming Language');
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            breadcrumb={[
                { name: 'Programming Language', url: '/dashboard/languange' },
            ]}
        >
            <Head title="Programming Language" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header dan Form Dialog */}
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-semibold">
                                    Programming Language List
                                </h2>
                                {/* Dialog untuk Create dan Edit */}
                                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                    <DialogTrigger asChild>
                                        <Button onClick={() => openModal()}>
                                            Add New
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>
                                                {editingId
                                                    ? 'Edit Programming Language'
                                                    : 'Add Programming Language'}
                                            </DialogTitle>
                                            <DialogDescription>
                                                Enter the programming language
                                                details below.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <form
                                            onSubmit={handleSubmit}
                                            className="space-y-4"
                                        >
                                            <Input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) =>
                                                    setFormData({
                                                        name: e.target.value,
                                                    })
                                                }
                                                placeholder="Enter programming language name"
                                            />
                                            <div className="flex justify-end space-x-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    onClick={() =>
                                                        setIsOpen(false)
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                                <Button type="submit">
                                                    {editingId
                                                        ? 'Update'
                                                        : 'Save'}
                                                </Button>
                                            </div>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                            </div>

                            {/* Dialog Konfirmasi Delete */}
                            <Dialog
                                open={isDeleteOpen}
                                onOpenChange={setIsDeleteOpen}
                            >
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            Delete Programming Language
                                        </DialogTitle>
                                        <DialogDescription>
                                            Are you sure you want to delete this
                                            programming language? This action
                                            cannot be undone.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter className="flex justify-end space-x-2">
                                        <Button
                                            variant="outline"
                                            onClick={() =>
                                                setIsDeleteOpen(false)
                                            }
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            {/* Tabel Data */}
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>ID</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {programmings.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>
                                                <div className="flex space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        onClick={() =>
                                                            openModal(item)
                                                        }
                                                    >
                                                        Edit
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        onClick={() =>
                                                            openDeleteDialog(
                                                                item.id,
                                                            )
                                                        }
                                                    >
                                                        Delete
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
