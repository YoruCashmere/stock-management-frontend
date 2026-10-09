import { tableFeatures, useTable, type ColumnDef } from "@tanstack/react-table";
import type { UserI } from "../../interfaces/user.interface";
import Badge from "../badge.component";
import ProgressionBar from "../progressBar.component";


const data: UserI[] = [
    {
        id: "1",
        userName: "Bakaly",
        email: "bakalia@gmail.com",
        role: "Admin",
        creator: "carlos",
        firstName: "roy",
        status: "Active",
        lastName: "James",
        phone: "672609108",
        activeHours: 10 * 5,
        week: 5 * 12,
        profileUrl: "data:image/jpeg;base64,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",
    },
    {
        id: "2",
        userName: "Bakaly",
        email: "bakalia@gmail.com",
        role: "Admin",
        creator: "carlos",
        firstName: "roy",
        status: "InActive",
        lastName: "James",
        phone: "672609108",
        activeHours: 0 * 3,
        week: 5 * 12,
        profileUrl: "data:image/jpeg;base64,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",
    }
];
const features = tableFeatures({});
const columns: Array<ColumnDef<typeof features, UserI>> = [
    {
        accessorKey: "userName",
        header: "User Name",
        cell: (info) => info.getValue(),
    },
    {
        accessorKey: "email",
        header: "Email Address",
        cell: (info) => info.getValue(),

    },
    {
        accessorKey: "role",
        header: "Role",
        cell: (info) => {
            const status = info.getValue<string>();
            if (status === "Admin") return <Badge variant="info">{status}</Badge>
        }

    },
    {
        accessorKey: "status",
        header: "Status",
        cell: (info) => {
            const status = info.getValue<string>();
            if (status == "Active") return <Badge variant="pending">{status}</Badge>
            else if (status == "InActive") return <Badge variant="insight">{status}</Badge>
        },

    },
    {
        accessorKey: "lastName",
        header: "Last Name",
        cell: (info) => info.getValue(),

    },
    {
        accessorKey: "phone",
        header: "Phone",
        cell: (info) => info.getValue(),

    },
    {
        accessorKey: "activeHours",
        header: "Hours spend in work",
        accessorFn: (row) => row.activeHours > 0 ? row.activeHours / row.week : 0,
        cell: ({row}) => {
            return <ProgressionBar initialUnits={row.original.week} actualUnits={row.original.activeHours} />
        },

    }
]
export function UserTable() {
    const table = useTable({ features, columns, data });
    return (
        <div className="w-full overflow-x-auto overflow-y-auto border rounded-xl border-brand-deep shadow-md">
            <table className="border-collape text-left text-sm w-full">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="bg-brand-forest py-3 px-4 font-semibold uppercase tracking-wider text-xl text-left overflow-x-contain">
                                    {header.isPlaceholder ? null : <table.FlexRender header={header} />}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="divide-y divide-black">
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id} className="hover:bg-brand-laurel transition-colors duration-220">
                            {row.getAllCells().map((cell) => (
                                <td key={cell.id} className="whitespace-nowrap px-5 py-3 text-sm ">
                                    <table.FlexRender cell={cell} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default UserTable;