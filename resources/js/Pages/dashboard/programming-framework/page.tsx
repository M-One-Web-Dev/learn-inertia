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

// Interface untuk tipe data Framework
interface Framework {
    id: number;
    name: string;
    programming_id: number;
}

interface ProgrammingLanguage {
    id: number;
    name: string;
}

// Interface untuk props komponen
interface Props {
    frameworks: Framework[]; // Array of Framework yang diterima dari controller
    languages: ProgrammingLanguage[]; // Array of string untuk list bahasa pemrograman
}

export default function Dashboard({ frameworks, languages }: Props) {
    // State Management menggunakan useState
    const [isOpen, setIsOpen] = useState(false); // State untuk dialog form
    const [isDeleteOpen, setIsDeleteOpen] = useState(false); // State untuk dialog delete
    const [editingId, setEditingId] = useState<number | null>(null); // State untuk menyimpan ID yang sedang diedit
    const [deletingId, setDeletingId] = useState<number | null>(null); // State untuk menyimpan ID yang akan dihapus
    const [formData, setFormData] = useState({
        name: '', // State untuk form input
        programming_id: 0, // State untuk form input programmingId
    });

    // Handler untuk submit form (create dan update)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingId) {
            // Jika ada editingId, berarti update data
            router.put(`/dashboard/framework/${editingId}`, formData, {
                onSuccess: () => {
                    setIsOpen(false); // Tutup dialog
                    setEditingId(null); // Reset editingId
                    setFormData({ name: '', programming_id: 0 }); // Reset form
                    toast.success('Berhasil Edit Framework'); // Tampilkan notifikasi
                },
            });
        } else {
            // Jika tidak ada editingId, berarti create data baru
            router.post('/dashboard/framework', formData, {
                onSuccess: () => {
                    setIsOpen(false);
                    setFormData({ name: '', programming_id: 0 });
                    toast.success('Berhasil Tambah Framework Baru');
                },
            });
        }
    };

    // Handler untuk membuka modal form
    const openModal = (framework: Framework | null = null) => {
        if (framework) {
            // Jika ada data framework, berarti mode edit
            setEditingId(framework.id);
            setFormData({
                name: framework.name,
                programming_id: framework.programming_id,
            });
        } else {
            // Jika tidak ada data, berarti mode create
            setEditingId(null);
            setFormData({ name: '', programming_id: 0 });
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
            router.delete(`/dashboard/framework/${deletingId}`, {
                onSuccess: () => {
                    setIsDeleteOpen(false); // Tutup dialog delete
                    setDeletingId(null); // Reset deletingId
                    toast.success('Berhasil Hapus Framework');
                },
            });
        }
    };

    return (
        <AuthenticatedLayout
            breadcrumb={[{ name: 'Framework', url: '/dashboard/framework' }]}
        >
            <Head title="Framework" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header dan Form Dialog */}
                            <div className="mb-6 flex items-center justify-between">
                                <h2 className="text-xl font-semibold">
                                    Framework List
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
                                                    ? 'Edit Framework'
                                                    : 'Add Framework'}
                                            </DialogTitle>
                                            <DialogDescription>
                                                Enter the framework details
                                                below.
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
                                                        ...formData,
                                                        name: e.target.value,
                                                    })
                                                }
                                                placeholder="Enter framework name"
                                            />
                                            <select
                                                value={formData.programming_id}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        programming_id: Number(
                                                            e.target.value,
                                                        ),
                                                    })
                                                }
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                            >
                                                <option value={0}>
                                                    Select language
                                                </option>
                                                {languages.map((lang) => (
                                                    <option
                                                        key={lang.id}
                                                        value={lang.id}
                                                    >
                                                        {lang.name}
                                                    </option>
                                                ))}
                                            </select>
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
                                            Delete Framework
                                        </DialogTitle>
                                        <DialogDescription>
                                            Are you sure you want to delete this
                                            framework? This action cannot be
                                            undone.
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
                                        <TableHead>Language</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {frameworks.map((item) => (
                                        <TableRow key={item.id}>
                                            <TableCell>{item.id}</TableCell>
                                            <TableCell>{item.name}</TableCell>
                                            <TableCell>
                                                {
                                                    languages.find(
                                                        (lang) =>
                                                            lang.id ===
                                                            item.programming_id,
                                                    )?.name
                                                }
                                            </TableCell>
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
